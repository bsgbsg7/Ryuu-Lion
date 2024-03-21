package redlib.backend.service;

import redlib.backend.dto.BookAndLogDTO;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.BookLog;
import redlib.backend.model.Page;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

import java.util.List;

public interface BookService {
    Integer addBook(BookDTO bookDTO);

    Page<BookVO> listByPage(BookQueryDTO queryDTO);

    /**
     * 更新部门数据
     *
     * @param bookDTO 部门输入对象
     * @return 部门编码
     */
    Integer updateBook(BookDTO bookDTO);

    /**
     * 根据编码列表，批量删除书籍
     *
     * @param ids 编码列表
     */
    void deleteByCodes(List<Integer> ids);

    void lendBooks(BookAndLogDTO bookAndLogDTO);

    void returnBook(BookDTO bookDTO);

    List<BookVO> getAllBookInformation();


}
