package com.app.positionback.mapper.admin;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.interview.InterviewDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.position.PositionDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMapper {
    // 회원 관리
    // 일반 회원
    public List<MemberDTO> selectAllMembers(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectMemberTotal();
    public int selectTotalWithMemberSearch(@Param("search")Search search);
    public void updateMemberStatus(@Param("memberId") Long memberId, @Param("status") String status);
    // 기업 회원
    public List<CorporationDTO> selectAllCorporationMembers(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectCorporationTotal();
    public int selectTotalWithCorporationSearch(@Param("search")Search search);

    // 지원현황 관리
    // 지원 현황
    public List<ApplyDTO> selectAllApply(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectApplyTotal();
    public int selectTotalWithApplySearch(@Param("search")Search search);
    // 면접 현황
    public List<InterviewDTO> selectAllInterview(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectInterviewTotal();
    public int selectTotalWithInterviewSearch(@Param("search")Search search);
    // 포지션 현황
    public List<PositionDTO> selectAllPosition(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectPositionTotal();
    public int selectTotalWithPositionSearch(@Param("search")Search search);

    // 결제 관리
    public List<PaymentDTO> selectAllPayment(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectPaymentTotal();
    public int selectTotalWithPaymentSearch(@Param("search")Search search);

    // 작성 관리
    // 공고 작성
    public List<NoticeDTO> selectAllNotice(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectNoticeTotal();
    public int selectTotalWithNoticeSearch(@Param("search")Search search);
    // 게시글 작성
    public List<PostDTO> selectAllPost(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectPostTotal();
    public int selectTotalWithPostSearch(@Param("search")Search search);
    // 댓글 작성
    public List<ReplyDTO> selectAllReply(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectReplyTotal();
    public int selectTotalWithReplySearch(@Param("search")Search search);

    // 후기 관리
    // 면접 후기
    public List<InterviewReviewDTO> selectAllInterviewReview(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectInterviewReviewTotal();
    public int selectTotalWithInterviewReviewSearch(@Param("search")Search search);
    // 기업이 작성하는 포지션 후기
    public List<EvaluationCorporationDTO> selectAllEvaluationCorporation(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectEvaluationCorporationTotal();
    public int selectTotalWithEvaluationCorporationSearch(@Param("search")Search search);

    // 문의 관리
    // 일반 회원 문의
    public List<InquiryDTO> selectAllMemberInquiry(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectMemberInquiryTotal();
    public int selectTotalWithMemberInquirySearch(@Param("search")Search search);
    // 기업 회원 문의
    public List<InquiryDTO> selectAllCorporationInquiry(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectCorporationInquiryTotal();
    public int selectTotalWithCorporationInquirySearch(@Param("search")Search search);

    // 신고 관리
    public List<ComplainDTO> selectAllComplain(@Param("pagination") Pagination pagination, @Param("search")Search search);
    public int selectComplainTotal();
    public int selectTotalWithComplainSearch(@Param("search")Search search);
}
