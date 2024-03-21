package redlib.backend.model;

import lombok.Data;

import java.util.Collections;
import java.util.List;

/**
 * @author 李洪文
 * @description
 * @date 2019/11/14 16:12
 */
@Data
public class Page<T> {
    /**
     * 当前页码
     **/
    private int current;
    /**
     * 每页记录条数
     **/
    private int pageSize;
    /**
     * 总记录条数
     **/
    private int total;
    /**
     * 当前页需要的数据
     **/
    private List<T> list;

    public Page() {

    }

    public Page(int page, int pageSize, int total, List<T> dtoList) {
        this.current = page;
        this.pageSize = pageSize;
        this.total = total;
        this.setList(dtoList);
    }

    public static Page getNullPage(Integer page, Integer pageSize) {
        return new Page(page, pageSize, 0, Collections.emptyList());
    }
}