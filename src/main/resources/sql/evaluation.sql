create table tbl_evaluation (
    id bigint unsigned auto_increment primary key,  # 기본 키
    evaluation_overall varchar(255),                # 전반적 평가
    evaluation_difficulty varchar(255),             # 난이도
    evaluation_result varchar(255) default '수료'  # 결과 (기본값: 수료)
);

select * from tbl_evaluation;

alter table tbl_evaluation
add column member_id bigint unsigned not null,
add constraint fk_evaluation_member foreign key (member_id) references tbl_member(id) on delete cascade;

alter table tbl_evaluation
add column created_date datetime default current_timestamp,
add column updated_date datetime default current_timestamp on update current_timestamp;

# 긍정적 보통 부정적
# 쉬움 보통 어려움

INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (46, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (19, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (18, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (41, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (55, '긍정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (58, '보통', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (29, '긍정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (58, '보통', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (47, '긍정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (38, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (28, '부정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (43, '긍정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (24, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (25, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (28, '긍정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (55, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (13, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (18, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (28, '보통', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (9, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (64, '긍정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (26, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (42, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (8, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (42, '부정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (47, '보통', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (44, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (26, '부정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (43, '긍정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (39, '부정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (30, '긍정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (62, '부정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (19, '부정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (19, '보통', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (21, '보통', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (27, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (59, '보통', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (9, '보통', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (1, '보통', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (46, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (10, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (54, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (46, '부정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (55, '긍정적', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (18, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (58, '보통', '쉬움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (33, '부정적', '어려움', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (1, '부정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (14, '부정적', '보통', '수료');
INSERT INTO tbl_evaluation (member_id, evaluation_overall, evaluation_difficulty, evaluation_result) VALUES (47, '부정적', '어려움', '수료');

UPDATE tbl_evaluation SET created_date = '2024-11-19 23:45:45', updated_date = '2024-11-19 23:45:45' WHERE id = 1;
UPDATE tbl_evaluation SET created_date = '2024-11-23 19:13:45', updated_date = '2024-11-23 19:13:45' WHERE id = 2;
UPDATE tbl_evaluation SET created_date = '2024-11-21 12:10:45', updated_date = '2024-11-21 12:10:45' WHERE id = 3;
UPDATE tbl_evaluation SET created_date = '2024-11-17 18:34:45', updated_date = '2024-11-17 18:34:45' WHERE id = 4;
UPDATE tbl_evaluation SET created_date = '2024-11-22 20:20:45', updated_date = '2024-11-22 20:20:45' WHERE id = 5;
UPDATE tbl_evaluation SET created_date = '2024-11-30 06:16:45', updated_date = '2024-11-30 06:16:45' WHERE id = 6;
UPDATE tbl_evaluation SET created_date = '2024-11-16 15:44:45', updated_date = '2024-11-16 15:44:45' WHERE id = 7;
UPDATE tbl_evaluation SET created_date = '2024-11-07 14:57:45', updated_date = '2024-11-07 14:57:45' WHERE id = 8;
UPDATE tbl_evaluation SET created_date = '2024-11-27 17:51:45', updated_date = '2024-11-27 17:51:45' WHERE id = 9;
UPDATE tbl_evaluation SET created_date = '2024-11-24 06:53:45', updated_date = '2024-11-24 06:53:45' WHERE id = 10;
UPDATE tbl_evaluation SET created_date = '2024-11-08 08:50:45', updated_date = '2024-11-08 08:50:45' WHERE id = 11;
UPDATE tbl_evaluation SET created_date = '2024-11-21 20:45:45', updated_date = '2024-11-21 20:45:45' WHERE id = 12;
UPDATE tbl_evaluation SET created_date = '2024-12-03 08:55:45', updated_date = '2024-12-03 08:55:45' WHERE id = 13;
UPDATE tbl_evaluation SET created_date = '2024-11-20 08:45:45', updated_date = '2024-11-20 08:45:45' WHERE id = 14;
UPDATE tbl_evaluation SET created_date = '2024-11-27 19:49:45', updated_date = '2024-11-27 19:49:45' WHERE id = 15;
UPDATE tbl_evaluation SET created_date = '2024-11-09 11:00:45', updated_date = '2024-11-09 11:00:45' WHERE id = 16;
UPDATE tbl_evaluation SET created_date = '2024-11-26 19:48:45', updated_date = '2024-11-26 19:48:45' WHERE id = 17;
UPDATE tbl_evaluation SET created_date = '2024-11-23 01:20:45', updated_date = '2024-11-23 01:20:45' WHERE id = 18;
UPDATE tbl_evaluation SET created_date = '2024-11-07 05:21:45', updated_date = '2024-11-07 05:21:45' WHERE id = 19;
UPDATE tbl_evaluation SET created_date = '2024-11-07 20:20:45', updated_date = '2024-11-07 20:20:45' WHERE id = 20;
UPDATE tbl_evaluation SET created_date = '2024-11-09 14:52:45', updated_date = '2024-11-09 14:52:45' WHERE id = 21;
UPDATE tbl_evaluation SET created_date = '2024-12-03 06:00:45', updated_date = '2024-12-03 06:00:45' WHERE id = 22;
UPDATE tbl_evaluation SET created_date = '2024-11-16 14:40:45', updated_date = '2024-11-16 14:40:45' WHERE id = 23;
UPDATE tbl_evaluation SET created_date = '2024-11-13 19:27:45', updated_date = '2024-11-13 19:27:45' WHERE id = 24;
UPDATE tbl_evaluation SET created_date = '2024-11-10 13:38:45', updated_date = '2024-11-10 13:38:45' WHERE id = 25;
UPDATE tbl_evaluation SET created_date = '2024-11-20 00:07:45', updated_date = '2024-11-20 00:07:45' WHERE id = 26;
UPDATE tbl_evaluation SET created_date = '2024-11-06 23:07:45', updated_date = '2024-11-06 23:07:45' WHERE id = 27;
UPDATE tbl_evaluation SET created_date = '2024-11-25 00:09:45', updated_date = '2024-11-25 00:09:45' WHERE id = 28;
UPDATE tbl_evaluation SET created_date = '2024-11-19 02:55:45', updated_date = '2024-11-19 02:55:45' WHERE id = 29;
UPDATE tbl_evaluation SET created_date = '2024-11-28 01:32:45', updated_date = '2024-11-28 01:32:45' WHERE id = 30;
UPDATE tbl_evaluation SET created_date = '2024-11-26 16:22:45', updated_date = '2024-11-26 16:22:45' WHERE id = 31;
UPDATE tbl_evaluation SET created_date = '2024-11-12 01:28:45', updated_date = '2024-11-12 01:28:45' WHERE id = 32;
UPDATE tbl_evaluation SET created_date = '2024-11-26 09:29:45', updated_date = '2024-11-26 09:29:45' WHERE id = 33;
UPDATE tbl_evaluation SET created_date = '2024-12-01 06:29:45', updated_date = '2024-12-01 06:29:45' WHERE id = 34;
UPDATE tbl_evaluation SET created_date = '2024-11-14 07:27:45', updated_date = '2024-11-14 07:27:45' WHERE id = 35;
UPDATE tbl_evaluation SET created_date = '2024-11-17 20:29:45', updated_date = '2024-11-17 20:29:45' WHERE id = 36;
UPDATE tbl_evaluation SET created_date = '2024-11-06 03:42:45', updated_date = '2024-11-06 03:42:45' WHERE id = 37;
UPDATE tbl_evaluation SET created_date = '2024-11-23 23:53:45', updated_date = '2024-11-23 23:53:45' WHERE id = 38;
UPDATE tbl_evaluation SET created_date = '2024-11-22 08:50:45', updated_date = '2024-11-22 08:50:45' WHERE id = 39;
UPDATE tbl_evaluation SET created_date = '2024-11-16 16:58:45', updated_date = '2024-11-16 16:58:45' WHERE id = 40;
UPDATE tbl_evaluation SET created_date = '2024-12-05 01:25:45', updated_date = '2024-12-05 01:25:45' WHERE id = 41;
UPDATE tbl_evaluation SET created_date = '2024-12-02 04:06:45', updated_date = '2024-12-02 04:06:45' WHERE id = 42;
UPDATE tbl_evaluation SET created_date = '2024-11-10 15:04:45', updated_date = '2024-11-10 15:04:45' WHERE id = 43;
UPDATE tbl_evaluation SET created_date = '2024-12-02 10:40:45', updated_date = '2024-12-02 10:40:45' WHERE id = 44;
UPDATE tbl_evaluation SET created_date = '2024-11-13 04:37:45', updated_date = '2024-11-13 04:37:45' WHERE id = 45;
UPDATE tbl_evaluation SET created_date = '2024-11-18 08:56:45', updated_date = '2024-11-18 08:56:45' WHERE id = 46;
UPDATE tbl_evaluation SET created_date = '2024-11-08 19:48:45', updated_date = '2024-11-08 19:48:45' WHERE id = 47;
UPDATE tbl_evaluation SET created_date = '2024-11-24 05:06:45', updated_date = '2024-11-24 05:06:45' WHERE id = 48;
UPDATE tbl_evaluation SET created_date = '2024-11-06 04:06:45', updated_date = '2024-11-06 04:06:45' WHERE id = 49;
UPDATE tbl_evaluation SET created_date = '2024-11-07 15:47:45', updated_date = '2024-11-07 15:47:45' WHERE id = 50;

