package top.kiswich.cranesite.pojo.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.enums.PackageFunctionEnum;

@Setter
@Getter
@NoArgsConstructor
public class RequestRangePackge {
    private Integer towerNumber;
    private PackageFunctionEnum functionEnum = PackageFunctionEnum.GET_RANGE;
    private Integer encryptTowerNumber;
}
