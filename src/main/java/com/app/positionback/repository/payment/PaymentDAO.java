package com.app.positionback.repository.payment;

import com.app.positionback.domain.payment.PaymentVO;
import com.app.positionback.mapper.payment.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PaymentDAO {
    private final PaymentMapper paymentMapper;

    public void savePayment (PaymentVO paymentVO){
        paymentMapper.insertPayment(paymentVO);
    }
}
