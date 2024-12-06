create table tbl_reply (
    id bigint unsigned auto_increment primary key,           # 기본 키
    member_id bigint unsigned not null,                      # 회원 외래 키
    post_id bigint unsigned not null,                        # 게시글 외래 키
    reply_content varchar(255) not null,                    # 내용
    created_date datetime default current_timestamp,        # 작성일
    updated_date datetime default current_timestamp,       # 수정일
    constraint fk_reply_member foreign key (member_id)     # 회원 외래 키 제약 조건
        references tbl_member(id),
    constraint fk_reply_post foreign key (post_id)        # 게시글 외래 키 제약 조건
        references tbl_post(id)
    );

select *
from tbl_reply;

# 작성자, 작성일, 게시글 제목, 댓글 내용
# m.member_name, r.created_date, p.post_title, r.reply_content

select
    m.member_name,
    r.created_date,
    p.post_title,
    r.reply_content
from
    tbl_reply r
    join tbl_member m on r.member_id = m.id
    join tbl_post p on r.post_id = p.id




