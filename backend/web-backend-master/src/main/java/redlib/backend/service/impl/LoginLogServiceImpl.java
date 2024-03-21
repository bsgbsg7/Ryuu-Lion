package redlib.backend.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import redlib.backend.dao.LoginLogMapper;
import redlib.backend.dto.query.LoginLogQueryDTO;
import redlib.backend.model.LoginLog;
import redlib.backend.model.Page;
import redlib.backend.service.LoginLogService;
import redlib.backend.utils.FormatUtils;
import redlib.backend.utils.PageUtils;
import redlib.backend.vo.LoginLogVO;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoginLogServiceImpl implements LoginLogService {
    @Autowired
    private LoginLogMapper loginLogMapper;

    @Override
    public Page<LoginLogVO> list(LoginLogQueryDTO queryDTO) {
        Assert.notNull(queryDTO, "查询参数不能为空");
        FormatUtils.trimFieldToNull(queryDTO);
        queryDTO.setOrderBy(FormatUtils.formatOrderBy(queryDTO.getOrderBy()));

        Integer total = loginLogMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getCurrent(), queryDTO.getPageSize(), total);
        if (pageUtils.isDataEmpty()) {
            return pageUtils.getNullPage();
        }

        List<LoginLog> list = loginLogMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        List<LoginLogVO> voList = list.stream()
                .map(item -> {
                    LoginLogVO vo = new LoginLogVO();
                    BeanUtils.copyProperties(item, vo);
                    return vo;
                })
                .collect(Collectors.toList());
        return new Page<>(pageUtils.getCurrent(), pageUtils.getPageSize(), pageUtils.getTotal(), voList);
    }
}
