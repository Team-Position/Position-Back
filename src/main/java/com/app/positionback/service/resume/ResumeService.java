package com.app.positionback.service.resume;

import com.app.positionback.domain.resume.ResumeDTO;

public interface ResumeService {
    public ResumeDTO getResumeByMemberId(Long memberId);
}
