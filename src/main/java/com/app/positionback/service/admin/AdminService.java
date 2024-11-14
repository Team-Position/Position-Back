package com.app.positionback.service.admin;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationListDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationPositionerDTO;
import com.app.positionback.domain.inquiry.InquiryListDTO;
import com.app.positionback.domain.interview.InterviewDTO;
import com.app.positionback.domain.interview.InterviewListDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberListDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.position.PositionDTO;
import com.app.positionback.domain.position.PositionListDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;

import java.util.List;

public interface AdminService {
    // 회원 관리
    // 일반 회원 목록
    public MemberListDTO getMembers(int page, Pagination pagination, Search search);
    public int getMemberTotal();
    public int getTotalWithMemberSearch(Search search);
    // 기업 회원 목록
    public CorporationListDTO getCorporationMembers(int page, Pagination pagination, Search search);
    public int getCorporationTotal();
    public int getTotalWithCorporationSearch(Search search);
    // 지원 현황 관리
    // 지원 현황
    public ApplyListDTO getApplys(int page, Pagination pagination, Search search);
    public int getApplyTotal();
    public int getTotalWithApplySearch(Search search);
    // 면접 현황
    public InterviewListDTO getInterviews(int page, Pagination pagination, Search search);
    public int getInterviewTotal();
    public int getTotalWithInterviewSearch(Search search);
    // 포지션 현황
    public PositionListDTO getPositions(int page, Pagination pagination, Search search);
    public int getPositionTotal();
    public int getTotalWithPositionSearch(Search search);
    // 결제 관리
    List<PaymentDTO> getPayments();
    // 작성 관리
    List<NoticeDTO> getNotices();
    List<PostDTO> getPosts();
    List<ReplyDTO> getReplys();
    // 후기 관리
    List<InterviewReviewDTO> getInterviewReviews();
    List<EvaluationCorporationDTO> getEvaluationCorporations();
    List<EvaluationPositionerDTO> getEvaluationPositioners();
    // 문의 관리
    // 일반 회원 문의 목록
    public InquiryListDTO getMemberInquiry(int page, Pagination pagination, Search search);
    public int getMemberInquiryTotal();
    public int getTotalWithMemberInquirySearch(Search search);
    // 기업 회원 문의 목록
    public InquiryListDTO getCorporationInquiry(int page, Pagination pagination, Search search);
    public int getCorporationInquiryTotal();
    public int getTotalWithCorporationInquirySearch(Search search);
    // 신고 관리
    List<ComplainDTO> getComplains();
}
