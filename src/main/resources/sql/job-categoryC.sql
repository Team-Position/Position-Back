create table tbl_job_categoryC(
    id bigint unsigned auto_increment primary key,
    job_categoryC_name varchar(255),
    job_categoryB_id bigint unsigned not null,
    constraint fk_job_categoryC_job_categoryB foreign key (job_categoryB_id)
        references tbl_job_categoryB(id)
);

select * from tbl_job_categoryC;

INSERT INTO tbl_job_categoryC (job_categoryC_name, job_categoryB_id)
VALUES
    ('상주근무', 35),
    ('야간근무', 35),
    ('일용직', 35),
    ('입식근무', 35),
    ('좌식근무', 35),
    ('주간근무', 35),
    ('2교대', 35),
    ('3교대', 35);


