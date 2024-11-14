package com.app.positionback.admin;

import com.app.positionback.domain.corporation.CorporationDTO;
import com.app.positionback.domain.member.MemberDTO;
import com.app.positionback.mapper.admin.AdminMapper;
import com.app.positionback.utill.Pagination;
import com.app.positionback.utill.Search;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
public class AdminMapperTests {
    @Autowired
    private AdminMapper adminMapper;

    @Test
    public void testAdminMapper() {}

    // 일반 회원 목록 MapperTests
    @Test
    public void testSelectAllMembers() {
        Pagination pagination = new Pagination();
        pagination.setTotal(adminMapper.selectMemberTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        adminMapper.selectAllMembers(pagination, new Search());
    }

    // 기업 회원 목록 MapperTests
    @Test
    public void testSelectAllCorporationMembers() {
        Pagination pagination = new Pagination();
        pagination.setTotal(adminMapper.selectCorporationTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        adminMapper.selectAllCorporationMembers(pagination, new Search());
    }

    // 지원 현황 MapperTests
    @Test
    public void testSelectAllApplys() {
        Pagination pagination = new Pagination();
        pagination.setTotal(adminMapper.selectApplyTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        adminMapper.selectAllApply(pagination, new Search());
    }

    // 면접 현황 MapperTests
    @Test
    public void testSelectAllInterviews() {
        Pagination pagination = new Pagination();
        pagination.setTotal(adminMapper.selectInterviewTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        adminMapper.selectAllInterview(pagination, new Search());
    }

    // 포지션 현황 MapperTests
    @Test
    public void testSelectAllPositions() {
        Pagination pagination = new Pagination();
        pagination.setTotal(adminMapper.selectPositionTotal());
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        adminMapper.selectAllPosition(pagination, new Search());
    }






















}
