package com.app.positionback.domain.regioncategory;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegionCategoryBDTO {
    @EqualsAndHashCode.Include
    private Long id;
    private String regionCategoryBName;
    private Long regionCategoryAId;

    public RegionCategoryBVO toVO(){
        return new RegionCategoryBVO(id, regionCategoryBName, regionCategoryAId);
    }
}
