package com.app.positionback.repository.member;

import com.app.positionback.domain.member.MemberVO;
import com.app.positionback.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberDAO {

    private final MemberMapper memberMapper;

    public int findCountByMemberEmail(String memberEmail) {
        return memberMapper.selectCountByMemberEmail(memberEmail);
    }

    public int findCountByMemberPhone(String memberPhone) {
        return memberMapper.selectCountByMemberPhone(memberPhone);
    }

    public void save(MemberVO memberVO) {
        memberMapper.insert(memberVO);
    }

    public Optional<MemberVO> findByMemberEmailAndMemberPassword(MemberVO memberVO) {
        return memberMapper.selectByMemberEmailAndMemberPassword(memberVO);
    }
    public Optional<MemberVO> findByMemberKakaoEmail(String memberKakaoEmail){
        return memberMapper.selectByMemberKakaoEmail(memberKakaoEmail);
    }
    public void saveKakaoInfo(MemberVO memberVO){
        memberMapper.insertKakaoInfo(memberVO);
    }
    public void updateKakaoMember(MemberVO memberVO){
        memberMapper.updateKakaoMember(memberVO);
    }
    public Long findLastInsertId(){
        return memberMapper.selectLastInsertId();
    }

    public Optional<MemberVO> findById(Long id){
        return memberMapper.selectById(id);
    }
    public void incrementComplaintCount(Long id){
        memberMapper.incrementComplainCount(id);
    }
    public void updateName(MemberVO memberVO){ memberMapper.updateName(memberVO); }
}
