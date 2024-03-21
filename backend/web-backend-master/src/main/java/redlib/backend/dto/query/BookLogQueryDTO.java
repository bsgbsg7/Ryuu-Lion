package redlib.backend.dto.query;

import lombok.Data;

/**
 * @author bsgbs
 */
@Data
public class BookLogQueryDTO extends PageQueryDTO{
    private String readerName;
    private Integer bookId;
    private String bookIsbn;
    private String bookName;
    private String orderBy;

}
