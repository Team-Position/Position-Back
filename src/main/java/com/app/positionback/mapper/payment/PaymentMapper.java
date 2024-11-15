package com.app.positionback.mapper.payment;

import com.app.positionback.domain.payment.PaymentVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {
    public void insertPayment(PaymentVO paymentVO);
}
