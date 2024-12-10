-- create table tbl_position(
--     id bigint unsigned auto_increment primary key ,
--     member_id bigint unsigned not null,
--     notice_id bigint unsigned not null,
--     position_status varchar(255) default '이수 예정',
--     constraint fk_position_member foreign key (member_id)
--                          references tbl_member(id),
--     constraint fk_position_notice foreign key (notice_id)
--         references tbl_notice(id)
--
-- );
--
-- select * from tbl_position;

# create table tbl_position(
#      id bigint unsigned auto_increment primary key ,
#      member_id bigint unsigned not null,
#      notice_id bigint unsigned not null,
#      position_status varchar(255) default '이수 예정',
#      constraint fk_position_member foreign key (member_id)
#                           references tbl_member(id),
#      constraint fk_position_notice foreign key (notice_id)
#          references tbl_notice(id)
#  );
#
# select * from tbl_position;
#
# SET FOREIGN_KEY_CHECKS = 0;
#
# truncate table tbl_position;

# SET FOREIGN_KEY_CHECKS = 1;
#
# select c.corporation_name, n.notice_work_start_date, n.notice_title, m.member_name, m.member_phone, n.notice_job_category_name, p.position_status
# from tbl_position p
#          join tbl_notice n on p.notice_id = n.id
#          join tbl_corporation c on n.corporation_id = c.id
#          join tbl_member m on p.member_id = m.id