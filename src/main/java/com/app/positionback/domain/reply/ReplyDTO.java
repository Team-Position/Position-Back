package com.app.positionback.domain.reply;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private String memberNickname;
    private Long postId;
    private String replyContent;
    private String createdDate;
    private String updatedDate;

    // 관리자 페이지 댓글 작성 관리 부분 추가
    private String memberName;
    private String postTitle;

    public ReplyVO toVO() {
        return new ReplyVO(id, memberId,memberNickname, postId, replyContent, createdDate, updatedDate);
    }
}
