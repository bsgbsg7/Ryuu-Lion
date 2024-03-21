package redlib.backend.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class BookVO {
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
