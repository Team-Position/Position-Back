create table tbl_inquiry_file (
    id bigint unsigned auto_increment primary key,
    inquiry_id bigint unsigned not null,                   -- 문의 ID
    file_id bigint unsigned not null,                      -- 파일 ID
    constraint fk_inquiry_file_inquiry foreign key (inquiry_id)
        references tbl_inquiry(id),
    constraint fk_inquiry_file_file foreign key (file_id)
        references tbl_file(id)
);

select * from tbl_inquiry_file;
