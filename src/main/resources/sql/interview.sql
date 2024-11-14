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

