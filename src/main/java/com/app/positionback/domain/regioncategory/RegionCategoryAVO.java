package com.app.positionback.domain.regioncategory;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegionCategoryAVO {
    @EqualsAndHashCode.Include
    private Long id;
    private String regionCategoryAName;
}
