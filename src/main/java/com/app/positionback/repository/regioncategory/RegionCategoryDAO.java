package com.app.positionback.repository.regioncategory;

import com.app.positionback.domain.regioncategory.RegionCategoryADTO;
import com.app.positionback.domain.regioncategory.RegionCategoryBDTO;
import com.app.positionback.mapper.regioncategory.RegionCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RegionCategoryDAO {
    private final RegionCategoryMapper regionCategoryMapper;

    public List<RegionCategoryADTO> findAllRegionCategory() {
        return regionCategoryMapper.selectRegionCategoryA();
    }

    public RegionCategoryADTO findRegionCategoryById(Long id) {
        return regionCategoryMapper.selectRegionCategoryAById(id);
    }

    public List<RegionCategoryBDTO> findAllRegionCategoryB(Long categoryAId) {
        return regionCategoryMapper.selectRegionCategoryB(categoryAId);
    }
}
