package com.app.positionback.service.resume;

import com.app.positionback.domain.resume.ResumeDTO;

import java.util.List;

public interface ResumeService {
    public ResumeDTO getResumeById(Long id);
    public ResumeDTO getRepresentativeByMemberId(Long memberId);
    public List<ResumeDTO> getAllByMemberId(Long memberId);
}
