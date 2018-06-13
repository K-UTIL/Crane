package top.kiswich.cranesite.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestDataPackage {
    private Integer craneNumber;
    private PackageFunctionEnum functionEnum = PackageFunctionEnum.DATA_UPDATE;
    private double range;
    private double width;
    private double leftingHeight;
    private double windSpead;
    private Integer encryptTowerNumber;
}
