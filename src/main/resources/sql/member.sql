create database positionback;
use positionback;
create table tbl_member(
    id bigint unsigned auto_increment primary key,
    member_name varchar(255) not null,
    member_email varchar(255) not null,
    member_password varchar(255) not null,
    member_address varchar(255),
    member_address_detail varchar(255),
    member_nickname varchar(255) ,
    member_status varchar(255) default '활동중',
    member_complain_count int default 0, # 신고 누적 횟수
    member_kakao_email varchar(255),
    member_kakao_profile_url varchar(255),
    member_phone varchar(255),
    created_date datetime default current_timestamp,
    updated_date datetime default  current_timestamp
);

select * from tbl_member;
select * from tbl_corporation;
delete from tbl_member;

alter table  tbl_member add(member_nickname varchar(255));
alter table  tbl_member add(updated_date datetime default current_timestamp);
alter table  tbl_member add(member_complain_count int default 0);
alter table tbl_member add(member_kakao_email varchar(255));
alter table tbl_member add(member_kakao_profile_url varchar(255));
alter table tbl_member add(member_phone varchar(255));
alter table tbl_member add(member_birthday varchar(255));
alter table tbl_member modify column member_address_detail varchar(255);
alter table tbl_member modify column member_password varchar(255);
alter table tbl_member drop column member_type;

insert into tbl_member (member_name,
                        member_password,
                        member_phone,
                        member_email,
                        member_kakao_email,
                        member_address,
                        member_status,
                        member_address_detail)
values ('양승민', '1234567','010- 1234-5678', '746aa1357@gmail.com', NULL, '성남시 수정구', '활동중', '태평역 3번출구');















-- First new entry
INSERT INTO tbl_member (
    member_name,
    member_email,
    member_password,
    member_address,
    member_address_detail,
    member_nickname,
    member_kakao_email,
    member_kakao_profile_url,
    member_phone
) VALUES (
             'Alice Johnson',
             'alicej@example.com',
             'alicepass123',
             '789 Oak St',
             'Floor 3',
             'alicej',
             'alicejohnson@kakao.com',
             'http://example.com/alice-profile.jpg',
             '555-123-4567'
         );



