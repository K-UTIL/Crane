package top.kiswich.cranesite.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.enums.RangShipEnum;

@Setter
@Getter
@NoArgsConstructor
public class RangeShipEntity {
    private RangShipEnum rangShipEnum;
    private double startAngle;
    private double endAngle;
    private double startRadius;
    private double endRadius;
}
