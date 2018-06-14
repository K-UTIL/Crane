package top.kiswich.cranesite.decode;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import top.kiswich.cranesite.pojo.enums.PackageFunctionEnum;
import top.kiswich.cranesite.pojo.request.RequestDataPackage;
import top.kiswich.cranesite.pojo.request.RequestRangePackge;
import top.kiswich.cranesite.pojo.request.RequestTokenPackage;

import java.lang.ref.ReferenceQueue;
import java.util.List;

/**
 * 运算注意 位运算符优先度较低
 */
public class DataUpdateDecoder extends ByteToMessageDecoder {

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        //数据包固定为13字节
        if (in.readableBytes() < 3) {
            in.clear();
            return;
        }

        byte[] array = new byte[in.readableBytes()];
        in.readBytes(array, 0, in.readableBytes());
        Integer[] parseArray = new Integer[3];
        for (int i = 0; i < 3; i++) {
            parseArray[i] = array[i] & 0x0ff;
        }
        Object object = null;

        switch (PackageFunctionEnum.getByMode(parseArray[2])) {
            case LOGIN:
                object = decodeTokenPacket(array);
                break;
            case GET_RANGE:
                object = decodeRangePacket(array);
                break;
            case DATA_UPDATE:
                object = decodeDataPacket(array);
                break;
        }

        out.add(object);
        in.clear();
    }

    protected RequestDataPackage decodeDataPacket(byte[] bytes) {
        RequestDataPackage requestDataPackage = new RequestDataPackage();
        if (bytes.length >= 13) {
            Integer[] parseArray = new Integer[13];
            for (int i = 0; i < parseArray.length; i++) {
                parseArray[i] = bytes[i] & 0x0ff;
            }
            requestDataPackage.setCraneNumber((parseArray[1] + (parseArray[0] << 8)));
            requestDataPackage.setFunctionEnum(PackageFunctionEnum.getByMode(parseArray[2]));
            requestDataPackage.setRange((parseArray[4] + (parseArray[3] << 8)) * 0.000625);
            requestDataPackage.setWidth((parseArray[6] + (parseArray[5] << 8)) * 0.05);
            requestDataPackage.setLeftingHeight((parseArray[8] + (parseArray[7] << 8)) * 0.05);
            requestDataPackage.setWindSpead((parseArray[10] + (parseArray[9] << 8)) * 0.1);
            requestDataPackage.setEncryptTowerNumber(parseArray[12] + (parseArray[11] << 8));
        }
        return requestDataPackage;
    }

    protected RequestTokenPackage decodeTokenPacket(byte[] bytes) {
        RequestTokenPackage requestTokenPackage = new RequestTokenPackage();
        if (bytes.length >= 19) {
            Integer[] parseArray = new Integer[19];
            for (int i = 0; i < parseArray.length; i++) {
                parseArray[i] = bytes[i] & 0x0ff;
            }
            requestTokenPackage.setTowerCrane((parseArray[1] + (parseArray[0] << 8)));
            requestTokenPackage.setFunctionEnum(PackageFunctionEnum.getByMode(parseArray[2]));
            StringBuilder password = new StringBuilder();
            for (int i = 3; i < 3 + 16; i++) {
                password.append(parseArray[i]);
            }
            requestTokenPackage.setPassword(password.toString());
        }
        return requestTokenPackage;
    }

    protected RequestRangePackge decodeRangePacket(byte[] bytes) {
        RequestRangePackge requestRangePackge = new RequestRangePackge();
        if (bytes.length >= 5) {
            Integer[] parseArray = new Integer[5];
            for (int i = 0; i < parseArray.length; i++) {
                parseArray[i] = bytes[i] & 0x0ff;
            }
            requestRangePackge.setTowerNumber((parseArray[1] + (parseArray[0] << 8)));
            requestRangePackge.setFunctionEnum(PackageFunctionEnum.getByMode(parseArray[2]));
            requestRangePackge.setEncryptTowerNumber((parseArray[4] + (parseArray[3] << 8)));
        }
        return requestRangePackge;
    }

}
