create table tbl_complain (
    id bigint unsigned auto_increment primary key,           # 기본 키
    complain_title varchar(255) not null,
    complain_content varchar(255) not null,                  # 신고 내용
    complain_status varchar(255) default '신고 대기',                              # 상태
    complain_type varchar(255) not null,                #신고 내용
    corporation_id bigint unsigned not null,                     # 기업 외래 키
    member_id bigint unsigned not null,                      # 회원 외래 키
    created_date datetime default current_timestamp,         # 신고일
    updated_date datetime default  current_timestamp,
    constraint fk_complain_corporation foreign key (corporation_id)    # 기업 외래 키 제약 조건
        references tbl_corporation(id),
    constraint fk_complain_member foreign key (member_id)      # 회원 외래 키 제약 조건
        references tbl_member(id)
);

select *
from tbl_complain;


alter table tbl_complain add column complain_type varchar(255) not null;

ALTER TABLE tbl_complain
    MODIFY complain_status VARCHAR(255) DEFAULT '신고 대기';

# 기업명, 신고일, 신고 내용, 피신고인, 누적횟수, 상태
# c1.corporation_name, c2.complain_created_date, m.member_name, c2.complain_count, c2.complain_status

select
    c1.corporation_name,
    c2.created_date,
    c2.complain_content,
    m.member_name,
    c2.complain_count,
    c2.complain_status
from
    tbl_corporation c1
        join
    tbl_complain c2
    on c1.id = c2.corporation_id
        join
    tbl_member m
    on m.id = c2.member_id;




