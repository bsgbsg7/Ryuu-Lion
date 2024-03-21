package redlib.backend.dto.query;

import lombok.Data;

/**
 * @author 李洪文
 * @description
 * @date 2019/12/3 10:18
 */
@Data
public class DepartmentQueryDTO extends PageQueryDTO {
    /**
     * 部门名称，模糊匹配
     */
    private String departmentName;
}
