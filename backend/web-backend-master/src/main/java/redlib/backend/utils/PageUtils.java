package redlib.backend.utils;

import lombok.Data;
import org.springframework.util.Assert;
import redlib.backend.model.Page;

import java.util.Collections;

/**
 * 描述：
 *
 * @author lihongwen
 * @date 2020/3/17
 */
@Data
public class PageUtils {

    /**
     * 默认页数
     */
    private static Integer DEFAULT_PAGE = 1;

    /**
     * 默认大小
     */
    private static Integer DEFAULT_SIZE = 10;

    /**
     * 默认页数
     */
    private Integer current = DEFAULT_PAGE;

    /**
     * 默认大小
     */
    private Integer pageSize = DEFAULT_SIZE;

    /**
     * 总页数
     */
    private Integer totalPages;

    /**
     * 总记录数
     */
    private Integer total;

    /**
     * 从查询的结果集中，取记录的起始位置
     */
    private Integer offset;

    /**
     * 取记录数
     */
    private Integer limit;

    public PageUtils(Integer page, Integer pageSize, Integer totalRecords) {
        if (page != null) {
            this.current = page;
        }

        if (pageSize != null) {
            this.pageSize = pageSize;
        }

        Assert.notNull(totalRecords, "totalRecords不能为空");
        Assert.isTrue(this.current > 0, "page必须大于0");
        Assert.isTrue(this.pageSize > 0, "pageSize必须大于0");

        this.total = totalRecords;
        this.totalPages = (totalRecords + this.pageSize - 1) / this.pageSize;

        offset = (this.current - 1) * this.pageSize;
        limit = this.pageSize;
    }

    /**
     * 页码初始化
     *
     * @param page 页码
     * @return 页码
     */
    public static int page(Integer page) {
        if (null == page || page < 1) {
            page = DEFAULT_PAGE;
        }

        return page;
    }

    /**
     * 每页记录条数初始化
     *
     * @param pageSize 每页记录条数
     * @return 每页记录条数
     */
    public static int pageSize(Integer pageSize) {
        if (pageSize == null || pageSize < 1) {
            pageSize = DEFAULT_SIZE;
        }

        return pageSize;
    }

    /**
     * 偏移量初始化
     *
     * @param page     页码
     * @param pageSize 每页记录条数
     * @return 偏移量
     */
    public static int offset(int page, int pageSize) {
        return (page - 1) * pageSize;
    }

    /**
     * 判断当前分页请求有无数据
     *
     * @return true表示无数据, false表示有数据
     */
    public boolean isDataEmpty() {
        if (total <= 0) {
            return true;
        }

        return this.current > this.totalPages;
    }

    /**
     * 返回空分页数据
     *
     * @param <T> 分页数据类型
     * @return 空分页数据
     */
    public <T> Page<T> getNullPage() {
        return new Page<T>(current, pageSize, total, Collections.emptyList());
    }
}
