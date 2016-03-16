drop procedure if exists getDragons;
delimiter $$
create procedure getDragons(id int, `time` time, elem1 int, elem2 int, elem3 int, elem4 int,
		parent1 int, parent2 int, rowsCount int, startRow int, strictOrder int, reduced int,
		displayDays int)
	reads sql data
	sql security invoker
begin
	create temporary table common.resultSet as
	select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
	from dragons d
	where id > 0 and id = d.id or ( -- Normal filters stuff
			(time(time) = '00:00:00' or time = d.time) and (
				if (strictOrder,
					(elem1 < 1 or d.elem1 = elem1) and
					(elem2 < 1 or d.elem2 = elem2) and
					(elem3 < 1 or d.elem3 = elem3) and
					(elem4 < 1 or d.elem4 = elem4)
				,
					(elem1 < 1 or elem1 in (d.elem1, d.elem2, d.elem3, d.elem4)) and
					(elem2 < 1 or elem2 in (d.elem1, d.elem2, d.elem3, d.elem4)) and
					(elem3 < 1 or elem3 in (d.elem1, d.elem2, d.elem3, d.elem4)) and
					(elem4 < 1 or elem4 in (d.elem1, d.elem2, d.elem3, d.elem4))
				)
			)
		and ((parent1 < 1 and parent2 < 1) or ( -- Parent filters stuff
			( -- Both parents
				d.parent1 is not null and d.parent2 is not null and
				(parent1, parent2) in ((d.parent1, d.parent2), (d.parent2, d.parent1))
			) or ( -- Single parent with elements
				d.parent1 is not null and d.parent2 is null and
				d.parent1 in (parent1, parent2) and
				(d.elemBreed1 is not null) + (d.elemBreed2 is not null) +
						(d.elemBreed3 is not null) + (d.elemBreed4 is not null) = (
					select count(distinct bp.elem)
					from breedingPool bp
					where bp.dragonId in (parent1, parent2)
						and bp.elem in (d.elemBreed1, d.elemBreed2,
								d.elemBreed3, d.elemBreed4)
				) and ( -- Opposites
					(d.elem1, d.elem2) not in (select e.id, e.opposite
											   from elements e
											   where e.opposite is not null) or
					2 < (select count(distinct bp.elem)
						 from breedingPool bp
						 where bp.dragonId in (parent1, parent2)
					)
				)
			) or ( -- Elements
				coalesce(d.parent1, d.parent2) is null and
				coalesce(d.elemBreed1, d.elemBreed2, d.elemBreed3, d.elemBreed4) is not null and
				(d.elemBreed1 is not null) + (d.elemBreed2 is not null) +
						(d.elemBreed3 is not null) + (d.elemBreed4 is not null) = (
					select count(distinct bp.elem)
					from breedingPool bp
					where bp.dragonId in (parent1, parent2)
						and bp.elem in (d.elemBreed1, d.elemBreed2,
								d.elemBreed3, d.elemBreed4)
				) and ( -- Dream
					d.id <> 173 or
					2 = (select count(distinct bp.elem)
						 from breedingPool bp
						 where bp.dragonId in (parent1, parent2)
							and bp.elem not in (9, 10)
					)
				)
			) or ( -- 4 Different Elements
				d.id in (155, 166, 188, 213, 266, 268) and
				3 < (select count(distinct bp.elem)
					 from breedingPool bp
					 where bp.dragonId in (parent1, parent2))
			) or ( -- Galaxy
				22 in (d.elem1, d.elem2, d.elem3, d.elem4) and d.id in (parent1, parent2) and
				1 < (select count(*)
						from breedingPool bp
							join elements e
								on bp.elem = e.id
						where bp.dragonId in (parent1, parent2)
							and (e.id = 22 or e.isEpic is true)
				)
			) or ( -- Anything else
				(d.elem1 <> coalesce(d.elem2, d.elem3, d.elem4, d.elem1) or -- Not primary
						d.elem1 in (select e.id
									from elements e
									where e.isEpic is true or e.id = 22)
				) and coalesce(d.parent1, d.parent2, d.elemBreed1, d.elemBreed2,
						d.elemBreed3, d.elemBreed4) is null and
				1 + (d.elem2 is not null) + (d.elem3 is not null) + (d.elem4 is not null) = (
					select count(distinct bp.elem)
					from breedingPool bp
					where bp.dragonId in (parent1, parent2)
						and bp.elem in (d.elem1, d.elem2, d.elem3, d.elem4)
				)
			))));
	if (select count(*) from common.resultSet rs) <= 1 then
		insert into common.resultSet
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where d.id in (parent1, parent2);
	end if;
	if 126 not in (select rs.id from common.resultSet rs) then
		insert into common.resultSet -- Motley
		select d.id, d.en, d.time, d.elem1, d.elem2, d.elem3, d.elem4
		from dragons d
		where d.id = 126;
	end if;
	call common.limitResultSet(rowsCount, startRow, 'en');
	alter table common.limitedResultSet rename resultSet;
	select rs.en as name, e1.en as elem1, e2.en as elem2, e3.en as elem3, e4.en as elem4,
		if (reduced and displayDays, concat_ws(':',
				if (hour(sec_to_time(truncate(time_to_sec(rs.time) * 0.8, 0))) < 24,
						null, lpad(hour(sec_to_time(truncate(time_to_sec(rs.time) * 0.8, 0)))
								div 24, 2, '0')),
				lpad(hour(sec_to_time(truncate(time_to_sec(rs.time) * 0.8, 0))) % 24, 2, '0'),
				right(sec_to_time(truncate(time_to_sec(rs.time) * 0.8, 0)), 5)),
		if (reduced, sec_to_time(truncate(time_to_sec(rs.time) * 0.8, 0)),
		if (displayDays, concat_ws(':',
				if (hour(rs.time) < 24, null, lpad(hour(rs.time) div 24, 2, '0')),
			    lpad(hour(rs.time) % 24, 2, '0'),
				right(rs.time, 5)),
		rs.time))) as time
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

