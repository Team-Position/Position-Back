 # 이력서 테이블
create table tbl_resume(
    id bigint unsigned auto_increment primary key ,
    member_id bigint unsigned not null,
    education_id bigint unsigned not null,
    job_categoryC_id bigint unsigned not null, #스킬
    resume_status varchar(255) default '일반',
    resume_title varchar(255),
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    constraint fk_resume_member foreign key (member_id)
                       references tbl_member(id),
    constraint fk_resume_education foreign key (education_id)
        references tbl_education(id),
    constraint fk_resume_job_categoryC foreign key (job_categoryC_id)
        references tbl_job_categoryC(id)
);

select * from tbl_resume;

INSERT INTO tbl_resume (
    member_id,
    education_id,
    job_categoryC_id
) VALUES (
             3,    -- member_id (tbl_member 테이블의 회원 ID)
             1,    -- education_id (tbl_education 테이블의 교육 ID)
             1     -- job_categoryC_id (tbl_job_categoryC 테이블의 직업 분류 ID)
         );
alter table tbl_resume
    add column updated_date datetime default current_timestamp;