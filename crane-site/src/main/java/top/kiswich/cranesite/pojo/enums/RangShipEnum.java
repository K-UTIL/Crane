package top.kiswich.cranesite.pojo.enums;

public enum RangShipEnum {
    PROHIBITED(0x01),//禁行区
    CONSTRUCTION(0x02),//施工区
    QUEUE(0x04)//队列区
    ;
    private Integer code;

    RangShipEnum(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public RangShipEnum setCode(Integer code) {
        this.code = code;
        return this;
    }

    public static RangShipEnum getByCode(Integer code) {
        for (RangShipEnum rangShipEnum : RangShipEnum.values()) {
            if (rangShipEnum.getCode().equals(code)) return rangShipEnum;
        }
        throw new IllegalArgumentException("参数[" + code + "]错误！");
    }
}