create or replace view canBreed(id, canBreed) as
select d.id, e1.canBreed is true and
		(e2.canBreed is null or e2.canBreed is true) and
		(e3.canBreed is null or e3.canBreed is true) and
		(e4.canBreed is null or e4.canBreed is true) as canBreed
from dragons d
	join elements e1
		on d.elem1 = e1.id
	left join elements e2
		on d.elem2 = e2.id
	left join elements e3
		on d.elem3 = e3.id
	left join elements e4
		on d.elem4 = e4.id$$

create or replace view breedingPool(dragonId, elem) as
select id, elem1
from dragons
where id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elem2
from dragons
where elem2 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elem3
from dragons
where elem3 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elem4
from dragons
where elem4 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elemBreed1
from dragons
where elemBreed1 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elemBreed2
from dragons
where elemBreed2 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select id, elemBreed3
from dragons
where elemBreed3 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
	and id <> 156 -- Cyclops
union
select id, elemBreed4
from dragons
where elemBreed4 is not null
	and id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem1
from dragons d
	join dragons p
		on d.parent1 = p.id
where d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem2
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem2 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem3
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem3 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem4
from dragons d
	join dragons p
		on d.parent1 = p.id
where p.elem4 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem1
from dragons d
	join dragons p
		on d.parent2 = p.id
where d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem2
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem2 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem3
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem3 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id, p.elem4
from dragons d
	join dragons p
		on d.parent2 = p.id
where p.elem4 is not null
	and d.id in (select cb.id from canBreed cb where cb.canBreed is true)
union
select d.id as dragonId, e.id as elem
from dragons d
	join elements e
where d.id in (155, 166, 188, 213, 173)
		and e.isEpic is false and e.canBreed is true
union
select 177, 4 union select 177, 6 union select 177, 7 -- Snowflake 1
union
select 178, 4 union select 178, 5 union select 178, 6 -- Snowflake 2
union
select 179, 2 union select 179, 4 union select 179, 6 -- Snowflake 3
union
select 180, 4 union select 180, 6 union select 180, 9 -- Snowflake 4
union
select 181, 1 union select 181, 4 union select 181, 6 -- Snowflake 5
union
select 182, 1 union select 182, 3 union select 182, 6 -- Monolith 1
union
select 183, 2 union select 183, 3 union select 183, 6 -- Monolith 2
union
select 184, 3 union select 184, 4 union select 184, 6 -- Monolith 3
union
select 185, 3 union select 185, 5 union select 185, 6 -- Monolith 4
union
select 186, 3 union select 186, 6 union select 186, 7 -- Monolith 5
union
select 245, 2 union select 245, 3 union select 245, 5 union select 245, 9 -- Antarian
union
select 246, 2 union select 246, 3 union select 246, 7 union select 246, 10 -- Arcturian
union
select 247, 4 union select 247, 5 union select 247, 7 union select 247, 10 -- Bizurian
union
select 248, 4 union select 248, 6 union select 248, 7 union select 248, 9 -- Polarian
union
select 249, 1 union select 249, 6 union select 249, 8 union select 249, 9 -- Sorarian
union
select 250, 1 union select 250, 2 union select 250, 3 union select 250, 4 -- Andromedan
union
select 251, 1 union select 251, 5 union select 251, 6 union select 251, 8 -- Procyon
union
select 252, 2 union select 252, 3 union select 252, 4 union select 252, 8 -- Comet
union
select 253, 1 union select 253, 3 union select 253, 4 union select 253, 9 -- Eridanian
$$