package com.app.positionback.repository.notice;

import com.app.positionback.domain.notice.NoticeCategoryRankDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeMonthRankDTO;
import com.app.positionback.domain.notice.NoticeVO;
import com.app.positionback.mapper.notice.NoticeMapper;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeDAO {
    private final NoticeMapper noticeMapper;

    // 새로운 공고 저장
    public void saveNotice(NoticeVO noticeVO) {
        noticeMapper.insertNotice(noticeVO);
    }

    // 마지막으로 삽입된 공고 ID 가져오기
    public Long getLastInsertedId() {
        return noticeMapper.getLastInsertId();
    }

    // 기존 공고 수정
    public void updateNotice(NoticeDTO noticeDTO) {
        noticeMapper.updateNotice(noticeDTO);
    }

    // 공고 ID로 삭제
    public void deleteNotice(Long id) {
        noticeMapper.deleteNotice(id);
    }

    // 공고 ID로 조회
    public NoticeDTO findNoticeById(Long id) {
        return noticeMapper.selectNoticeById(id);
    }

    // 기업별 공고 목록 조회
    public List<NoticeDTO> findNoticesByCorporationId(Pagination pagination,Long corporationId) {
        return noticeMapper.selectNoticesByCorporationId(pagination,corporationId);
    }

    public int getTotal(Pagination pagination,Long corporationId) {
        return noticeMapper.selectCount(pagination,corporationId);
    }

    // 공고 카테고리 랭킹
    public List<NoticeCategoryRankDTO> getRank(){
        return noticeMapper.selectTopJobCategories();
    }

    // 공고 월별 채용 순위
    public List<NoticeMonthRankDTO> getMontRank(){
        return noticeMapper.selectMonthRank();
    }

    // readcount 증가
    public void updateNoticeReadCount(Long id) {
        noticeMapper.updateNoticeReadcount(id);
    }

    public List<NoticeDTO> findRecentNotices(Long corporationId) {
        return noticeMapper.selectRecentNotices(corporationId);
    }

    // 공고 전체 목록(더보기)
    public List<NoticeDTO> findAll(Pagination pagination, Search search) {
        return noticeMapper.selectAll(pagination, search);
    }

    // 공고 전체 개수
    public int getAllTotal() {
        return noticeMapper.selectAllCount();
    }

    // 공고 검색 개수
    public int getSearchAllTotal(Search search) {
        return noticeMapper.selectSearchAllCount(search);
    }

    // 공고 인기순 4개
    public List<NoticeDTO> findTop3(){
        return noticeMapper.selectTop3();
    }

}
