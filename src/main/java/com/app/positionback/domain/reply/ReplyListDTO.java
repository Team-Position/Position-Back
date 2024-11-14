package com.app.positionback.domain.reply;

import com.app.positionback.utill.Pagination;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter @Setter @ToString
public class ReplyListDTO {
    private List<ReplyDTO> replies;
    private Pagination pagination;
}
