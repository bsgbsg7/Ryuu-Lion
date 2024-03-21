package redlib.backend.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import redlib.backend.dao.BookLogMapper;
import redlib.backend.dao.BookMapper;
import redlib.backend.dto.BookAndLogDTO;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.Book;
import redlib.backend.model.BookLog;
import redlib.backend.model.Page;
import redlib.backend.service.AdminService;
import redlib.backend.service.BookService;
import redlib.backend.service.utils.BookLogUtils;
import redlib.backend.service.utils.BookUtils;
import redlib.backend.service.utils.DepartmentUtils;
import redlib.backend.utils.FormatUtils;
import redlib.backend.utils.PageUtils;
import redlib.backend.vo.BookVO;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author bsgbs
 */
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private BookLogMapper bookLogMapper;
    @Autowired
    private AdminService adminService;

    @Override
    public Integer addBook(BookDTO bookDTO){
        // 校验输入数据正确性
        BookUtils.validateBook(bookDTO);

        // 创建实体对象，用以保存到数据库
        Book book = new Book();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(bookDTO, book);
        // 调用DAO方法保存到数据库表
        bookMapper.insert(book);
        return book.getId();
    }

    /**
     * 更新部门数据
     *
     * @param bookDTO 部门输入对象
     * @return 部门编码
     */
    @Override
    public Integer updateBook(BookDTO bookDTO) {
        // 校验输入数据正确性
        Assert.notNull(bookDTO.getId(), "书籍id不能为空");
        Book book = bookMapper.selectByPrimaryKey(bookDTO.getId());
        Assert.notNull(book, "没有找到书籍，Id为：" + bookDTO.getId());

        BeanUtils.copyProperties(bookDTO, book);
        bookMapper.updateByPrimaryKey(book);
        return book.getId();
    }

    @Override
    public Page<BookVO> listByPage(BookQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new BookQueryDTO();
        }

        //模糊查询
        queryDTO.setName(FormatUtils.makeFuzzySearchTerm(queryDTO.getName()));
        queryDTO.setIsbn(FormatUtils.makeFuzzySearchTerm(queryDTO.getIsbn()));
        queryDTO.setAuthor(FormatUtils.makeFuzzySearchTerm(queryDTO.getAuthor()));
        queryDTO.setPublisher(FormatUtils.makeFuzzySearchTerm(queryDTO.getPublisher()));
        queryDTO.setCategory(FormatUtils.makeFuzzySearchTerm(queryDTO.getCategory()));
        queryDTO.setStatus(FormatUtils.makeFuzzySearchTerm(queryDTO.getStatus()));
        queryDTO.setClassification(FormatUtils.makeFuzzySearchTerm(queryDTO.getClassification()));

        //将查询条件发送给dao接口，先查询命中个数
        Integer size = bookMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getCurrent(), queryDTO.getPageSize(), size);

        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageUtils.getNullPage();
        }
        List<Book> list = bookMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        Set<String> adminIds = list.stream().map(Book::getName).collect(Collectors.toSet());
        adminIds.addAll(list.stream().map(Book::getAuthor).collect(Collectors.toSet()));

        List<BookVO> voList = new ArrayList<>();
        for (Book book : list) {
            BookVO vo = BookUtils.convertToVO(book);
            voList.add(vo);
        }

        //按照前端支持的格式返回给前端
        return new Page<>(pageUtils.getCurrent(), pageUtils.getPageSize(), pageUtils.getTotal(), voList);
    }

    /**
     * 根据编码列表，批量删除书籍
     *
     * @param ids 编码列表
     */
    @Override
    public void deleteByCodes(List<Integer> ids) {
        Assert.notEmpty(ids, "书籍id列表不能为空");
        bookMapper.deleteByCodes(ids);
    }


    @Override
    public void lendBooks(BookAndLogDTO bookAndLogDTO){

//        BookUtils.validateBook(bookAndLogDTO.getBookDTO());
//        Assert.isNull(bookAndLogDTO.getBookLogDTO().getReaderName(),"借阅人不能为空");
//        Assert.isTrue(bookAndLogDTO.getBookDTO().getStatus().equals("在架"),"书籍不在架");
        BookAndLogDTO bookLogDTO = new BookAndLogDTO();
        BeanUtils.copyProperties(bookAndLogDTO, bookLogDTO);

        // 创建实体对象，用以保存到数据库
        BookLog log = new BookLog();

        // 将输入的字段全部复制到实体对象中
        //将两个DTO中的数据传递到log中，便于使用bookLogMapper中的insert函数
        BeanUtils.copyProperties(BookLogUtils.convertToDTO(bookLogDTO),log);

        // 调用DAO方法保存到数据库表
        bookLogMapper.insert(log);

        //修改书籍状态为借出
        bookLogDTO.getBookDTO().setStatus("借出");

        // 更新书籍状态
        updateBook(bookLogDTO.getBookDTO());
    }


    @Override
    public void returnBook(BookDTO bookDTO){
        //此处功能修改为在前端完成
        //只有书籍状态不是“借出”，则报错
//        Assert.isTrue(bookDTO.getStatus().equals("借出"), "书籍未借出");
        //修改书籍状态为借出
        bookDTO.setStatus("在架");
        //更新书籍状态
        updateBook(bookDTO);
        //补充对应借阅日志的还书日期
        bookLogMapper.insertTime(bookDTO);
    }

    @Override
    public List<BookVO> getAllBookInformation(){
        return bookMapper.getAllBookInformation();
    };


}
