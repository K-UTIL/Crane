package top.kiswich.cranesite.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController("/crane-site/v1/user")
public class LoginController {

    @PostMapping("/login")
    public void login(String username,String password){
        SecurityUtils.getSubject().login(new UsernamePasswordToken(username,password));
    }

    @PostMapping("/logout")
    public void logout(){
        SecurityUtils.getSubject().logout();
    }
}
