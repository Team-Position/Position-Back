package com.app.positionback.repository.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.mapper.resume.ResumeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ResumeDAO {
    private final ResumeMapper resumeMapper;

    public ResumeDTO findResumeById(Long id){
        return resumeMapper.selectResumeById(id);
    }
    public ResumeDTO findRepresentativeByMemberId(Long memberId) { return resumeMapper.selectRepresentativeByMemberId(memberId); }
    public List<ResumeDTO> findAllByMemberId(Long memberId){ return resumeMapper.selectAllByMemberId(memberId); }
}
