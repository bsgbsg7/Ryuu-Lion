package redlib.backend.service.utils;

import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;
import redlib.backend.dto.BookDTO;
import redlib.backend.model.Book;
import redlib.backend.utils.FormatUtils;
import redlib.backend.vo.BookVO;


public class BookUtils {
    /**
     * 规范并校验bookDTO
     *
     * @param bookDTO 实体对象
     */
    public static void validateBook(BookDTO bookDTO) {
        FormatUtils.trimFieldToNull(bookDTO);
        Assert.hasText(bookDTO.getName(), "书名不能为空");
    }

    public static BookVO convertToVO(Book book) {
        BookVO bookVO = new BookVO();
        BeanUtils.copyProperties(book, bookVO);
        return bookVO;
    }
}
