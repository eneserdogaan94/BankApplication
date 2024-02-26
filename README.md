Banka Uygulaması


Bu proje, kullanıcıların banka hesaplarını yönetmelerine imkan tanıyan bir web uygulamasıdır. Kullanıcılar, hesap oluşturma, para transferi yapma ve işlem geçmişini görüntüleme gibi işlemleri gerçekleştirebilirler.


Teknolojiler
•	Spring Boot: Uygulamanın arka ucu, Java 21, Spring Boot ve Maven kullanılarak geliştirilmiştir. RESTful API'lar sunar ve veri işleme için JPA/Hibernate kullanır.
•	React: Kullanıcı arayüzü, React ile oluşturulmuştur. Dinamik ve kullanıcı dostu bir deneyim sunar.
•	MySQL: Veri saklama için MySQL veritabanı kullanılmıştır. Spring Hibernate, veritabanı tablolarını otomatik olarak oluşturacak şekilde yapılandırılmıştır. Veritabanı kurulumunu kolaylaştırmak için Docker kullanılarak dockerize edilmiştir.
•	JWT: Kullanıcı kimlik doğrulama ve oturum yönetimi için JSON Web Token (JWT) kullanılmıştır.

Kurulum
Ön Koşullar


•	Git
•	Java 21
•	Maven
•	Docker Desktop
•	Node.js ve npm

Yerel Ortamda Çalıştırma


1.Git reposunu klonlayın:
git clone https://github.com/eneserdogaan94/BankApplication
Backend için:
•	BankApplication/bank klasöründe bulunan backend projesini IntelliJ IDEA üzerinden açın.
•	Java 21 ve Maven kurulumlarını yapın.
•	Veritabanı erişimini sağlamak için Docker Desktop'ı çalıştırın ve lütfen komutu bash üzerinden çalıştırın: docker-compose up -d


Frontend için:

•	BankApplication/reactBankFrontend/reactbank klasörüne gidin.
•	Bağımlılıkları yüklemek için aşağıdaki komutları çalıştırın:
•	npm install
•npm start



•	Uygulama otomatik olarak tarayıcınızda http://localhost:3000 adresinde açılacaktır.


Veritabanı Bilgileri
Eğer Docker kullanmadan manuel olarak MySQL server kurulumu yapmak isterseniz, aşağıdaki veritabanı bilgilerini kullanabilirsiniz:
•	URL: jdbc:mysql://localhost:3306/bank
•	Kullanıcı Adı: root
•	Şifre: admin
•	Sürücü Sınıfı: com.mysql.cj.jdbc.Driver


Program açıldıktan sonra kullanıcınız olmadığı için aşağıda ki register bölümünden lütfen kullanıcı açınız. Ardından giriş yapabilirsiniz.


