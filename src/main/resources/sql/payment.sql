create table tbl_payment (
    id bigint unsigned auto_increment primary key,           # 기본 키
    payment_amount bigint unsigned not null,                 # 결제 금액
    payment_status varchar(255),                             # 상태
    payment_method varchar(255),                              # 결제 수단
    created_date datetime default current_timestamp,        # 결제 날짜
    updated_date datetime default  current_timestamp,
    notice_id bigint unsigned not null ,                    # 공고 외래 키
    member_id bigint unsigned not null ,                    # 회원 외래키
    constraint fk_payment_member foreign key (member_id)
                         references tbl_member(id),
    constraint  fk_payment_notice foreign key (notice_id)
                         references  tbl_notice(id) on delete cascade
);

select *
from tbl_payment;

insert into tbl_payment (
    payment_amount,
    payment_status,
    payment_method,
    notice_id,
    member_id
) values (
    '10000',
    '결제 완료',
    '카카오페이',
    5,
    5
         );

# 이름 : member_name / 결제일 : created_date / 결제 상품 : notice_job_category_name / 결제 금액 : payment_amount
# 전화번호 : member_phone / 결제수단 : payment_method / 결제 상태 : payment_status

SELECT
    m.member_name,
    p.created_date,
    n.notice_title,
    p.payment_amount,
    m.member_phone,
    p.payment_method,
    p.payment_status
FROM
    tbl_payment p
        JOIN
    tbl_member m
    ON
        p.member_id = m.id
        JOIN
    tbl_notice n
    ON
        p.notice_id = n.id;

ALTER TABLE tbl_payment DROP FOREIGN KEY fk_payment_notice;
ALTER TABLE tbl_payment
    ADD CONSTRAINT fk_payment_notice
        FOREIGN KEY (notice_id)
            REFERENCES tbl_notice(id)
            ON DELETE CASCADE;

