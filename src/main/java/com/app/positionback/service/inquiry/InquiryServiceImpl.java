package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.InquiryFileDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryVO;
import com.app.positionback.repository.file.FileDAO;
import com.app.positionback.repository.inquiry.InquiryDAO;
import com.app.positionback.repository.inquiry.InquiryFileDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@Primary
@Slf4j
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class InquiryServiceImpl implements InquiryService {
    private final InquiryDAO inquiryDAO;
    private final InquiryFileDAO inquiryFileDAO;
    private final FileDAO fileDAO;

    @Override
    public void writeInquiry(InquiryDTO inquiryDTO) {
        InquiryFileDTO inquiryFileDTO = new InquiryFileDTO();

        // 문의 페이지 작성
        inquiryDAO.insertInquiry(inquiryDTO);

        // 파일 저장 및 정보 생성
        FileDTO fileDTO = new FileDTO();

        // 파일 정보 저장 및 ID 설정
        fileDAO.save(fileDTO.toVO());

        // 문의 작성페이지와 첨부파일 간 관계 저장
        inquiryFileDAO.linkInquiryWithFile(inquiryFileDTO.toVO());
    };

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}