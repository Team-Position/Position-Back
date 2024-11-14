package com.app.positionback.mapper.regioncategory;

import com.app.positionback.domain.regioncategory.RegionCategoryADTO;
import com.app.positionback.domain.regioncategory.RegionCategoryBDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RegionCategoryMapper {

    // 지역 대카 조회
    List<RegionCategoryADTO> selectRegionCategoryA();

    // 대카 id로 조회
    public RegionCategoryADTO selectRegionCategoryAById(Long id);

    // 소카 조회
    List<RegionCategoryBDTO> selectRegionCategoryB(Long categoryAId);
}
