package redlib.backend.vo;

import lombok.Data;

import java.util.List;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/3/17
 */
@Data
public class ModuleVO {
    private String id;
    private List<PrivilegeVO> privilegeList;
}
