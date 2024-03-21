package redlib.backend.service;

import redlib.backend.model.Token;
import redlib.backend.vo.OnlineUserVO;

import java.util.List;

/**
 * @author 李洪文
 * @date 2019/11/14 10:38
 */
public interface TokenService {
    /**
     * 用户登录，返回令牌信息
     *
     * @param userId   用户id
     * @param password 密码
     * @return 令牌信息
     */
    Token login(String userId, String password, String ipAddress, String userAgent);

    /**
     * 根据token获取令牌信息
     *
     * @param accessToken token
     * @return 令牌信息
     */
    Token getToken(String accessToken);

    /**
     * 登出系统
     *
     * @param accessToken 令牌token
     */
    void logout(String accessToken);


    /**
     * 获取在线用户列表
     *
     * @return
     */
    List<OnlineUserVO> list();

    /**
     * 将在线用户踢出系统
     *
     * @param accessToken 用户的accessToken
     */
    void kick(String accessToken);
}
