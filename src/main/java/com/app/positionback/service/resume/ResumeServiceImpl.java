package com.app.positionback.service.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.repository.resume.ResumeDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
@Slf4j
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ResumeServiceImpl implements ResumeService{

    private final ResumeDAO resumeDAO;

    @Override
    public ResumeDTO getResumeById(Long id) {
        return resumeDAO.findResumeById(id);
    }
    @Override
    public ResumeDTO getRepresentativeByMemberId(Long memberId) {
        return resumeDAO.findRepresentativeByMemberId(memberId);
    }
    @Override
    public List<ResumeDTO> getAllByMemberId(Long memberId) { return resumeDAO.findAllByMemberId(memberId); }
}
