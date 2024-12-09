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

INSERT INTO tbl_complain (
    complain_content,
    complain_status,
    complain_type,
    corporation_id,
    member_id,
    complain_count
) VALUES
      ('회원이 게시한 게시글이 부적절한 내용을 포함하고 있습니다.', '신고 접수', '게시글 문제', 1, 15, 5),
      ('회원이 허위 정보를 게시하여 다른 사용자들에게 피해를 주고 있습니다.', '처리 완료', '허위 정보', 2, 18, 3),
      ('회원이 게시글에 지속적으로 욕설을 포함한 댓글을 남기고 있습니다.', '신고 접수', '댓글 문제', 3, 25, 7),
      ('회원이 스팸성 게시글을 반복적으로 게시하고 있습니다.', '신고 접수', '스팸 게시글', 4, 10, 2),
      ('회원이 저작권을 침해하는 자료를 게시하고 있습니다.', '처리 완료', '저작권 침해', 5, 12, 4),
      ('회원이 다른 사용자에게 부적절한 메시지를 보냈습니다.', '신고 접수', '메시지 문제', 6, 28, 6),
      ('회원이 사기성 거래를 시도하려고 합니다.', '처리 완료', '사기 시도', 7, 30, 3),
      ('회원이 서비스에 대한 허위 리뷰를 남겼습니다.', '신고 접수', '허위 리뷰', 8, 21, 2),
      ('회원 간의 대화에서 폭언이 확인되었습니다.', '처리 완료', '폭언 문제', 9, 22, 4),
      ('회원이 게시글에서 다른 사용자의 개인정보를 노출했습니다.', '신고 접수', '개인정보 노출', 10, 33, 5),
      ('회원이 허위 채용 정보를 게시하였습니다.', '처리 완료', '허위 채용 정보', 11, 19, 1),
      ('회원이 부적절한 광고를 게시했습니다.', '신고 접수', '광고 문제', 12, 14, 6),
      ('회원이 다른 사용자에게 위협적인 메시지를 보냈습니다.', '처리 완료', '위협 메시지', 13, 17, 7),
      ('회원이 다른 사용자의 계정을 도용하려고 시도했습니다.', '신고 접수', '계정 도용', 14, 20, 2),
      ('회원이 불법 거래를 시도하려고 합니다.', '처리 완료', '불법 거래', 15, 35, 8),
      ('회원이 특정 사용자를 비방하는 내용을 게시했습니다.', '신고 접수', '비방 게시글', 16, 27, 4),
      ('회원이 허위 신고를 반복적으로 남기고 있습니다.', '처리 완료', '허위 신고', 17, 32, 3),
      ('회원이 플랫폼 정책을 위반하는 기타 행위를 하고 있습니다.', '신고 접수', '기타 문제', 18, 11, 2),
      ('회원이 반복적으로 스팸 활동을 하고 있습니다.', '처리 완료', '스팸 활동', 19, 24, 5),
      ('회원이 특정 사용자의 명예를 훼손하는 내용을 게시했습니다.', '신고 접수', '명예훼손', 20, 13, 6),
      ('회원이 동일한 내용을 반복적으로 게시하고 있습니다.', '처리 완료', '도배 게시글', 21, 9, 7),
      ('회원이 근거 없는 부정적인 리뷰를 반복적으로 남기고 있습니다.', '신고 접수', '리뷰 문제', 22, 6, 3),
      ('회원이 다른 회원에게 금전을 요구하고 있습니다.', '처리 완료', '금전 요구', 23, 5, 4),
      ('회원이 거짓된 정보를 사용해 프로필을 작성하였습니다.', '신고 접수', '프로필 문제', 24, 4, 1),
      ('회원이 게시판에서 무단으로 홍보 활동을 하고 있습니다.', '처리 완료', '무단 홍보', 25, 3, 2),
      ('회원이 거래 사기를 시도하고 있습니다.', '신고 접수', '거래 사기', 26, 8, 6),
      ('회원이 다른 사용자가 불쾌감을 느낄 이미지를 게시했습니다.', '처리 완료', '이미지 문제', 27, 7, 5),
      ('회원이 허위 증명 자료를 제출하였습니다.', '신고 접수', '허위 자료', 28, 26, 4),
      ('회원이 플랫폼 규정을 명백히 위반하는 행위를 하고 있습니다.', '처리 완료', '규정 위반', 29, 29, 7),
      ('회원이 타인의 저작물을 무단으로 도용하고 있습니다.', '신고 접수', '저작물 도용', 30, 18, 2);




