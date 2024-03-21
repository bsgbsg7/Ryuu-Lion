package redlib.backend.service;

import redlib.backend.dto.query.LoginLogQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.vo.LoginLogVO;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/8
 */
public interface LoginLogService {
    Page<LoginLogVO> list(LoginLogQueryDTO queryDTO);
}
