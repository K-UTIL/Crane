package top.kiswich.cranesite.pojo.enums;

import com.sun.org.apache.regexp.internal.RE;

public enum ResponseStatus {
    SUCC(0x1), FAIL(0x0);

    private Integer status;

    ResponseStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

    public ResponseStatus setStatus(Integer status) {
        this.status = status;
        return this;
    }

    public static ResponseStatus getByCode(Integer code) {
        for (ResponseStatus responseStatus : ResponseStatus.values()) {
            if (responseStatus.getStatus().equals(code)) return responseStatus;
        }
        throw new IllegalArgumentException("参数[" + code + "]错误！");
    }
}
