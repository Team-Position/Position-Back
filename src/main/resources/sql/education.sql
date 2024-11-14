create table tbl_education (
    id bigint unsigned auto_increment primary key, # 기본 키
    education_type varchar(255) not null, # 학력 구분 (예: 고졸, 대졸)
    education_school_name varchar(255) , # 학교명
    education_graduated varchar(255), # 졸업 여부 (졸업, 재학중, 휴학중 등)
    education_admission_date varchar(255), # 입학 연월
    education_graduation_date varchar(255), # 졸업 연월
    education_passed_date varchar(255), # 검정고시 합격 연월
    education_major varchar(255), # 대학 전공
    education_university varchar(255), # 대학 구분(2년제,3년제 등)
    education_transferred int default 0, # 편입여부
    created_date timestamp default current_timestamp, # 생성일
    updated_date timestamp default current_timestamp # 수정일
);
select * from tbl_education;

INSERT INTO tbl_education (
    education_type,
    education_school_name,
    education_graduated,
    education_admission_date,
    education_graduation_date,
    education_passed_date,
    education_major,
    education_university,
    education_transferred
) VALUES (
             '대졸',                         -- education_type (학력 구분)
             '서울대학교',                    -- education_school_name (학교명)
             '졸업',                          -- education_graduated (졸업 여부)
             '2015-03',                       -- education_admission_date (입학 연월)
             '2019-02',                       -- education_graduation_date (졸업 연월)
             NULL,                            -- education_passed_date (검정고시 합격 연월, 해당 사항 없을 경우 NULL)
             '컴퓨터공학',                     -- education_major (전공)
             '4년제',                         -- education_university (대학 구분)
             0                                -- education_transferred (편입 여부, 0 = 미편입)
         );

INSERT INTO tbl_education (
    education_type,
    education_school_name,
    education_graduated,
    education_admission_date,
    education_graduation_date,
    education_passed_date,
    education_major,
    education_university,
    education_transferred
) VALUES (
             '고졸',                         -- education_type (학력 구분)
             '한국고등학교',                  -- education_school_name (학교명)
             '졸업',                          -- education_graduated (졸업 여부)
             '2010-03',                       -- education_admission_date (입학 연월)
             '2013-02',                       -- education_graduation_date (졸업 연월)
             NULL,                            -- education_passed_date (검정고시 합격 연월, 해당 사항 없을 경우 NULL)
             NULL,                            -- education_major (전공, 고등학교일 경우 NULL)
             NULL,                            -- education_university (대학 구분, 고등학교일 경우 NULL)
             0                                -- education_transferred (편입 여부, 0 = 미편입)
         );



