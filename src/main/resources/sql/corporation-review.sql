create table tbl_corporation_review(
    id bigint unsigned auto_increment primary key ,
    review_content varchar(500) not null ,
    review_tips varchar(255) not null,
    apply_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    constraint fk_corporation_review_apply foreign key (apply_id)
        references tbl_apply(id) on delete cascade
);

select * from tbl_corporation_review;


