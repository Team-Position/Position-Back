package com.app.positionback.service.payment;

import com.app.positionback.domain.payment.PaymentVO;
import com.app.positionback.repository.payment.PaymentDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
@Slf4j
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentDAO paymentDAO;
    @Override
    public void insertPayment(PaymentVO paymentVO) {
        paymentDAO.savePayment(paymentVO);
    }
}
