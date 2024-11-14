package com.app.positionback.repository.reply;

import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.domain.reply.ReplyVO;
import com.app.positionback.mapper.reply.ReplyMapper;
import com.app.positionback.utill.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReplyDAO {
    private final ReplyMapper replyMapper;

    public void insertReply(ReplyVO replyVO) {
        replyMapper.insertReply(replyVO);
    }

    public List<ReplyDTO> getRepliesByPostId(Pagination pagination, Long postId) {
        return replyMapper.selectRepliesByPostId(postId, pagination);
    }

    public ReplyDTO getReplyById(Long id) {
        return replyMapper.selectReplyById(id);
    }

    public void updateReply(ReplyVO replyVO) {
        replyMapper.updateReply(replyVO);
    }

    public void deleteReply(Long id) {
        replyMapper.deleteReply(id);
    }

    public int getTotal(Long postId){
        return replyMapper.selectCount(postId);
    }

}
