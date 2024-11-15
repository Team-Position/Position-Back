package com.app.positionback.domain.member;

import com.app.positionback.domain.corporation.CorporationVO;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

// for view
@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MemberDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberNickname;
    private String memberStatus;
    private String memberType;
    private String memberComplainCount;
    private String memberPhone;
    private String memberKakaoProfileUrl;
    private String memberKakaoEmail;
    private String memberBirthDay;
    private String memberLoginType;
    private String createdDate;
    private String updatedDate;

//    기업
    private String corporationName;
    private String corporationAddress;
    private String corporationAddressDetail;
    private String corporationType;
    private String corporationOwner;
    private String corporationEmail;
    private String corporationPassword;
    private String corporationHomepage;
    private String corporationGen;
    private String corporationSales;
    private String corporationCode;
    private String corporationEmployeesNumber;
    private int corporationReadCount;
    private String corporationBusiness;
    private int corporationInterestedCount;
    private String corporationOpeningDate;

    public MemberVO toVO() {
        return new MemberVO(id, memberName,memberEmail,memberPassword,memberAddress,memberAddressDetail,memberNickname,memberStatus,
                memberComplainCount,memberPhone,memberKakaoProfileUrl,memberKakaoEmail,memberBirthDay,createdDate,updatedDate);
    }
}


