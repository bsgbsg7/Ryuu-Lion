package redlib.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class BookLogDTO {
    private String readerName;
    private Integer bookId;
    private String bookName;
    private String bookIsbn;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date borrowedTime;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date returnTime;

}
