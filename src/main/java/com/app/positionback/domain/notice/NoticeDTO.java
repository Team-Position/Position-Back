package com.app.positionback.domain.notice;

import com.app.positionback.domain.file.FileDTO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class NoticeDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private Long corporationId;
    private String noticeTitle;
    private String noticeCareer;
    private String noticeEducation;
    private String noticeEndDate;
    private String createdDate;
    private String updatedDate;
    private String noticeWorkStartTime;
    private String noticeWorkEndTime;
    private String noticeWorkStartDate;
    private String noticeWorkEndDate;
    private String noticeJobCategoryName;
    private int noticeReadCount;
    private String corporationName;
    private String corporationAddress;
    private String corporationAddressDetail;
    private String corporationBusiness;
    private String corporationType;
    private Long corporationEmployeesNumber;
    private int corporationSales; // 회사 매출을 나타내기 위해 Double 사용
    private String corporationOwner;
    private String corporationEmail;
    private String corporationHomepage;
    private Long corporationReadCount;
    private String corporationCode;
    private String corporationGen; // 추가된 필드들
    private FileDTO fileDTO;

    // 관리자 페이지 - 공고 작성 관리에 필요한 필드 추가
    private String noticeStatus;

    public NoticeVO toVO(){
        return new NoticeVO(id,corporationId,noticeTitle,noticeCareer,noticeEducation,noticeEndDate,createdDate,updatedDate,noticeWorkStartTime,noticeWorkEndTime,noticeWorkStartDate,noticeWorkEndDate,noticeJobCategoryName,noticeReadCount);
    }
}
