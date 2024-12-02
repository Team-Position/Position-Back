package com.app.positionback.domain.payment;

import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter @Setter @ToString
public class PaymentListDTO {
    private List<PaymentDTO> payments;
    private Pagination pagination;
    private Search search;
}
