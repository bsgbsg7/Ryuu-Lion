package redlib.backend.dao;

import redlib.backend.model.AdminPriv;

import java.util.List;

public interface AdminPrivMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AdminPriv record);

    AdminPriv selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(AdminPriv record);

    List<AdminPriv> list(Integer id);

    void deleteByAdminId(Integer id);
}