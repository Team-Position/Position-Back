package com.app.positionback.domain.post;

import com.app.positionback.utill.Pagination;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private String memberNickname;
    private String postTitle;
    private String postContent;
    private int postReadCount;
    private String createdDate;
    private String updatedDate;
    private Integer postReplyCount;


    private List<PostDTO> posts;
    private Pagination pagination;
    private Integer total;

    // 관리자 페이지 게시글 작성 관리 부분 추가
    private String memberName;

    public PostVO toVO() {
        return new PostVO(id, memberId,memberNickname,postTitle, postContent, postReadCount, createdDate, updatedDate);
    }
}
