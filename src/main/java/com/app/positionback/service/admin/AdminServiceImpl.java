package com.app.positionback.service.admin;


import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationListDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationPositionerDTO;
import com.app.positionback.domain.inquiry.InquiryListDTO;
import com.app.positionback.domain.interview.InterviewListDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberListDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.payment.PaymentListDTO;
import com.app.positionback.domain.position.PositionListDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.post.PostListDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.domain.reply.ReplyListDTO;
import com.app.positionback.repository.admin.AdminDAO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class AdminServiceImpl implements AdminService {
    private final AdminDAO adminDAO;
    private final InquiryListDTO inquiryListDTO;

    // 회원 관리
    // 일반 회원 정보 조회
    @Override
    public MemberListDTO getMembers(int page, Pagination pagination, Search search) {
        MemberListDTO memberListDTO = new MemberListDTO();

        // Pagination 설정
        pagination.setPage(page);
        pagination.progress();

        // 데이터 가져오기
        memberListDTO.setPagination(pagination);
        memberListDTO.setMembers(adminDAO.memberInformation(pagination, search));

        return memberListDTO;
    }

    // 일반 회원 전체 인원
    @Override
    public int getMemberTotal() {
        return adminDAO.getMemberTotal();
    }

    // 일반 회원 검색 결과 전체 조회
    @Override
    public int getTotalWithMemberSearch(Search search) {
        return adminDAO.getTotalWithMemberSearch(search);
    }

    // 기업 회원 정보 조회
    @Override
    public CorporationListDTO getCorporationMembers(int page, Pagination pagination, Search search) {
        CorporationListDTO corporationListDTO = new CorporationListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getCorporationTotal());
        pagination.progress();
        corporationListDTO.setPagination(pagination);
        corporationListDTO.setCorporations(adminDAO.corporationInformation(pagination, search));
        return corporationListDTO;
    }

    // 기업 회원 전체 인원
    @Override
    public int getCorporationTotal() {
        return adminDAO.getCorporationTotal();
    }

    // 기업 회원 검색 결과 전체 조회
    @Override
    public int getTotalWithCorporationSearch(Search search) {
        return adminDAO.getTotalWithCorporationSearch(search);
    }


    // 지원 현황 관리
    // 지원 현황 조회
    @Override
    public ApplyListDTO getApplys(int page, Pagination pagination, Search search) {
        ApplyListDTO applyListDTO = new ApplyListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getApplyTotal());
        pagination.progress();
        applyListDTO.setPagination(pagination);
        applyListDTO.setApplies(adminDAO.applyInformation(pagination, search));
        return applyListDTO;
    }

    // 지원 현황 전체 인원 조회
    @Override
    public int getApplyTotal() {
        return adminDAO.getApplyTotal();
    }

    // 지원 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithApplySearch(Search search) {
        return adminDAO.getTotalWithApplySearch(search);
    }

    // 면접 현황 조회
    @Override
    public InterviewListDTO getInterviews(int page, Pagination pagination, Search search) {
        InterviewListDTO interviewListDTO = new InterviewListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getInterviewTotal());
        pagination.progress();
        interviewListDTO.setPagination(pagination);
        interviewListDTO.setInterviews(adminDAO.interviewInformation(pagination, search));
        return interviewListDTO;
    }

    // 면접 현황 전체 인원 조회
    @Override
    public int getInterviewTotal() {
        return adminDAO.getInterviewTotal();
    }

    // 면접 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithInterviewSearch(Search search) {
        return adminDAO.getTotalWithInterviewSearch(search);
    }

    // 포지션 현황 조회
    @Override
    public PositionListDTO getPositions(int page, Pagination pagination, Search search) {
        PositionListDTO positionListDTO = new PositionListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getPositionTotal());
        pagination.progress();
        positionListDTO.setPagination(pagination);
        positionListDTO.setPositions(adminDAO.positionInformation(pagination, search));
        return positionListDTO;
    }

    // 포지션 현황 전체 인원 조회
    @Override
    public int getPositionTotal() {
        return adminDAO.getPositionTotal();
    }

    // 포지션 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithPositionSearch(Search search) {
        return adminDAO.getTotalWithPositionSearch(search);
    }

    // 결제 관리
    // 지원료 결제
    @Override
    public PaymentListDTO getPayments(int page, Pagination pagination, Search search) {
        PaymentListDTO paymentListDTO = new PaymentListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getPaymentTotal());
        pagination.progress();
        paymentListDTO.setPagination(pagination);
        paymentListDTO.setPayments(adminDAO.paymentInformation(pagination, search));
        return paymentListDTO;
    }

    // 지원료 결제 현황 전체 조회
    @Override
    public int getPaymentTotal() {
        return adminDAO.getPaymentTotal();
    }

    // 지원료 결제 검색 결과 전체 조회
    @Override
    public int getTotalWithPaymentSearch(Search search) {
        return adminDAO.getTotalWithPaymentSearch(search);
    }

    // 작성 관리
    // 공고 작성 관리
    @Override
    public NoticeListDTO getNotices(int page, Pagination pagination, Search search) {
        NoticeListDTO noticeListDTO = new NoticeListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getNoticeTotal());
        pagination.progress();
        noticeListDTO.setPagination(pagination);
        noticeListDTO.setNotices(adminDAO.noticeInformation(pagination, search));
        return noticeListDTO;
    }

    // 공고 작성 갯수 전체 조회
    @Override
    public int getNoticeTotal() {
        return adminDAO.getNoticeTotal();
    }

    // 공고 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithNoticeSearch(Search search) {
        return adminDAO.getTotalWithNoticeSearch(search);
    }

    // 게시글 작성 관리
    @Override
    public PostListDTO getPosts(int page, Pagination pagination, Search search) {
        PostListDTO postListDTO = new PostListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getPostTotal());
        pagination.progress();
        postListDTO.setPagination(pagination);
        postListDTO.setPosts(adminDAO.postInformation(pagination, search));
        return postListDTO;
    }

    // 게시글 작성 갯수 전제 조회
    @Override
    public int getPostTotal() {
        return adminDAO.getPostTotal();
    }

    // 게시글 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithPostSearch(Search search) {
        return adminDAO.getTotalWithPostSearch(search);
    }

    // 댓글 작성 관리
    @Override
    public ReplyListDTO getReplys(int page, Pagination pagination, Search search) {
        ReplyListDTO replyListDTO = new ReplyListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getReplyTotal());
        pagination.progress();
        replyListDTO.setPagination(pagination);
        replyListDTO.setReplies(adminDAO.replyInformation(pagination, search));
        return replyListDTO;
    }

    // 댓글 작성 갯수 전체 조회
    @Override
    public int getReplyTotal() {
        return adminDAO.getReplyTotal();
    }

    // 댓글 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithReplySearch(Search search) {
        return adminDAO.getTotalWithReplySearch(search);
    }

    // 후기 관리
    // 면접 후기
    public List<InterviewReviewDTO> getInterviewReviews() {
        return adminDAO.InterviewReviewInformation();
    }
    // 인턴십 후기(기업)
    public List<EvaluationCorporationDTO> getEvaluationCorporations() {
        return adminDAO.EvaluationCorporationInformation();
    }
    // 인턴십 후기(인턴)
    public List<EvaluationPositionerDTO> getEvaluationPositioners() {
        return adminDAO.EvaluationPositionerInformation();
    }

    // 문의 관리
    // 일반 회원 문의
    @Override
    public InquiryListDTO getMemberInquiry(int page, Pagination pagination, Search search) {
        InquiryListDTO inquiryDTO = new InquiryListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getMemberInquiryTotal());
        pagination.progress();
        inquiryListDTO.setPagination(pagination);
        inquiryListDTO.setInquiries(adminDAO.memberInquiry(pagination, search));
        return inquiryListDTO;
    }

    // 일반 회원 전체 문의 수
    @Override
    public int getMemberInquiryTotal() {
        return adminDAO.getMemberInquiryTotal();
    }

    // 일반 회원 검색 문의 수
    @Override
    public int getTotalWithMemberInquirySearch(Search search) {
        return  adminDAO.getTotalWithMemberInquirySearch(search);
    }

    // 기업 회원 문의
    @Override
    public InquiryListDTO getCorporationInquiry(int page, Pagination pagination, Search search) {
        InquiryListDTO inquiryDTO = new InquiryListDTO();
        pagination.setPage(page);
        pagination.setTotal(adminDAO.getCorporationInquiryTotal());
        pagination.progress();
        inquiryListDTO.setPagination(pagination);
        inquiryListDTO.setInquiries(adminDAO.corporationInquiry(pagination, search));
        return inquiryListDTO;
    }

    // 기업 회원 전체 문의 수
    @Override
    public int getCorporationInquiryTotal() {
        return adminDAO.getCorporationInquiryTotal();
    }

    // 기업 회원 검색 문의 수
    @Override
    public int getTotalWithCorporationInquirySearch(Search search) {
        return  adminDAO.getTotalWithCorporationInquirySearch(search);
    }


    // 신고 관리
    // 기업 후기 신고
    public List<ComplainDTO> getComplains() {
        return adminDAO.complainInformation();
    }
}
