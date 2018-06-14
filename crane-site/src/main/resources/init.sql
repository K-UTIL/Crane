CREATE DATABASE IF NOT EXISTS DB_CRANE_CITE;

USE DB_CRANE_CITE;

DROP TABLE IF EXISTS T_TOWER_CRANE;
CREATE TABLE T_TOWER_CRANE (
  `id`           int                auto_increment primary key,
  `tower_number` int      not null
  comment '用于TCP包的识别',
  `password`     char(16) not null
  comment '密码',
  `type`         tinyint  not null  default 0
  comment '类型'
);

DROP TABLE IF EXISTS T_RANGE_SHIP;
CREATE TABLE T_RANGE_SHIP (
  `id`          int              auto_increment primary key,
  `crane_id`    int     not null
  comment '塔机id',
  `startAngle`  double  not null
  comment '开始角度',
  `endAngle`    double  not null
  comment '结束角度',
  `startRadium` double  not null
  comment '开始半径',
  `endRadium`   double  not null
  comment '结束半径',
  `type`        tinyint not null default 0
  comment '类型 {1:p,2c,4:q}'
);

drop table if exists T_CRANE_DATA;
create table T_CRANE_DATA (
  `id`          int              auto_increment primary key,
  `crane_id`    int    not null
  comment '塔机id',
  `range`       double not null
  comment '回转角度',
  `width`       double not null
  comment '幅度',
  `height`      double not null
  comment '高度',
  `wind_speed`  double not null
  comment '风速',
  `weight`      double not null  default 0
  comment '重量（预留）',
  `torque`      double not null  default 0
  comment '扭矩（预留）',
  `inclination` double not null  default 0
  comment '倾斜角度（预留）'
);


DROP table if exists T_USER;
create table T_USER (
  `id`       int auto_increment primary key,
  `username` char(32) not null
  comment '账号',
  `password` char(32) not null
  comment '密码'
);

drop table if exists T_ROLE;
create table T_ROLE (
  `id`   int auto_increment primary key,
  `name` varchar(64)  not null
  comment '角色名称',
  `desc` varchar(256) not null
  comment '角色描述'
);
insert into T_ROLE (name, `desc`) values ('工', '普通员工，基本没有权限'), ('头', '具有区域绘制的权限'), ('总', '全部权限');

drop table if exists T_ROLE_USER;
create table T_ROLE_USER (
  `id`      int auto_increment primary key,
  `user_id` int not null
  comment '员工id',
  `role_id` int not null
  comment '角色id'
);
