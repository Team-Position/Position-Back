create table tbl_corporation(
    id bigint unsigned auto_increment primary key,
    corporation_name varchar(255) not null,
    corporation_address varchar(255) not null,
    corporation_address_detail varchar(255) not null,
    corporation_business varchar(255) default '-', # 업종(유통업, 조선)
    corporation_type varchar(255) default '-',  # 기업 분류(대기업, 중견기업)
    corporation_owner varchar(255) not null,
    corporation_email varchar(255) not null,
    corporation_password varchar(255) not null,
    corporation_homepage varchar(255),
    corporation_read_count int default 0,
    corporation_interested_count int default 0,
    corporation_opening_date date,
    created_date datetime default current_timestamp,
    updated_date datetime default  current_timestamp,
    corporation_Gen varchar(255),#대표 번호(general number)
    corporation_sales varchar(255) default '0'
);


alter table tbl_corporation add(corporation_sales varchar(255) default '0');
alter table tbl_corporation add column corporation_interested_count int default 0;
alter table tbl_corporation add column corporation_opening_date date;
alter table tbl_corporation alter column corporation_type set default '-';
alter table tbl_corporation add column corporation_business varchar(255) default '-';
alter table tbl_corporation drop column corporation_business;
alter table tbl_corporation drop column corporation_interested_count;

alter table tbl_corporation drop column corporation_sales;
alter table tbl_corporation add(corporation_sales int);

alter table  tbl_corporation drop column corporation_gen;
alter  table  tbl_corporation add (corporation_type varchar(255) default '대기업');

alter table  tbl_corporation add(created_date datetime default current_timestamp);
alter table  tbl_corporation add(updated_date datetime default current_timestamp);
alter table  tbl_corporation add(corporation_code varchar(255) not null);

alter table tbl_corporation modify column corporation_read_count int default 0;

select * from  tbl_corporation;

select * from tbl_file;
select * from tbl_corporation_file;

