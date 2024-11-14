package com.app.positionback.controller.apply;

import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.service.apply.ApplyService;
import com.app.positionback.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class ApplyController {
    private final ApplyService applyService;
    private final NoticeService noticeService;

    @GetMapping("/matching")
    public String matchingMain(Model model) {
        // 상위 4개의 공고와 파일 정보 가져오기
        NoticeListDTO top4Notices = noticeService.getTop3();

        // 모델에 추가하여 뷰에서 사용할 수 있도록 설정
        model.addAttribute("top4Notices", top4Notices);
        return "matching/matching-main";
    }
}
