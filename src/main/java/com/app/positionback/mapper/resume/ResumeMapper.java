package com.app.positionback.mapper.resume;

import com.app.positionback.domain.resume.ResumeDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ResumeMapper {
    public ResumeDTO selectByMemberId(Long memberId);
}
