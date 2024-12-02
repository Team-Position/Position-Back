package com.app.positionback.controller.file;

import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.file.FileDTO;
import com.app.positionback.service.member.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/file/*")
public class FileController {
    private final MemberService memberService;

    @PostMapping("upload")
    @ResponseBody
    public FileDTO uploadCompanyFile(MultipartFile file) throws IOException {
        return memberService.uploadFile(file);
    }

    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException {
        return FileCopyUtils.copyToByteArray(new File("C:/upload", fileName));
    }

    @PostMapping("profile/upload")
    @ResponseBody
    public FileDTO uploadCompanyProfileFile(MultipartFile file) throws IOException {
        return memberService.uploadFile(file);
    }

    @PostMapping("profile/upload1")
    public RedirectView uploadCompanyProfile(@RequestParam String uuid, @RequestParam String path, MultipartFile file, HttpSession session) throws IOException {
        CorporationVO corporationVO = (CorporationVO) session.getAttribute("member");
        Long corporationId = corporationVO.getId();
        memberService.logo(uuid, path, file, corporationId);
        return  new RedirectView("/corporation");
    }


}
