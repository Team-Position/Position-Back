package com.app.positionback.controller.reply;

import com.app.positionback.domain.reply.ReplyDTO;
import com.app.positionback.domain.reply.ReplyListDTO;
import com.app.positionback.domain.reply.ReplyVO;
import com.app.positionback.service.reply.ReplyService;
import com.app.positionback.utill.Pagination;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
@Slf4j
public class ReplyController {
    private final ReplyService replyService;

    @PostMapping("/posts/{postId}/replies")
    public ResponseEntity<ReplyDTO> addReply(
            @PathVariable Long postId,
            @RequestBody ReplyDTO replyDTO) {
        try {
            replyDTO.setPostId(postId);
            Long memberId = replyDTO.getMemberId();
            if (memberId == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            ReplyVO replyVO = replyDTO.toVO();

            // 댓글 저장
            replyService.save(replyVO);

            ReplyDTO createdReplyDTO = replyService.getReplyById(replyVO.getId());

            return new ResponseEntity<>(createdReplyDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("댓글 작성 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/posts/{postId}/replies")
    public ReplyListDTO getReplies(
            @PathVariable("postId") Long postId,
            @RequestParam(defaultValue = "1") int page,
            Pagination pagination
    ) {
        int totalReplies = replyService.getTotal(postId);
        pagination.setTotal(totalReplies);
        pagination.setPage(page);
        pagination.progress();

        return replyService.getReplies(page, pagination, postId);
    }


    @PutMapping("/replies-update/{replyId}")
    public ResponseEntity<Void> updateReply(
            @PathVariable Long replyId,
            @RequestBody ReplyDTO replyDTO) {
        try {
            replyDTO.setId(replyId);

            // 댓글 조회
            ReplyDTO existingReply = replyService.getReplyById(replyId);
            if (existingReply == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (!existingReply.getMemberId().equals(replyDTO.getMemberId())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            ReplyVO replyVO = replyDTO.toVO();

            // 댓글 수정
            replyService.updateReply(replyVO);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("댓글 수정 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/replies-delete/{replyId}")
    public ResponseEntity<Void> deleteReply(
            @PathVariable Long replyId,
            @RequestParam Long memberId) { // 프론트엔드에서 memberId를 전달받음
        try {
            // 댓글 조회
            ReplyDTO existingReply = replyService.getReplyById(replyId);
            if (existingReply == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (!existingReply.getMemberId().equals(memberId)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            // 댓글 삭제
            replyService.deleteReply(replyId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("댓글 삭제 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
