package redlib.backend.dao;

import org.apache.ibatis.annotations.Param;
import redlib.backend.dto.query.DepartmentQueryDTO;
import redlib.backend.model.Department;

import java.util.List;

/**
 * 部门数据访问组件
 *
 * @author 李洪文
 * @date 2019/11/14 10:38
 */
public interface DepartmentMapper {
    Department selectByPrimaryKey(Integer id);

    /**
     * 新增记录
     *
     * @param record
     * @return
     */
    int insert(Department record);

    /**
     * 根据主键更新记录
     *
     * @param record
     * @return
     */
    int updateByPrimaryKey(Department record);

    /**
     * 根据部门编码获取部门信息详情
     *
     * @param departmentCode 部门编码
     * @param tenantCode     租户代码
     * @return 门信息详情
     */
    Department getByCode(
            @Param("departmentCode") String departmentCode,
            @Param("tenantCode") String tenantCode);

    /**
     * 根据查询条件获取命中个数
     *
     * @param queryDTO 查询条件
     * @return 命中数量
     */
    Integer count(DepartmentQueryDTO queryDTO);

    /**
     * 根据查询条件获取部门列表
     *
     * @param queryDTO 查询条件
     * @param offset   开始位置
     * @param limit    记录数量
     * @return 部门列表
     */
    List<Department> list(@Param("queryDTO") DepartmentQueryDTO queryDTO, @Param("offset") Integer offset, @Param("limit") Integer limit
    );

    /**
     * 根据代码列表批量删除部门
     *
     * @param codeList id列表
     */
    void deleteByCodes(@Param("codeList") List<Integer> codeList);

    /**
     * 根据部门代码列表获取部门信息列表
     *
     * @param codeList   部门代码列表
     * @param tenantCode 租户代码
     * @return 部门列表
     */
    List<Department> listByCodes(
            @Param("codeList") List<String> codeList,
            @Param("tenantCode") String tenantCode);

    /**
     * 根据部门名称查询部门列表
     *
     * @param departmentName 部门名称，模糊匹配
     * @param tenantCode     租户代码
     * @return 部门列表
     */
    List<Department> listByName(
            @Param("departmentName") String departmentName,
            @Param("tenantCode") String tenantCode);

    Department getByName(@Param("name")String name);
}