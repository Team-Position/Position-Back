package com.app.positionback.domain.interviewreview;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class InterviewReviewDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long corporationId;
    private Long jobcategoryAId;
    private String interviewDate;
    private String interviewMethod;
    private String interviewTips;
    private String interviewPassed;
    private String createdDate;
    private String updatedDate;

    // 관리자 페이지 후기 작성 관리 추가
    private String corporationName;
    private String noticeTitle;
    private String memberName;
    private String memberPhone;
    private String applyType;

    public InterviewReviewVO toVO() {
        return new InterviewReviewVO(id, corporationId, jobcategoryAId, interviewDate, interviewMethod, interviewTips, interviewPassed, createdDate, updatedDate);
    }
}
