package com.app.positionback.domain.position;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PositionDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private Long noticeId;
    private String positionStatus;

    // 관리자 페이지 - 면접 현황 관리
    private String corporationName;
    private String noticeWorkStartDate;
    private String noticeTitle;
    private String memberName;
    private String memberPhone;
    private String noticeJobCategoryName;
}
