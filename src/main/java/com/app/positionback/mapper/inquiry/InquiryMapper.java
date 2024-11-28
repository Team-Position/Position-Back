package com.app.positionback.mapper.inquiry;

import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryMapper {

    // 1:1 문의 작성
    public void insert(InquiryDTO inquiryDTO);

    // 가장 최근 작성된 문의 ID 가져오기
    public Long getLastInsertId();
}
