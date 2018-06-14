package top.kiswich.cranesite.encode;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import top.kiswich.cranesite.pojo.response.ResponseTokenPackage;

public class LoginEncoder extends MessageToByteEncoder {
    @Override
    public void encode(ChannelHandlerContext ctx, Object msg, ByteBuf out) throws Exception {
        ResponseTokenPackage tokenPackage = (ResponseTokenPackage) msg;
        Integer craneNumber = tokenPackage.getCraneNumber();
        Integer status = tokenPackage.getStatus().getStatus();
        Integer token = tokenPackage.getToken();
    }
}
