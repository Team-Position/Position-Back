package com.app.positionback.controller.review;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.evaluation.EvaluationDTO;
import com.app.positionback.domain.evaluation.EvaluationVO;
import com.app.positionback.domain.review.CorporationReviewDTO;
import com.app.positionback.service.apply.ApplyService;
import com.app.positionback.service.review.ReviewService;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Date;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;
    private final ApplyService applyService;
    private final HttpSession session;


    @GetMapping("/corporation/position-review")
    public void goToPositionReview(CorporationReviewDTO corporationReviewDTO,
                                   Long id, Model model) {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");

        ApplyDTO applyDTO = applyService.getApplyById(id);
//        applyDTO.setNoticeWorkStartDate(String.valueOf(new Date()));

        model.addAttribute("apply", applyDTO);
        model.addAttribute("corporation", corporationVO);

    }

    @PostMapping("/corporation/position-review")
    public RedirectView createReview(CorporationReviewDTO corporationReviewDTO,  Long applyId) {

        reviewService.addCorporationReview(corporationReviewDTO,  applyId);
        return new RedirectView("/corporation");
    }
}
