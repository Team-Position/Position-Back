package com.app.positionback.service.notice;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.file.NoticeFileDTO;
import com.app.positionback.domain.notice.*;
import com.app.positionback.repository.apply.ApplyDAO;
import com.app.positionback.repository.corporation.CorporationDAO;
import com.app.positionback.repository.file.FileDAO;
import com.app.positionback.repository.notice.NoticeDAO;
import com.app.positionback.repository.notice.NoticeFileDAO;
import com.app.positionback.service.corporation.CorporationService;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
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
import java.util.List;
import java.util.UUID;

@Service
@Primary
@Slf4j
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class NoticeServiceImpl implements NoticeService {
    private final NoticeDAO noticeDAO;
    private final NoticeFileDAO noticeFileDAO;
    private final FileDAO fileDAO;
    private final ApplyDAO applyDAO;
    private final CorporationDAO corporationDAO;
    private final CorporationService corporationService;

    @Override
    public void saveNotice(NoticeVO noticeVO, String uuid, String path, MultipartFile file) throws IOException {
        NoticeFileDTO noticeFileDTO = new NoticeFileDTO();

        // 공지사항 저장
        noticeDAO.saveNotice(noticeVO);
        noticeFileDTO.setNoticeId(noticeDAO.getLastInsertedId());

        // 파일 저장 및 정보 생성
        FileDTO fileDTO = saveAndLinkFile(file);

        // 파일 정보 저장 및 ID 설정
        fileDAO.save(fileDTO.toVO());
        noticeFileDTO.setFileId(fileDAO.findLastInsertId());

        // 공지사항과 파일 간의 관계 저장
        noticeFileDAO.linkNoticeWithFile(noticeFileDTO.toVO());
    }

//    @Override
//    public void updateNotice(NoticeDTO noticeDTO, MultipartFile file) throws IOException {
//        noticeDAO.updateNotice(noticeDTO);
//        Long noticeId = noticeDTO.getId();
//
//        // 기존 파일 처리 로직 (선택적 파일 삭제 또는 업데이트 가능)
//        noticeFileDAO.deleteFilesByNoticeId(noticeId);
//
//        saveAndLinkFile(file, noticeId);
//    }

    @Override
    public void deleteNotice(Long id) {
        noticeFileDAO.deleteFilesByNoticeId(id);
        noticeDAO.deleteNotice(id);
    }

    // 상세보기
    @Override
    public NoticeDTO getNoticeById(Long id) {
        noticeDAO.updateNoticeReadCount(id);
        return noticeDAO.findNoticeById(id);
    }


    // 기업이 작성한 공고 목록
    @Override
    public NoticeListDTO getNoticesByCorporationId(int page, Pagination pagination, Long corporationId) {
        NoticeListDTO noticeListDTO = new NoticeListDTO();
        pagination.setPage(page);
        pagination.setTotal(noticeDAO.getTotal(pagination,corporationId)); // 총 공고 수를 가져오는 메서드 호출
        pagination.progress();
        noticeListDTO.setPagination(pagination);
        noticeListDTO.setNotices(noticeDAO.findNoticesByCorporationId(pagination,corporationId));

        // 각 상태에 따른 총 개수 조회
        // ongoing 상태 개수 조회
        Pagination ongoingPagination = new Pagination();
        ongoingPagination.setStatus("ongoing");
        int ongoingCount = noticeDAO.getTotal(ongoingPagination, corporationId); // ongoing 상태 개수
        // closed 상태 개수 조회
        Pagination closedPagination = new Pagination();
        closedPagination.setStatus("closed");
        int closedCount = noticeDAO.getTotal(closedPagination, corporationId); // closed 상태 개수

        // Pagination에 상태별 개수 추가
        pagination.setOngoingCount(ongoingCount);
        pagination.setClosedCount(closedCount);

        List<NoticeCategoryRankDTO> categoryRankings = noticeDAO.getRank();
        noticeListDTO.setCategoryRankings(categoryRankings);

        List<NoticeMonthRankDTO> monthRankings = noticeDAO.getMontRank();
        noticeListDTO.setMonthRankings(monthRankings);

        return noticeListDTO;
    }

    // 기업이 작성한 공고 목록 개수
    @Override
    public int getTotal(Pagination pagination,Long corporationId) {
        Pagination ongoingPagination = new Pagination();
        ongoingPagination.setStatus("ongoing");
        int ongoingCount = noticeDAO.getTotal(ongoingPagination, corporationId); // ongoing 상태 개수

        // closed 상태 개수 조회
        Pagination closedPagination = new Pagination();
        closedPagination.setStatus("closed");
        int closedCount = noticeDAO.getTotal(closedPagination, corporationId); // closed 상태 개수

        Pagination applyPagination = new Pagination();
        applyPagination.setStatus("ongoing");
        int applyCount = applyDAO.getTotal(applyPagination,corporationId);

        Pagination reviewPagination = new Pagination();
        reviewPagination.setStatus("review");
        int reviewCount = applyDAO.getTotal(reviewPagination,corporationId);

        // Pagination에 상태별 개수 추가
        pagination.setOngoingCount(ongoingCount);
        pagination.setClosedCount(closedCount);
        pagination.setPositionCount(applyCount);
        pagination.setReviewCount(reviewCount);

        return noticeDAO.getTotal(pagination,corporationId);
    }

    @Override
    public List<NoticeCategoryRankDTO> getNoticeCategoryRank() {
        return noticeDAO.getRank();
    }

    @Override
    public FileDTO getNoticeFileById(Long noticeId) {
        Long fileId = noticeFileDAO.getFileIdByNoticeId(noticeId);
        return fileDAO.findById(fileId);
    }

    @Override
    public List<NoticeDTO> getRecentNotices(Long corporationId) {
        return noticeDAO.findRecentNotices(corporationId);
    }


    // 공고 전체 목록
    @Override
    public NoticeListDTO getAll(int page, Pagination pagination,Search search) {
        NoticeListDTO noticeListDTO = new NoticeListDTO();
        pagination.setPage(page);
        // search 객체가 null이 아닌지 확인
        if (search != null) {
            // 검색 조건에 맞는 총 개수를 설정
            if (search.getKeyword() != null || search.getTypes() != null) {
                pagination.setTotal(noticeDAO.getSearchAllTotal(search));
            } else {
                pagination.setTotal(noticeDAO.getAllTotal());
            }
        } else {
            // search가 null일 경우 전체 공고 개수로 설정
            pagination.setTotal(noticeDAO.getAllTotal());
        }

//        pagination.setTotal(noticeDAO.getAllTotal());
        pagination.progress();
        noticeListDTO.setPagination(pagination);

        List<NoticeDTO> notices = noticeDAO.findAll(pagination, search);

        for(NoticeDTO notice : notices) {
            Long corporationId = notice.getCorporationId();
            FileDTO fileDTO = corporationService.getCorporationFileById(corporationId);
            notice.setFileDTO(fileDTO);
        }

        noticeListDTO.setNotices(notices);
        return noticeListDTO;
    }

    @Override
    public NoticeListDTO getTop3() {
        NoticeListDTO noticeListDTO = new NoticeListDTO();

        // 상위 4개의 공고를 가져옴
        List<NoticeDTO> notices = noticeDAO.findTop3();

        // 각 공고에 파일 정보 추가
        for (NoticeDTO notice : notices) {
            Long corporationId = notice.getCorporationId();
            FileDTO fileDTO = corporationService.getCorporationFileById(corporationId);
            notice.setFileDTO(fileDTO); // 각 공고에 파일 정보 설정
        }

        noticeListDTO.setNotices(notices); // 공고 목록을 NoticeListDTO에 설정
        return noticeListDTO;
    }

    @Override
    public int getAllTotal() {
        return noticeDAO.getAllTotal();
    }

    @Override
    public int getSearchAllTotal(Search search) {
        return noticeDAO.getSearchAllTotal(search);
    }

    private FileDTO saveAndLinkFile(MultipartFile file) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        FileDTO fileDTO = new FileDTO();
        UUID uuid = UUID.randomUUID();

        fileDTO.setFilePath(getPath());

        File directory = new File(rootPath);
        if(!directory.exists()){
            directory.mkdirs();
        }

        if(file.getContentType().startsWith("image")){
            file.transferTo(new File(rootPath, uuid.toString() + "_" + file.getOriginalFilename()));
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

//    @Override
//    public void saveNotice(NoticeDTO noticeDTO, MultipartFile file) throws IOException {
//        // 공지사항 저장
//        noticeDAO.saveNotice(noticeDTO);
//        Long noticeId = noticeDTO.getId(); // 공지사항 ID 가져오기
//        if (noticeId == null) {
//            noticeId = noticeDAO.getLastInsertedId(); // ID를 DB에서 가져오기
//        }
//
//        // 파일 처리 및 저장
//        String rootPath = "C:/upload/" + getPath();
//        FileDTO fileDTO = new FileDTO();
//        UUID uuid = UUID.randomUUID();
//
//        fileDTO.setFilePath(getPath());
//        File directory = new File(rootPath);
//        if (!directory.exists()) {
//            directory.mkdirs();
//        }
//
//        file.transferTo(new File(rootPath, uuid.toString() + "_" + file.getOriginalFilename()));
//        fileDTO.setFileName(uuid.toString() + "_" + file.getOriginalFilename());
//
//        // 파일 정보 저장
//        noticeFileDAO.saveFile(fileDTO);
//        Long fileId = noticeFileDAO.getLastInsertedId(); // 파일 ID 가져오기
//
//        // 공지사항과 파일 연결
//        noticeFileDAO.linkNoticeWithFile(noticeId, fileId);
//    }
//
//    private String getPath(){
//        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
//    }


}
