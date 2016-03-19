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
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDragons` (`_id` INT, `_time` TIME, `_elem1` INT, `_elem2` INT, `_elem3` INT, `_elem4` INT, `_parent1` INT, `_parent2` INT, `rowsCount` INT, `startRow` INT, `strictOrder` INT, `reduced` INT, `displayDays` INT)  READS SQL DATA
begin
	if _id > 0 then
		create temporary table resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where _id = d.id;
	else
		create temporary table common.resultSet as
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where ((_parent1 < 1 and _parent2 < 1) or ( 				d.id = 126 or 				( 					d.parent1 is not null and d.parent2 is not null and
					(_parent1, _parent2) in ((d.parent1, d.parent2), (d.parent2, d.parent1))
				) or ( 					d.parent1 is not null and d.parent2 is null and
					d.parent1 in (_parent1, _parent2) and
					(d.elemBreed1 is not null) + (d.elemBreed2 is not null) +
							(d.elemBreed3 is not null) + (d.elemBreed4 is not null) = (
						select count(distinct bp.elem)
						from breedingPool bp
						where bp.dragonId in (_parent1, _parent2)
							and bp.elem in (d.elemBreed1, d.elemBreed2,
									d.elemBreed3, d.elemBreed4)
					) and ( 						(d.elem1, d.elem2) not in (select e.id, e.opposite
												   from elements e
												   where e.opposite is not null) or
						2 < (select count(distinct bp.elem)
							 from breedingPool bp
							 where bp.dragonId in (_parent1, _parent2)
						)
					)
				) or ( 					coalesce(d.parent1, d.parent2) is null and
					coalesce(d.elemBreed1, d.elemBreed2, d.elemBreed3, d.elemBreed4) is not null and
					(d.elemBreed1 is not null) + (d.elemBreed2 is not null) +
							(d.elemBreed3 is not null) + (d.elemBreed4 is not null) = (
						select count(distinct bp.elem)
						from breedingPool bp
						where bp.dragonId in (_parent1, _parent2)
							and bp.elem in (d.elemBreed1, d.elemBreed2,
									d.elemBreed3, d.elemBreed4)
					) and ( 						d.id <> 173 or
						2 = (select count(distinct bp.elem)
							 from breedingPool bp
							 where bp.dragonId in (_parent1, _parent2)
								and bp.elem not in (9, 10)
						)
					)
				) or ( 					d.id in (155, 166, 188, 213, 266, 268) and
					3 < (select count(distinct bp.elem)
						 from breedingPool bp
						 where bp.dragonId in (_parent1, _parent2))
				) or ( 					22 in (d.elem1, d.elem2, d.elem3, d.elem4) and d.id in (_parent1, _parent2) and
					1 < (select count(*)
							from breedingPool bp
								join elements e
									on bp.elem = e.id
							where bp.dragonId in (_parent1, _parent2)
								and (e.id = 22 or e.isEpic is true)
					)
				) or ( 					(d.elem1 <> coalesce(d.elem2, d.elem3, d.elem4, d.elem1) or 							d.elem1 in (select e.id
										from elements e
										where e.isEpic is true or e.id = 22)
					) and coalesce(d.parent1, d.parent2, d.elemBreed1, d.elemBreed2,
							d.elemBreed3, d.elemBreed4) is null and
					1 + (d.elem2 is not null) + (d.elem3 is not null) + (d.elem4 is not null) = (
						select count(distinct bp.elem)
						from breedingPool bp
						where bp.dragonId in (_parent1, _parent2)
							and bp.elem in (d.elem1, d.elem2, d.elem3, d.elem4)
					)
				)));
		if (select count(*) from common.resultSet rs) < 2 then
			insert into common.resultSet
			select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
			from dragons d
			where d.id in (_parent1, _parent2);
		end if;
		delete
		from common.resultSet
		where (time(_time) <> '00:00:00' and _time <> `time`) or
			if(strictOrder,
				(_elem1 > 0 and elem1 <> _elem1) or
				(_elem2 > 0 and elem2 <> _elem2) or
				(_elem3 > 0 and elem3 <> _elem3) or
				(_elem4 > 0 and elem4 <> _elem4)
			,
				(_elem1 > 0 and ifnull(_elem1 not in (elem1, elem2, elem3, elem4), true)) or
				(_elem2 > 0 and ifnull(_elem2 not in (elem1, elem2, elem3, elem4), true)) or
				(_elem3 > 0 and ifnull(_elem3 not in (elem1, elem2, elem3, elem4), true)) or
				(_elem4 > 0 and ifnull(_elem4 not in (elem1, elem2, elem3, elem4), true))
			);
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
end$$

--
-- Functions
--
DROP FUNCTION IF EXISTS `formatTime`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `formatTime` (`time` TIME, `reduced` TINYINT, `displayDays` TINYINT) RETURNS VARCHAR(11) CHARSET utf8mb4 begin
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