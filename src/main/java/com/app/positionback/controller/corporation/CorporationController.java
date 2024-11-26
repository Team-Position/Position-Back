package com.app.positionback.controller.corporation;

import com.app.positionback.domain.apply.ApplyListDTO;
import com.app.positionback.domain.apply.ApplyVO;
import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.review.PositionReviewListDTO;
import com.app.positionback.repository.apply.ApplyDAO;
import com.app.positionback.service.apply.ApplyService;
import com.app.positionback.service.corporation.CorporationService;
import com.app.positionback.service.member.MemberService;
import com.app.positionback.service.notice.NoticeService;
import com.app.positionback.service.review.ReviewService;
import com.app.positionback.utill.Pagination;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class CorporationController {

    private final CorporationService corporationService;
    private final NoticeService noticeService;
    private final ApplyService applyService;
    private final ReviewService reviewService;
    private final HttpSession session;

//    기업 메인페이지
    @GetMapping("/corporation")
    public String goToMain(Long id, Model model){
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        FileDTO fileDTO = corporationService.getCorporationFileById(corporationVO.getId());
        List<NoticeDTO> noticeDTO = noticeService.getRecentNotices(corporationVO.getId());

        // Pagination 객체를 생성하여 상태별 공고 개수를 조회
        Pagination pagination = new Pagination();
        noticeService.getTotal(pagination, corporationVO.getId());

        // Pagination에서 상태별 개수 가져오기
        model.addAttribute("ongoingCount", pagination.getOngoingCount());
        model.addAttribute("closedCount", pagination.getClosedCount());
        model.addAttribute("positionerCount", pagination.getPositionCount());
        model.addAttribute("reviewCount", pagination.getReviewCount());
        model.addAttribute("file", fileDTO);
        model.addAttribute("corporation", corporationVO);
        model.addAttribute("notice",noticeDTO);
        return "corporation/corporation-login-main";
    }

//    기업 지원 목록 페이지
    @GetMapping("/corporation/management")
    public void goToManagement(@RequestParam(required = false) Integer page, Pagination pagination, Model model){
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        FileDTO fileDTO = corporationService.getCorporationFileById(corporationVO.getId());
//        FileDTO fileDTO = corporationService.getApplyFileById(corporationVO.getId());
        // page가 null인 경우 기본값 설정
        if (page == null) {
            page = 1; // 기본 페이지 번호
        }
        if(pagination.getOrder() == null){
            pagination.setOrder("recent");
        }
        if(pagination.getStatus() == null){
            pagination.setStatus("ongoing");
        }

        ApplyListDTO applyListDTO = applyService.getApplyByCorporationId(page, pagination, corporationVO.getId());
        model.addAttribute("applies", applyListDTO);
        model.addAttribute("file", fileDTO);
        model.addAttribute("corporation", corporationVO);


        // Pagination에서 상태별 개수 가져오기
        model.addAttribute("ongoingCount", pagination.getOngoingCount());
        model.addAttribute("closedCount", pagination.getClosedCount());
        model.addAttribute("positionCount", pagination.getPositionCount());
        model.addAttribute("reviewCount", pagination.getReviewCount());
    }
//  기업 지원 목록 페이지 (비동기)
    @GetMapping("/applies/list/{page}")
    @ResponseBody
    public ApplyListDTO getApplyList(@PathVariable("page") Integer page, Pagination pagination){
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");;

        if(pagination.getOrder() == null){
            pagination.setOrder("recent");
        }
        if(pagination.getStatus() == null){
            pagination.setStatus("ongoing");
        }
        // page가 null인 경우 기본값 설정
        if (page == null) {
            page = 1; // 기본 페이지 번호
        }
        return applyService.getApplyByCorporationId(page,pagination,corporationVO.getId());
    }

    // 기업에게 작성한 후기에서 질문 가져오기
    @GetMapping("/review/question")
    @ResponseBody
    public List<PositionReviewListDTO> getReviewQuestion(Long positionerReviewId){
        return reviewService.getPositionReviewList(positionerReviewId);
    }

//    지원자들 명수
    @GetMapping("/apply/total")
    @ResponseBody
    public int getTotalCount(@RequestParam String status) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");;

        Pagination pagination = new Pagination();
        pagination.setStatus(status);
        return applyService.getTotal(pagination, corporationVO.getId()); // corporationId에 맞게 조정
    }
//  기업 지원 목록에서 상태 update
    @PutMapping("/apply/update")
    @ResponseBody
    public void updateApplyStatus(@RequestBody ApplyVO applyVO){
        applyService.setApplyStatus(applyVO);
    }

//    기업이 이수증 올려주는 것
    @PostMapping("/certification/upload")
    @ResponseBody
    public void uploadCertificationFile(MultipartFile file, @RequestParam Long applyId) throws IOException {
        applyService.uploadCertificationFile(file, applyId);
    }

    @PostMapping("/file/certification/upload")
    public void uploadCertificationFile(MultipartFile file) throws IOException {
        ;
    }
}
