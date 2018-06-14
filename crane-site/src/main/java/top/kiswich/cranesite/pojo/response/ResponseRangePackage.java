package top.kiswich.cranesite.pojo.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.RangeShipEntity;
import top.kiswich.cranesite.pojo.enums.ResponseStatus;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class ResponseRangePackage {
    private Integer craneNumber;
    private ResponseStatus status;
    private Integer totalPackageNumber;
    private Integer packageNumber;
    private List<RangeShipEntity> rangeShipEntities;

}
