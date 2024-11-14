package com.app.positionback.domain.reply;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ReplyVO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private String memberNickname;
    private Long postId;
    private String replyContent;
    private String createdDate;
    private String updatedDate;
}
