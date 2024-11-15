package com.app.positionback.domain.member;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter @ToString @EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
// for persistence
public class MemberVO implements Serializable {
    @EqualsAndHashCode.Include
    private Long id;
    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberNickname;
    private String memberStatus;
    private String memberComplainCount;
    private String memberPhone;
    private String memberKakaoProfileUrl;
    private String memberKakaoEmail;
    private String memberBirthDay;
    private String createdDate;
    private String updatedDate;
}
