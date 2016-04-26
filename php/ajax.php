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

	case 'breedInit':
		$result = array_columns($dragonvaleDB -> allNames(), [0, 1], ['id', 'name']);
		break;

	case 'breed':
		$breedData = $dragonvaleDB -> breedingHint((int) $id, (bool) $reduced,
				(bool) $displayDays);
		foreach ($breedData as &$dragon) {
			$dragon['elems'] = explode('-', $dragon['elems']);

			if (isset($dragon['breedElems']))
				$dragon['breedElems'] = explode('-', $dragon['breedElems']);
		};

		$ids = array_column($breedData, 'id');
		$result['outcome'] = $breedData[array_search($id, $ids)];
		$result['parent1'] = $breedData[array_search($result['outcome']['parent1'], $ids)];
		$result['parent2'] = $breedData[array_search($result['outcome']['parent2'], $ids)];
		unset($result['outcome']['parent1'], $result['outcome']['parent2'],
				$result['parent1']['parent1'], $result['parent1']['parent2'],
				$result['parent2']['parent1'], $result['parent2']['parent2']);
		break;

	default:
		$result = "Errore nell'uso di AJAX";
		break;
}

header('Content-type: application/json');
echo json_encode($result);
