package top.kiswich.cranesite.pojo.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import top.kiswich.cranesite.pojo.enums.PackageFunctionEnum;

@Setter
@Getter
@NoArgsConstructor
public class RequestTokenPackage {
    private Integer towerCrane;
    private PackageFunctionEnum functionEnum = PackageFunctionEnum.LOGIN;
    private byte[] password;
}
