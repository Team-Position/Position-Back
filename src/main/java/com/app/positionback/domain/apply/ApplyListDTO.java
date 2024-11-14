package com.app.positionback.domain.apply;

import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter @Setter @ToString
public class ApplyListDTO {
    private List<ApplyDTO> applies;
    private Pagination pagination;
    private Search search;
}
