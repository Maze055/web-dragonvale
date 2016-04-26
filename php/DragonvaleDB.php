<?php

use Maze\db\MySQLConn;

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
	 * @var mysqli_stmt getDragons() method underlying prepared statement.
	 */
	private static $getDragonsQuery = 0;

	/**
	 * @var mysqli_stmt breedingHint() method underlying prepared statement.
	 */
	private static $breedingHintQuery = 0;

	/**
	 * @var mysqli_stmt allTimes() method underlying prepared statement.
	 */
	private static $allTimesQuery = 0;

	/**
	 * @var \Maze\db\MySQLConn MySQLConn instance
	 */
	private $conn = 0;

	/**
	 * Creates the MySQLConn instance with
	 * fixed connection parameters.
	 */
	private function __construct() {
		$this -> conn = new MySQLConn('localhost', 'dragonvale', 'dragonvale', 'dragonvale');
	}

	/**
	 * Closes prepared statements declared as static members.
	 * This is appropriate since this class is a singleton,
	 * so when the instance is destructed nothing can use
	 * statements anymore
	 */
	public function __destruct() {
		if (self::$getDragonsQuery instanceof mysqli_stmt)
			if (!self::$getDragonsQuery -> close())
				echo '$getDragonsQuery closing failed due to: ' . self::$getDragonsQuery -> error . '\n';

		if (self::$breedingHintQuery instanceof mysqli_stmt)
			if (!self::$breedingHintQuery -> close())
				echo '$breedingHintQuery closing failed due to: ' . self::$getDragonsQuery -> error . '\n';

		if (self::$allTimesQuery instanceof mysqli_stmt)
			if (!self::$allTimesQuery -> close())
				echo '$allTimesQuery closing failed due to: ' . self::$allTimesQuery -> error . '\n';
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
	 * @param int $id Dragon's id, valid when positive. If valid, causes all the other criteria to be ignored.
	 * @param string $time Hatching time, valid as MySQL time string.
	 * @param int $elem1 First element, or just one of them when $strictOrder is not set.
	 * @param int $elem2 second element, or just one of them when $strictOrder is not set.
	 * @param int $elem3 Third element, or just one of them when $strictOrder is not set.
	 * @param int $elem4 Fourth element, or just one of them when $strictOrder is not set.
	 * @param int $parent1 Id of one of the parents.
	 * @param int $parent2 Id of one of the parents.
	 * @param int $rowsCount Maximum number of rows that will be fetched.
	 * @param int $startRow Zero-based index of the first row that will be returned.
	 * @param boolean $strictOrder When set, forces elements to be matched in order.
	 * @param boolean $reduced When set, hatching times will be reduced by 20%.
	 * @param boolean $displayDays When set, will display the number of days when there's at least one.
	 * @return mixed[][] A bidimensional array having dragons' data as associative arrays, whose keys are: 'name', 'time', 'elem1', 'elem2', 'elem3' and 'elem4'.
	 */
	public function getDragons($id, $time, $elem1, $elem2, $elem3, $elem4,
			$parent1, $parent2, $rowsCount, $startRow, $strictOrder = false,
			$reduced = false, $displayDays = false) {
		if (!(self::$getDragonsQuery instanceof mysqli_stmt)) {
			self::$getDragonsQuery = $this -> conn -> prepare(
					'call getDragons(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
			if (!self::$getDragonsQuery)
				die("\$getDragonsQuery preparation failed due to: {$this -> conn -> error}\n");
		}

		/*
			Must convert booleans to integer since prepared
			statements don't handle the former. Moreover,
			'b' in types string stands for 'blob'.
		*/
		return $this -> conn -> prepQuery(MySQLConn::ASSOC, null, self::$getDragonsQuery, $id,
				$time, $elem1, $elem2, $elem3, $elem4, $parent1, $parent2, $rowsCount,
				$startRow, (int) $strictOrder, (int) $reduced, (int) $displayDays);
	}

	/**
	 * Fetches breeding data about a dragon.
	 *
	 * This method returns a bidimensional array holding
	 * all non-null data from a dragon and its eventual
	 * parents, adding a note for those dragons that don't
	 * have a standard breeding mechanism. Moreover, it
	 * formats hatching times as specified.
	 *
	 * @param int $id The id of the dragon which data will be retrieved.
	 * @param boolean $reduced When set, hatching times will be reduced by 20%.
	 * @param boolean $displayDays When set, will display the number of days when there's at least one.
	 * @return mixed[][] A bidimensional array having all dragons' non-null data as associative arrays, with an additional 'notes' key
	 */
	public function breedingHint($id, $reduced = false, $displayDays = false) {
		if (!(self::$breedingHintQuery instanceof mysqli_stmt)) {
			self::$breedingHintQuery = $this -> conn -> prepare('call breedingHint(?, ?, ?)');
			if (!self::$breedingHintQuery)
				die("\$breedingHintQuery preparation failed due to: {$this -> conn -> error}\n");
		}

		/*
			Must convert booleans to integer since prepared
			statements don't handle the former. Moreover,
			'b' in types string stands for 'blob'.
		*/
		return $this -> conn -> prepQuery(MySQLConn::ASSOC, null,
				self::$breedingHintQuery, $id, (int) $reduced, (int) $displayDays);
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
	 * Fetches all ids, names and, if any, the opposite of
	 * dragons that can breed, sorted by name.
	 *
	 * @return mixed[][] A bidimensional array having said data as an associative array whose key are: 'id', 'name', 'opposite'.
	 */
	public function allParents() {
		return $this -> conn -> query(MySQLConn::ASSOC, null, <<<BOUND
select d.id as id, d.en as name, getOppositeDragon(d.id) as opposite
from dragons d
	join canBreed cb
		on d.id = cb.id
where
	cb.canBreed is true
order by d.en
BOUND
);
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
		if (!(self::$allTimesQuery instanceof mysqli_stmt)) {
			self::$allTimesQuery = $this -> conn -> prepare(
					'select distinct time, formatTime(time, ?, ?) from dragons order by time');
			if (!self::$allTimesQuery)
				die("\$allTimesQuery preparation failed due to: {$this -> conn -> error}\n");
		}

		/*
			Must convert booleans to integer since prepared
			statements don't handle the former. Moreover,
			'b' in types string stands for 'blob'.
		*/
		return $this -> conn -> prepQuery(MySQLConn::NUMERIC, null,
				self::$allTimesQuery, (int) $reduced, (int) $displayDays);
	}

}
