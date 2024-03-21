package redlib.backend.filter;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import redlib.backend.utils.FormatUtils;

/**
 * @author 李洪文
 * @description
 * @date 2019/12/12 15:32
 */
public class RequestWrapper extends HttpServletRequestWrapper {
    private String accessToken;

    @SuppressWarnings("all")
    public RequestWrapper(HttpServletRequest request) {
        super(request);
        accessToken = FormatUtils.trimToEmpty(getCookie("accessToken"));
        if (!accessToken.isEmpty()) {
            return;
        }
    }

    private String getCookie(String cookieName) {
        Cookie[] cookies = getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
