package top.kiswich.cranesite.encode;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class TestEncoder extends MessageToByteEncoder {
    @Override
    protected void encode(ChannelHandlerContext ctx, Object msg, ByteBuf out) throws Exception {
//        out.writeByte(0x1);
//        out.writeCharSequence(msg.toString(),"UTF-8");
        out.writeBytes(out.toString().getBytes());
    }
}
