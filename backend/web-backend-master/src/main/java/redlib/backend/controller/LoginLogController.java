package redlib.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.Privilege;
import redlib.backend.dto.query.LoginLogQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.service.LoginLogService;
import redlib.backend.vo.LoginLogVO;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/1
 */
@RestController
@RequestMapping("/api/loginLog")
@BackendModule({"page:页面"})
public class LoginLogController {
    @Autowired
    private LoginLogService logService;

    @PostMapping("list")
    @Privilege("page")
    public Page<LoginLogVO> listLoginLog(@RequestBody LoginLogQueryDTO queryDTO) {
        return logService.list(queryDTO);
    }
}
