package redlib.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.NeedNoPrivilege;
import redlib.backend.annotation.Privilege;
import redlib.backend.dto.DepartmentDTO;
import redlib.backend.dto.query.DepartmentQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.service.DepartmentService;
import redlib.backend.vo.DepartmentVO;

import java.util.List;

/**
 * 部门管理后端服务模块
 *
 * @author 李洪文
 * @description
 * @date 2019/12/3 11:07
 */

@RestController
@RequestMapping("/api/department")
@BackendModule({"page:页面", "update:修改", "add:创建", "delete:删除"})
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @PostMapping("listDepartment")
    @Privilege("page")
    public Page<DepartmentVO> listDepartment(@RequestBody DepartmentQueryDTO queryDTO) {
        return departmentService.listByPage(queryDTO);
    }

    @PostMapping("addDepartment")
    @Privilege("add")
    public Integer addDepartment(@RequestBody DepartmentDTO departmentDTO) {
        return departmentService.addDepartment(departmentDTO);
    }

    @PostMapping("updateDepartment")
    @Privilege("update")
    public Integer updateDepartment(@RequestBody DepartmentDTO departmentDTO) {
        return departmentService.updateDepartment(departmentDTO);
    }

    @PostMapping("deleteDepartment")
    @Privilege("delete")
    public void deleteDepartment(@RequestBody List<Integer> ids) {
        departmentService.deleteByCodes(ids);
    }

    @PostMapping("getDepartmentByCode")
    @NeedNoPrivilege
    public String getDepartmentByCode() {
        return "Hello,world";
    }
}
