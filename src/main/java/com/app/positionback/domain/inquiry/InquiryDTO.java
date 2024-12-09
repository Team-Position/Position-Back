package com.app.positionback.domain.inquiry;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString @EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class InquiryDTO {
    private Long id;
    private String inquiryType;
    private String inquiryCategory;
    private String inquiryTitle;
    private String inquiryContent;
    private String createdDate;
    private String updatedDate;
    private Long memberId;
    private String memberEmail;
    private String fileName; // 업로드된 파일명
    private String filePath; // 업로드된 파일 경로
    private String fileSize; // 업로드된 파일 크기

    // 관리자 문의 작성 페이지 추가 필드
    private String memberName;
    private String corporationName;
    private String inquiryStatus;

    public InquiryVO toVO() {
        return new InquiryVO(id, inquiryType, inquiryCategory, inquiryTitle, inquiryContent, createdDate, updatedDate, memberId, memberEmail);
    }
}