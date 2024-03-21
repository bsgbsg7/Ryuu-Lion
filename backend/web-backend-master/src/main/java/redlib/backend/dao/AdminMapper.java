package redlib.backend.dao;

import org.apache.ibatis.annotations.Param;
import redlib.backend.dto.query.KeywordQueryDTO;
import redlib.backend.model.Admin;

import java.util.List;

public interface AdminMapper {
    int deleteByPrimaryKey(Integer userid);

    int insert(Admin record);

    Admin selectByPrimaryKey(Integer userid);

    int updateByPrimaryKey(Admin record);

    Admin login(@Param("userCode") String userCode, @Param("password") String password);

    List<Admin> listByIds(@Param("ids") List<Integer> ids);

    Integer count(@Param("queryDTO") KeywordQueryDTO queryDTO);

    List<Admin> list(
            @Param("queryDTO") KeywordQueryDTO queryDTO,
            @Param("offset") Integer offset,
            @Param("limit") Integer limit);

    int delete(@Param("userCodes") List<String> userCodes);

    Admin getByUserCode(String userCode);
}