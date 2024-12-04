package com.app.positionback.domain.interview;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long corporationId;
    private Long resumeId;
//    private String interviewDate;
    private String interviewApplyPassDate;
    private String interviewStatus = "면접 예정";

    // 관리자 페이지 - 면접 현황 관리
    private String corporationName;
    private String noticeTitle;
    private String memberName;
    private String memberPhone;
    private String applyType;
    private String noticeJobCategoryName;

    public InterviewVO toVO() {
        return new InterviewVO(id, corporationId, resumeId, interviewApplyPassDate, interviewStatus);
    }
}
