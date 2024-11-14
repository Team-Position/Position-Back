package com.app.positionback.service.regioncategory;

import com.app.positionback.domain.regioncategory.RegionCategoryADTO;
import com.app.positionback.domain.regioncategory.RegionCategoryBDTO;
import com.app.positionback.repository.regioncategory.RegionCategoryDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Primary
@Service
@RequiredArgsConstructor
public class RegionCategoryServiceImpl implements RegionCategoryService {
    private final RegionCategoryDAO regionCategoryDAO;

    @Override
    public List<RegionCategoryADTO> findAllRegionCategory() {
        return regionCategoryDAO.findAllRegionCategory();
    }

    @Override
    public Map<String, List<String>> findAllRegionCategoryMap(Long categoryAId) {
        // 1. RegionCategoryA(대카) 정보를 ID로 조회
        RegionCategoryADTO categoryA = regionCategoryDAO.findRegionCategoryById(categoryAId);

        // 2. RegionCategoryB(소카) 리스트를 특정 RegionCategoryA ID에 따라 조회
        List<RegionCategoryBDTO> categoriesB = regionCategoryDAO.findAllRegionCategoryB(categoryAId);

        // 3. 최종 맵 생성 (RegionCategoryA 이름을 키로, RegionCategoryB 이름 리스트를 값으로)
        Map<String, List<String>> resultMap = new HashMap<>();

        // 4. RegionCategoryB의 이름만 리스트로 변환하여 최종 맵에 추가
        List<String> categoryNamesB = categoriesB.stream()
                .map(RegionCategoryBDTO::getRegionCategoryBName)
                .collect(Collectors.toList());

        resultMap.put(categoryA.getRegionCategoryAName(), categoryNamesB);

        return resultMap;
    }
}
