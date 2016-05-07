<?php

require_once 'autoload.php';
require_once 'common.php';

$dragonvaleDB = DragonvaleDB::getInstance();

extract(filterInputArrayDie(INPUT_GET, [
	'request' => FILTER_DEFAULT,
	'reduced' => FILTER_VALIDATE_BOOLEAN,
	'displayDays' => FILTER_VALIDATE_BOOLEAN,
	'id' => FILTER_VALIDATE_INT,
	'time' => FILTER_DEFAULT,
	'elem1' => FILTER_VALIDATE_INT,
	'elem2' => FILTER_VALIDATE_INT,
	'elem3' => FILTER_VALIDATE_INT,
	'elem4' => FILTER_VALIDATE_INT,
	'parent1' => FILTER_VALIDATE_INT,
	'parent2' => FILTER_VALIDATE_INT,
	'page' => [
		'filter' => FILTER_VALIDATE_INT,
		'options' => [
			'min_range' => 1,
		]
	],
	'pageLength' => [
		'filter' => FILTER_VALIDATE_INT,
		'options' => [
			'min_range' => 0,
		]
	],
	'strictOrder' => FILTER_VALIDATE_BOOLEAN
], true));

switch ($request) {

	// Initialization request for dragon filters page
	case 'init':

		/*
			Fetching all different hatching times,
			binding standards ones to index 'value'
			and formatted ones to key 'text'.
		*/
		$result = array_columns($dragonvaleDB -> allTimes($reduced, $displayDays),
				[0, 1], ['value', 'text']);
		break;

	// Dragon filters request
	case 'dragons':
		$result = $dragonvaleDB -> getDragons((int) $id, (string) $time,
				(int) $elem1, (int) $elem2, (int) $elem3, (int) $elem4,
				(int) $parent1, (int) $parent2, (int) $pageLength,
				($page - 1) * $pageLength, (bool) $strictOrder,
				(bool) $reduced, (bool) $displayDays);
		break;

	/*
		Initialization request for breeding hints
		page: only id-names pairs are necessary.
	*/
	case 'breedInit':
		$result = $dragonvaleDB -> allNames();
		break;

	// Breeding hint request
	case 'breed':
		$result = $dragonvaleDB -> breedingHint((int) $id, (bool) $reduced,
				(bool) $displayDays);
		break;

	default:
		$result = "Errore nell'uso di AJAX";
		break;
}

header('Content-type: application/json');
echo json_encode($result);
