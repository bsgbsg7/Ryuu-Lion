package redlib.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class BookDTO {
    private Integer id;
    private String name;
    private String isbn;
    private String author;
    private String publisher;
    private Double price;
    private String category;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date boughtTime;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date publishedTime;
    private String status;
    private String classification;
}
