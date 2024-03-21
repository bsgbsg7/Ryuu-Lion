package redlib.backend.service;

import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookLogQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.vo.BookLogVO;

import java.util.List;

public interface BookLogService {

    Page<BookLogVO> listByPage(BookLogQueryDTO queryDTO);

    /**
     * 根据编码列表，批量删除书籍
     *
     * @param ids 编码列表
     */
    void deleteByCodes(List<Integer> ids);

    List<BookLogVO> getAllBookLogInformation();
}
