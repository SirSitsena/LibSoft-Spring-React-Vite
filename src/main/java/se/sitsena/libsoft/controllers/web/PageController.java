package se.sitsena.libsoft.controllers.web;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UrlPathHelper;


@Controller
public class PageController {
    @RequestMapping(path = {"/","/employees","/library","/categories"})
    public String index(HttpServletRequest request) {
        String path = UrlPathHelper.defaultInstance.getLookupPathForRequest(request);
        System.out.println("path = " + path);//TODO remove this
        return "index";
    }
}
