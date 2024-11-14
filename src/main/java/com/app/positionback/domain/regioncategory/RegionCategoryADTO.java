package com.app.positionback.domain.regioncategory;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegionCategoryADTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String regionCategoryAName;

    public RegionCategoryAVO toVO(){
        return new RegionCategoryAVO(id, regionCategoryAName);
    }
}
