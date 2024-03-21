package redlib.backend.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 描述:book_log表的实体类
 * @version
 * @author:  bsgbs
 * @创建时间: 2023-04-01
 */
@Data
public class BookLog {
    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private String readerName;

    /**
     * 
     */
    private Integer bookId;

    /**
     * 
     */
    private String bookName;

    /**
     * 
     */
    private String bookIsbn;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date borrowedTime;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date returnTime;
}