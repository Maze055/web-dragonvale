<?php

use Maze\db\MySQLConn;
use Maze\db\ParamSQLBuilder;

require_once 'autoload.php';

/**
 * Represents dragonvale database.
 *
 * This class manages connection to and querying against
 * dragonvale database. It features singleton pattern,
 * since the schema has a dedicated user and there is
 * therefore no need to effective multiple connections.
 *
 * @uses \Maze\db\MySQLConn for low level connection and querying tasks.
 */
class DragonValeDB {

	/**
	 * @var DragonvaleDB Singleton instance
	 */
	private static $instance = 0;

	/**
	 * @var \Maze\db\MySQLConn MySQLConn instance
	 */
	private $conn = 0;

	/**
	 * Returns MySQL code to transform and display times
	 * as specified.
	 *
	 * @param boolean $reduced If set, reduces times by 20%.
	 * @param boolean $displayDays If set, will display the number of days when there's at least one.
	 * @return string MySQL code to transform and display time according to specifications.
	 */
	private static function makeSQLTime($reduced, $displayDays) {
		$time = $reduced ? 'sec_to_time(truncate(time_to_sec(time) * 0.8, 0))'
				: 'time';
		return !$displayDays ? $time : <<<BOUND
concat_ws(':',
	if (hour($time) < 24, null, lpad(hour($time) div 24, 2, '0')),
    lpad(hour($time) % 24, 2, '0'),
    right($time, 5))
BOUND;
	}

	/**
	 * Checks whether the argument is strictly a positive integer.
	 *
	 * @param mixed $number The value to be checked.
	 * @return boolean True when the argument is a strictly positive integer.
	 */
	private static function isPositive($number) {
		return is_int($number) && $number > 0;
	}

	/**
	 * Checks whether the argument is a valid MySQL time string.
	 *
	 * @param mixes $time The value that will be checked.
	 * @return boolean True when the argument is a valid MySQL time string.
	 */
	private static function isTime($time) {

		/*
			As of MySQL specifications, hours must have at
			least two digit and can range from -838 to 838,
			thus having a maximum of three digits.
		*/
		return is_string($time)
				&& preg_match('/^(\d{2,3}):(\d{2}):(\d{2})$/', $time, $matches)
				&& abs($matches[1]) < 839 && $matches[2] < 60 && $matches[3] < 60;
	}

	/**
	 * Creates the MySQLConn instance with
	 * fixed connection parameters.
	 */
	private function __construct() {
		$this -> conn = new MySQLConn('localhost', 'dragonvale', 'dragonvale', 'dragonvale');
	}

	/**
	 * Returns the singleton instance, creating it
	 * if it still doesn't exist.
	 *
	 * @return self The singleton instance of this class.
	 */
	public static function getInstance() {
		if (!(self::$instance instanceof DragonvaleDB))
			self::$instance = new DragonvaleDB();
		return self::$instance;
	}

