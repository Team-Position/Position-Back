create table tbl_post (
    id bigint unsigned auto_increment primary key,
    member_id bigint unsigned not null,
    post_title varchar(255) not null,
    post_content varchar(255) not null,
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    post_read_count bigint unsigned default 0,
    constraint fk_post_member foreign key (member_id)
        references tbl_member(id)
);

select * from tbl_post;

delete from tbl_post
where id = 5;

show databases ;

use test;

create database test;

# member_name, created_date, post_title, post_content, post_read_count

select
    m.member_name,         -- 회원 이름
    p.created_date,                -- 게시글 작성일
    p.post_title,         -- 게시글 제목
    p.post_content,     -- 게시글 내용
    p.post_read_count -- 게시글 조회수
from
    tbl_member m
        join
    tbl_post p
    on
        m.id = p.member_id;


