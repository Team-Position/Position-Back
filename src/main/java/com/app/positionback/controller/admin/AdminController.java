package com.app.positionback.controller.admin;

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
import com.app.positionback.service.admin.AdminService;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/admin/*")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    // 관리자 페이지로 이동하는 엔드포인트
    // "admin/admin" 뷰를 반환하여 관리자 페이지를 렌더링합니다.
    // 주로 관리자용 대시보드 진입점으로 사용됩니다.
    @GetMapping("admin")
    public String goToAdminPage() {
        return "admin/admin";
    }

    // 회원 관리
    // 일반 회원 정보 조회
    // 일반 회원 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/members/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 일반 회원 목록 조회 메서드
    public MemberListDTO getMembers(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 검색 조건으로 가입일 순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        if (search.getKeyword() == null) {
            search.setKeyword("");
        }

        // 총 개수 설정
        pagination.setTotal(adminService.getTotalWithMemberSearch(search));
        // 페이지네이션 계산 진행
        pagination.progress();

        // 검색 조건에 맞는 목록 반환
        return adminService.getMembers(page, pagination, search);
    }

    // 일반 회원 상태 변경
    @PostMapping("/position/members/updateStatus")
    @ResponseBody
    public ResponseEntity<String> updateMemberStatus(@RequestBody Map<String, Object> request) {
        log.info("요청 데이터: {}", request);

        // 요청 데이터 검증
        if (!request.containsKey("memberId") || !request.containsKey("status")) {
            log.error("memberId 또는 status가 누락되었습니다.");
            return ResponseEntity.badRequest().body("memberId 또는 status가 누락되었습니다.");
        }

        // 값 추출
        Long memberId = Long.valueOf(request.get("memberId").toString());
        String status = request.get("status").toString();

        // 서비스 호출
        adminService.updateMemberStatus(memberId, status);
        return ResponseEntity.ok("회원 상태가 성공적으로 변경되었습니다.");
    }

    // 기업 회원 정보 조회
    // 기업 회원 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/corporation-members/{page}")
    @ResponseBody
    public CorporationListDTO getCorporationMembers(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 검색 키워드가 있을 경우
        if (search.getKeyword() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithCorporationSearch(search));
            // 검색 키워드가 없을 경우
        } else {
            // 전체 기업 회원 수 설정
            pagination.setTotal(adminService.getCorporationTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 기업 회원 목록 반환
        return adminService.getCorporationMembers(page, pagination, search);
    }

    // 지원 현황 관리
    // 지원 현황
    // 지원 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/apply/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 지원 현황 목록 조회 메서드
    public ApplyListDTO getApplys(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithApplySearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 지원 현황 수 설정
            pagination.setTotal(adminService.getApplyTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 지원 현황 목록 반환
        return adminService.getApplys(page, pagination, search);
    }


    // 면접 현황
    // 면접 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/interview/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 면접 현황 목록 조회 메서드
    public InterviewListDTO getInterviews(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 지원 합격일 순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithInterviewSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 면접 현황 수 설정
            pagination.setTotal(adminService.getInterviewTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 면접 현황 목록 반환
        return adminService.getInterviews(page, pagination, search);
    }

    // 포지션(인턴십) 현황
    // 포지션(인턴십) 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/position/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 포지션(인턴십) 현황 목록 조회 메서드
    public PositionListDTO getPositions(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 포지션 근무일 순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithPositionSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 포지션 현황 수 설정
            pagination.setTotal(adminService.getPositionTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 포지션(인턴십) 현황 목록 반환
        return adminService.getPositions(page, pagination, search);
    }

    // 결제 관리
    // 지원료 결제
    // 지원료 결제 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/payment/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 지원료 결제 목록 조회 메서드
    public PaymentListDTO getPayments(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithPaymentSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 지원료 결제 수 설정
            pagination.setTotal(adminService.getPaymentTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 지원료 결제 목록 반환
        return adminService.getPayments(page, pagination, search);
    }

    // 작성 관리
    // 공고 작성
    // 기업의 공고 작성 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/notice/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 공고 작성 목록 조회 메서드
    public NoticeListDTO getNotices(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 포지션 근무일 순 = data-type 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithNoticeSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 공고 작성 수 설정
            pagination.setTotal(adminService.getNoticeTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 공고 작성 목록 반환
        return adminService.getNotices(page, pagination, search);
    }

    // 게시글 작성
    // 커뮤니티 게시글 작성 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/post/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 게시글 작성 목록 조회 메서드
    public PostListDTO getPosts(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithPostSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 게시글 작성 수 설정
            pagination.setTotal(adminService.getPostTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 게시글 작성 목록 반환
        return adminService.getPosts(page, pagination, search);
    }

    // 댓글 작성
    // 커뮤니티 댓글 작성 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/reply/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 댓글 작성 목록 조회 메서드
    public ReplyListDTO getReplys(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 검색 키워드가 있을 경우
        if (search.getKeyword() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithReplySearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 댓글 작성 수 설정
            pagination.setTotal(adminService.getReplyTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 댓글 작성 목록 반환
        return adminService.getReplys(page, pagination, search);
    }

    // 후기 관리
    // 면접 후기
    // 면접 후기 작성 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/interview-review/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 면접 후기 목록 조회 메서드
    public InterviewReviewListDTO getInterviewReviews(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithInterviewReviewSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 면접 후기 수 설정
            pagination.setTotal(adminService.getInterviewReviewTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 면접 후기 목록 반환
        return adminService.getInterviewReviews(page, pagination, search);
    }

    // 포지션(인턴십) 후기(기업)
    // 기업의 포지션(인턴십) 후기(피드백) 작성을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/evaluation-corporation/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 포지션 후기(기업) 목록 조회 메서드
    public EvaluationCorporationListDTO getEvaluationCorporations(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 검색 키워드가 있을 경우
        if (search.getKeyword() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithEvaluationCorporationSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 포지션 후기(기업) 수 설정
            pagination.setTotal(adminService.getEvaluationCorporationTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 포지션 후기(기업) 목록 반환
        return adminService.getEvaluationCorporations(page, pagination, search);
    }

    // 문의 관리
    // 일반 회원 문의 정보 조회
    // 일반 회원 문의 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/member-inquiry/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 일반 회원 문의 목록 조회 메서드
    public InquiryListDTO getMemberInquiry(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if(search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithMemberInquirySearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 일반 회원 문의 수 설정
            pagination.setTotal(adminService.getMemberInquiryTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 일반 회원 문의 목록 반환
        return adminService.getMemberInquiry(page, pagination, search);
    }

    // 기업 회원 문의 정보 조회
    // 기업 회원의 문의 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/corporation-inquiry/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 기업 회원 문의 목록 조회 메서드
    public InquiryListDTO getCorporationInquiry(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if(search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithCorporationInquirySearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 기업 회원 문의 수 설정
            pagination.setTotal(adminService.getCorporationInquiryTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 기업 회원 문의 목록 반환
        return adminService.getCorporationInquiry(page, pagination, search);
    }

    // 신고 관리
    // 기업 후기 신고
    // 기업의 후기 신고 목록을 조회하는 비동기 REST API 엔드포인트
    // - 이 API는 기업 회원 목록을 페이지네이션과 검색 조건에 따라 반환합니다.
    // - 내부적으로 비동기 작업을 처리하여 성능을 최적화합니다.
    @GetMapping("/position/complain/{page}")
    @ResponseBody // 응답 데이터를 JSON 형식으로 반환
    // 기업 후기 신고 목록 조회 메서드
    public ComplainListDTO getComplains(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        // 정렬 조건이 없을 경우 기본값 설정
        if (search.getTypes() == null || search.getTypes().length == 0) {
            // 기본 정렬 조건으로 최신순 data-type = 'recent' 설정
            search.setTypes(new String[]{"recent"});
        }
        // 검색 조건이나 키워드가 있을 경우
        if (search.getKeyword() != null || search.getTypes() != null) {
            // 검색 조건에 맞는 총 개수 설정
            pagination.setTotal(adminService.getTotalWithComplainSearch(search));
        // 검색 조건이 없을 경우
        } else {
            // 전체 기업 후기 신고 수 설정
            pagination.setTotal(adminService.getComplainTotal());
        }
        // 페이지네이션 계산 진행
        pagination.progress();
        // 기업 후기 신고 목록 반환
        return adminService.getComplains(page, pagination, search);
    }






























}
