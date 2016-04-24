--
-- Database: `dragonvale`
--
CREATE DATABASE IF NOT EXISTS `dragonvale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dragonvale`;

DELIMITER $$
--
-- Procedures
--

/*
	Filters dragons with parameters.

	This procedure filters dragons with a too large amount of parameters:
	these include single dragon search, elements, hatching time and parents
	in breeding. Also, there are parameters to format hatching times, to
	limit the result number of rows and elements matching criteria.

	All filters are optional, each one having a range of values for whitch
	are considered invalid.

	Dragons' english name, hatching time and its elements english names
	are returned.

	@param _id Dragon id: a single row is returned, and all other filters are ignored. Only strictly positive values are significant.
	@param _time Hatching time. All invalid time strings are ignored.
	@param _elem1 First element, or just one of them when strictOrder is not set. All zero or less value are ignored.
	@param _elem2 Second element, or just one of them when strictOrder is not set. All zero or less value are ignored.
	@param _elem3 Third element, or just one of them when strictOrder is not set. All zero or less value are ignored.
	@param _elem4 Fourth element, or just one of them when strictOrder is not set. All zero or less value are ignored.
	@param _parent1 Id of one of the parents. Only strictly positive values are significant.
	@param _parent2 Id of one of the parents. Only strictly positive values are significant.
	@param rowsCount Maximum number of rows that will be fetched. Any non-positive values are overlooked.
	@param startRow Zero-based index of the first row that will be returned. Negative values not allowed.
	@param strictOrder When set, forces elements to be matched in order. Boolean-like int, always significant.
	@param reduced When set, hatching times will be reduced by 20%. Boolean-like int, always significant.
	@param displayDays When set, will display the number of days when there's at least one. Boolean-like int, always significant.
	@return For every dragon that matches the filters, english name, hatching time and elements english names
	are returned.
*/
DROP PROCEDURE IF EXISTS `getDragons`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDragons` (`_id` INT, `_time` TIME, `_elem1` INT, `_elem2` INT, `_elem3` INT, `_elem4` INT, `_parent1` INT, `_parent2` INT, `rowsCount` INT, `startRow` INT, `strictOrder` TINYINT, `reduced` TINYINT, `displayDays` TINYINT) READS SQL DATA
body: begin

	-- Both parents are valid, but can't breed or are opposites
	if _parent1 > 0 and _parent2 > 0 and (
			_parent1 not in (select cb.id from canBreed cb where cb.canBreed is true) or
			_parent2 not in (select cb.id from canBreed cb where cb.canBreed is true) or
			(_parent1 > 0 and _parent1 = getOppositeDragon(_parent2))
			) then
		select null;
		leave body;
	end if;

	-- Speeding up the query a lot and ignoring other filters
	if _id > 0 then
		create temporary table resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where d.id = _id;
	else

		-- Temporary table holding the current breeding pool
		create table breedingTypes as
		select bp.elem as elem
		from breedingPool bp
		where bp.dragonId in (_parent1, _parent2);

		create temporary table common.resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where ( -- Time and elements filters
					(time(_time) = '00:00:00' or d.time = _time)
				and
					case when strictOrder then
						(_elem1 < 1 or elem1 = _elem1) and
						(_elem2 < 1 or elem2 = _elem2) and
						(_elem3 < 1 or elem3 = _elem3) and
						(_elem4 < 1 or elem4 = _elem4)
					else
						(_elem1 < 1 or ifnull(_elem1 in (elem1, elem2, elem3, elem4), false)) and
						(_elem2 < 1 or ifnull(_elem2 in (elem1, elem2, elem3, elem4), false)) and
						(_elem3 < 1 or ifnull(_elem3 in (elem1, elem2, elem3, elem4), false)) and
						(_elem4 < 1 or ifnull(_elem4 in (elem1, elem2, elem3, elem4), false))
					end
			) and ( -- Parents filters
				(_parent1 < 1 and _parent2 < 1)
					or (
						-- First parent
						d.id = _parent1 and not isPrimary(_parent1)
					or
						-- Second parent
						d.id = _parent2 and not isPrimary(_parent2)
					or
						-- Motley
						d.id = 126
					or (
						-- Two parents
							d.parent1 is not null and d.parent2 is not null
						and
							(d.parent1, d.parent2) in ((_parent1, _parent2), (_parent2, _parent1))
					) or (
						-- Single parent + element
							d.parent1 is not null and d.parent2 is null
						and
							d.parent1 in (_parent1, _parent2)
						and /*
								When there is only one parent there's centainly
								at least one element required for breeding,
								and they are filled ascendantly
							*/
							d.elemBreed1 in (select * from breedingTypes)
						and (
							d.elemBreed2 is null or
							d.elemBreed2 in (select * from breedingTypes)
						) and (
							d.elemBreed3 is null or
							d.elemBreed3 in (select * from breedingTypes)
						) and (
							d.elemBreed4 is null or
							d.elemBreed4 in (select * from breedingTypes)
						)
					) or (
						-- Elements only (mostly epic)
							d.parent1 is null and d.parent2 is null
						and
							-- Elements required for breeding are filled ascendantly
							d.elemBreed1 is not null
						and
							d.elemBreed1 in (select * from breedingTypes)
						and /*
								No null check, since no parents required means at
								least two necessary elements, filled ascendantly
							*/
							d.elemBreed2 in (select * from breedingTypes)
						and (
							d.elemBreed3 is null or
							d.elemBreed3 in (select * from breedingTypes)
						) and (
							d.elemBreed4 is null or
							d.elemBreed4 in (select * from breedingTypes)
						) and (
							-- Dream (needs two additional elements other than light and dark)
								d.id <> 173
							or
								2 = (select count(distinct bt.elem)
									 from breedingTypes bt
									 where bt.elem not in (9, 10) -- Light and Dark ids
								)
						)
					) or (
						-- 4 different elements required
							d.id in (155, 166, 188, 213, 266, 268)
						and
							3 < (select count(distinct bt.elem) from breedingTypes bt)
					) or (
						-- Galaxy (parent + another galaxy or an epic)
							ifnull(22 in (d.elem1, d.elem2, d.elem3, d.elem4), false)
						and
							d.parent1 in (_parent1, _parent2)
						and (/*
								Twice the right Galaxy Dragon would count
								one row only in the following query, so checking
								if the parents are the same
							*/
							_parent1 = _parent2 or
							1 < (select count(*)
								 from breedingPool bp
									join elements e
										on bp.elem = e.id
								 where bp.dragonId in (_parent1, _parent2)
									and (e.id = 22 or e.isEpic is true))
						)
					) or (
						-- Snowflake and Monolith (both parents Snowflake/Monolith)
							d.elem1 in (20, 21) -- Snowflake and Monolith ids
						and /*
								Checking for elem1 allows the same query for
								both Snowflakes and Monolith
							*/
								d.elem1 in (select bp.elem
											from breedingPool bp
											where dragonId = _parent1)
							and
								d.elem1 in (select bp.elem
											from breedingPool bp
											where dragonId = _parent2)
					) or (
						-- Primary (itself or opposite + one of the opposites of primary type)
							isPrimary(d.id)
						and (
								d.id in (_parent1, _parent2) -- Itself
							or
								getOppositeDragon(d.id) in (_parent1, _parent2) -- Opposite

						/*
							Checking opposite having a type of the primary's
							being one of the parents. Can use breedingPool
							since both types of opposites are in it and it has
							all types in one column
						*/
						) and d.elem1 in (
							select bp.elem
							from dragons d1
								join breedingPool bp
									on d1.id = bp.dragonId
							where d1.id in (_parent1, _parent2) and
								(d1.elem1, d1.elem2) in (select e.id, e.opposite
														 from elements e
														 where e.opposite is not null)
						)
					) or (
						-- Basic breedign rule (dragon's elements in current breeding pool)

							/*
								Snowflake, Monolith and Aura all have no other means
								than direct checking to be set apart from basic breeding
							*/
							not isPrimary(d.id) and d.elem1 not in (20, 21, 25) -- Snowflake, Monolith and Aura ids
						and
							coalesce(d.parent1, d.parent2, d.elemBreed1, d.elemBreed2,
									d.elemBreed3, d.elemBreed4) is null
						and
							d.elem1 in (select * from breedingTypes)
						and (
							d.elem2 is null or
							d.elem2 in (select * from breedingTypes)
						) and (
							d.elem3 is null or
							d.elem3 in (select * from breedingTypes)
						) and (
							d.elem4 is null or
							d.elem4 in (select * from breedingTypes)
						)
					)
				)
			);
		drop table breedingTypes;
		call common.limitResultSet(rowsCount, startRow, 'en');
		alter table common.limitedResultSet rename resultSet;
	end if;

	-- Constructing a readable result
	select rs.en as name, e1.en as elem1, e2.en as elem2, e3.en as elem3,
		e4.en as elem4, formatTime(rs.time, reduced, displayDays) as `time`
	from resultSet rs
		join elements e1
			on rs.elem1 = e1.id
		left join elements e2
			on rs.elem2 = e2.id
		left join elements e3
			on rs.elem3 = e3.id
		left join elements e4
			on rs.elem4 = e4.id
	order by rs.en;
end body$$

/*
	Fetches the breeding hint for the selected dragon.

	This procedure returns breeding data for a dragon: these
	consist of basic dragon data (name, formatted hatching
	time and elements) plus any parents or elements required
	to breed it, and some additional notes when needed.
	Parents data are also fetched, if any.

	@param _id Id of the dragon whose breeding hint will be fetched.
	@param reduced When set, hatching times will be reduced by 20%. Boolean-like int.
	@param displayDays When set, will display the number of days when there's at least one. Boolean-like int.
	@return One row each for the requested dragon and its parents, if any. Every row has got: dragon id; english name, formatted hatching time; dragon elements; parents, optionally; breeding elements, when necessary; notes, as required. Both set of elements are a string of dash-separated english element names.
*/
DROP PROCEDURE IF EXISTS `breedingHint`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `breedingHint` (`_id` INT, `reduced` TINYINT, `displayDays` TINYINT) READS SQL DATA
begin
	select d.id, d.en as name, concat_ws('-', e1.en, e2.en, e3.en, e4.en) as elems,
			d.parent1, d.parent2, formatTime(d.time, reduced, displayDays) as time,

			/*
				To avoid returning an empty string instead
				of null when all breeding elements are not
				set, checking for first one to be so, since
				breed elements are filled ascendantly.
			*/
			case when d.elemBreed1 is not null then
				concat_ws('-', eb1.en, eb2.en, eb3.en, eb4.en)
			end as breedElems,
		case
			when -- Motley
				d.id = 126
			then
				'Any pair of dragons'

			when -- Dream
				d.id = 173
			then
				'Any other two elements'

			when -- 4 different elements
				d.id in (155, 166, 188, 213, 266, 268)
			then
				'Any four different elements'

			when -- Galaxy
				ifnull(22 in (d.elem1, d.elem2, d.elem3, d.elem4), false)
			then
				'Another Galaxy or epic'

			when -- Snowflake and Monolith
				d.elem1 in (20, 21)
			then
				concat_ws(' ', 'Any pair of', e1.en, 'dragons')
		end as notes
-- TODO: primaries
from dragons d
	join elements e1
		on d.elem1 = e1.id
	left join elements e2
		on d.elem2 = e2.id
	left join elements e3
		on d.elem3 = e3.id
	left join elements e4
		on d.elem4 = e4.id
	left join elements eb1
		on d.elemBreed1 = eb1.id
	left join elements eb2
		on d.elemBreed2 = eb2.id
	left join elements eb3
		on d.elemBreed3 = eb3.id
	left join elements eb4
		on d.elemBreed4 = eb4.id
where d.id = _id or
	ifnull(d.id in (select d1.parent1 from dragons d1 where d1.id = _id), false) or
	ifnull(d.id in (select d1.parent2 from dragons d1 where d1.id = _id), false);
end$$

--
-- Functions
--

/*
	Reduces passed time by 20% and displays days when
	exceeding 24 hours as specified.

	@param time The input time
	@param reduced When set, hatching times will be reduced by 20%. Boolean-like int.
	@param displayDays When set, will display the number of days when there's at least one. Boolean-like int.
	@return A time string, result of the specified transformations applied to time input.
*/
DROP FUNCTION IF EXISTS `formatTime`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `formatTime` (`time` TIME, `reduced` TINYINT, `displayDays` TINYINT) RETURNS VARCHAR(11) CHARSET utf8mb4 DETERMINISTIC begin

	/*
		Must use truncate because multiplying by a
		floating point returns another float
	*/
	set @time = case when reduced then sec_to_time(truncate(time_to_sec(time) * 0.8, 0)) else time end;
	return case when displayDays then
			concat_ws(':',
				case when hour(@time) > 23 then lpad(hour(@time) div 24, 2, '0') end,
				lpad(hour(@time) % 24, 2, '0'),
				right(@time, 5))
		else
			@time
		end;
end$$

/*
	Returns true when the passed dragon id
	is that of a primary dragon.

	@param id Id of the dragon which will be checked to be primary.
	@return true when the passed dragon id is that of a primary. Boolean-like int.
*/
DROP FUNCTION IF EXISTS `isPrimary`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `isPrimary` (`id` int) RETURNS tinyint(1)
	return (select d.elem1
			from dragons d
			where coalesce(d.elem2, d.elem3, d.elem4) is null -- One element only
				and d.id = id) not in (select e.id
									   from elements e
									   -- Neither epic nor Galaxy
									   where e1.isEpic is not true and e1.id <> 22)$$

/*
	Returns the id of the opposite dragon when the
	passed done is that of a primary, otherwise null.

	@param id Id of the dragon whose opposite will be returned.
	@return The id of the opposite dragon if the input one is a primary, null otherwise.
*/
DROP FUNCTION IF EXISTS `getOppositeDragon`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `getOppositeDragon` (`id` int) RETURNS int
	return case when isPrimary(id) then

			/*
				Every dragon is joined with all the other
				ones having as first element the opposite
				of its own first one: then only the row
				having the provided dragon and the primary
				of the opposite element are picked up
			*/
			(select opp.id
		     from dragons d
				join elements e1
					on d.elem1 = e1.id
				join dragons opp
					on opp.elem1 = e1.opposite
		     where d.id = id
				and isPrimary(opp.id))
	end$$
