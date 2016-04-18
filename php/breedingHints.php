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

	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.min.css" />
	<link rel="stylesheet" type="text/css" href="../util/css/footer.css" />
	<link rel="stylesheet" type="text/css" href="./css/breedingHint.css" />

	<script charset="UTF-8" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.4.2/chosen.jquery.min.js"></script>
	<script charset="UTF-8" type="text/javascript" src="https://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js"></script>
	<script charset="UTF-8" type="text/javascript" src="./js/ajaxUpdate.js"></script>
	<script charset="UTF-8" type="text/javascript" src="./js/breedingHints.js"></script>
</head>

<body>
	<header>
		<h1>Breeding Hints</h1>
	</header>
	<main data-ng-app="breedingHints" data-ng-controller="breedingHintsCtrl">
		<label>Nome:
			<select name="id" data-ng-model="dragonId">
				<option value="0">Non specificato</option>
			<?php
				echo makeOptions(array_column($dragonvaleDB -> allNames(), 1, 0), true);
			?>
			</select>
		</label>
		<label>
			<input type="checkbox" data-ng-model="reduced">Tempi di incubazione ridotti
		</label>
		<label>
			<input type="checkbox" data-ng-model="displayDays">Visualizza i giorni nei tempi di incubazione
		</label>
		<div data-ng-repeat="hint in hints | limitTo : -10">
			<div>
				<div>hint.dragon</div>
				<div>=</div>
				<div>hint.parent1</div>
				<div>+</div>
				<div>hint.parent2</div>
			</div>
		</div>
	</main>
	<?php require 'dragonvaleFooter.php'; ?>
</body>

</html>
