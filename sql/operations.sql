--
-- Database: `dragonvale`
--
CREATE DATABASE IF NOT EXISTS `dragonvale` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dragonvale`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `getDragons`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDragons` (`_id` INT, `_time` TIME, `_elem1` INT, `_elem2` INT, `_elem3` INT, `_elem4` INT, `_parent1` INT, `_parent2` INT, `rowsCount` INT, `startRow` INT, `strictOrder` INT, `reduced` INT, `displayDays` INT) READS SQL DATA
body: begin
	if _parent1 not in (select cb.id from canBreed cb where cb.canBreed is true)
			or _parent2 not in (select cb.id from canBreed cb where cb.canBreed is true)
			or (_parent1 > 0 and _parent1 = getOppositeDragon(_parent2)) then
		select null;
		leave body;
	end if;

	if _id > 0 then
		create temporary table resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where _id = d.id;
	else
		if _parent1 > 0 or _parent2 > 0 then
			create table breedingTypes as
			select bp.elem
			from breedingPool bp
			where bp.dragonId in (_parent1, _parent2);
		end if;

		create temporary table common.resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where ( -- Time and elements filters
					(time(_time) = '00:00:00' or _time = d.time)
				and
					if (strictOrder,
						(_elem1 < 1 or elem1 = _elem1) and
						(_elem2 < 1 or elem2 = _elem2) and
						(_elem3 < 1 or elem3 = _elem3) and
						(_elem4 < 1 or elem4 = _elem4)
					,
						(_elem1 < 1 or ifnull(_elem1 in (elem1, elem2, elem3, elem4), false)) and
						(_elem2 < 1 or ifnull(_elem2 in (elem1, elem2, elem3, elem4), false)) and
						(_elem3 < 1 or ifnull(_elem3 in (elem1, elem2, elem3, elem4), false)) and
						(_elem4 < 1 or ifnull(_elem4 in (elem1, elem2, elem3, elem4), false))
					)
			) and ( -- Parents filters
				(_parent1 < 1 and _parent2 < 1) or (
						d.id = _parent1 and not isPrimary(_parent1) -- First parent
					or
						d.id = _parent2 and not isPrimary(_parent2) -- Second parent
					or
						d.id = 126 -- Motley
					or ( -- Two parents
							d.parent1 is not null and d.parent2 is not null
						and
							(d.parent1, d.parent2) in ((_parent1, _parent2), (_parent2, _parent1))
					) or ( -- Single parent + element
							d.parent1 is not null and d.parent2 is null
						and
							d.parent1 in (_parent1, _parent2)
						and
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
					) or ( -- Elements only (mostly epic)
							d.parent1 is null and d.parent2 is null
						and
							d.elemBreed1 is not null
						and
							d.elemBreed1 in (select * from breedingTypes)
						and -- no null check, it's sensless to require no parents and only one element
							d.elemBreed2 in (select * from breedingTypes)
						and (
							d.elemBreed3 is null or
							d.elemBreed3 in (select * from breedingTypes)
						) and (
							d.elemBreed4 is null or
							d.elemBreed4 in (select * from breedingTypes)
						) and ( -- Dream (needs two additional elements other than light and dark)
								d.id <> 173
							or
								2 = (select count(distinct bp.elem)
									 from breedingPool bp
									 where bp.dragonId in (_parent1, _parent2)
										and bp.elem not in (9, 10)
								)
						)
					) or ( -- 4 different elements
							d.id in (155, 166, 188, 213, 266, 268)
						and
							3 < (select count(distinct bp.elem)
								 from breedingPool bp
								 where bp.dragonId in (_parent1, _parent2))
					) or ( -- Galaxy
							ifnull(22 in (d.elem1, d.elem2, d.elem3, d.elem4), false)
						and
							d.parent1 in (_parent1, _parent2)
						and (
							-- Twice the right Galaxy Dragon would count
							-- one row only in the following query
							_parent1 = _parent2 or
							1 < (select count(*)
								 from breedingPool bp
									join elements e
										on bp.elem = e.id
								 where bp.dragonId in (_parent1, _parent2)
									and (e.id = 22 or e.isEpic is true))
						)
					) or ( -- Primary
							isPrimary(d.id)
						and (
								d.id in (_parent1, _parent2)
							or
								getOppositeDragon(d.id) in (_parent1, _parent2)
						) and (
								select group_concat(concat('-', d1.elem1, '-', d1.elem2, '-'))
								from dragons d1
								where d1.id in (_parent1, _parent2) and
									(d1.elem1, d1.elem2) in (select e.id, e.opposite
															 from elements e
															 where e.opposite is not null)
							) like concat('%-', d.elem1, '-%')
					) or ( -- Basic breedign rule
							not isPrimary(d.id)
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
		drop table if exists breedingTypes;
		call common.limitResultSet(rowsCount, startRow, 'en');
		alter table common.limitedResultSet rename resultSet;
	end if;
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

--
-- Functions
--
DROP FUNCTION IF EXISTS `formatTime`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `formatTime` (`time` TIME, `reduced` TINYINT, `displayDays` TINYINT) RETURNS VARCHAR(11) CHARSET utf8mb4 DETERMINISTIC begin
	set @time = if(reduced, sec_to_time(truncate(time_to_sec(time) * 0.8, 0)), time);
	return if (displayDays,
			concat_ws(':',
				if (hour(@time) < 24, null, lpad(hour(@time) div 24, 2, '0')),
				lpad(hour(@time) % 24, 2, '0'),
				right(@time, 5)
			),
			@time
		);
end$$

DROP FUNCTION IF EXISTS `isPrimary`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `isPrimary` (`id` int) RETURNS tinyint(1)
	return exists (select *
				   from dragons d
						join elements e1
							on d.elem1 = e1.id
				   where d.id = id
						and e1.isEpic is not true and e1.id <> 22
						and coalesce(d.elem2, d.elem3, d.elem4) is null)$$

DROP FUNCTION IF EXISTS `getOppositeDragon`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `getOppositeDragon` (`id` int) RETURNS int
	return if (not isPrimary(id), null,
			(select opp.id
		     from dragons d
				join elements e1
					on d.elem1 = e1.id
				join dragons opp
					on opp.elem1 = e1.opposite
		     where d.id = id
				and isPrimary(opp.id))
	)$$
