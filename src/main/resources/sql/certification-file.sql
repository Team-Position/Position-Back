create table tbl_certification_file(
    id bigint unsigned auto_increment primary key ,
    apply_id bigint unsigned not null,
    constraint fk_certification_file_file foreign key (id)
                                   references tbl_file(id),
    constraint fk_certification_file_position foreign key (apply_id)
                                   references  tbl_apply(id) on delete cascade
);

select *
from tbl_certification_file;