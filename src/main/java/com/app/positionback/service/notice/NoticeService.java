package com.app.positionback.service.notice;

import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.notice.NoticeCategoryRankDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.domain.notice.NoticeVO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NoticeService {
    // 공고 저장
    public void saveNotice(NoticeVO noticeVO, String uuid, String path, MultipartFile file)  throws IOException;

    // 공고 수정
//    public void updateNotice(NoticeDTO noticeDTO, MultipartFile file) throws IOException;

    // 공고 삭제
    public void deleteNotice(Long id);

    // 공고 상세 조회
    public NoticeDTO getNoticeById(Long id);

    // 기업별 공고 목록 조회
    public NoticeListDTO getNoticesByCorporationId(int page, Pagination pagination, Long corporationId);

//    기업별 공고 전체 목록 개수
    public int getTotal(Pagination pagination, Long corporationId);
    // 공고 카테고리 랭킹
    public List<NoticeCategoryRankDTO> getNoticeCategoryRank();

    public FileDTO getNoticeFileById(Long noticeId);

    public List<NoticeDTO> getRecentNotices(Long corporationId);

    //공고 전체 목록 더보기
    public NoticeListDTO getAll(int page, Pagination pagination, Search search);
    // 공고 인기순 4개
    public NoticeListDTO getTop3();

    // 공고 전체 개수
    public int getAllTotal();

    public int getSearchAllTotal(Search search);
}
