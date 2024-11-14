package com.app.positionback.service.regioncategory;

import com.app.positionback.domain.regioncategory.RegionCategoryADTO;

import java.util.List;
import java.util.Map;

public interface RegionCategoryService {
    List<RegionCategoryADTO> findAllRegionCategory();
    Map<String, List<String>> findAllRegionCategoryMap(Long categoryAId);
}
