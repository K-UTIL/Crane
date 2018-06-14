package top.kiswich.cranesite.handle;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import top.kiswich.cranesite.pojo.request.RequestDataPackage;
import top.kiswich.cranesite.pojo.request.RequestRangePackge;
import top.kiswich.cranesite.pojo.request.RequestTokenPackage;

public class LoginHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof RequestRangePackge) {
            //回复山环区域包

        } else if (msg instanceof RequestTokenPackage) {
            //回复token包


        } else if (msg instanceof RequestDataPackage) {
            //保存上报数据

        }

    }
}
