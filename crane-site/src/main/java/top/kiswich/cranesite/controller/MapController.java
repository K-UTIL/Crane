package top.kiswich.cranesite.controller;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import top.kiswich.cranesite.pojo.RangeShipEntity;
import top.kiswich.cranesite.pojo.to.TCraneDataEntity;
import top.kiswich.cranesite.pojo.to.TRangeShipEntity;
import top.kiswich.cranesite.pojo.to.TTowerCraneEntity;
import top.kiswich.cranesite.pojo.vo.RangeShips;
import top.kiswich.cranesite.repository.CraneDataRepository;
import top.kiswich.cranesite.repository.RangeShipRepository;
import top.kiswich.cranesite.repository.TowerCraneRepository;

import java.util.ArrayList;
import java.util.List;

//没有复杂逻辑 直接写在
@RestController
public class MapController {

    @Autowired
    CraneDataRepository craneDataRepository;
    @Autowired
    RangeShipRepository rangeShipRepository;
    @Autowired
    TowerCraneRepository towerCraneRepository;


    //保存塔机扇形区域
    @RequiresRoles({"头","总"})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/map/range/{towerNumber}")
    public void saveTowerRange(@PathVariable("towerNumber") String towerNumber, @Validated RangeShips rangeShips) {
        TTowerCraneEntity byTowerNumber = towerCraneRepository.findByTowerNumber(Integer.parseInt(towerNumber));
        List<RangeShipEntity> rangeShipEntities = rangeShips.getRangeShipEntities();

        ArrayList<TRangeShipEntity>  tRangeShipEntities= new ArrayList<>();
        for(RangeShipEntity rangeShipEntity: rangeShipEntities){
            tRangeShipEntities.add(new TRangeShipEntity().setCraneId(byTowerNumber.getId())
                    .setStartAngle(rangeShipEntity.getStartAngle())
                    .setEndAngle(rangeShipEntity.getEndAngle())
                    .setStartRadium(rangeShipEntity.getStartRadius())
                    .setEndRadium(rangeShipEntity.getEndRadius())
                    .setType(rangeShipEntity.getRangShipEnum().getCode())
            );
        }
        rangeShipRepository.saveAll(tRangeShipEntities);
    }


}
