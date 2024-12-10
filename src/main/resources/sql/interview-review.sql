create table tbl_interview_review (
    id bigint unsigned auto_increment primary key,           # 기본 키
    corporation_id bigint unsigned not null,                 # 기업 외래 키
    member_id bigint unsigned not null,                      # 회원 외래 키
    job_categoryA_id bigint unsigned not null ,              # 직무직업
    interview_date varchar(255) not null,                    # 면접 일자
    interview_method varchar(255),                           # 면접 진행 방식
    interview_tips varchar(255),                             # 면접 TIP 및 특이사항
    interview_passed varchar(255),                           # 합격 여부
    created_date datetime default current_timestamp,
    updated_date datetime default  current_timestamp,
    constraint fk_interview_review_corporation foreign key (corporation_id)  # 기업 외래 키 제약 조건
        references tbl_corporation(id),
    constraint fk_interview_review_member foreign key (member_id)    # 회원 외래 키 제약 조건
        references tbl_member(id),
    constraint fk_interview_review_job_categoryA foreign key (job_categoryA_id)
        references tbl_job_categoryA(id)
    );

select *
from tbl_interview_review;

# 기업명 / 면접 날짜 / 공고 제목 / 작성자 / 전화 번호 / 지원 분야 / 면접 합격 여부
# c.corporation_name / i.interview_date / n.notice_title / m.member_name / m.member_phone / a.apply_type / i.interview_status

# select
#     c.corporation_name,
#     i.interview_date,
#     n.notice_title,
#     m.member_name,
#     m.member_phone,
#     a.apply_type,
#     i.interview_status
# from
#     tbl_interview_review i
#         join
#     tbl_interview i on c.corporation_id = i.id
#         join
#     tbl_notice n on i.notice_id = n.notice_id
#         join
#     tbl_member m on i.member_id = m.member_id
#         join
#     tbl_apply a on i.apply_id = a.apply_id;

select
    c.corporation_name,     -- 기업명
    r. created_date,        -- 작성 날짜
    i.interview_date,       -- 면접 날짜
    n.notice_title,         -- 공고 제목
    m.member_name,          -- 작성자 이름
    m.member_phone,         -- 전화번호
    a.apply_type,           -- 지원 상태
    r.interview_passed      -- 합격 여부
from
    tbl_interview_review r
    join tbl_corporation c on r.corporation_id = c.id
    join tbl_member m on r.member_id = m.id
    join tbl_interview i on r.id = i.id
    join tbl_apply a on i.resume_id = a.resume_id
    join tbl_notice n on a.notice_id = n.id;






