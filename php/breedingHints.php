<?php

require_once 'autoload.php';
require_once 'common.php';

$dragonvaleDB = DragonvaleDB::getInstance();

?>

<!DOCTYPE html>

<html>

<head>
	<title>Breeding Hints - DragonSearch - A Dragonvale database</title>

	<meta charset="UTF-8" />
	<meta http-equiv="content-type" content="text/html" />
	<meta lang="it" name="application-name" content="Ottenere i draghi su Dragonvale" />
	<meta name="author" content="Davide Laezza" />
	<meta lang="it" name="desctiption" content="Ottenere informazioni su come si ottengono i vari draghi di Dragonvale" />

<!--	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/ajaxUpdate.js"></script>-->

	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-sanitize.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-md5/0.1.10/angular-md5.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/dragonSearch.module.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/dragonSearch.config.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/dragonSearch.breeding.hints.controller.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/dragonSearch.images.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../js/dragonSearch.dragon.box.js"></script>

	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.css" />
	<link rel="stylesheet" type="text/css" href="../css/breedingHints.css" />
</head>

<body>
	<header>
		<h1>Breeding Hints</h1>
	</header>
	<main data-ng-app="dragonSearch" data-ng-controller="BreedingHintsController as model">
		<label>Nome:
			<ui-select class="ui-select" data-ng-model="model.dragon"\
					data-ng-change="model.requestHint()">
				<ui-select-match>{{ $select.selected.name }}</ui-select-match>
				<ui-select-choices data-repeat="item in (model.names | filter :
						{name: $select.search} : model.startsWith)">
					{{ item.name }}
				</ui-select-choices>
			</ui-select>
		</label>
		<label>
			<input type="checkbox" data-ng-model="model.reduced">Tempi di incubazione ridotti
		</label>
		<label>
			<input type="checkbox" data-ng-model="model.displayDays">Visualizza i giorni nei tempi di incubazione
		</label>
		<div>
			<div data-ng-repeat="hint in model.hints | limitTo : 10">
				<dragon-box data-dragon="hint.outcome" />
<!--				<div>=</div>
				<hint-box data-data="hint.parent1 || hint.elems || hint.notes"></hint-box>
				<div>+</div>
				<hint-box data-data="hint.parent2 || hint.elems || hint.notes"></hint-box>-->
			</div>
		</div>
	</main>
	<?php require 'dragonvaleFooter.php'; ?>
</body>

</html>
