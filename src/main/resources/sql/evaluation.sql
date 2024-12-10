create table tbl_evaluation (
    id bigint unsigned auto_increment primary key,  # 기본 키
    evaluation_overall varchar(255),                # 전반적 평가
    evaluation_difficulty varchar(255),             # 난이도
    evaluation_result varchar(255) default '수료'  # 결과 (기본값: 수료)
);

select * from tbl_evaluation;

alter table tbl_evaluation
add column member_id bigint unsigned not null,
add constraint fk_evaluation_member foreign key (member_id) references tbl_member(id) on delete cascade;

alter table tbl_evaluation
add column created_date datetime default current_timestamp,
add column updated_date datetime default current_timestamp on update current_timestamp;

# 긍정적 보통 부정적
# 쉬움 보통 어려움

