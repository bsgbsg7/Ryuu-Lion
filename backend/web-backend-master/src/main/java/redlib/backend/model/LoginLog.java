package redlib.backend.model;

import java.util.Date;
import lombok.Data;

/**
 * 描述:login_log表的实体类
 * @version
 * @author:  stone
 * @创建时间: 2023-01-11
 */
@Data
public class LoginLog {
    /**
     * 
     */
    private Long id;

    /**
     * 
     */
    private String userCode;

    /**
     * 
     */
    private String ipAddress;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String os;

    /**
     * 
     */
    private String browser;

    /**
     * 创建时间
     */
    private Date createdAt;
}