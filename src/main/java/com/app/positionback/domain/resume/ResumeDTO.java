package com.app.positionback.domain.resume;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ResumeDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private Long educationId;
    private Long jobCategoryId;
    private String resumeStatus;
    private String resumeTitle;
    private String createdDate;
    private String updatedDate;

    public ResumeVO toVO() {
        return new ResumeVO(id, memberId, educationId, jobCategoryId, resumeStatus, resumeTitle,createdDate,updatedDate);
    }
}
