package redlib.backend.vo;

import lombok.Data;

import java.util.Date;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/1
 */
@Data
public class OnlineUserVO {
    private String accessToken;
    /**
     * 是否具有访问后台管理的权限
     */
    private boolean backend;

    private String userName;

    private String userCode;

    private Integer userId;

    private Integer roleId;

    private String roleName;

    private Date lastAction;

    private String sex;

    private String department;

    private String ipAddr;

    private String os;

    private String browser;

    private String browserVersion;

    private String device;

    private String country;

    private String location;

    private String isp;

    private Long totalNetFlow;

    private String referer;
}
