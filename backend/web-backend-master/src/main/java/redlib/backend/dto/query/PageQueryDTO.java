package redlib.backend.dto.query;

import lombok.Data;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/3/17
 */
@Data
public class PageQueryDTO {
    private int current;
    private int pageSize;
}
