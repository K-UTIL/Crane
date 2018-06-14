package top.kiswich.cranesite.pojo.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.enums.ResponseStatus;

@Setter
@Getter
@NoArgsConstructor
public class ResponseTokenPackage {
    private Integer craneNumber;
    private ResponseStatus status;
    private Integer token;

    public byte[] toBytes() {
        byte[] bytes = new byte[5];
        bytes[0] = (byte) (craneNumber & 0xFF);
        bytes[1] = (byte) (craneNumber & 0xFF00 >> 8);
        bytes[2] = status.getStatus().byteValue();
        bytes[3] = (byte) (token & 0xFF);
        bytes[4] = (byte) (token & 0xFF00 >> 8);
        return bytes;
    }
}
