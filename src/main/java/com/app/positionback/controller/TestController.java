package com.app.positionback.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
public class TestController {

    @GetMapping("/test")
    public String goTO(){ return "test";}

    @PostMapping("/test")
    @ResponseBody
    public void  test(@RequestParam List<String> jobs, @RequestParam List<String> regions,
                     @RequestParam String searchKeyword)   {
        log.info(jobs.toString());
        log.info(regions.toString());
        log.info(searchKeyword);
    }
}
