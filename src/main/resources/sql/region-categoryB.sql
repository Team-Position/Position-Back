create table tbl_region_categoryB(
    id bigint unsigned auto_increment primary key,
    region_categoryB_name varchar(255),
    region_categoryA_id bigint unsigned not null,
    constraint fk_region_categoryB_region_categoryA foreign key (region_categoryA_id)
        references tbl_region_categoryA(id)
);

select * from tbl_region_categoryB;

-- Insert region categories (A)
INSERT INTO tbl_region_categoryA (region_categoryA_name)
VALUES
    ('서울'),
    ('인천'),
    ('대구'),
    ('대전'),
    ('세종'),
    ('경남'),
    ('전남'),
    ('충남'),
    ('제주'),
    ('경기'),
    ('부산'),
    ('광주'),
    ('울산'),
    ('강원'),
    ('경북'),
    ('전북'),
    ('충북');

-- Insert corresponding regions (B) for each region in category A
-- 서울
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('강남구', 1), ('강북구', 1), ('구로구', 1), ('노원구', 1), ('마포구', 1), ('성동구', 1),
    ('송파구', 1), ('양천구', 1), ('영등포구', 1), ('용산구', 1), ('중구', 1);

-- 인천
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('남동구', 2), ('부평구', 2), ('계양구', 2), ('서구', 2), ('연수구', 2), ('미추홀구', 2);

-- 대구
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('중구', 3), ('동구', 3), ('서구', 3), ('남구', 3), ('북구', 3), ('수성구', 3), ('달서구', 3), ('달성군', 3);

-- 대전
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('유성구', 4), ('서구', 4), ('동구', 4), ('중구', 4), ('대덕구', 4);

-- 세종
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('세종', 5);

-- 경남
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('창원시', 6), ('김해시', 6), ('진주시', 6), ('양산시', 6), ('밀양시', 6), ('통영시', 6);

-- 전남
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('목포시', 7), ('여수시', 7), ('순천시', 7), ('광양시', 7), ('나주시', 7);

-- 충남
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('천안시', 8), ('아산시', 8), ('논산시', 8), ('서산시', 8), ('보령시', 8);

-- 제주
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('제주시', 9), ('서귀포시', 9);

-- 경기
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('수원시', 10), ('고양시', 10), ('용인시', 10), ('성남시', 10), ('부천시', 10), ('안산시', 10);

-- 부산
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('해운대구', 11), ('서면', 11), ('동래구', 11), ('부산진구', 11), ('강서구', 11);

-- 광주
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('북구', 12), ('서구', 12), ('남구', 12), ('광산구', 12);

-- 울산
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('남구', 13), ('동구', 13), ('중구', 13), ('북구', 13);

-- 강원
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('춘천시', 14), ('원주시', 14), ('강릉시', 14), ('동해시', 14), ('속초시', 14);

-- 경북
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('포항시', 15), ('경주시', 15), ('안동시', 15), ('구미시', 15), ('김천시', 15);

-- 전북
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('전주시', 16), ('익산시', 16), ('군산시', 16), ('정읍시', 16), ('남원시', 16);

-- 충북
INSERT INTO tbl_region_categoryB (region_categoryB_name, region_categoryA_id)
VALUES
    ('청주시', 17), ('충주시', 17), ('제천시', 17), ('음성군', 17), ('괴산군', 17);

