package com.app.positionback.service.inquiry;

import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface InquiryService {
    // 1:1 문의 작성


    void writeInquiry(InquiryDTO inquiryDTO);
}