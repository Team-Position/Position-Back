package com.app.positionback.controller.member;

import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.corporation.CorporationVO;
import com.app.positionback.domain.file.CorporationFileDTO;
import com.app.positionback.domain.member.MemberDTO;
//import com.app.positionback.service.member.MemberService;
import com.app.positionback.domain.member.MemberVO;
import com.app.positionback.domain.resume.ResumeDTO;
import com.app.positionback.exception.LoginFailException;
import com.app.positionback.repository.file.CorporationFileDAO;
import com.app.positionback.service.corporation.CorporationService;
import com.app.positionback.service.file.FileService;
import com.app.positionback.service.member.MemberService;
import com.app.positionback.service.resume.ResumeService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Controller
// 최상위 경로를 설정하여 컨트롤러를 구분한다.
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final CorporationService corporationService;
    private final ResumeService resumeService;
    private final HttpSession session;

    @GetMapping("/join/member")
    public void goToJoinForm(MemberDTO memberDTO) {

    }

    @PostMapping("/join/member")
    public RedirectView join(MemberDTO memberDTO) {
//        카카오로 회원가입 했다면,
        if(memberDTO.getMemberLoginType() != ""){
            memberService.updateKakaoMember(memberDTO.toVO());
            session.setAttribute("member", memberService.getMember(memberDTO.getId()));
            return new RedirectView("/");
        }

        memberService.join(memberDTO.toVO());

        return new RedirectView("/login");
    }

    @GetMapping("/join/company")
    public void goToJoinForm(CorporationVO corporationVO) {;}

    @PostMapping("/join/company")
    public RedirectView join(CorporationDTO corporationDTO, String uuid, String path, MultipartFile file) throws IOException {
        memberService.join(corporationDTO.toVO(), uuid, path, file);
        return new RedirectView("/login");
    }

    @GetMapping("/join/check-id")
    @ResponseBody
    public int checkId(String memberEmail){
        return memberService.checkMemberEmail(memberEmail);
    }

    @GetMapping("/join/company/check-id")
    @ResponseBody
    public int checkCorporationId(String corporationEmail){
        return corporationService.checkCorporationEmail(corporationEmail);
    }

    @GetMapping("/join/check-phone")
    @ResponseBody
    public int checkPhone(String memberPhone){
        return memberService.checkMemberPhone(memberPhone);
    }

    @GetMapping("/certification/phone")
    @ResponseBody
    public String certificate(String memberPhone){
        return memberService.sendMessage(memberPhone);
    }

    @GetMapping("/login")
    public String goToLoginForm(MemberDTO memberDTO) {
        return "login/login-combine";
    }

    @PostMapping("/login")
    public RedirectView login(MemberDTO memberDTO){
        if(memberDTO.getMemberType().equals("Personal")) {
            Optional<MemberVO> foundMember = memberService.login(memberDTO.toVO());
            MemberVO memberVO = foundMember.orElseThrow(() -> {
                throw new LoginFailException();
            });
            session.setAttribute("member", memberVO);
            log.info("멤버 들어옴 : {} ", session.getAttribute("member"));
            return new RedirectView("/");
        }
        Optional<CorporationVO> foundCorporation = corporationService.login(memberDTO);
        CorporationVO corporationVO = foundCorporation.orElseThrow(() -> {
            throw new LoginFailException();
        });
        session.setAttribute("member", corporationVO);
        return new RedirectView( "/corporation");
        //기업 회원일때는 corporation/login-corporation-main으로 return
    }

    @GetMapping("logout")
    public RedirectView logout(HttpSession session){
        session.invalidate();
        return new RedirectView("/login");
    }


    @GetMapping("/mypage")
    public String goToMypage(HttpSession session){
        MemberVO member = (MemberVO) session.getAttribute("member");
        if(member != null){
            if(member.getMemberEmail() != null) {
                return "my-page/my-info-general";
            } else {
                return "my-page/my-info-kakao";
            }
        } else {
            return "login/login-combine";
        }
    }

    @GetMapping("/resume/management")
    public String goToResumeManagement(Model model, HttpSession session) {
        MemberVO member = (MemberVO) session.getAttribute("member");
        List<ResumeDTO> resumes = resumeService.getAllByMemberId(member.getId());

        model.addAttribute("resumes", resumes);
        return "my-page/resume-management";
    }

    @GetMapping("/resume/write")
    public String goToResumeWrite() {
        return "my-page/resume-write";
    }

    @GetMapping("/my-page/my-info-kakao-detail")
    public void goToMypageDetail(){
        log.info("이동 레츠고");
    }

    @PostMapping("/change/name")
    public void changeName(@RequestParam("memberId") Long memberId, @RequestParam("changedName") String changedName) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberId);
        memberDTO.setMemberName(changedName);
        memberService.changeName(memberDTO.toVO());
        log.info("작업 끝");
    }

//    @GetMapping("/find-password/{memberId}")
//    public MemberVO findPassword(@PathVariable Long memberId){
//        Optional<MemberVO> foundMember = memberService.getMember(memberId);
//        MemberVO member = new MemberVO();
//        if(foundMember.isPresent()) {
//            member = foundMember.get();
//            return member;
//        }
//        return member;
//    }

    @GetMapping("/")
    public String goToMain(MemberDTO memberDTO, HttpSession session){
//        session.invalidate();
        return "main/body";
    }
    // 로그인한 멤버 정보 확인
    @GetMapping("/member/info")
    @ResponseBody
    public ResponseEntity<Object> getMemberInfo() {
        Object memberInfo = session.getAttribute("member");

        if (memberInfo != null) {
            log.info("세션에서 가져온 회원 정보: {}", memberInfo);
            return ResponseEntity.ok(memberInfo);
        } else {
            log.warn("세션에 로그인 정보가 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

