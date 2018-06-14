package top.kiswich.cranesite.pojo.enums;

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
}
