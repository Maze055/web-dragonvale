<?php

require_once 'autoload.php';
require_once 'common.php';

$dragonvaleDB = DragonvaleDB::getInstance();

extract($_GET);

switch ($request) {
	case 'init':

		/*
			Fetching all different hatching times,
			binding standards ones to index 'value'
			and formatted ones to key 'text'.
		*/
		$result = array_columns($dragonvaleDB -> allTimes($reduced, $displayDays),
				[0, 1], ['value', 'text']);
		break;

	case 'dragons':
		$result = $dragonvaleDB -> getDragons((int) $id, (string) $time,
				(int) $elem1, (int) $elem2, (int) $elem3, (int) $elem4,
				(int) $parent1, (int) $parent2, (int) $pageLength,
				($page - 1) * $pageLength, (bool) $strictOrder,
				(bool) $reduced, (bool) $displayDays);
		break;

	default:
		$result = "Errore nell'uso di AJAX";
		break;
}

header('Content-type: application/json');
echo json_encode($result);
