package com.app.positionback.controller.inquiry;

import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.inquiry.InquiryDTO;
import com.app.positionback.domain.member.MemberVO;
import com.app.positionback.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/customer-service-center")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
    private final InquiryService inquiryService;
    private final HttpSession session;
//    @GetMapping("inquiry")
//    public void goToInquiryForm(InquiryDTO inquiryDTO) {;}

    // 테스트 이메일 값을 넣은 1:1 문의 작성
    @GetMapping("/inquiry")
    public void goToInquiryForm(InquiryDTO inquiryDTO, Model model) {
        Object sessionUser = session.getAttribute("member");

        if (sessionUser instanceof MemberVO) {
            model.addAttribute("member", (MemberVO) sessionUser); // 개인 사용자
        } else if (sessionUser instanceof CorporationVO) {
            model.addAttribute("corporation", (CorporationVO) sessionUser); // 기업 사용자
        }
    }

    @PostMapping("/inquiry")
    public RedirectView write(InquiryDTO inquiryDTO, HttpSession session) {
        Long memberId = (Long) session.getAttribute("memberId");
        if (memberId == null) {
            memberId = 1L;
        }
        inquiryDTO.setMemberId(memberId);
        log.info(inquiryDTO.toString());
        inquiryService.write(inquiryDTO.toVO());
        return new RedirectView("/customer-service-center/faq");
    }

    @GetMapping("/faq")
    public String goToFaqForm() {
        return "customer-service-center/faq";
    }
}

