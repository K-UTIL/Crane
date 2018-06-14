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
}
