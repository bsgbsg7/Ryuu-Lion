package redlib.backend.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import redlib.backend.dao.BookLogMapper;
import redlib.backend.dao.BookMapper;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookLogQueryDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.Book;
import redlib.backend.model.BookLog;
import redlib.backend.model.Page;
import redlib.backend.service.AdminService;
import redlib.backend.service.BookLogService;
import redlib.backend.service.utils.BookLogUtils;
import redlib.backend.service.utils.BookUtils;
import redlib.backend.utils.FormatUtils;
import redlib.backend.utils.PageUtils;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

import java.util.ArrayList;
import java.util.List;
@Service
public class BookLogServiceImpl implements BookLogService {
    @Autowired
    private BookLogMapper bookLogMapper;

    @Autowired
    private AdminService adminService;


    @Override
    public Page<BookLogVO> listByPage(BookLogQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new BookLogQueryDTO();
        }

        //模糊查询
        queryDTO.setBookName(FormatUtils.makeFuzzySearchTerm(queryDTO.getBookName()));
        queryDTO.setReaderName(FormatUtils.makeFuzzySearchTerm(queryDTO.getReaderName()));
        queryDTO.setOrderBy(FormatUtils.formatOrderBy(queryDTO.getOrderBy()));
        //将查询条件发送给dao接口，先查询命中个数
        Integer size = bookLogMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getCurrent(), queryDTO.getPageSize(), size);

        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageUtils.getNullPage();
        }

        List<BookLog> list = bookLogMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());

        List<BookLogVO> voList = new ArrayList<>();
        for (BookLog bookLog : list) {
            BookLogVO vo = BookLogUtils.convertToVO(bookLog);
            voList.add(vo);
        }
        return new Page<>(pageUtils.getCurrent(), pageUtils.getPageSize(), pageUtils.getTotal(), voList);
    }

    @Override
    public void deleteByCodes(List<Integer> ids) {
        Assert.notEmpty(ids, "书籍id列表不能为空");
        bookLogMapper.deleteByCodes(ids);
    }


    @Override
    public List<BookLogVO> getAllBookLogInformation(){
        return bookLogMapper.getAllBookLogInformation();
    };

}
