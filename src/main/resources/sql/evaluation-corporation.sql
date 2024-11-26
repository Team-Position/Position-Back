create table tbl_evaluation_corporation (
    id bigint unsigned auto_increment primary key,  # 기본 키
    corporation_review_id bigint unsigned not null ,
    constraint fk_evaluation_corporation_evaluation foreign key(id)
          references tbl_evaluation(id),
    constraint  fk_evaluation_corporation_review foreign key (corporation_review_id)
          references  tbl_corporation_review(id) on delete cascade
);

drop table tbl_evaluation_corporation;
select * from tbl_evaluation_corporation;

