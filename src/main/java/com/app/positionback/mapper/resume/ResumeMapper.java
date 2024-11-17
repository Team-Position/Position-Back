package com.app.positionback.mapper.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ResumeMapper {
    public ResumeDTO selectResumeById(Long id);
    public ResumeDTO selectRepresentativeByMemberId(Long memberId);
    public List<ResumeDTO> selectAllByMemberId(Long memberId);
}
