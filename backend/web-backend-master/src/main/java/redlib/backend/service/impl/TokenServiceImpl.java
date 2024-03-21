package redlib.backend.service.impl;

import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.OperatingSystem;
import eu.bitwalker.useragentutils.UserAgent;
import eu.bitwalker.useragentutils.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import redlib.backend.dao.AdminMapper;
import redlib.backend.dao.AdminPrivMapper;
import redlib.backend.dao.LoginLogMapper;
import redlib.backend.model.Admin;
import redlib.backend.model.AdminPriv;
import redlib.backend.model.LoginLog;
import redlib.backend.model.Token;
import redlib.backend.service.TokenService;
import redlib.backend.service.utils.TokenUtils;
import redlib.backend.utils.FormatUtils;
import redlib.backend.vo.OnlineUserVO;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TokenServiceImpl implements TokenService {
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private LoginLogMapper loginLogMapper;

    @Autowired
    private AdminPrivMapper adminPrivMapper;

    private Map<String, Token> tokenMap = new ConcurrentHashMap<>(1 << 8);

    /**
     * 用户登录，返回令牌信息
     *
     * @param userId    用户id
     * @param password  密码
     * @param ipAddress
     * @param userAgent
     * @return 令牌信息
     */
    @Override
    public Token login(String userId, String password, String ipAddress, String userAgent) {
        Admin admin = adminMapper.login(userId, FormatUtils.password(password));
        Assert.notNull(admin, "用户名或者密码错误");
        Assert.isTrue(Boolean.TRUE.equals(admin.getEnabled()), "此账户已经禁用，不能登录");
        Token token = new Token();
        token.setAccessToken(makeToken());
        token.setUserId(admin.getId());
        token.setLastAction(new Date());
        token.setDepartment(admin.getDepartment());
        token.setSex(admin.getSex());
        token.setIpAddress(ipAddress);
        token.setUserCode(userId);
        token.setUserName(admin.getName());
        token.setPrivSet(new HashSet<>());
        List<AdminPriv> privList = adminPrivMapper.list(admin.getId());
        token.setPrivSet(new HashSet<>());
        for (AdminPriv priv : privList) {
            token.getPrivSet().add(priv.getModId() + '.' + priv.getPriv());
        }
        try {
            UserAgent ua = UserAgent.parseUserAgentString(userAgent);
            Browser browser = ua.getBrowser();
            OperatingSystem os = ua.getOperatingSystem();
            Version version = ua.getBrowserVersion();
            if (browser != null) {
                token.setBrowser(browser.getName());
                if (version != null) {
                    token.setBrowser(token.getBrowser() + " V" + version.getVersion());
                }
            }

            if (os != null) {
                token.setOs(os.getName());
                if (os.getDeviceType() != null) {
                    token.setDevice(os.getDeviceType().getName());
                }
            }

            LoginLog loginLog = new LoginLog();
            loginLog.setName(token.getUserName());
            loginLog.setUserCode(token.getUserCode());
            loginLog.setIpAddress(token.getIpAddress());
            loginLog.setBrowser(token.getBrowser());
            loginLog.setOs(token.getOs());
            loginLogMapper.insert(loginLog);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        tokenMap.put(token.getAccessToken(), token);
        return token;
    }

    /**
     * 根据token获取令牌信息
     *
     * @param accessToken token
     * @return 令牌信息
     */
    @Override
    public Token getToken(String accessToken) {
        if (FormatUtils.isEmpty(accessToken)) {
            return null;
        }

        return tokenMap.get(accessToken);
    }

    /**
     * 登出系统
     *
     * @param accessToken 令牌token
     */
    @Override
    public void logout(String accessToken) {

    }

    /**
     * 获取在线用户列表
     *
     * @return
     */
    @Override
    public List<OnlineUserVO> list() {
        Collection<Token> tokens = tokenMap.values();
        return tokens.stream().map(item -> TokenUtils.convertToVO(item)).collect(Collectors.toList());
    }

    /**
     * 将在线用户踢出系统
     *
     * @param accessToken 用户的accessToken
     */
    @Override
    public void kick(String accessToken) {

    }

    private String makeToken() {
        return UUID.randomUUID().toString().replaceAll("-", "") + "";
    }
}
