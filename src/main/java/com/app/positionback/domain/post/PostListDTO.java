package com.app.positionback.domain.post;

import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter @Setter @ToString
public class PostListDTO {
    private List<PostDTO> posts;
    private Pagination pagination;
    private Search search;
}
