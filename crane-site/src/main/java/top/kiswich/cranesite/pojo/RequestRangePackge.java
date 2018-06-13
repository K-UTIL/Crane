package top.kiswich.cranesite.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RequestRangePackge {
    private Integer towerNumber;
    private PackageFunctionEnum functionEnum = PackageFunctionEnum.GET_RANGE;
    private Integer encryptTowerNumber;
}
