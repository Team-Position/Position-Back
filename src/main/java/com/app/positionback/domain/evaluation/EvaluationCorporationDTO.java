package com.app.positionback.domain.evaluation;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EvaluationCorporationDTO {
    @EqualsAndHashCode.Include
    private Long evaluationId;
    private Long corporationReviewId;

    // 관리자 페이지 포지션(인턴십) 후기(기업) 관련 추가
    private String corporationName;
    private String noticeWorkStartDate;
    private String noticeTitle;
    private String memberName;
    private String memberPhone;
    private String applyType;
    private String positionStatus;
    private String createdDate;

    public EvaluationCorporationVO toVO() {
        return new EvaluationCorporationVO(evaluationId, corporationReviewId);
    }
}
