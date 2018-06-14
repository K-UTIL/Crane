package top.kiswich.cranesite.decode;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.HashMap;
import java.util.List;

public class TestDecoder extends ByteToMessageDecoder {
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        if (in.readableBytes() < 16) return;
//        out.add(in.readBytes(4));
        ByteBuf byteBuf = in.readBytes(4);
        ByteBuf byteBuf1 = in.readBytes(12);
        out.add(new HashMap<String, ByteBuf>() {{
            put("a1", byteBuf);
            put("a2", byteBuf1);
        }});

    }
}
