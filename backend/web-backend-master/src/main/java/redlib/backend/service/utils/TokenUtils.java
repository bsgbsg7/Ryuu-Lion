package redlib.backend.service.utils;

import org.springframework.beans.BeanUtils;
import redlib.backend.model.Token;
import redlib.backend.vo.OnlineUserVO;

public class TokenUtils {
    public static OnlineUserVO convertToVO(Token token) {
        OnlineUserVO vo = new OnlineUserVO();
        BeanUtils.copyProperties(token, vo);
        return vo;
    }
}
