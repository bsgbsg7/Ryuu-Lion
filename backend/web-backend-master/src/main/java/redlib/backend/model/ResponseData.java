package redlib.backend.model;

import lombok.Data;

/**
 * 描述
 *
 * @author liuweis
 * @date 2020/8/31
 */
@Data
public class ResponseData<T> {
    private Integer code;

    private T data;

    private String message;

    private Boolean success;
}
