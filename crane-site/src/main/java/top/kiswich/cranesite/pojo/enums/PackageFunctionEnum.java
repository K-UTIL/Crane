package top.kiswich.cranesite.pojo.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum PackageFunctionEnum {
    LOGIN(0x4),
    GET_RANGE(0x2),
    DATA_UPDATE(0x8);

    private Integer mode;

    private static final Map<Integer, PackageFunctionEnum> lookup = new HashMap<>();

    static {
        for (PackageFunctionEnum packageFunctionEnum : EnumSet.allOf(PackageFunctionEnum.class)) {
            lookup.put(packageFunctionEnum.mode, packageFunctionEnum);
        }
    }

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

    public static PackageFunctionEnum getByMode(Integer mode) {
        return lookup.get(mode);
    }
}
