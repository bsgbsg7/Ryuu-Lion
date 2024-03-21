package redlib.backend.service;


import redlib.backend.dto.DepartmentDTO;
import redlib.backend.dto.query.DepartmentQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.vo.DepartmentVO;
import java.util.List;

/**
 * 部门模块服务接口
 *
 * @author 李洪文
 * @date 2019-12-3
 */
public interface DepartmentService {
    Page<DepartmentVO> listByPage(DepartmentQueryDTO queryDTO);

    /**
     * 新建部门
     *
     * @param departmentDTO 部门输入对象
     * @return 部门编码
     */
    Integer addDepartment(DepartmentDTO departmentDTO);

    /**
     * 更新部门数据
     *
     * @param departmentDTO 部门输入对象
     * @return 部门编码
     */
    Integer updateDepartment(DepartmentDTO departmentDTO);

    /**
     * 根据编码列表，批量删除部门
     *
     * @param ids 编码列表
     */
    void deleteByCodes(List<Integer> ids);
}
