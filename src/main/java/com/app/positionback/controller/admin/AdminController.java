package com.app.positionback.controller.admin;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.corporation.CorporationListDTO;
import com.app.positionback.domain.evaluation.EvaluationCorporationDTO;
import com.app.positionback.domain.evaluation.EvaluationPositionerDTO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryListDTO;
import com.app.positionback.domain.interview.InterviewDTO;
import com.app.positionback.domain.interview.InterviewListDTO;
import com.app.positionback.domain.interviewreview.InterviewReviewDTO;
import com.app.positionback.domain.member.MemberDTO;
import com.app.positionback.domain.member.MemberListDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.domain.payment.PaymentDTO;
import com.app.positionback.domain.payment.PaymentListDTO;
import com.app.positionback.domain.position.PositionDTO;
import com.app.positionback.domain.position.PositionListDTO;
import com.app.positionback.domain.post.PostDTO;
import com.app.positionback.domain.post.PostListDTO;
import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.domain.reply.ReplyListDTO;
import com.app.positionback.service.admin.AdminService;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/*")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    @GetMapping("admin")
    public String goToAdminPage() {
        return "admin/admin";
    }

    // 일반회원 정보를 조회하고 json 형식으로 반환한다.
    // AdminService의 getMembers() 메서드를 호출하여 전체 일반 회원 정보를 가져온다.
    // 이 메서드는 List<MemberDTO> 타입의 데이터를 반환하여 JSON으로 응답한다.
    // 자바스크립트 코드에 fetch 모듈 admin서비스.js에 레이아웃

    // 회원 관리
    // 일반 회원 정보 조회



    // 기업 회원 정보 조회
    @GetMapping("/position/corporation-members/{page}")
    @ResponseBody
    public CorporationListDTO getCorporationMembers(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getKeyword() != null) {
            pagination.setTotal(adminService.getTotalWithCorporationSearch(search));
        } else {
            pagination.setTotal(adminService.getCorporationTotal());
        }
        pagination.progress();
        return adminService.getCorporationMembers(page, pagination, search);
    }

    // 지원 현황 관리
    // 지원 현황
    @GetMapping("/position/members/{page}")
    @ResponseBody
    public MemberListDTO getMembers(
            @PathVariable("page") Integer page,
            Pagination pagination,
            Search search) {

        // 정렬 옵션 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0 || search.getTypes()[0].isEmpty()) {
            search.setTypes(new String[]{"recent"});
        }

        // 총 개수 계산
        int totalCount = (search.getKeyword() != null && !search.getKeyword().isEmpty())
                ? adminService.getTotalWithMemberSearch(search)
                : adminService.getMemberTotal();

        // Pagination에 총 개수 설정
        pagination.setTotal(totalCount);

        // 페이지네이션 계산 (Pagination의 progress() 호출)
        pagination.progress();

        // 잘못된 페이지 요청 시 마지막 페이지 데이터 반환
        if (page > pagination.getRealEnd()) { // 총 페이지(realEnd)를 초과한 요청
            page = pagination.getRealEnd();   // 마지막 페이지로 설정
        }

        // 요청한 페이지 설정
        pagination.setPage(page);

        // 데이터 조회
        return adminService.getMembers(page, pagination, search);
    }


    // 면접 현황
    @GetMapping("/position/interview/{page}")
    @ResponseBody
    public InterviewListDTO getInterviews(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithInterviewSearch(search));
        } else {
            pagination.setTotal(adminService.getInterviewTotal());
        }
        pagination.progress();
        return adminService.getInterviews(page, pagination, search);
    }

    // 포지션 현황
    @GetMapping("/position/position/{page}")
    @ResponseBody
    public PositionListDTO getPositions(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithPositionSearch(search));
        } else {
            pagination.setTotal(adminService.getPositionTotal());
        }
        pagination.progress();
        return adminService.getPositions(page, pagination, search);
    }

    // 결제 관리
    // 지원료 결제
    @GetMapping("/position/payment/{page}")
    @ResponseBody
    public PaymentListDTO getPayments(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithPaymentSearch(search));
        } else {
            pagination.setTotal(adminService.getPaymentTotal());
        }
        pagination.progress();
        return adminService.getPayments(page, pagination, search);
    }

    // 작성 관리
    // 공고 작성
    @GetMapping("/position/notice/{page}")
    @ResponseBody
    public NoticeListDTO getNotices(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithNoticeSearch(search));
        } else {
            pagination.setTotal(adminService.getNoticeTotal());
        }
        pagination.progress();
        return adminService.getNotices(page, pagination, search);
    }

    // 게시글 작성
    @GetMapping("/position/post/{page}")
    @ResponseBody
    public PostListDTO getPosts(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithPostSearch(search));
        } else {
            pagination.setTotal(adminService.getPostTotal());
        }
        pagination.progress();
        return adminService.getPosts(page, pagination, search);
    }

    // 댓글 작성
    @GetMapping("/position/reply/{page}")
    @ResponseBody
    public ReplyListDTO getReplys(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if (search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithReplySearch(search));
        } else {
            pagination.setTotal(adminService.getReplyTotal());
        }
        pagination.progress();
        return adminService.getReplys(page, pagination, search);
    }

    // 후기 관리
    // 면접 후기
    @GetMapping("/position/interview-review")
    @ResponseBody
    public List<InterviewReviewDTO> getInterviewReviews(){
        return adminService.getInterviewReviews();
    }
    // 인턴십 후기(기업)
    @GetMapping("/position/evaluation-corporation")
    @ResponseBody
    public List<EvaluationCorporationDTO> getEvaluationCorporations(){
        return adminService.getEvaluationCorporations();
    }
    // 인턴십 후기(인턴)
    @GetMapping("/position/evaluation-positioner")
    @ResponseBody
    public List<EvaluationPositionerDTO> getEvaluationPositioners(){
        return adminService.getEvaluationPositioners();
    }

    // 문의 관리
    // 일반 회원 문의 정보 조회
    @GetMapping("/position/member-inquiry/{page}")
    @ResponseBody
    public InquiryListDTO getMemberInquiry(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if(search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithMemberInquirySearch(search));
        } else {
            pagination.setTotal(adminService.getMemberInquiryTotal());
        }
        pagination.progress();
        return adminService.getMemberInquiry(page, pagination, search);
    }

    // 기업 회원 문의 정보 조회
    @GetMapping("/position/corporation-inquiry/{page}")
    @ResponseBody
    public InquiryListDTO getCorporationInquiry(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        if(search.getTypes() == null || search.getTypes().length == 0) {
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() != null || search.getTypes() != null) {
            pagination.setTotal(adminService.getTotalWithCorporationInquirySearch(search));
        } else {
            pagination.setTotal(adminService.getCorporationInquiryTotal());
        }
        pagination.progress();
        return adminService.getCorporationInquiry(page, pagination, search);
    }

    // 신고 관리
    // 기업 후기 신고
    @GetMapping("/position/complain")
    @ResponseBody
    public List<ComplainDTO> getComplains() {
        return adminService.getComplains();
    }































}
