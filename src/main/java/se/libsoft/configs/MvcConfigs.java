package se.libsoft.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@EnableWebMvc
@Configuration
public class MvcConfigs implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/public/")
                .setUseLastModified(true)
                .setCachePeriod(1)
                .resourceChain(true);
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);     // No need to specify the filetype in url
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        //TODO для View ищет хтмл файлы, это нужно для того чтобы все юрл вели на реакт,
        // а именно на файл index.html а дальше реакт сам определит куда перенаправить
        registry.jsp("/", ".html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")          // We allow all hosts
                .allowedMethods("*");
    }
}
