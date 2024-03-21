package redlib.backend.vo;

import lombok.Data;

import java.util.Date;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/8
 */
@Data
public class AdminVO {
    private Integer id;

    private String userCode;

    private String name;

    private Integer sex;

    private Boolean enabled;

    private String password;

    private String department;

    private String phone;

    private String email;

    private Date createdAt;

    private Integer createdBy;

    private String createdByDesc;

    private Date updatedAt;

    private Integer updatedBy;

    private String updatedByDesc;
}
