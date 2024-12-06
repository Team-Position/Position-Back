create table tbl_interview(
    id bigint unsigned auto_increment primary key ,
    corporation_id bigint unsigned not null,
    resume_id bigint unsigned not null,
    interview_date varchar(255) not null,
    interview_status varchar(255) default '면접 예정',
    constraint fk_interview_corporation foreign key (corporation_id)
        references tbl_corporation(id),
    constraint fk_interview_resume foreign key (resume_id)
        references tbl_resume(id)
);

select * from tbl_interview;

select
    n.notice_title,
    c.corporation_name,
    i.interview_date as interview_apply_pass_date,
    m.member_name,
    m.member_phone,
    n.notice_job_category_name,
    i.interview_status
from
    tbl_interview i
        join
    tbl_corporation c ON i.corporation_id = c.id
        join
    tbl_notice n ON n.corporation_id = c.id
        join
    tbl_resume r ON i.resume_id = r.id
        join
    tbl_member m ON r.member_id = m.id;

# join tbl_notice n on n.corporation_id = c.id












