package redlib.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.NeedNoPrivilege;
import redlib.backend.annotation.Privilege;
import redlib.backend.dto.BookAndLogDTO;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.BookLog;
import redlib.backend.model.Page;
import redlib.backend.service.BookService;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@BackendModule({"page:页面", "update:修改", "add:创建", "delete:删除", "lend:借书", "return:还书", "drawBook:分类图"})
public class BookController {
    @Autowired
    private BookService bookService;
    @PostMapping("addBook")
    @Privilege({"add","update"})
    public void addBook(@RequestBody BookDTO bookDTO){
        bookService.addBook(bookDTO);
    }

    @PostMapping("listBook")
    @Privilege("page")
    public Page<BookVO> listBook(@RequestBody BookQueryDTO queryDTO) {
        return bookService.listByPage(queryDTO);
    }

    @PostMapping("updateBook")
    @Privilege("update")
    public Integer updateBook(@RequestBody BookDTO bookDTO) {
        return bookService.updateBook(bookDTO);
    }

    @PostMapping("deleteBook")
    @Privilege("delete")
    public void deleteBook(@RequestBody List<Integer> ids) {
        bookService.deleteByCodes(ids);
    }

    @PostMapping("lendBook")
    @Privilege("lend")
    public void lendBooks(@RequestBody BookAndLogDTO bookAndLogDTO) {
         bookService.lendBooks(bookAndLogDTO);
    }

    @PostMapping("returnBook")
    @Privilege("return")
    public void returnBook(@RequestBody BookDTO bookDTO) {
         bookService.returnBook(bookDTO);
    }

    @PostMapping("getAllBookInformation")
    @Privilege({"drawBook","page"})
    public List<BookVO> getAllBookInformation() {
        return bookService.getAllBookInformation();
    }


}
