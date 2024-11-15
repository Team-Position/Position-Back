package com.app.positionback.repository.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.mapper.resume.ResumeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ResumeDAO {
    private final ResumeMapper resumeMapper;

    public ResumeDTO findByMemberId(Long memberId){
        return resumeMapper.selectByMemberId(memberId);
    }
}
