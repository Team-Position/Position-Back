package com.app.positionback.service.reply;

import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.domain.reply.ReplyListDTO;
import com.app.positionback.domain.reply.ReplyVO;
import com.app.positionback.utill.Pagination;

import java.util.List;

public interface ReplyService {
   public void save(ReplyVO replyVO);
    public ReplyListDTO getReplies(int page, Pagination pagination, Long postId);
    public ReplyDTO getReplyById(Long id);
    public void updateReply(ReplyVO replyVO);
    public void deleteReply(Long id);
    public int getTotal(Long postId);

}
