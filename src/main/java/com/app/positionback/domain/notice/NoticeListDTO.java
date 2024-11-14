package com.app.positionback.domain.notice;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Setter @Getter @ToString
public class NoticeListDTO {
    private List<NoticeDTO> notices;
    private Pagination pagination;
    private List<NoticeCategoryRankDTO> categoryRankings;
    private List<NoticeMonthRankDTO> monthRankings;
    private Search search;
}
