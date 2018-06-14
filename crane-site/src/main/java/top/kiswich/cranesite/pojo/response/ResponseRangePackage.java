package top.kiswich.cranesite.pojo.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.RangeShipEntity;
import top.kiswich.cranesite.pojo.enums.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class ResponseRangePackage {
    private Integer craneNumber;
    private ResponseStatus status;
    private Integer totalPackageNumber;//不重要
    private Integer packageNumber;//不重要
    private List<RangeShipEntity> rangeShipEntities;

    public List<byte[]> toBytes() {
        ArrayList<byte[]> bytes = new ArrayList<>();
        Integer packetNum = (int) Math.ceil(((double) rangeShipEntities.size()) / 163);
        for (int i = 0; i < packetNum; i++) {
            int startRangeShipNum = i * 163;
            int endRangeShipNum = rangeShipEntities.size() - (i + 1) * 163 >= 0 ? (i + 1) * 136 : rangeShipEntities.size();
            byte[] subBytes = new byte[(endRangeShipNum - startRangeShipNum) * 9];
            subBytes[0] = craneNumber.byteValue();
            subBytes[1] = (byte) (craneNumber >> 8);
            subBytes[2] = status.getStatus().byteValue();
            subBytes[3] = packetNum.byteValue();
            subBytes[4] = (byte) i;

            for (int index = 0; index < endRangeShipNum - startRangeShipNum; index++) {
                RangeShipEntity rangeShipEntity = rangeShipEntities.get(index);
                subBytes[4 + 1 + index * 9] = rangeShipEntity.getRangShipEnum().getCode().byteValue();
                subBytes[4 + 2 + index * 9] = (byte) ((int) (Math.ceil(rangeShipEntity.getStartAngle() / 0.000625)) >> 8);
                subBytes[4 + 3 + index * 9] = (byte) (rangeShipEntity.getStartAngle() / 0.000625);
                subBytes[4 + 4 + index * 9] = (byte) ((int) (Math.ceil(rangeShipEntity.getEndAngle() / 0.000625)) >> 8);
                subBytes[4 + 5 + index * 9] = (byte) (rangeShipEntity.getEndAngle() / 0.000625);
                subBytes[4 + 6 + index * 9] = (byte) ((int) (Math.ceil(rangeShipEntity.getStartRadius() / 0.05)) >> 8);
                subBytes[4 + 7 + index * 9] = (byte) (rangeShipEntity.getStartRadius() / 0.05);
                subBytes[4 + 8 + index * 9] = (byte) ((int) (Math.ceil(rangeShipEntity.getEndRadius() / 0.05)) >> 8);
                subBytes[4 + 9 + index * 9] = (byte) (rangeShipEntity.getEndRadius() / 0.05);
            }
            bytes.add(subBytes);
        }
        return bytes;
    }
}
