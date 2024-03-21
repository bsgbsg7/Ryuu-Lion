package redlib.backend.utils;

import org.springframework.util.Assert;
import redlib.backend.model.Token;

/**
 * token 存取工具类
 *
 * @author 李洪文
 * @description
 * @date 2019/12/3 9:24
 */
public class ThreadContextHolder {
    private static ThreadLocal<Token> tokenHolder = new ThreadLocal<>();


    public static Token getToken() {
        Token token = tokenHolder.get();
        Assert.notNull(token, "未找到访问令牌，请重新登录");
        return token;
    }

    public static void setToken(Token token) {
        tokenHolder.set(token);
    }

    public static Token getTokenWithoutAssert() {
        return tokenHolder.get();
    }
}
