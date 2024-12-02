package com.app.positionback.service.inquiry;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.FileVO;
import com.app.positionback.repository.file.FileDAO;
import com.app.positionback.repository.inquiry.InquiryDAO;
import com.app.positionback.repository.inquiry.InquiryFileDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
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
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class InquiryFileServiceImpl implements InquiryFileService{

    private final FileDAO fileDAO;
    private final InquiryFileDAO inquiryFileDAO;
    private final InquiryDAO inquiryDAO;

    @Override
    public FileVO saveFile(MultipartFile file) {
        String rootPath = "C:/upload/" + getPath() + "/";
        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        File saveLocation = new File(rootPath + uniqueFileName);
        try {
            file.transferTo(saveLocation);
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패", e);
        }
        // 파일 정보 객체 생성 (데이터베이스에 저장하지 않음)
        FileVO fileVO = new FileVO();
        fileVO.setFileName(uniqueFileName);
        fileVO.setFileSize(String.valueOf(file.getSize()));
        fileVO.setFilePath(getPath());

        // 데이터베이스에 저장하지 않고 파일 정보만 반환
        return fileVO;
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}
