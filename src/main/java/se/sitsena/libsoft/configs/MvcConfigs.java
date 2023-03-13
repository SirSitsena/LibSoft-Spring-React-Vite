package se.sitsena.libsoft.configs;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.util.NumberUtils;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.view.AbstractView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.util.HtmlUtils;

import java.util.Map;

@EnableWebMvc
@Configuration
public class MvcConfigs implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/public/")
                .setUseLastModified(true)
                .setCachePeriod(1)
//                .setCachePeriod(60*60*24);        //TODO When on prod set "31556926" instead of "1"
                .resourceChain(true);
//
    }
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);     // Todo No need to specify the filetype in url
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        //TODO для View ищет хтмл файлы, это нужно для того чтобы все юрл вели на реакт,
        // а именно на файл index.html а дальше реакт сам определит куда перенаправить
        registry.jsp("/",".html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")          // We allow all hosts
                .allowedMethods("*");
    }
}
