create table tbl_position(
    id bigint unsigned auto_increment primary key ,
    member_id bigint unsigned not null,
    notice_id bigint unsigned not null,
    position_status varchar(255) default '이수 예정',
    constraint fk_position_member foreign key (member_id)
                         references tbl_member(id),
    constraint fk_position_notice foreign key (notice_id)
        references tbl_notice(id)

);

select * from tbl_position;

SELECT
    n.notice_title,
    c.corporation_name,
    n.notice_work_start_date,
    m.member_name,
    m.member_phone,
    n.notice_job_category_name,
    p.position_status
FROM
    tbl_position p
        JOIN tbl_notice n ON p.notice_id = n.id
        JOIN tbl_corporation c ON n.corporation_id = c.id
        JOIN tbl_member m ON p.member_id = m.id;


