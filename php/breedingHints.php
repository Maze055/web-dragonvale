<!DOCTYPE html>

<html>

<head>
	<title>Breeding Hints - DragonSearch - A Dragonvale database</title>

	<meta charset="UTF-8" />
	<meta http-equiv="content-type" content="text/html" />
	<meta lang="it" name="application-name" content="Ottenere i draghi su Dragonvale" />
	<meta name="author" content="Davide Laezza" />
	<meta lang="it" name="desctiption" content="Ottenere informazioni su come si ottengono i vari draghi di Dragonvale" />

	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.css" />
	<link rel="stylesheet" type="text/css" href="../build/css/breedingHints.css" />

	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-sanitize.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-md5/0.1.10/angular-md5.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.0.0-beta.6/angular-moment.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="../build/js/breedingHints.js"></script>
</head>

<body>
	<?php require 'navBar.html'; ?>
	<header>
		<h1>Breeding Hints</h1>
	</header>
	<main ng-app="dragonSearch" ng-controller="BreedingHintsController as model">
		<form class="input">
			<div>
				<label for="name">Nome:</label>
				<ui-select id="name" class="ui-select" ng-model="model.dragon"
						ng-change="model.addHint()">
					<ui-select-match placeholder="Seleziona un drago">{{ $select.selected.name }}</ui-select-match>
					<ui-select-choices repeat="item in (model.names | filter :
							{name: $select.search} : model.startsWithCi)">
						{{ item.name }}
					</ui-select-choices>
				</ui-select>
				<time-tweak-box on-redu-change="model.setReduced(redu)"
								on-dd-change="model.setDisplayDays(dd)"
						></time-tweak-box>
			</div>
			<sequential-access-pager
					current-item="model.currentHint"
					page-length="model.pageLength"
					items-count="model.hints.length"
					on-item-change="model.setCurrentHint(newItem)"
					on-page-length-change="model.setPageLength(newLength)"
				></sequential-access-pager>
		</form>
		<section class="breeding-hints">
			<!-- Page load -->
			<span ng-if="!model.hints.length">Nessun drago selezionato</span>

			<div ng-repeat="hint in model.hints | circularLimitTo : model.pageLength : model.currentHint">
				<dragon-box dragon="hint"></dragon-box>
				<span>=</span>

				<!-- Parent1 -->
				<dragon-box ng-if="hint.parent1" dragon="hint.parent1"
						on-click="model.addHint(id)"></dragon-box>
				<span ng-if="hint.parent1">+</span>

				<!-- Parent2 -->
				<dragon-box ng-if="hint.parent2" dragon="hint.parent2"
						on-click="model.addHint(id)"></dragon-box>

				<!-- Elem breed -->
				<elem-box ng-repeat-start="elem in hint.breedElems"
						  name="elem"></elem-box>
				<span ng-if="!$last || hint.notes" ng-repeat-end>+</span>

				<!-- Basic breeding rule -->
				<elem-box ng-if="model.isBasicBreedingRule(hint)" name="elem"
						  ng-repeat-start="elem in hint.elems"></elem-box>
				<span ng-if="model.isBasicBreedingRule(hint) && !$last" ng-repeat-end>+</span>

				<!-- Notes -->
				<span ng-if="hint.notes" class="note">{{ hint.notes }}</span>

			</div>
		</section>
	</main>
	<?php require 'dragonvaleFooter.php'; ?>
</body>

</html>
