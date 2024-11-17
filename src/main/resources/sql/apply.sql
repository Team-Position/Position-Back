# 지원 테이블
create table tbl_apply(
        id bigint unsigned auto_increment primary key,
        notice_id bigint unsigned not null,
        resume_id bigint unsigned not null ,
        apply_status varchar(255) default '지원 완료',
        created_date datetime default current_timestamp,
        updated_date datetime default  current_timestamp,
        constraint fk_apply_notice foreign key (notice_id)
            references tbl_notice(id),
        constraint fk_apply_resume foreign key (resume_id)
            references tbl_resume(id)
);


select *
from tbl_apply;

alter table tbl_apply drop column apply_type;

ALTER TABLE tbl_apply
    ADD COLUMN created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_date DATETIME DEFAULT CURRENT_TIMESTAMP;

use positionback;

INSERT INTO tbl_apply (
    notice_id,
    resume_id,
    apply_type,
    apply_status
) VALUES (
             94,                    -- notice_id (tbl_notice 테이블의 공고 ID)
             1,                    -- resume_id (tbl_resume 테이블의 이력서 ID)
             '프론트엔드 개발자',   -- apply_type (지원 부문)
             '지원 완료'            -- apply_status (기본값이 '지원 완료'이므로 생략 가능)
         );

ALTER TABLE tbl_apply
    ADD COLUMN id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY;
drop view view_apply_list;
create view view_apply_list as
select
    c.id AS corporation_id,
    c.corporation_name,
    n.notice_title,
    m.id as member_id,
    m.member_name,
    m.member_email,
    m.member_nickname,
    a.id as apply_id,
    a.apply_status as apply_status,
    a.created_date,
    a.updated_date,
    n.notice_career,
    n.notice_education,
    n.notice_work_start_date,
    n.notice_work_end_date,
    n.notice_work_start_time,
    n.notice_work_end_time,
    n.notice_end_date,
    n.notice_job_category_name,
    pr.id as positioner_review_id,
    pr.positioner_review_tips,
    pr.created_date as review_created_date,
    pr.updated_date as review_updated_date,
    e.evaluation_overall,
    e.evaluation_difficulty,
    e.evaluation_result
from
    tbl_apply a
        join
    tbl_notice n on a.notice_id = n.id
        join
    tbl_corporation c on n.corporation_id = c.id
        join
    tbl_resume r on a.resume_id = r.id
        join
    tbl_member m on r.member_id = m.id
        left join
    tbl_positioner_review pr on pr.apply_id = a.id
        left join
    tbl_evaluation_positioner ep on pr.id = ep.positioner_review_id
        left join
    tbl_evaluation e on ep.id = e.id;

SELECT
    corp.corporation_name,
    a.created_date,
    n.notice_title,
    m.member_name,
    m.member_phone,
    a.apply_type,
    a.apply_status
FROM
    tbl_apply a
        JOIN
    tbl_notice n ON a.notice_id = n.id
        JOIN
    tbl_resume r ON a.resume_id = r.id
        JOIN
    tbl_member m ON r.member_id = m.id
        JOIN
    tbl_corporation corp ON n.corporation_id = corp.id;


