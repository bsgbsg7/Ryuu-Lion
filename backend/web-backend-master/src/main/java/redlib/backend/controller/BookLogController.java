package redlib.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import redlib.backend.annotation.BackendModule;
import redlib.backend.annotation.NeedNoPrivilege;
import redlib.backend.annotation.Privilege;
import redlib.backend.dto.BookDTO;
import redlib.backend.dto.BookLogDTO;
import redlib.backend.dto.query.BookLogQueryDTO;
import redlib.backend.dto.query.BookQueryDTO;
import redlib.backend.model.Page;
import redlib.backend.service.BookLogService;
import redlib.backend.service.BookService;
import redlib.backend.vo.BookLogVO;
import redlib.backend.vo.BookVO;

import java.util.List;

@RestController
@RequestMapping("/api/bookLog")
@BackendModule({"page:页面", "drawBookLog:借还图"})
public class BookLogController {
    @Autowired
    private BookLogService bookLogService;

    @PostMapping("listBookLog")
    @Privilege("page")
    public Page<BookLogVO> listBookLog(@RequestBody BookLogQueryDTO queryDTO) {
        return bookLogService.listByPage(queryDTO);
    }

    @PostMapping("getAllBookLogInformation")
    @Privilege({"drawBookLog","page"})
    public List<BookLogVO> getAllBookLogInformation() {
        return bookLogService.getAllBookLogInformation();
    }
}

