package com.app.positionback.controller.main;

import com.app.positionback.domain.notice.NoticeDTO;
import com.app.positionback.domain.notice.NoticeListDTO;
import com.app.positionback.service.notice.NoticeService;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {
    private final NoticeService noticeService;
    private final HttpSession session;

    @GetMapping("/main/body")
    public String goToMainPage(Model model) {
        NoticeListDTO noticeListDTO = noticeService.getTop3();
        List<NoticeDTO> notices = noticeListDTO.getNotices();

        model.addAttribute("notices", notices);

        return "/main/body";
    }
}
