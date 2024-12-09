package com.app.positionback.repository.admin;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationPositionerDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.interview.InterviewDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.position.PositionDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.mapper.admin.AdminMapper;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.MergedAnnotations;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdminDAO {
    private final AdminMapper adminMapper;

    // 회원 관리
    // 일반 회원 조회
    public List<MemberDTO> memberInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllMembers(pagination, search);
    }

    // 일반 회원 전체 인원 조회
    public int getMemberTotal() {
        return adminMapper.selectMemberTotal();
    }

    // 일반 회원 검색 결과 전체 조회
    public int getTotalWithMemberSearch(Search search) {
        return adminMapper.selectTotalWithMemberSearch(search);
    }

    // 일반 회원 상태 변경
    public void updateMemberStatus(Long memberId, String status) {
        adminMapper.updateMemberStatus(memberId, status);
    }

    // 기업 회원 조회
    public List<CorporationDTO> corporationInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllCorporationMembers(pagination, search);
    }

    // 기업 회원 전체 인원 조회
    public int getCorporationTotal() {
        return adminMapper.selectCorporationTotal();
    }

    // 기업 회원 검색 결과 전체 조회
    public int getTotalWithCorporationSearch(Search search) {
        return adminMapper.selectTotalWithCorporationSearch(search);
    }

    // 지원현황 관리
    // 지원 현황 조회
    public List<ApplyDTO> applyInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllApply(pagination, search);
    }

    // 지원 현황 전체 개수 조회
    public int getApplyTotal() {
        return adminMapper.selectApplyTotal();
    }

    // 지원 현황 검색 결과 전체 조회
    public int getTotalWithApplySearch(Search search) {
        return adminMapper.selectTotalWithApplySearch(search);
    }

    // 면접 현황 조회
    public List<InterviewDTO> interviewInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllInterview(pagination, search);
    }

    // 면접 현황 전체 개수 조회
    public int getInterviewTotal() {
        return adminMapper.selectInterviewTotal();
    }

    // 면접 현황 검색 결과 전체 조회
    public int getTotalWithInterviewSearch(Search search) {
        return adminMapper.selectTotalWithInterviewSearch(search);
    }

    // 포지션 현황 조회
    public List<PositionDTO> positionInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllPosition(pagination, search);
    }

    // 포지션 현황 전체 인원 조회
    public int getPositionTotal() {
        return adminMapper.selectPositionTotal();
    }

    // 포지션 현황 검색 결과 전체 조회
    public int getTotalWithPositionSearch(Search search) {
        return adminMapper.selectTotalWithPositionSearch(search);
    }

    // 결제 관리
    // 지원료 결제
    public List<PaymentDTO> paymentInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllPayment(pagination, search);
    }

    // 지원료 결제 현황 전체 조회
    public int getPaymentTotal() {
        return adminMapper.selectPaymentTotal();
    }

    // 지원료 결제 검색 결과 전체 조회
    public int getTotalWithPaymentSearch(Search search) {
        return adminMapper.selectTotalWithPaymentSearch(search);
    }

    // 작성 관리
    // 공고 작성
    public List<NoticeDTO> noticeInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllNotice(pagination, search);
    }

    // 공고 작성 현황 전체 갯수 조회
    public int getNoticeTotal() {
        return adminMapper.selectNoticeTotal();
    }

    // 공고 작성 검색 결과 전체 조회
    public int getTotalWithNoticeSearch(Search search) {
        return adminMapper.selectTotalWithNoticeSearch(search);
    }

    // 게시글 작성
    public List<PostDTO> postInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllPost(pagination, search);
    }

    // 게시글 작성 현황 전체 갯수 조회
    public int getPostTotal() {
        return adminMapper.selectPostTotal();
    }

    // 게시글 작성 검색 결과 전체 조회
    public int getTotalWithPostSearch(Search search) {
        return adminMapper.selectTotalWithPostSearch(search);
    }

    // 댓글 작성
    public List<ReplyDTO> replyInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllReply(pagination, search);
    }

    // 댓글 작성 현황 전체 갯수 조회
    public int getReplyTotal() {
        return adminMapper.selectReplyTotal();
    }

    // 댓글 작성 검색 결과 전체 조회
    public int getTotalWithReplySearch(Search search) {
        return adminMapper.selectTotalWithReplySearch(search);
    }

    // 후기 관리
    // 면접 후기
    public List<InterviewReviewDTO> InterviewReviewInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllInterviewReview(pagination, search);
    }

    // 면접 후기 작성 현황 전체 갯수 조회
    public int getInterviewReviewTotal() {
        return adminMapper.selectInterviewReviewTotal();
    }

    // 면접 후기 작성 검색 결과 전체 조회
    public int getTotalWithInterviewReviewSearch(Search search) {
        return adminMapper.selectTotalWithInterviewReviewSearch(search);
    }

    // 포지션(인턴십) 후기(기업)
    public List<EvaluationCorporationDTO> EvaluationCorporationInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllEvaluationCorporation(pagination, search);
    }

    // 포지션(인턴십) 후기(기업) 작성 현황 전체 갯수 조회
    public int getEvaluationCorporationTotal() {
        return adminMapper.selectEvaluationCorporationTotal();
    }

    // 포지션(인턴십) 후기(기업) 작성 검색 결과 전체 조회
    public int getTotalWithEvaluationCorporationSearch(Search search) {
        return adminMapper.selectTotalWithEvaluationCorporationSearch(search);
    }


    // 문의 관리
    // 일반 회원 문의 조회
    public List<InquiryDTO> memberInquiry(Pagination pagination, Search search) {
        return adminMapper.selectAllMemberInquiry(pagination, search);
    }

    // 일반 회원 전체 문의 수
    public int getMemberInquiryTotal() {
        return adminMapper.selectMemberInquiryTotal();
    }

    // 일반 회원 문의 검색 결과 전체 조회
    public int getTotalWithMemberInquirySearch(Search search) {
        return adminMapper.selectTotalWithMemberInquirySearch(search);
    }

    // 기업 회원 문의 조회
    public List<InquiryDTO> corporationInquiry(Pagination pagination, Search search) {
        return adminMapper.selectAllCorporationInquiry(pagination, search);
    }

    // 기업 회원 전체 문의 수
    public int getCorporationInquiryTotal() {
        return adminMapper.selectCorporationInquiryTotal();
    }

    // 기업 회원 문의 검색 결과 전체 조회
    public int getTotalWithCorporationInquirySearch(Search search) {
        return adminMapper.selectTotalWithCorporationInquirySearch(search);
    }

    // 신고 관리
    // 기업 후기 신고 조회
    public List<ComplainDTO> complainInformation(Pagination pagination, Search search) {
        return adminMapper.selectAllComplain(pagination, search);
    }

    // 기업 후기 신고 전체 조회 수
    public int getComplainTotal() {
        return adminMapper.selectComplainTotal();
    }

    // 기업 후기 신고 검색 결과 전체 조회
    public int getTotalWithComplainSearch(Search search) {
        return adminMapper.selectTotalWithComplainSearch(search);
    }
}
