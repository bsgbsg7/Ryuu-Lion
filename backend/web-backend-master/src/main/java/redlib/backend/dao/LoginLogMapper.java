package redlib.backend.dao;

import org.apache.ibatis.annotations.Param;
import redlib.backend.dto.query.LoginLogQueryDTO;
import redlib.backend.model.LoginLog;

import java.util.List;

public interface LoginLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(LoginLog record);

    LoginLog selectByPrimaryKey(Long id);

    int updateByPrimaryKey(LoginLog record);

    Integer count(@Param("queryDTO") LoginLogQueryDTO queryDTO);

    List<LoginLog> list(
            @Param("queryDTO") LoginLogQueryDTO queryDTO,
            @Param("offset") Integer offset,
            @Param("limit") Integer limit);
}