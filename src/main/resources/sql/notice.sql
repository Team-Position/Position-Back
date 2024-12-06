create table  tbl_notice(
    id bigint unsigned auto_increment primary key,
    corporation_id bigint unsigned not null ,
    notice_title varchar(255) not null ,
    notice_career varchar(255) default '경력무관',
    notice_education varchar(255) not null, #최소 학력
    notice_work_start_date datetime not null , # 인턴십 시작일
    notice_work_end_date datetime not null , # 인턴십 종료일
    notice_work_start_time time not null , # 근무 시작시간
    notice_work_end_time time not null , # 근무 종료 시간
    notice_end_date datetime not null,  #공고 마감일
    notice_read_count int default 0,
    job_categoryC_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    updated_date datetime default  current_timestamp,
    constraint fk_notice_corporation foreign key (corporation_id)
                        references tbl_corporation(id),
    constraint fk_notice_job_categoryC foreign key (job_categoryC_id)
        references tbl_job_categoryC(id)
);

select * from tbl_notice;

drop table tbl_notice;
ALTER TABLE TBL_NOTICE
    add COLUMN notice_read_count int default 0;

INSERT INTO tbl_notice (
    corporation_id,
    notice_title,
    notice_career,
    notice_education,
    notice_work_start_date,
    notice_work_end_date,
    notice_work_start_time,
    notice_work_end_time,
    notice_end_date,
    notice_job_category_name
) VALUES (
             1,  -- Example corporation ID (should be an existing ID in tbl_corporation)
             '이건',  -- Notice title
             '신입',  -- Career level
             '대졸',  -- Minimum education requirement
             '2024-11-01 09:00:00',  -- Work start date (YYYY-MM-DD HH:MM:SS)
             '2024-12-31 18:00:00',  -- Work end date (YYYY-MM-DD HH:MM:SS)
             '09:00:00',  -- Work start time (HH:MM:SS)
             '18:00:00',  -- Work end time (HH:MM:SS)
             '2024-10-31 23:59:59',  -- Notice end date (YYYY-MM-DD HH:MM:SS)
             '소프트웨어 개발'  -- Job category name
         );

select
    c.corporation_name,                     -- 기업명
    n.notice_work_start_date,               -- 포지션 근무일
    n.notice_title,                        -- 공고 제목
    c.corporation_email,                   -- 이메일
    c.corporation_gen,                     -- 전화번호
    n.notice_end_date,                     -- 공고 마감일
    case
        when n.notice_end_date >= NOW() then '채용중'
        else '채용 마감'
        end as notice_status                  -- 공고 상태
from
    tbl_notice n
        join
    tbl_corporation c ON n.corporation_id = c.id;

