package top.kiswich.cranesite.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class ResponseRangePackage {
    private Integer craneNumber;
    private Integer status;
    private Integer totalPackageNumber;
    private Integer packageNumber;
    private List<RangeShipEntity> rangeShipEntities;

}
