package redlib.backend.service;

import redlib.backend.dto.AdminDTO;
import redlib.backend.dto.query.KeywordQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.vo.AdminVO;
import redlib.backend.vo.ModuleVO;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface AdminService {
    /**
     * 获取所有的模块列表
     *
     * @return 所有的模块列表
     */
    List<ModuleVO> listModules();

    Map<Integer, String> getNameMap(Set<Integer> adminIds);

    Page<AdminVO> list(KeywordQueryDTO queryDTO);

    AdminDTO getDetail(Integer id);

    Integer update(AdminDTO adminDTO);

    Integer add(AdminDTO adminDTO);

    Integer delete(List<String> userCodes);

    void updatePassword(String oldPassword, String password);
}
