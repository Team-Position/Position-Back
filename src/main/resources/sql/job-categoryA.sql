create table tbl_job_categoryA(
  id bigint unsigned auto_increment primary key,
  job_categoryA_name varchar(255)
);

-- 고객상담·TM 카테고리 (ID = 9)
INSERT INTO tbl_job_categoryA (job_categoryA_name)
VALUES ('고객상담·TM');




select *
from tbl_job_categoryA;


