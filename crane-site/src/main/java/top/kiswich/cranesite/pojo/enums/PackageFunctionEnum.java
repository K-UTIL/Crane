package top.kiswich.cranesite.pojo.enums;

public enum PackageFunctionEnum {
    LOGIN(0x4),
    GET_RANGE(0x2),
    DATA_UPDATE(0x8);

    private Integer mode;

    PackageFunctionEnum(Integer mode) {
        this.mode = mode;
    }

    public Integer getMode() {
        return mode;
    }

    public PackageFunctionEnum setMode(Integer mode) {
        this.mode = mode;
        return this;
    }
}
