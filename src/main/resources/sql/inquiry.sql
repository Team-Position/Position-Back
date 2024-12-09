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
             on i.member_id = m.id;


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

INSERT INTO tbl_inquiry (
    inquiry_type,
    inquiry_category,
    inquiry_title,
    inquiry_content,
    member_id,
    member_email,
    member_kakao_email,
    inquiry_status
) VALUES
      ('개인', '시스템 오류 및 신고', '로그인 오류 발생', '로그인이 되지 않아 문의드립니다.', 1, 'user1@example.com', NULL, '답변 예정'),
      ('기업', '이력서 문의', '이력서 양식 관련', '이력서에 기재해야 할 사항을 알고 싶습니다.', 2, NULL, 'kakao1@kakao.com', '답변 완료'),
      ('개인', '포지션 지원 관련 문의', '포지션 지원 관련 문의', '포지션 지원 자격에 대해 문의합니다.', 3, 'user2@example.com', NULL, '답변 예정'),
      ('기업', '포지션 배정 관련 문의', '배정 과정 설명 요청', '포지션 배정 과정에 대한 설명이 필요합니다.', 4, NULL, 'kakao2@kakao.com', '답변 예정'),
      ('개인', '회원가입/탈퇴/ID/PW', '비밀번호 초기화 요청', '비밀번호 초기화를 요청합니다.', 5, 'user3@example.com', NULL, '답변 완료'),
      ('기업', '공고 문의', '공고 업데이트 관련', '공고가 언제 업데이트 되는지 문의합니다.', 6, NULL, 'kakao3@kakao.com', '답변 완료'),
      ('개인', '지원자 관련 문의', '지원 상태 확인 요청', '현재 지원 상태를 확인하고 싶습니다.', 7, 'user4@example.com', NULL, '답변 예정'),
      ('기업', '결제/유료 상품 문의', '유료 상품 결제 오류', '결제 오류가 발생하여 문의드립니다.', 8, NULL, 'kakao4@kakao.com', '답변 완료'),
      ('개인', '기업 정보', '기업 정보 업데이트 요청', '기업 정보를 최신화하고 싶습니다.', 9, 'user5@example.com', NULL, '답변 예정'),
      ('기업', '제안 사항', '제휴 제안', '새로운 제휴를 제안하고자 합니다.', 10, NULL, 'kakao5@kakao.com', '답변 예정'),
      ('개인', '시스템 오류 및 신고', '웹사이트 버그 신고', '메인 페이지에서 버그가 발견되었습니다.', 11, 'user6@example.com', NULL, '답변 완료'),
      ('기업', '이력서 문의', '이력서 내용 문의', '이력서 작성 시 기재할 내용에 대해 궁금합니다.', 12, NULL, 'kakao6@kakao.com', '답변 완료'),
      ('개인', '포지션 지원 관련 문의', '지원 요건 문의', '특정 포지션의 지원 요건을 알고 싶습니다.', 13, 'user7@example.com', NULL, '답변 예정'),
      ('기업', '포지션 배정 관련 문의', '배정 절차 확인', '포지션 배정 절차에 대한 추가 정보가 필요합니다.', 14, NULL, 'kakao7@kakao.com', '답변 예정'),
      ('개인', '회원가입/탈퇴/ID/PW', '아이디 찾기', '아이디를 찾을 수 없어 문의드립니다.', 15, 'user8@example.com', NULL, '답변 완료'),
      ('기업', '공고 문의', '공고 내용 수정 요청', '공고 내용을 수정하고 싶습니다.', 16, NULL, 'kakao8@kakao.com', '답변 완료'),
      ('개인', '지원자 관련 문의', '지원자 관리 문의', '지원자 관리 기능에 대해 문의드립니다.', 17, 'user9@example.com', NULL, '답변 예정'),
      ('기업', '결제/유료 상품 문의', '유료 서비스 문의', '유료 서비스 결제 방식을 알고 싶습니다.', 18, NULL, 'kakao9@kakao.com', '답변 예정'),
      ('개인', '기업 정보', '회사 정보 수정 요청', '회사 정보 변경을 요청합니다.', 19, 'user10@example.com', NULL, '답변 완료'),
      ('기업', '제안 사항', '서비스 제안', '서비스 개선 방안에 대해 제안하고 싶습니다.', 20, NULL, 'kakao10@kakao.com', '답변 완료'),
      ('개인', '시스템 오류 및 신고', '비정상적 작동 오류', '서비스가 비정상적으로 작동하고 있습니다.', 21, 'user11@example.com', NULL, '답변 예정'),
      ('기업', '이력서 문의', '이력서 정보 수정', '이력서 정보 수정 가능 여부를 문의합니다.', 22, NULL, 'kakao11@kakao.com', '답변 예정'),
      ('개인', '포지션 지원 관련 문의', '포지션 선택 관련', '포지션 선택에 대해 상담 요청합니다.', 23, 'user12@example.com', NULL, '답변 완료'),
      ('기업', '포지션 배정 관련 문의', '배정 확정 시기 문의', '포지션 배정 확정 시기를 알고 싶습니다.', 24, NULL, 'kakao12@kakao.com', '답변 완료'),
      ('개인', '회원가입/탈퇴/ID/PW', '회원 탈퇴 방법', '회원 탈퇴 방법에 대해 문의드립니다.', 25, 'user13@example.com', NULL, '답변 예정'),
      ('기업', '공고 문의', '채용 공고 관련', '채용 공고 조건에 대해 문의합니다.', 26, NULL, 'kakao13@kakao.com', '답변 예정'),
      ('개인', '지원자 관련 문의', '지원자 자료 요청', '지원자 자료 열람 권한 문의드립니다.', 27, 'user14@example.com', NULL, '답변 완료'),
      ('기업', '결제/유료 상품 문의', '구독 상품 결제 확인', '구독 상품 결제 상태를 확인하고 싶습니다.', 28, NULL, 'kakao14@kakao.com', '답변 완료'),
      ('개인', '기업 정보', '기업 정보 변경 문의', '기업 정보 변경 절차에 대해 문의합니다.', 29, 'user15@example.com', NULL, '답변 예정'),
      ('기업', '제안 사항', '서비스 개선 요청', '기존 서비스 개선 요청 사항이 있습니다.', 30, NULL, 'kakao15@kakao.com', '답변 예정');



