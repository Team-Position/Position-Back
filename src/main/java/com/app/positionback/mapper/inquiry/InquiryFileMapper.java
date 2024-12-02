package com.app.positionback.mapper.inquiry;

import com.app.positionback.domain.file.InquiryFileVO;
import com.app.positionback.domain.inquiry.InquiryVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryFileMapper {
    // 파일 추가
    public void insertInquiryFile(InquiryFileVO inquiryFileVO);
}
