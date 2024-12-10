package com.app.positionback.service.admin;


import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.complain.ComplainListDTO;
import com.app.positionback.domain.corporation.CorporationListDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationListDTO;
import com.app.positionback.domain.inquiry.InquiryListDTO;
import com.app.positionback.domain.interview.InterviewListDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewListDTO;
import com.app.positionback.domain.member.MemberListDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.domain.payment.PaymentListDTO;
import com.app.positionback.domain.position.PositionListDTO;
import com.app.positionback.domain.post.PostListDTO;
import com.app.positionback.domain.reply.ReplyListDTO;
import com.app.positionback.repository.admin.AdminDAO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class AdminServiceImpl implements AdminService {
    private final AdminDAO adminDAO;

    // 회원 관리
    // 일반 회원 정보 조회
    @Override
    public MemberListDTO getMembers(int page, Pagination pagination, Search search) {
        // 반환할 회원 목록 DTO 생성
        MemberListDTO memberListDTO = new MemberListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        memberListDTO.setPagination(pagination);
        // 회원 목록 설정
        memberListDTO.setMembers(adminDAO.memberInformation(pagination, search));

        // 회원 목록 DTO 반환
        return memberListDTO;
    }

    // 일반 회원 전체 인원
    @Override
    public int getMemberTotal() {
        // 전체 회원 수 조회
        return adminDAO.getMemberTotal();
    }

    // 일반 회원 검색 결과 전체 조회
    @Override
    public int getTotalWithMemberSearch(Search search) {
        // 검색 조건에 맞는 회원 수 조회
        return adminDAO.getTotalWithMemberSearch(search);
    }

    // 일반 회원 상태 변경
    @Override
    public void updateMemberStatus(Long memberId, String status) {
        // 특정 회원의 상태를 업데이트
        adminDAO.updateMemberStatus(memberId, status);
    }

    // 기업 회원 정보 조회
    @Override
    public CorporationListDTO getCorporationMembers(int page, Pagination pagination, Search search) {
        // 반환할 기업 회원 목록 DTO 생성
        CorporationListDTO corporationListDTO = new CorporationListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        corporationListDTO.setPagination(pagination);
        // 기업 회원 목록 설정
        corporationListDTO.setCorporations(adminDAO.corporationInformation(pagination, search));

        // 기업 회원 목록 DTO 반환
        return corporationListDTO;
    }

    // 기업 회원 전체 인원
    @Override
    public int getCorporationTotal() {
        // 전체 기업 회원 수 조회
        return adminDAO.getCorporationTotal();
    }

    // 기업 회원 검색 결과 전체 조회
    @Override
    public int getTotalWithCorporationSearch(Search search) {
        // 검색 조건에 맞는 기업 회원 수 조회
        return adminDAO.getTotalWithCorporationSearch(search);
    }


    // 지원 현황 관리
    // 지원 현황 조회
    @Override
    public ApplyListDTO getApplys(int page, Pagination pagination, Search search) {
        // 반환할 지원 목록 DTO 생성
        ApplyListDTO applyListDTO = new ApplyListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        applyListDTO.setPagination(pagination);
        // 지원 목록 설정
        applyListDTO.setApplies(adminDAO.applyInformation(pagination, search));

        // 지원 목록 DTO 반환
        return applyListDTO;
    }

    // 지원 현황 전체 인원 조회
    @Override
    public int getApplyTotal() {
        // 전체 지원 현황 수 조회
        return adminDAO.getApplyTotal();
    }

    // 지원 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithApplySearch(Search search) {
        // 검색 조건에 맞는 지원 현황 수 조회
        return adminDAO.getTotalWithApplySearch(search);
    }

    // 면접 현황 조회
    @Override
    public InterviewListDTO getInterviews(int page, Pagination pagination, Search search) {
        // 반환할 면접 목록 DTO 생성
        InterviewListDTO interviewListDTO = new InterviewListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        interviewListDTO.setPagination(pagination);
        // 면접 목록 설정
        interviewListDTO.setInterviews(adminDAO.interviewInformation(pagination, search));

        // 면접 목록 DTO 반환
        return interviewListDTO;
    }

    // 면접 현황 전체 인원 조회
    @Override
    public int getInterviewTotal() {
        // 전체 면접 현황 수 조회
        return adminDAO.getInterviewTotal();
    }

    // 면접 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithInterviewSearch(Search search) {
        // 검색 조건에 맞는 면접 현황 수 조회
        return adminDAO.getTotalWithInterviewSearch(search);
    }

    // 포지션 현황 조회
    @Override
    public PositionListDTO getPositions(int page, Pagination pagination, Search search) {
        // 반환할 포지션 목록 DTO 생성
        PositionListDTO positionListDTO = new PositionListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        positionListDTO.setPagination(pagination);
        // 포지션 목록 설정
        positionListDTO.setPositions(adminDAO.positionInformation(pagination, search));

        // 포지션 목록 DTO 반환
        return positionListDTO;
    }

    // 포지션 현황 전체 인원 조회
    @Override
    public int getPositionTotal() {
        // 전체 포지션 현황 수 조회
        return adminDAO.getPositionTotal();
    }

    // 포지션 현황 검색 결과 전체 조회
    @Override
    public int getTotalWithPositionSearch(Search search) {
        // 검색 조건에 맞는 포지션 현황 수 조회
        return adminDAO.getTotalWithPositionSearch(search);
    }

    // 결제 관리
    // 지원료 결제
    @Override
    public PaymentListDTO getPayments(int page, Pagination pagination, Search search) {
        // 반환할 결제 목록 DTO 생성
        PaymentListDTO paymentListDTO = new PaymentListDTO();

        // Pagination 설정
        // 요청 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        paymentListDTO.setPagination(pagination);
        // 결제 목록 설정
        paymentListDTO.setPayments(adminDAO.paymentInformation(pagination, search));

        // 결제 목록 DTO 반환
        return paymentListDTO;
    }

    // 지원료 결제 현황 전체 조회
    @Override
    public int getPaymentTotal() {
        // 전체 결제 현황 수 조회
        return adminDAO.getPaymentTotal();
    }

    // 지원료 결제 검색 결과 전체 조회
    @Override
    public int getTotalWithPaymentSearch(Search search) {
        // 검색 조건에 맞는 결제 현황 수 조회
        return adminDAO.getTotalWithPaymentSearch(search);
    }

    // 작성 관리
    // 공고 작성 관리
    @Override
    public NoticeListDTO getNotices(int page, Pagination pagination, Search search) {
        // 공고 목록을 담을 DTO 생성
        NoticeListDTO noticeListDTO = new NoticeListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        noticeListDTO.setPagination(pagination);
        // 공고 데이터 설정
        noticeListDTO.setNotices(adminDAO.noticeInformation(pagination, search));

        // 공고 목록 DTO 반환
        return noticeListDTO;
    }

    // 공고 작성 갯수 전체 조회
    @Override
    public int getNoticeTotal() {
        // 전체 공고 수 조회
        return adminDAO.getNoticeTotal();
    }

    // 공고 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithNoticeSearch(Search search) {
        // 검색 조건에 맞는 공고 수 조회
        return adminDAO.getTotalWithNoticeSearch(search);
    }

    // 게시글 작성 관리
    @Override
    public PostListDTO getPosts(int page, Pagination pagination, Search search) {
        // 게시글 목록을 담을 DTO 생성
        PostListDTO postListDTO = new PostListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        postListDTO.setPagination(pagination);
        // 게시글 데이터 설정
        postListDTO.setPosts(adminDAO.postInformation(pagination, search));

        // 게시글 목록 DTO 반환
        return postListDTO;
    }

    // 게시글 작성 갯수 전제 조회
    @Override
    public int getPostTotal() {
        // 전체 게시글 수 조회
        return adminDAO.getPostTotal();
    }

    // 게시글 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithPostSearch(Search search) {
        // 검색 조건에 맞는 게시글 수 조회
        return adminDAO.getTotalWithPostSearch(search);
    }

    // 댓글 작성 관리
    @Override
    public ReplyListDTO getReplys(int page, Pagination pagination, Search search) {
        // 댓글 목록을 담을 DTO 생성
        ReplyListDTO replyListDTO = new ReplyListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        replyListDTO.setPagination(pagination);
        // 댓글 데이터 설정
        replyListDTO.setReplies(adminDAO.replyInformation(pagination, search));

        // 댓글 목록 DTO 반환
        return replyListDTO;
    }

    // 댓글 작성 갯수 전체 조회
    @Override
    public int getReplyTotal() {
        // 전체 댓글 수 조회
        return adminDAO.getReplyTotal();
    }

    // 댓글 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithReplySearch(Search search) {
        // 검색 조건에 맞는 댓글 수 조회
        return adminDAO.getTotalWithReplySearch(search);
    }

    // 후기 관리
    // 면접 후기
    @Override
    public InterviewReviewListDTO getInterviewReviews(int page, Pagination pagination, Search search) {
        // 면접 후기 목록을 담을 DTO 생성
        InterviewReviewListDTO interviewReviewListDTO = new InterviewReviewListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        interviewReviewListDTO.setPagination(pagination);
        // 면접 후기 데이터 설정
        interviewReviewListDTO.setInterviewReviews(adminDAO.InterviewReviewInformation(pagination, search));

        // 면접 후기 목록 DTO 반환
        return interviewReviewListDTO;
    }

    // 면접 후기 작성 갯수 전체 조회
    @Override
    public int getInterviewReviewTotal() {
        // 전체 면접 후기 수 조회
        return adminDAO.getInterviewReviewTotal();
    }

    // 면접 후기 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithInterviewReviewSearch(Search search) {
        // 검색 조건에 맞는 면접 후기 수 조회
        return adminDAO.getTotalWithInterviewReviewSearch(search);
    }

    // 포지션(인턴십) 후기(기업)
    @Override
    public EvaluationCorporationListDTO getEvaluationCorporations(int page, Pagination pagination, Search search) {
        // 기업의 포지션(인턴십) 후기 목록을 담을 DTO 생성
        EvaluationCorporationListDTO evaluationCorporationListDTO = new EvaluationCorporationListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        evaluationCorporationListDTO.setPagination(pagination);
        // 포지션 후기 데이터 설정
        evaluationCorporationListDTO.setEvaluationCorporations(adminDAO.EvaluationCorporationInformation(pagination, search));

        // 기업의 포지션(인턴십) 후기 목록 DTO 반환
        return evaluationCorporationListDTO;
    }

    // 포지션(인턴십) 후기(기업) 작성 갯수 전체 조회
    @Override
    public int getEvaluationCorporationTotal() {
        // 전체 기업 포지션 후기 수 조회
        return adminDAO.getEvaluationCorporationTotal();
    }

    // 포지션(인턴십) 후기(기업) 작성 검색 결과 전체 조회
    @Override
    public int getTotalWithEvaluationCorporationSearch(Search search) {
        // 검색 조건에 맞는 기업 포지션 후기 수 조회
        return adminDAO.getTotalWithEvaluationCorporationSearch(search);
    }

    // 문의 관리
    // 일반 회원 문의
    @Override
    public InquiryListDTO getMemberInquiry(int page, Pagination pagination, Search search) {
        // 일반 회원 문의 목록을 담을 DTO 생성
        InquiryListDTO inquiryListDTO = new InquiryListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        inquiryListDTO.setPagination(pagination);
        // 일반 회원 문의 데이터 설정
        inquiryListDTO.setInquiries(adminDAO.memberInquiry(pagination, search));

        // 일반 회원 문의 목록 DTO 반환
        return inquiryListDTO;
    }

    // 일반 회원 전체 문의 수
    @Override
    public int getMemberInquiryTotal() {
        // 전체 일반 회원 문의 수 조회
        return adminDAO.getMemberInquiryTotal();
    }

    // 일반 회원 검색 문의 수
    @Override
    public int getTotalWithMemberInquirySearch(Search search) {
        // 검색 조건에 맞는 일반 회원 문의 수 조회
        return  adminDAO.getTotalWithMemberInquirySearch(search);
    }

    // 기업 회원 문의
    @Override
    public InquiryListDTO getCorporationInquiry(int page, Pagination pagination, Search search) {
        // 기업 회원 문의 목록을 담을 DTO 생성
        InquiryListDTO inquiryListDTO = new InquiryListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        inquiryListDTO.setPagination(pagination);
        // 기업 회원 문의 데이터 설정
        inquiryListDTO.setInquiries(adminDAO.corporationInquiry(pagination, search));

        // 기업 회원 문의 목록 DTO 반환
        return inquiryListDTO;
    }

    // 기업 회원 전체 문의 수
    @Override
    public int getCorporationInquiryTotal() {
        // 전체 기업 회원 문의 수 조회
        return adminDAO.getCorporationInquiryTotal();
    }

    // 기업 회원 검색 문의 수
    @Override
    public int getTotalWithCorporationInquirySearch(Search search) {
        // 검색 조건에 맞는 기업 회원 문의 수 조회
        return  adminDAO.getTotalWithCorporationInquirySearch(search);
    }


    // 신고 관리
    // 기업 후기 신고
    @Override
    public ComplainListDTO getComplains(int page, Pagination pagination, Search search) {
        // 기업 후기 신고 목록을 담을 DTO 생성
        ComplainListDTO complainListDTO = new ComplainListDTO();

        // Pagination 설정
        // 페이지 번호 설정
        pagination.setPage(page);
        // 페이지네이션 계산
        pagination.progress();

        // 데이터 가져오기
        // 페이지네이션 정보 설정
        complainListDTO.setPagination(pagination);
        // 기업 후기 신고 데이터 설정
        complainListDTO.setComplains(adminDAO.complainInformation(pagination, search));

        // 기업 후기 신고 목록 DTO 반환
        return complainListDTO;
    }

    // 기업 후기 신고 전체 신고 수
    public int getComplainTotal() {
        // 전체 기업 후기 신고 수 조회
        return adminDAO.getComplainTotal();
    }

    // 기업 후기 신고 검색 후 신고 수
    @Override
    public int getTotalWithComplainSearch(Search search) {
        // 검색 조건에 맞는 기업 후기 신고 수 조회
        return adminDAO.getTotalWithComplainSearch(search);
    }
}
