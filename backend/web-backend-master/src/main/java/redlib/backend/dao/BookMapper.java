package redlib.backend.dao;

import org.apache.ibatis.annotations.Param;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.Book;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

import java.util.List;

public interface BookMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Book record);

    int insertSelective(Book record);

    Book selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Book record);

    int updateByPrimaryKey(Book record);


    /**
     * 根据查询条件获取部门列表
     *
     * @param queryDTO 查询条件
     * @param offset   开始位置
     * @param limit    记录数量
     * @return 部门列表
     */
    List<Book> list(@Param("queryDTO") BookQueryDTO queryDTO, @Param("offset") Integer offset, @Param("limit") Integer limit);


    Integer count(BookQueryDTO queryDTO);

    /**
     * 根据代码列表批量删除书籍
     *
     * @param codeList id列表
     */
    void deleteByCodes(@Param("codeList") List<Integer> codeList);

    List<BookVO> getAllBookInformation();



}