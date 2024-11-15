package com.app.positionback.mapper.apply;

import com.app.positionback.domain.apply.ApplyDTO;
import com.app.positionback.domain.apply.ApplyVO;
import com.app.positionback.utill.Pagination;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ApplyMapper {
    public List<ApplyDTO> selectApplyByCorporationId(@Param("pagination") Pagination pagination, Long corporationId);
    public int selectCount(@Param("pagination") Pagination pagination, Long corporationId);
    public void updateApplyStatus(ApplyVO applyVO);
    public ApplyDTO selectApplyById(Long applyId);
    public void insertApply(ApplyVO applyVO);
}
