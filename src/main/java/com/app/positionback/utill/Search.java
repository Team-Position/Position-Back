package com.app.positionback.utill;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class Search {
    String keyword;
    String[] types;
    String[] locations;
    String[] jobs;
}
