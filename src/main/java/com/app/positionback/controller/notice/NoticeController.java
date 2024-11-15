package com.app.positionback.controller.notice;

import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.domain.member.MemberVO;
import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.service.corporation.CorporationService;
import com.app.positionback.service.notice.NoticeService;
import com.app.positionback.service.resume.ResumeService;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.Arrays;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/corporation/*")
public class NoticeController {
    private final NoticeService noticeService;
    private final CorporationService corporationService;
    private final ResumeService resumeService;
    private final HttpSession session;

//    공고 작성 페이지 이동
    @GetMapping("corporation-login-main-write-posting")
    public void goToWriteNotice(NoticeDTO noticeDTO,Model model) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        noticeDTO.setCorporationId(corporationVO.getId());
        model.addAttribute("corporation", corporationVO);
    }

    @PostMapping("corporation-login-main-write-posting")
    public RedirectView write(NoticeDTO noticeDTO, String uuid, String path, MultipartFile file) throws IOException {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        noticeDTO.setCorporationId(corporationVO.getId());
        noticeService.saveNotice(noticeDTO.toVO(), uuid, path, file);
        return new RedirectView("/corporation");
    }

    // 공고 목록 조회
    @GetMapping("corporation-login-main-posting-registration")
    public void getNoticePage(@RequestParam(required = false) Integer page,Pagination pagination, Model model) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        FileDTO fileDTO = corporationService.getCorporationFileById(corporationVO.getId());

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
        // 공고 목록 조회
        NoticeListDTO noticeListDTO = noticeService.getNoticesByCorporationId(page, pagination, corporationVO.getId()); // corporationId에 맞게 조정
        model.addAttribute("notices", noticeListDTO); // "notices"라는 이름으로 데이터를 추가

        // Pagination에서 상태별 개수 가져오기
        model.addAttribute("ongoingCount", pagination.getOngoingCount());
        model.addAttribute("closedCount", pagination.getClosedCount());
        model.addAttribute("categoryRankings", noticeListDTO.getCategoryRankings()); // 카테고리 순위 추가
        model.addAttribute("monthRankings", noticeListDTO.getMonthRankings()); // 월별 채용 순위 추가
        model.addAttribute("file", fileDTO);
        model.addAttribute("corporation", corporationVO);
    }

    // 공고 목록 조회 (비동기)
    @GetMapping("notices/list/{page}")
    @ResponseBody
    public NoticeListDTO getNoticeList(@PathVariable("page") Integer page, Pagination pagination) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");

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
        return noticeService.getNoticesByCorporationId(page,pagination,corporationVO.getId()); // corporationId에 맞게 조정
    }
    // 공고 전체 목록
    @PostMapping("notices/all-list/{page}")
    @ResponseBody
    public NoticeListDTO getNoticeAllList(@PathVariable("page") Integer page, Pagination pagination, Search search) {
        log.info("검색어: " + search.getKeyword());

        // getJobs()가 null이 아닌지 확인하고 로그 출력
        if (search.getJobs() != null) {
            log.info("직업 목록: " + Arrays.toString(search.getJobs())); // 배열 내용을 출력
        } else {
            log.warn("직업 목록이 null입니다.");
        }

        // getLocations()가 null이 아닌지 확인하고 로그 출력
        if (search.getLocations() != null) {
            log.info("위치 목록: " + Arrays.toString(search.getLocations())); // 배열 내용을 출력
        } else {
            log.warn("위치 목록이 null입니다.");
        }
        return noticeService.getAll(page, pagination, search); // corporationId에 맞게 조정
    }

    @GetMapping("notices/total")
    @ResponseBody
    public int getTotalCount(@RequestParam String status) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");;

        Pagination pagination = new Pagination();
        pagination.setStatus(status);
        return noticeService.getTotal(pagination, corporationVO.getId()); // corporationId에 맞게 조정
    }

    // 공고 상세 조회
    @GetMapping("notice-detail")
    public Object  getNoticeDetail(@RequestParam("id")Long id, Model model) {
        MemberVO memberVO = (MemberVO) session.getAttribute("member");

        // 로그인 여부 확인
        if (memberVO == null) {
            return new RedirectView("/login");  // 로그인 페이지로 리다이렉트
        }

        ResumeDTO resumeDTO = resumeService.getResumeByMemberId(memberVO.getId());
        NoticeDTO noticeDTO = noticeService.getNoticeById(id);
        FileDTO fileDTO = noticeService.getNoticeFileById(id);
        FileDTO fileLogo = corporationService.getCorporationFileById(noticeDTO.getCorporationId());

        model.addAttribute("resume", resumeDTO);
        model.addAttribute("notice", noticeDTO);
        model.addAttribute("file", fileDTO);
        model.addAttribute("logoFile", fileLogo);
        model.addAttribute("member", memberVO);
        return "matching/matching-detail";
    }

    // 공고 상세 조회(기업 미리보기)
    @GetMapping("notice-preview")
    public String getNoticeCorporationPreview(@RequestParam("id")Long id, Model model) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");

        NoticeDTO noticeDTO = noticeService.getNoticeById(id);
        FileDTO fileDTO = noticeService.getNoticeFileById(id);
        FileDTO fileLogo = corporationService.getCorporationFileById(noticeDTO.getCorporationId());

        model.addAttribute("notice", noticeDTO);
        model.addAttribute("file", fileDTO);
        model.addAttribute("logoFile", fileLogo);
        model.addAttribute("corporation", corporationVO);
        return "matching/matching-detail-corporation";
    }

//    // 공고 수정 페이지 이동
//    @GetMapping("corporation-login-main-update-posting/{id}")
//    public String goToUpdateNotice(Long id, Model model) {
//        NoticeDTO notice = noticeService.getNoticeById(id);
//        model.addAttribute("notice", notice);
//        return "notice/updateNotice";
//    }
//
//    // 공고 수정 처리
//    @PostMapping("corporation-login-main-update-posting")
//    public RedirectView update(NoticeDTO noticeDTO, MultipartFile file) throws IOException {
//        noticeService.updateNotice(noticeDTO, file);
//        return new RedirectView("/corporation/notice/list");
//    }

    // 공고 삭제 처리
    @DeleteMapping("notice/delete/{id}")
    @ResponseBody
    public void delete(@PathVariable("id") Long id) {
        noticeService.deleteNotice(id);
    }
}
