package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.FileVO;
import com.app.positionback.domain.file.InquiryFileDTO;
import com.app.positionback.domain.file.InquiryFileVO;
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
        // 문의글 저장
        inquiryDAO.insertInquiry(inquiryDTO); // 이 시점에 inquiryDTO.id가 설정됨

        // 파일 정보가 있는 경우 처리
        if (inquiryDTO.getFileName() != null && !inquiryDTO.getFileName().isEmpty()) {
            // 파일 정보 저장
            FileVO fileVO = new FileVO();
            fileVO.setFileName(inquiryDTO.getFileName());

            // 파일 경로 재설정
            String filePath = getPath();
            fileVO.setFilePath(filePath);

            // 파일 크기 재설정
            File file = new File("C:/upload/" + filePath + "/" + inquiryDTO.getFileName());
            if (file.exists()) {
                fileVO.setFileSize(String.valueOf(file.length()));
            } else {
                log.error("파일을 찾을 수 없습니다: {}", file.getAbsolutePath());
                throw new RuntimeException("파일을 찾을 수 없습니다.");
            }

            // 로그로 파일 정보 확인
            log.info("저장할 파일 정보: {}", fileVO);

            // 파일 정보 저장
            fileDAO.save(fileVO); // 이 시점에 fileVO.id가 설정됨

            // 문의글과 파일의 관계 저장
            InquiryFileDTO inquiryFileDTO = new InquiryFileDTO();
            inquiryFileDTO.setInquiryId(inquiryDTO.getId());
            inquiryFileDTO.setFileId(fileVO.getId());

            inquiryFileDAO.linkInquiryWithFile(inquiryFileDTO);
        }
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}
