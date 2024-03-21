package redlib.backend.dao;

import org.apache.ibatis.annotations.Param;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookLogQueryDTO;
import redlib.backend.model.BookLog;
import redlib.backend.vo.BookLogVO;

import java.util.List;

public interface BookLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BookLog record);

    int insertSelective(BookLog record);

    BookLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookLog record);

    int updateByPrimaryKey(BookLog record);



    List<BookLog> list(@Param("queryDTO") BookLogQueryDTO queryDTO,
                       @Param("offset") Integer offset,
                       @Param("limit") Integer limit);

    Integer count(BookLogQueryDTO queryDTO);


    /**
     * 更新部门数据
     *
     * @param bookDTO 部门输入对象
     * @return 部门编码
     */
    Integer insertTime(BookDTO bookDTO);
    /**
     * 根据代码列表批量删除书籍
     *
     * @param codeList id列表
     */
    void deleteByCodes(@Param("codeList") List<Integer> codeList);

    List<BookLogVO> getAllBookLogInformation();
}