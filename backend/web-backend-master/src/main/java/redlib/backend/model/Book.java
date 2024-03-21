package redlib.backend.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 描述:book表的实体类
 * @version
 * @author:  bsgbs
 * @创建时间: 2023-03-30
 */
@Data
public class Book {
    /**
     * 
     */
    private Integer id;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String isbn;

    /**
     * 
     */
    private String author;

    /**
     * 
     */
    private String publisher;

    /**
     * 
     */
    private Double price;

    /**
     * 
     */
    private String category;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date boughtTime;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date publishedTime;

    /**
     * 
     */
    private String status;

    /**
     * 
     */
    private String classification;
}