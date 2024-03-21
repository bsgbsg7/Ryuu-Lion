package redlib.backend.dto.query;

import lombok.Data;

/**
 * @author bsgbs
 */
@Data
public class BookQueryDTO extends PageQueryDTO{
    /**
     * 书籍名称，模糊匹配
     */
    private String name;
    private String isbn;
    private String author;
    private String publisher;
    private String category;
    private String status;
    private String classification;

}
