package redlib.backend.vo;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import redlib.backend.model.BookLog;

import java.util.Date;

/**
 * @author bsgbs
 */
@Data
public class BookLogVO {
    private Integer id;
    private String readerName;
    private Integer bookId;
    private String bookName;
    private String bookIsbn;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date borrowedTime;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date returnTime;
}
