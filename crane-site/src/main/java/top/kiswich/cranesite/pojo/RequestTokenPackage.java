package top.kiswich.cranesite.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RequestTokenPackage {
    private Integer towerCrane;
    private PackageFunctionEnum functionEnum = PackageFunctionEnum.LOGIN;
    private byte[] password;
}
