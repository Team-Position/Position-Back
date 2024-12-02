package com.app.positionback.controller.inquiry;

import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.file.FileVO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.inquiry.InquiryVO;
import com.app.positionback.domain.member.MemberVO;
import com.app.positionback.service.inquiry.InquiryFileService;
import com.app.positionback.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@Controller
@RequestMapping("/customer-service-center/*")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
    private final InquiryService inquiryService;
    private final HttpSession session;
    private final InquiryFileService inquiryFileService;


    // 테스트 이메일 값을 넣은 1:1 문의 작성
    @GetMapping("inquiry")
    public void goToInquiryForm(@ModelAttribute InquiryDTO inquiryDTO, Model model) {
        Object sessionUser = session.getAttribute("member");

        if (sessionUser instanceof MemberVO) {
            model.addAttribute("member", (MemberVO) sessionUser); // 개인 사용자
        } else if (sessionUser instanceof CorporationVO) {
            model.addAttribute("corporation", (CorporationVO) sessionUser); // 기업 사용자
        }
    }



    @PostMapping("upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file) {
        try {
            FileVO savedFile = inquiryFileService.saveFile(file);  // 파일 저장 후 FileVO 반환
            String savedFileName = savedFile.getFileName();  // 파일명 추출
            return savedFileName;  // uuid+파일명 반환
        } catch (Exception e) {
            log.error("파일 업로드 중 오류 발생: ", e);
            return "error";  // 오류 발생 시 "error" 문자열 반환
        }
    }


    @PostMapping("inquiry")
    public RedirectView write(
            @ModelAttribute InquiryDTO inquiryDTO,
            HttpSession session
    ) {
        // 세션에서 회원 ID 가져오기
        Long memberId = (Long) session.getAttribute("memberId");
        if (memberId == null) {
            memberId = 1L; // 기본값
        }
        inquiryDTO.setMemberId(memberId);

        // 서비스 계층 호출
        inquiryService.writeInquiry(inquiryDTO);

        return new RedirectView("/customer-service-center/faq");
    }


    @GetMapping("faq")
    public String goToFaqForm() {
        return "customer-service-center/faq";
    }
}

//
//// 파일명 리스트를 DTO에 설정
//        if (fileName != null && !fileName.isEmpty()) {
//        inquiryDTO.setFileName(fileName); // 정적 호출에서 인스턴스 호출로 변경
//// 파일 타입 설정은 서비스 계층에서 처리
//        }
