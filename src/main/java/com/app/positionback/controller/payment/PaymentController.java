package com.app.positionback.controller.payment;

import com.app.positionback.domain.payment.PaymentVO;
import com.app.positionback.service.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment/*")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/complete")
    public void completePayment(@RequestBody PaymentVO paymentVO) {
        paymentService.insertPayment(paymentVO);
    }
}
