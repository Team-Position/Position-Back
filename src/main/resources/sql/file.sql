create table tbl_file(
    id  bigint unsigned auto_increment primary key,
    file_name varchar(255) not null ,
    file_path varchar(255) not null ,
    file_size varchar(255) not null ,
    created_date datetime default current_timestamp,
    updated_date datetime default  current_timestamp
);

select * from tbl_file;