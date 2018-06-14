package top.kiswich.cranesite;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import top.kiswich.cranesite.config.NettyServer;

@SpringBootApplication
public class CraneSiteApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(CraneSiteApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        new NettyServer(1067).run();
    }
}
