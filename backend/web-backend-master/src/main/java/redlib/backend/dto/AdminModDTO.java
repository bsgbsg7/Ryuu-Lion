package redlib.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/4/11
 */
@Data
public class AdminModDTO {
    private String id;
    private List<String> privList;
}
