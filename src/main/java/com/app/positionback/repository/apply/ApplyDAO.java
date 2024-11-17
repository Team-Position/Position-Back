package com.app.positionback.repository.apply;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.apply.ApplyVO;
import com.app.positionback.mapper.apply.ApplyMapper;
import com.app.positionback.utill.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ApplyDAO {
    private final ApplyMapper applyMapper;

    public List<ApplyDTO> findApplyByCorporationId(Pagination pagination, Long corporationId){
        return applyMapper.selectApplyByCorporationId(pagination, corporationId);
    }

    public int getTotal(Pagination pagination, Long corporationId){
        return applyMapper.selectCount(pagination, corporationId);
    }

    public void updateApplyStatus(ApplyVO applyVO){
        applyMapper.updateApplyStatus(applyVO);
    }

    public ApplyDTO findApplyById(Long applyId){
        return applyMapper.selectApplyById(applyId);
    }

    public void saveApply(ApplyVO applyVO){
        applyMapper.insertApply(applyVO);
    }
}
