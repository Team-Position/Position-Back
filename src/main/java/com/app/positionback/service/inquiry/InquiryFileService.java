package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileVO;
import org.springframework.web.multipart.MultipartFile;

public interface InquiryFileService {
// 비동기로 받을 메서드임
    FileVO saveFile(MultipartFile file);

}
