package com.app.positionback.domain.payment;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String paymentAmount;
    private String paymentStatus;
    private String paymentMethod;
    private String createdDate;
    private String updatedDate;
    private Long noticeId;
    private Long memberId;

    // 관리자 페이지에서 결제 현황 체크를 위한 추가된 필드
    private String memberName;
    private String noticeTitle;
    private String memberPhone;

    public PaymentVO toVO() {
        return new PaymentVO(id, paymentAmount, paymentStatus, paymentMethod, createdDate, updatedDate, noticeId, memberId);
    }
}