	/**
	 * Fetches all the dragons matching given search criteria.
	 *
	 * This method returns a bidimensional array holding data
	 * of any dragon that matches the specified search criteria:
	 * data include dragon's name, hatching time and elements.
	 *
	 * All criteria are optional, and are ignored if either not
	 * set or not valid.
	 *
	 * @param int $id The dragon's id, valid when positive. If valid, causes all the other criteria to be ignored.
	 * @param string $time The hatching time, valid as MySQL time string.
	 * @param int $elem1 The first element, or just one of them when $strictOrder is not set.
	 * @param int $elem2 The second element, or just one of them when $strictOrder is not set.
	 * @param int $elem3 The third element, or just one of them when $strictOrder is not set.
	 * @param int $elem4 The fourth element, or just one of them when $strictOrder is not set.
	 * @param int $rowsCount Maximum number of rows that will be fetched.
	 * @param int $startRow Zero-based index of the first row that will be returned.
	 * @param boolean $strictOrder When set, forces elements to be matched in order.
	 * @param boolean $reduced When set, hatching times will be reduced by 20%.
	 * @param boolean $displayDays When set, will display the number of days when there's at least one.
	 * @return mixed[][] A bidimensional array having dragons' data as associative arrays, whose keys are: 'name', 'time', 'elem1', 'elem2', 'elem3' and 'elem4'.
	 *
	 * @uses \Maze\db\ParamSQLbuilder to construct the MySQL statement.
	 */
	public function getDragons($id, $time, $elem1, $elem2, $elem3, $elem4, $rowsCount,
			$startRow, $strictOrder = false, $reduced = false, $displayDays = false) {
		$query = new ParamSQLBuilder('select d.en as name, '
				. self::makeSQLTime($reduced, $displayDays)
				. <<<BOUND
 as time, e1.en as elem1, e2.en as elem2, e3.en as elem3, e4.en as elem4
from dragons d
	join elements e1
		on d.elem1 = e1.id
	left join elements e2
		on d.elem2 = e2.id
	left join elements e3
		on d.elem3 = e3.id
	left join elements e4
		on d.elem4 = e4.id
BOUND
);
		if (self::isPositive($id)) {
			$query -> addPiece('d.id = ?', [$id]);
		}
		else {
			if (self::isTime($time))
				$query -> addPiece('time = ?', [$time]);
			if (self::isPositive($elem1))
				$query -> addPiece($strictOrder ? 'elem1 = ?' :
						'? in (elem1, elem2, elem3, elem4)', [$elem1]);
			if (self::isPositive($elem2))
				$query -> addPiece($strictOrder ? 'elem2 = ?' :
						'? in (elem1, elem2, elem3, elem4)', [$elem2]);
			if (self::isPositive($elem3))
				$query -> addPiece($strictOrder ? 'elem3 = ?' :
						'? in (elem1, elem2, elem3, elem4)', [$elem3]);
			if (self::isPositive($elem4))
				$query -> addPiece($strictOrder ? 'elem4 = ?' :
						'? in (elem1, elem2, elem3, elem4)', [$elem4]);
		}

		if ($query -> hasPieces()) {
			$query -> addSQL('where');
			$query -> concatPieces('and');
		}

		$query -> addSQL('order by d.en');
		$query -> addRowsCount($rowsCount, $startRow);

		$params = $query -> getParams();
		if (isset($params))
			return $this -> conn -> query(MySQLConn::ASSOC, null, $query -> getSQL(), ...$params);
		return $this -> conn -> query(MySQLConn::ASSOC, null, $query -> getSQL());
	}

	/**
	 * Fetches all dragons' names and ids, sorted by name.
	 *
	 * @return mixed[][] A numeric bidimensional array having id and name of every dragon as first and second element respectively.
	 */
	public function allNames() {
		return $this -> conn -> query(MySQLConn::NUMERIC, null,
				'select id, en from dragons order by en');
	}

	/**
	 * Fetches all elements' names and ids, sorted by name.
	 *
	 * @return mixed[][] A numeric bidimensional array having id and name of every element as first and second element respectively.
	 */
	public function allElements() {
		return $this -> conn -> query(MySQLConn::NUMERIC, null,
				'select id, en from elements order by en');
	}

	/**
	 * Fetches all different dragons' hatching times, both standard
	 * and formatted as specified, and sorted by time.
	 *
	 * @param boolean $reduced If set, reduces times by 20%.
	 * @param boolean $displayDays If set, will display the number of days when there's at least one.
	 * @return mixed[][] A numeric bidimensional array having standard and formatted times as first and second element respectively.
	 */
	public function allTimes($reduced = false, $displayDays = false) {
		return $this -> conn -> query(MySQLConn::NUMERIC, null, 'select distinct time, '
				. self::makeSQLTime($reduced, $displayDays)
				. ' from dragons order by time');
	}

}
