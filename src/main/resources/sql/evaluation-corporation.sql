create table tbl_evaluation_corporation (
    id bigint unsigned auto_increment primary key,        -- 기본 키
    corporation_id bigint unsigned not null,             -- 기업 ID (tbl_corporation과 연결)
    notice_id bigint unsigned not null,                  -- 공고 ID (tbl_notice와 연결)
    member_id bigint unsigned not null,                  -- 근무자 ID (tbl_member와 연결)
    created_date datetime default current_timestamp,    -- 생성일 (자동 생성)
    updated_date datetime default current_timestamp, -- 수정일 (자동 갱신)
    constraint fk_evaluation_corporation_corporation foreign key (corporation_id)
        references tbl_corporation(id) on delete cascade,
    constraint fk_evaluation_corporation_notice foreign key (notice_id)
        references tbl_notice(id) on delete cascade,
    constraint fk_evaluation_corporation_member foreign key (member_id)
        references tbl_member(id) on delete cascade
);

drop table tbl_evaluation_corporation;
select * from tbl_evaluation_corporation;

# 기업명, 작성일, 포지션 근무일, 공고 제목, 근무자, 전화번호, 지원 분야, 상태
# c.corporation_name, ec.created_date n.notice_work_start_date, n.notice_title, m.member_name, m.member_phone, a.apply_type, p.position_status
# tbl_corporation, tbl_notice, tbl_member, tbl_apply, tbl_position

SELECT
    c.corporation_name,               -- 기업명
    ec.created_date,                  -- 작성일 (tbl_evaluation_corporation에서 가져옴)
    n.notice_work_start_date,         -- 포지션 근무일 (tbl_notice에서 가져옴)
    n.notice_title,                   -- 공고 제목 (tbl_notice에서 가져옴)
    m.member_name,                    -- 근무자 (tbl_member에서 가져옴)
    m.member_phone,                   -- 전화번호 (tbl_member에서 가져옴)
    a.apply_type,                   -- 지원 상태 (tbl_apply에서 가져옴)
    p.position_status                 -- 상태 (tbl_position에서 가져옴)
FROM
    tbl_evaluation_corporation ec
        JOIN
    tbl_corporation c ON ec.id = c.id  -- tbl_evaluation_corporation과 tbl_corporation 연결
        JOIN
    tbl_notice n ON c.id = n.corporation_id  -- tbl_corporation과 tbl_notice 연결
        JOIN
    tbl_apply a ON n.id = a.notice_id  -- tbl_notice와 tbl_apply 연결
        JOIN
    tbl_member m ON a.resume_id = m.id  -- tbl_apply와 tbl_member 연결
        JOIN
    tbl_position p ON n.id = p.notice_id;
-- tbl_notice와 tbl_position 연결

INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (28, 12, 18, '2024-10-18 13:37:44', '2024-10-29 15:36:47');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (36, 11, 61, '2024-04-06 10:27:59', '2024-11-16 10:37:51');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (44, 13, 14, '2024-08-06 10:52:24', '2024-09-04 19:39:26');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (30, 40, 20, '2024-09-10 12:12:18', '2024-11-26 13:17:54');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (10, 46, 50, '2024-07-26 05:34:35', '2024-12-03 23:58:20');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (6, 51, 39, '2024-07-22 07:36:12', '2024-08-17 16:38:57');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (11, 56, 33, '2024-03-18 20:46:32', '2024-04-29 17:03:27');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (32, 61, 51, '2024-01-26 02:22:46', '2024-05-05 05:44:24');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (12, 14, 26, '2024-07-30 08:59:21', '2024-08-21 06:51:06');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (45, 24, 42, '2024-03-19 04:31:50', '2024-08-12 09:03:20');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (18, 62, 61, '2024-02-15 06:40:12', '2024-05-23 20:35:55');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (15, 65, 4, '2024-10-24 10:55:41', '2024-11-30 22:42:34');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (1, 49, 33, '2024-10-08 00:49:51', '2024-10-14 14:02:23');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (38, 23, 8, '2024-07-18 11:13:22', '2024-10-31 03:13:41');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (44, 57, 46, '2024-09-27 09:12:46', '2024-10-27 06:40:17');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (51, 42, 22, '2024-08-05 22:09:24', '2024-08-25 06:34:22');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (15, 13, 58, '2024-05-11 06:24:19', '2024-09-04 08:17:26');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (13, 54, 34, '2024-11-22 03:15:03', '2024-12-01 18:43:02');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (48, 16, 23, '2024-03-13 08:00:54', '2024-10-17 00:19:31');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (28, 21, 14, '2024-01-04 13:03:44', '2024-05-08 09:59:39');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (32, 55, 51, '2024-12-06 11:36:46', '2024-12-08 10:21:23');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (40, 29, 51, '2024-08-24 15:14:28', '2024-08-31 06:40:09');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (17, 35, 13, '2024-10-14 11:10:16', '2024-11-19 10:52:13');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (45, 52, 42, '2024-09-01 18:37:51', '2024-09-08 01:28:50');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (25, 8, 42, '2024-06-03 22:50:19', '2024-06-08 19:39:43');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (7, 14, 41, '2024-04-08 18:43:08', '2024-08-05 16:08:38');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (16, 51, 51, '2024-07-30 05:48:23', '2024-10-15 19:44:01');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (27, 9, 20, '2024-05-01 05:53:24', '2024-11-26 20:32:12');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (17, 26, 9, '2024-05-28 08:48:46', '2024-08-05 13:20:54');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (38, 41, 1, '2024-11-26 02:17:51', '2024-12-02 07:49:55');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (49, 5, 17, '2024-01-23 15:06:53', '2024-07-26 05:07:34');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (4, 23, 16, '2024-09-27 23:04:47', '2024-10-04 21:50:34');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (11, 43, 47, '2024-02-16 23:51:49', '2024-06-24 16:14:37');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (28, 39, 21, '2024-01-15 07:20:08', '2024-11-10 12:45:42');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (50, 65, 35, '2024-04-25 14:05:51', '2024-11-09 18:16:10');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (50, 42, 38, '2024-03-08 15:12:33', '2024-08-17 05:22:05');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (33, 49, 3, '2024-02-14 01:22:07', '2024-05-07 18:24:48');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (44, 17, 44, '2024-06-17 02:34:25', '2024-08-25 08:54:32');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (45, 36, 60, '2024-09-24 22:17:13', '2024-10-20 18:10:14');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (24, 55, 11, '2024-01-21 00:35:42', '2024-09-10 00:50:45');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (6, 60, 46, '2024-03-09 20:38:55', '2024-05-28 22:02:31');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (1, 35, 20, '2024-10-12 22:09:22', '2024-11-06 12:36:51');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (1, 44, 22, '2024-10-15 14:45:36', '2024-12-04 09:24:34');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (16, 36, 43, '2024-01-08 12:53:34', '2024-09-01 21:39:32');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (34, 18, 23, '2024-09-26 17:37:00', '2024-11-03 10:50:37');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (49, 9, 58, '2024-01-10 12:07:47', '2024-10-05 03:54:31');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (16, 59, 30, '2024-04-10 01:24:14', '2024-08-19 09:43:56');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (41, 30, 54, '2024-01-03 23:05:28', '2024-11-26 04:52:11');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (44, 65, 6, '2024-03-31 12:12:58', '2024-07-25 16:29:51');
INSERT INTO tbl_evaluation_corporation (corporation_id, notice_id, member_id, created_date, updated_date) VALUES (20, 51, 58, '2024-06-06 18:57:12', '2024-09-13 19:23:26');
