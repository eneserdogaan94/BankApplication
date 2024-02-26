package com.bank.bank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Bu, Spring MVC yapılandırmasını özelleştirmek için WebMvcConfigurer'i uygulayan bir yapılandırma sınıfıdır.
@Configuration
public class WebConfig implements WebMvcConfigurer {

    //Bu metod, Cross-Origin Resource Sharing (CORS) ayarlarını yapılandırmak için geçersiz kılınmıştır.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Burada, tüm uç noktaların (/**) belirtilen kaynaktan (http://localhost:3000) erişilebilir olmasına izin veriyoruz.
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Bu kaynaktan gelen isteklere izin ver.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Bu HTTP metodlarına izin ver.
                .allowedHeaders("*") // Tüm başlıklara izin ver.
                .allowCredentials(true); // Kimlik bilgilerinin (çerezler veya kimlik doğrulama başlıkları gibi) gönderilmesine izin ver.
    }
}