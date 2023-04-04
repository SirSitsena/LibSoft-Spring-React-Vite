package se.libsoft.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class PageController {
    @RequestMapping(path = {"/", "/employees", "/library", "/categories"})
    public String index() {
        return "index";
    }
}