package redlib.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.NeedNoPrivilege;
import redlib.backend.annotation.Privilege;
import redlib.backend.model.Token;
import redlib.backend.service.TokenService;
import redlib.backend.utils.ThreadContextHolder;

@RestController
@RequestMapping("/api/authentication")
@BackendModule({"page:页面"})
public class AuthenticationController {
    @Autowired
    private TokenService tokenService;

    @PostMapping("login")
    @NeedNoPrivilege
    public Token login(String userId, String password, HttpServletRequest request, HttpServletResponse response) {
        String ipAddress = request.getRemoteAddr();
        ipAddress = ipAddress.replace("[", "").replace("]", "");
        Token token = tokenService.login(userId, password, ipAddress, request.getHeader("user-agent"));
        Cookie cookie = new Cookie("accessToken", token.getAccessToken());
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        return token;
    }

    @GetMapping("getCurrentUser")
    @Privilege
    public Token getCurrentUser() {
        return ThreadContextHolder.getToken();
    }

    @GetMapping("logout")
    @Privilege
    public void logout() {
    }

    @GetMapping("ping")
    @Privilege
    public void ping() {
    }
}
