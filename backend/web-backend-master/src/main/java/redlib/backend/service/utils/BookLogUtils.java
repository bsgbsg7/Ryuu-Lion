package redlib.backend.service.utils;

import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;
import redlib.backend.dto.BookAndLogDTO;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.model.Book;
import redlib.backend.model.BookLog;
import redlib.backend.utils.FormatUtils;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

public class BookLogUtils {

    public static void validateBookLog(BookLogDTO bookLogDTO) {
        FormatUtils.trimFieldToNull(bookLogDTO);
        Assert.hasText(bookLogDTO.getReaderName(), "借阅人不能为空");
    }
    public static BookLogVO convertToVO(BookLog bookLog) {
        BookLogVO bookLogVO = new BookLogVO();
        BeanUtils.copyProperties(bookLog, bookLogVO);
        return bookLogVO;
    }

    /**
    将两个DTO中的数据传递到log中，便于使用bookLogMapper中的insert函数
    接收BookAndLogDTO类型，复制内容并输出为bookLogDTO类型
    */
    public static BookLogDTO convertToDTO(BookAndLogDTO bookAndLogDTO) {
        BookLogDTO bookLogDTO = new BookLogDTO();
        //此处无法直接Copy，因为需要把两个不同的DTO中的数据传递到bookLogDTO中
        bookLogDTO.setBookId(bookAndLogDTO.getBookLogDTO().getBookId());
        bookLogDTO.setBookName(bookAndLogDTO.getBookDTO().getName());
        bookLogDTO.setBookIsbn(bookAndLogDTO.getBookDTO().getIsbn());

        bookLogDTO.setBorrowedTime(bookAndLogDTO.getBookLogDTO().getBorrowedTime());
        bookLogDTO.setReturnTime(bookAndLogDTO.getBookLogDTO().getReturnTime());
        bookLogDTO.setReaderName(bookAndLogDTO.getBookLogDTO().getReaderName());
        return bookLogDTO;
    }
}
