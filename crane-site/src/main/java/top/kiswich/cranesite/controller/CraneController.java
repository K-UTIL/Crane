package top.kiswich.cranesite.controller;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import top.kiswich.cranesite.pojo.to.TTowerCraneEntity;
import top.kiswich.cranesite.repository.TowerCraneRepository;

@RestController("/")
public class CraneController {

    @Autowired
    TowerCraneRepository towerCraneRepository;

    @RequiresRoles({"总"})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    public void addCrane(TTowerCraneEntity tTowerCraneEntity){
        towerCraneRepository.save(tTowerCraneEntity);
    }


}
