package com.app.positionback.repository.inquiry;

import com.app.positionback.domain.file.InquiryFileVO;
import com.app.positionback.mapper.inquiry.InquiryFileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InquiryFileDAO {
    private final InquiryFileMapper inquiryFileMapper;

    // 문의와 첨부파일 연결
    public void linkInquiryWithFile(InquiryFileVO inquiryFileVO) {
        inquiryFileMapper.insertInquiryFile(inquiryFileVO);
    }
}
