package redlib.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.Privilege;
import redlib.backend.dto.AdminDTO;
import redlib.backend.dto.query.KeywordQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.service.AdminService;
import redlib.backend.vo.AdminVO;
import redlib.backend.vo.ModuleVO;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@BackendModule({"page:页面", "update:修改", "add:创建", "delete:删除"})
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("listModules")
    @Privilege("page")
    public List<ModuleVO> listModules() {

        return adminService.listModules();
    }

    @PostMapping("list")
    @Privilege("page")
    public Page<AdminVO> listAdmin(@RequestBody KeywordQueryDTO queryDTO) {
        return adminService.list(queryDTO);
    }

    @GetMapping("get")
    @Privilege("page")
    public AdminDTO getAdmin(Integer id) {

        return adminService.getDetail(id);
    }

    @PostMapping("add")
    @Privilege("add")
    public Integer addAdmin(@RequestBody AdminDTO adminDTO) {

        return adminService.add(adminDTO);
    }

    @PostMapping("update")
    @Privilege("update")
    public Integer updateAdmin(@RequestBody AdminDTO adminDTO) {

        return adminService.update(adminDTO);
    }

    @PostMapping("delete")
    @Privilege("delete")
    public Integer deleteAdmin(@RequestBody List<String> userCodes) {
        return adminService.delete(userCodes);
    }
}
