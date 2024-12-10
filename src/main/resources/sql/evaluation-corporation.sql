create table tbl_evaluation_corporation (
    id bigint unsigned auto_increment primary key,        -- 기본 키
    corporation_id bigint unsigned not null,             -- 기업 ID (tbl_corporation과 연결)
    notice_id bigint unsigned not null,                  -- 공고 ID (tbl_notice와 연결)
    member_id bigint unsigned not null,                  -- 근무자 ID (tbl_member와 연결)
    created_date datetime default current_timestamp,    -- 생성일 (자동 생성)
    updated_date datetime default current_timestamp, -- 수정일 (자동 갱신)
    constraint fk_evaluation_corporation_corporation foreign key (corporation_id)
        references tbl_corporation(id) on delete cascade,
    constraint fk_evaluation_corporation_notice foreign key (notice_id)
        references tbl_notice(id) on delete cascade,
    constraint fk_evaluation_corporation_member foreign key (member_id)
        references tbl_member(id) on delete cascade
);

drop table tbl_evaluation_corporation;
select * from tbl_evaluation_corporation;

# 기업명, 작성일, 포지션 근무일, 공고 제목, 근무자, 전화번호, 지원 분야, 상태
# c.corporation_name, ec.created_date n.notice_work_start_date, n.notice_title, m.member_name, m.member_phone, a.apply_type, p.position_status
# tbl_corporation, tbl_notice, tbl_member, tbl_apply, tbl_position

SELECT
    c.corporation_name,               -- 기업명
    ec.created_date,                  -- 작성일 (tbl_evaluation_corporation에서 가져옴)
    n.notice_work_start_date,         -- 포지션 근무일 (tbl_notice에서 가져옴)
    n.notice_title,                   -- 공고 제목 (tbl_notice에서 가져옴)
    m.member_name,                    -- 근무자 (tbl_member에서 가져옴)
    m.member_phone,                   -- 전화번호 (tbl_member에서 가져옴)
    a.apply_type,                   -- 지원 상태 (tbl_apply에서 가져옴)
    p.position_status                 -- 상태 (tbl_position에서 가져옴)
FROM
    tbl_evaluation_corporation ec
        JOIN
    tbl_corporation c ON ec.id = c.id  -- tbl_evaluation_corporation과 tbl_corporation 연결
        JOIN
    tbl_notice n ON c.id = n.corporation_id  -- tbl_corporation과 tbl_notice 연결
        JOIN
    tbl_apply a ON n.id = a.notice_id  -- tbl_notice와 tbl_apply 연결
        JOIN
    tbl_member m ON a.resume_id = m.id  -- tbl_apply와 tbl_member 연결
        JOIN
    tbl_position p ON n.id = p.notice_id;
-- tbl_notice와 tbl_position 연결
