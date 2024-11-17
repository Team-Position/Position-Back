package com.app.positionback.domain.resume;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ResumeVO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long memberId;
    private Long educationId;
    private Long jobCategoryId;
    private String resumeStatus;
    private String resumeTitle;
    private String createdDate;
    private String updatedDate;
}
