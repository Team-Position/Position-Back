package com.app.positionback.controller.regioncategory;

import com.app.positionback.domain.regioncategory.RegionCategoryADTO;
import com.app.positionback.service.regioncategory.RegionCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/regioncategories")
@RequiredArgsConstructor
public class RegionCategoryController {
    private final RegionCategoryService regionCategoryService;

    // 모든 대카 리스트 반환
    @GetMapping("/categoryA")
    public List<RegionCategoryADTO> getAllRegionCategoryA() {
        return regionCategoryService.findAllRegionCategory();
    }

    // 특정 대카에 속하는 소카 리스트 반환
    @GetMapping("/categoryB/{categoryAId}")
    public Map<String, List<String>> getRegionCategoryB(@PathVariable("categoryAId") Long categoryAId) {
        return regionCategoryService.findAllRegionCategoryMap(categoryAId);
    }
}
