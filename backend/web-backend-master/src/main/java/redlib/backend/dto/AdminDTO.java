package redlib.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/11
 */
@Data
public class AdminDTO {
    private Integer id;

    private String userCode;

    private String name;

    private Integer sex;

    private Boolean enabled;

    private String password;

    private String department;

    private String phone;

    private String email;

    private List<AdminModDTO> modList;
}