INSERT INTO tbl_corporation (
    corporation_name,
    corporation_address,
    corporation_address_detail,
    corporation_owner,
    corporation_email,
    corporation_password,
    corporation_homepage,
    corporation_read_count,
    corporation_Gen,
    corporation_sales,
    corporation_code
) VALUES
      ('GS칼텍스', '서울특별시 강남구', '압구정로 5길', '허세홍', 'gscaltex@gmail.com', '123456', 'gscaltex.com', '8', '1588-1234', '300000000', '201-81-67890'),
      ('셀트리온', '인천광역시 연수구', '송도동 33', '서정진', 'celltrion@gmail.com', '123456', 'celltrion.com', '22', '1599-0077', '950000000', '202-82-54321'),
      ('삼성생명', '서울특별시 강남구', '태평로 39', '현성철', 'samsunglife@gmail.com', '123456', 'samsunglife.com', '26', '1588-3377', '800000000', '203-83-98765'),
      ('LG화학', '서울특별시 영등포구', '여의도동 24', '신학철', 'lgchem@gmail.com', '123456', 'lgchem.com', '12', '1577-4545', '550000000', '204-84-01234'),
      ('KT', '서울특별시 종로구', '광화문로 21', '구현모', 'kt@gmail.com', '123456', 'kt.com', '20', '1588-0600', '700000000', '205-85-12345'),
      ('두산중공업', '경상남도 창원시', '성산구 50', '박지원', 'doosan@gmail.com', '123456', 'doosan.com', '10', '1588-0123', '600000000', '206-81-45678'),
      ('SK이노베이션', '서울특별시 종로구', '새문안로 80', '김준', 'skinnovation@gmail.com', '123456', 'skinnovation.com', '5', '1599-8000', '750000000', '207-82-65432'),
      ('CJ E&M', '서울특별시 마포구', '상암동 48', '허민회', 'cjem@gmail.com', '123456', 'cjem.net', '18', '1588-3300', '350000000', '208-83-56789'),
      ('롯데케미칼', '서울특별시 송파구', '올림픽로 300', '김교현', 'lottechem@gmail.com', '123456', 'lottechem.com', '15', '1599-7888', '450000000', '209-84-45678'),
      ('현대모비스', '서울특별시 강남구', '영동대로 120', '정몽구', 'hyundaimobis@gmail.com', '123456', 'mobis.co.kr', '9', '1577-8900', '500000000', '210-81-78910'),
      ('한국가스공사', '서울특별시 강남구', '영동대로 330', '채희봉', 'kogas@gmail.com', '123456', 'kogas.or.kr', '11', '1588-1190', '200000000', '211-86-14532'),
      ('LG생활건강', '서울특별시 종로구', '율곡로 88', '차석용', 'lgcare@gmail.com', '123456', 'lgcare.com', '13', '1599-0001', '350000000', '212-85-12547'),
      ('SK바이오팜', '서울특별시 종로구', '새문안로 71', '조정우', 'skbiopharm@gmail.com', '123456', 'skbp.com', '6', '1588-8001', '950000000', '213-81-23457'),
      ('넷마블', '서울특별시 구로구', '디지털로 300', '방준혁', 'netmarble@gmail.com', '123456', 'netmarble.com', '25', '1588-9977', '200000000', '214-83-43210'),
      ('대한항공', '서울특별시 강서구', '하늘길 77', '조원태', 'koreanair@gmail.com', '123456', 'koreanair.com', '14', '1588-2001', '600000000', '215-86-67890'),
      ('한진해운', '서울특별시 중구', '태평로 39', '조양호', 'hanjin@gmail.com', '123456', 'hanjin.co.kr', '7', '1599-2300', '400000000', '216-81-12367'),
      ('한샘', '서울특별시 강남구', '삼성로 331', '강승수', 'hanssem@gmail.com', '123456', 'hanssem.com', '9', '1577-0330', '500000000', '217-83-65432'),
      ('웅진코웨이', '서울특별시 구로구', '디지털로 33', '안지용', 'coway@gmail.com', '123456', 'coway.co.kr', '18', '1599-8989', '450000000', '218-82-32100'),
      ('롯데칠성', '서울특별시 송파구', '문정로 125', '이영구', 'lottechilsung@gmail.com', '123456', 'lottechilsung.co.kr', '5', '1588-2222', '150000000', '219-84-78912'),
      ('GS건설', '서울특별시 종로구', '새문안로 110', '허창수', 'gscons@gmail.com', '123456', 'gsconst.com', '16', '1577-5588', '800000000', '220-81-56789'),
      ('삼성중공업', '서울특별시 강남구', '영동대로 20', '남준우', 'samsungheavy@gmail.com', '123456', 'shi.samsung.co.kr', '30', '1588-6666', '250000000', '221-83-98765'),
      ('대우건설', '서울특별시 중구', '한강대로 128', '김형', 'daewoo@gmail.com', '123456', 'daewooenc.com', '15', '1588-3456', '120000000', '222-82-54321'),
      ('이마트', '서울특별시 성동구', '왕십리로 20', '강희석', 'emart@gmail.com', '123456', 'emart.com', '12', '1577-1234', '450000000', '223-81-12378'),
      ('한국철도공사', '서울특별시 용산구', '서부이촌로 242', '손병석', 'korail@gmail.com', '123456', 'korail.com', '8', '1544-8545', '350000000', '224-83-23456'),
      ('오뚜기', '서울특별시 강남구', '논현로 68', '함영준', 'ottogi@gmail.com', '123456', 'ottogi.co.kr', '10', '1588-1130', '230000000', '225-82-65423'),
      ('삼성SDI', '서울특별시 강남구', '서초대로 80', '전영현', 'samsungsdi@gmail.com', '123456', 'samsungsdi.co.kr', '19', '1588-7666', '670000000', '226-81-78902'),
      ('오비맥주', '서울특별시 강남구', '역삼로 111', '배하준', 'obbeer@gmail.com', '123456', 'obbeer.co.kr', '20', '1577-2041', '250000000', '227-84-56723'),
      ('LS전선', '경기도 안양시', '동안구 흥안대로', '구자열', 'ls@gmail.com', '123456', 'ls.co.kr', '14', '1588-5555', '500000000', '228-83-43210'),
      ('LS산전', '서울특별시 종로구', '율곡로 26', '구자은', 'lsind@gmail.com', '123456', 'lsis.com', '5', '1588-3000', '200000000', '229-86-98732'),
      ('효성', '서울특별시 영등포구', '국회대로 36', '조현준', 'hyosung@gmail.com', '123456', 'hyosung.co.kr', '18', '1599-8888', '400000000', '230-82-43121');



