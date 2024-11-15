package com.app.positionback.service.apply;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.apply.ApplyVO;
import com.app.positionback.domain.file.CertificationFileDTO;
import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.repository.apply.ApplyDAO;
import com.app.positionback.repository.file.CertificationFileDAO;
import com.app.positionback.repository.file.FileDAO;
import com.app.positionback.repository.review.CorporationReviewDAO;
import com.app.positionback.utill.Pagination;
import lombok.RequiredArgsConstructor;
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
import java.util.List;
import java.util.UUID;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ApplyServiceImpl implements ApplyService{
    private final ApplyDAO applyDAO;
    private final FileDAO fileDAO;
    private final CertificationFileDAO certificationFileDAO;
    private final CorporationReviewDAO corporationReviewDAO;


    @Override
    public ApplyListDTO getApplyByCorporationId(int page, Pagination pagination, Long corporationId) {
        ApplyListDTO applyListDTO = new ApplyListDTO();
        pagination.setPage(page);
        pagination.setTotal(applyDAO.getTotal(pagination,corporationId));
        pagination.progress();
        applyListDTO.setPagination(pagination);

        // 지원 목록 가져오기
        List<ApplyDTO> applies = applyDAO.findApplyByCorporationId(pagination, corporationId);

        // 각 지원 항목에 파일을 추가
        applies.forEach(apply -> {
            // applyId에 해당하는 파일을 가져와 설정
            apply.setFile(certificationFileDAO.getFileIdByApplyId(apply.getApplyId()).orElse(null));
            apply.setCorporationReview(corporationReviewDAO.getCorporationReviewByApplyId(apply.getApplyId()).orElse(null));
        });

        applyListDTO.setApplies(applies);

//        applyListDTO.setApplies(applyDAO.findApplyByCorporationId(pagination,corporationId));

        Pagination ongoingPagination = new Pagination();
        ongoingPagination.setStatus("ongoing");
        int ongoingCount = applyDAO.getTotal(ongoingPagination,corporationId);

        Pagination closedPagination = new Pagination();
        closedPagination.setStatus("closed");
        int closedCount = applyDAO.getTotal(closedPagination,corporationId);

        Pagination postitionPagination = new Pagination();
        postitionPagination.setStatus("position");
        int paginationCount = applyDAO.getTotal(postitionPagination,corporationId);

        Pagination reviewPagination = new Pagination();
        reviewPagination.setStatus("review");
        int reviewCount = applyDAO.getTotal(reviewPagination,corporationId);

        pagination.setOngoingCount(ongoingCount);
        pagination.setClosedCount(closedCount);
        pagination.setPositionCount(paginationCount);
        pagination.setReviewCount(reviewCount);


        return applyListDTO;
    }

    @Override
    public int getTotal(Pagination pagination, Long corporationId) {
        return applyDAO.getTotal(pagination,corporationId);
    }

    @Override
    public void setApplyStatus(ApplyVO applyVO) {
        applyDAO.updateApplyStatus(applyVO);
    }

    @Override
    public void uploadCertificationFile(MultipartFile file, Long applyId) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        FileDTO fileDTO = new FileDTO();
        CertificationFileDTO certificationFileDTO = new CertificationFileDTO();

        // UUID 생성 및 파일 경로 설정
        UUID uuid = UUID.randomUUID();
        fileDTO.setFilePath(getPath());
        String uniqueFileName = uuid.toString() + "_" + file.getOriginalFilename();

        // 디렉토리 생성
        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 파일 저장
        if (file.getContentType().startsWith("image")) {
            // 원본 이미지 저장
            file.transferTo(new File(rootPath, uniqueFileName));
            fileDTO.setFileName(uniqueFileName);
        }

        // 파일 크기 설정
        String fileSize = String.format("%.2f", file.getSize() / 1024.0 / 1024.0); // MB 단위로 파일 크기 설정
        fileDTO.setFileSize(fileSize);

        // 파일 정보 저장
        fileDAO.save(fileDTO.toVO());

        // CertificationFileDTO 설정 및 저장
        certificationFileDTO.setFileId(fileDAO.findLastInsertId());
        certificationFileDTO.setApplyId(applyId);
        certificationFileDAO.save(certificationFileDTO.toVO());
    }

    @Override
    public ApplyDTO getApplyById(Long applyId) {
        ApplyDTO applyDTO = applyDAO.findApplyById(applyId);

        // 기존 String 값에서 LocalDate로 변환 (예: "2024-11-01 00:00:00")
        String noticeWorkStartDateString = applyDTO.getNoticeWorkStartDate();
        String noticeWorkEndDateString = applyDTO.getNoticeWorkEndDate();

        // 날짜 부분만 추출 (예: "2024-11-01")
        String startDatePart = noticeWorkStartDateString.split(" ")[0];
        String endDatePart = noticeWorkEndDateString.split(" ")[0];

        // "yyyy-MM-dd" 형식으로 날짜 파싱
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate noticeWorkStartDate = LocalDate.parse(startDatePart, inputFormatter);
        LocalDate noticeWorkEndDate = LocalDate.parse(endDatePart, inputFormatter);

        // LocalDate를 "2024년 11월 1일" 형식으로 포맷
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일");
        String formattedStartDate = noticeWorkStartDate.format(outputFormatter);
        String formattedEndDate = noticeWorkEndDate.format(outputFormatter);

        // 포맷된 날짜를 applyDTO에 설정
        applyDTO.setNoticeWorkStartDate(formattedStartDate);
        applyDTO.setNoticeWorkEndDate(formattedEndDate);

        return applyDTO;
    }

    @Override
    public void saveApply(ApplyVO applyVO) {
        applyDAO.saveApply(applyVO);
    }

    private String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}
