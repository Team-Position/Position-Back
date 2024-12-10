create table tbl_inquiry (
    id bigint unsigned auto_increment primary key,           # 기본 키
    inquiry_type varchar(255) not null,                     # 구분 (기업, 개인)
    inquiry_category varchar(255),                           # 문의 종류
    inquiry_title varchar(255) not null,                    # 제목
    inquiry_content varchar(255) not null,                     # 내용
    inquiry_attachment varchar(255),                         # 파일 첨부
    member_id bigint unsigned not null,                      # 회원 외래 키
    constraint fk_inquiry_member foreign key (member_id)    # 회원 외래 키 제약 조건
        references tbl_member(id),
    created_date datetime default current_timestamp,        # 생성일
    updated_date datetime default current_timestamp         # 수정일
);

select *
from tbl_inquiry;

use test;

# 문의 분류, 작성일, 문의 제목, 문의 내용, 작성자, 이메일, 상태
# i.inquiry_type, i.created_date, i.inquiry_title, i.inquiry_content, m.member_name, m.member_email, i.inquiry_status

select
    i.inquiry_category,
    i.created_date,
    i.inquiry_title,
    i.inquiry_content,
    m.member_name,
    coalesce(m.member_email, m.member_kakao_email) as email,
    i.inquiry_status
from
    tbl_inquiry i
        join tbl_member m
             on i.member_id = m.id
where
    i.inquiry_type = '개인';

select
    i.inquiry_category,
    i.created_date,
    i.inquiry_title,
    i.inquiry_content,
    c.corporation_name,
    c.corporation_email,
    i.inquiry_status
from
    tbl_inquiry i
        join tbl_corporation c
             on i.member_id = c.id
where
    i.inquiry_type = '기업';

ALTER TABLE tbl_inquiry
    MODIFY created_date DATETIME DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE tbl_inquiry
    MODIFY updated_date DATETIME DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE tbl_inquiry
    MODIFY inquiry_content VARCHAR(255) NOT NULL;

ALTER TABLE tbl_inquiry DROP COLUMN inquiry_attachment;

alter table tbl_inquiry add column inquiry_attachment varchar(255);

alter table tbl_inquiry drop column inquiry_attachment;

alter table tbl_inquiry add column member_email varchar(255);
alter table tbl_inquiry add column member_kakao_email varchar(255);
alter table tbl_inquiry add column inquiry_status varchar(255) default '답변 예정';



