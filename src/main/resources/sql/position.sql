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
#
# INSERT INTO tbl_position (member_id, notice_id, position_status) VALUES
#                                                                      (3, 38, '포지션 수료'),
#                                                                      (39, 35, '포지션 미수료'),
#                                                                      (33, 27, '포지션 수료'),
#                                                                      (44, 20, '포지션 예정'),
#                                                                      (17, 10, '포지션 예정'),
#                                                                      (24, 41, '포지션 수료'),
#                                                                      (1, 51, '포지션 예정'),
#                                                                      (48, 32, '포지션 예정'),
#                                                                      (14, 13, '포지션 미수료'),
#                                                                      (13, 33, '포지션 예정'),
#                                                                      (4, 61, '포지션 예정'),
#                                                                      (9, 43, '포지션 수료'),
#                                                                      (6, 15, '포지션 미수료'),
#                                                                      (35, 55, '포지션 예정'),
#                                                                      (22, 25, '포지션 미수료'),
#                                                                      (47, 16, '포지션 수료'),
#                                                                      (19, 49, '포지션 미수료'),
#                                                                      (23, 11, '포지션 예정'),
#                                                                      (30, 50, '포지션 미수료'),
#                                                                      (18, 28, '포지션 수료'),
#                                                                      (15, 60, '포지션 예정'),
#                                                                      (38, 34, '포지션 예정'),
#                                                                      (10, 63, '포지션 수료'),
#                                                                      (50, 64, '포지션 예정'),
#                                                                      (31, 62, '포지션 수료'),
#                                                                      (5, 48, '포지션 미수료'),
#                                                                      (8, 29, '포지션 예정'),
#                                                                      (40, 24, '포지션 수료'),
#                                                                      (32, 40, '포지션 예정'),
#                                                                      (28, 53, '포지션 미수료'),
#                                                                      (12, 46, '포지션 예정'),
#                                                                      (16, 52, '포지션 수료'),
#                                                                      (11, 26, '포지션 미수료'),
#                                                                      (36, 21, '포지션 예정'),
#                                                                      (20, 54, '포지션 수료'),
#                                                                      (45, 23, '포지션 예정'),
#                                                                      (34, 30, '포지션 미수료'),
#                                                                      (42, 12, '포지션 예정'),
#                                                                      (21, 19, '포지션 수료'),
#                                                                      (29, 59, '포지션 예정'),
#                                                                      (27, 56, '포지션 수료'),
#                                                                      (37, 57, '포지션 미수료'),
#                                                                      (25, 58, '포지션 예정'),
#                                                                      (49, 22, '포지션 미수료'),
#                                                                      (26, 36, '포지션 예정'),
#                                                                      (43, 45, '포지션 수료'),
#                                                                      (2, 37, '포지션 미수료'),
#                                                                      (7, 44, '포지션 예정');
#
# SET FOREIGN_KEY_CHECKS = 1;
#
# select c.corporation_name, n.notice_work_start_date, n.notice_title, m.member_name, m.member_phone, n.notice_job_category_name, p.position_status
# from tbl_position p
#          join tbl_notice n on p.notice_id = n.id
#          join tbl_corporation c on n.corporation_id = c.id
#          join tbl_member m on p.member_id = m.id