package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.InquiryFileDTO;
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
    public void writeInquiry(InquiryVO inquiryVO, String uuid, String path, MultipartFile file) throws IOException {
        InquiryFileDTO inquiryFileDTO = new InquiryFileDTO();

        // 문의 페이지 작성
        inquiryDAO.insertInquiry(inquiryVO);
        inquiryFileDTO.setInquiryId(inquiryDAO.getLastInsertedId());

        // 파일 저장 및 정보 생성
        FileDTO fileDTO = saveAndLinkFile(file);

        // 파일 정보 저장 및 ID 설정
        fileDAO.save(fileDTO.toVO());
        inquiryFileDTO.setFileId(fileDAO.findLastInsertId());

        // 문의 작성페이지와 첨부파일 간 관계 저장
        inquiryFileDAO.linkInquiryWithFile(inquiryFileDTO.toVO());
    };

    private FileDTO saveAndLinkFile(MultipartFile file) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        FileDTO fileDTO = new FileDTO();
        UUID uuid = UUID.randomUUID();

        fileDTO.setFilePath(getPath());

        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        if (file.getContentType().startsWith("image")) {
            file.transferTo(new File(rootPath, uuid.toString() + "." + file.getOriginalFilename()));
            fileDTO.setFileName(uuid.toString() + "_" + file.getOriginalFilename());

            FileOutputStream fileOutputStream = new FileOutputStream(new File(rootPath, "t_" + uuid.toString() + "_" + file.getOriginalFilename()));
            Thumbnailator.createThumbnail(file.getInputStream(), fileOutputStream, 53, 68);
            fileOutputStream.close();
        }

        // 파일 크기 설정
        String fileSize = String.format("%.2f", file.getSize() / 1024.0 / 1024.0);
        fileDTO.setFileSize(fileSize);

        return fileDTO;
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}