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

alter table  tbl_member add(created_date datetime default current_timestamp);
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

INSERT INTO tbl_member (
    member_name,
    member_phone,
    member_email,
    member_kakao_email,
    member_address,
    member_status,
    member_address_detail,
    member_type
) VALUES
      ('김민수', '010-1234-5678', 'minsu@gmail.com', NULL, '서울시 서초구', '활동중', '서초역 3번출구', '포지셔너'),
      ('박지훈', '010-2345-6789', NULL, 'jihoon@kakao.com', '서울시 강남구', '정지', '강남역 5번출구', '포지셔너'),
      ('이영희', '010-3456-7890', 'younghee@gmail.com', NULL, '서울시 용산구', '탈퇴', '용산역 2번출구', '포지셔너'),
      ('최수진', '010-4567-8901', NULL, 'sujin@kakao.com', '서울시 마포구', '활동중', '홍대입구역 1번출구', '포지셔너'),
      ('정우성', '010-5678-9012', 'woosung@gmail.com', NULL, '서울시 동작구', '정지', '사당역 6번출구', '포지셔너'),
      ('김다연', '010-6789-0123', NULL, 'dayeon@kakao.com', '서울시 은평구', '탈퇴', '불광역 3번출구', '포지셔너'),
      ('장혜진', '010-7890-1234', 'hyejin@gmail.com', NULL, '서울시 송파구', '활동중', '잠실역 2번출구', '포지셔너'),
      ('이준영', '010-8901-2345', NULL, 'junyoung@kakao.com', '서울시 관악구', '정지', '신림역 4번출구', '포지셔너'),
      ('박소영', '010-9012-3456', 'soyoung@gmail.com', NULL, '서울시 광진구', '탈퇴', '건대입구역 7번출구', '포지셔너'),
      ('김수현', '010-1122-3344', NULL, 'suhyun@kakao.com', '서울시 노원구', '활동중', '노원역 5번출구', '포지셔너'),
      ('황민호', '010-2233-4455', 'minho@gmail.com', NULL, '서울시 성북구', '정지', '길음역 1번출구', '포지셔너'),
      ('정재훈', '010-3344-5566', NULL, 'jaehoon@kakao.com', '서울시 강북구', '탈퇴', '미아사거리역 2번출구', '포지셔너'),
      ('김예림', '010-4455-6677', 'yerim@gmail.com', NULL, '서울시 금천구', '활동중', '가산디지털단지역 3번출구', '포지셔너'),
      ('박성찬', '010-5566-7788', NULL, 'seongchan@kakao.com', '서울시 동대문구', '정지', '청량리역 4번출구', '포지셔너'),
      ('이하나', '010-6677-8899', 'hana@gmail.com', NULL, '서울시 종로구', '탈퇴', '종로3가역 5번출구', '포지셔너'),
      ('홍정민', '010-7788-9900', NULL, 'jungmin@kakao.com', '서울시 중구', '활동중', '을지로입구역 6번출구', '포지셔너'),
      ('서민경', '010-8899-0011', 'minkyung@gmail.com', NULL, '서울시 서대문구', '정지', '신촌역 2번출구', '포지셔너'),
      ('조현우', '010-9900-1122', NULL, 'hyunwoo@kakao.com', '서울시 강서구', '탈퇴', '김포공항역 1번출구', '포지셔너'),
      ('최윤지', '010-1122-2233', 'yoonji@gmail.com', NULL, '서울시 중랑구', '활동중', '중화역 4번출구', '포지셔너'),
      ('백승호', '010-2233-3344', NULL, 'seungho@kakao.com', '서울시 도봉구', '정지', '쌍문역 3번출구', '포지셔너');













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



