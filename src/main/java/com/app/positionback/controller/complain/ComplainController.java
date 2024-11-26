package com.app.positionback.controller.complain;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.complain.ComplainDTO;
import com.app.positionback.domain.complain.ComplainVO;
import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.service.apply.ApplyService;
import com.app.positionback.service.complain.ComplainService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ComplainController {
    private final ComplainService complainService;
    private final ApplyService applyService;
    private final HttpSession session;

    @GetMapping("/corporation/complain")
    public String insertComplain(ComplainDTO complainDTO, Long id, Model model) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        ApplyDTO applyDTO = applyService.getApplyById(id);
        model.addAttribute("apply", applyDTO);
        model.addAttribute("corporation", corporationVO);
        return "/complain/corporation-review-complain";
    }

    @PostMapping("/corporation/complain")
    public RedirectView saveComplain(ComplainDTO complainDTO) {
        complainService.registerComplain(complainDTO.toVO());
        return new RedirectView("/corporation");
    }
}
