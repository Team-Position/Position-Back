package com.app.positionback.service.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.repository.resume.ResumeDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
@Slf4j
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService{

    private final ResumeDAO resumeDAO;

    @Override
    public ResumeDTO getResumeByMemberId(Long memberId) {
        return resumeDAO.findByMemberId(memberId);
    }
}
