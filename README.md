## 项目介绍
  使用react为框架进行搭建，使用的redux、react-router-dom等，使用了antd作为ui框架，axios、less等热门插件
  建议使用chrome浏览器或者360极速浏览器极速模式运行

## 环境安装
1. [点击下载node.js](https://nodejs.org/en/)
2. [点击下载yarn](https://yarn.bootcss.com/)
安装完成后重启电脑

## 运行项目
打开cmd或者powershell进入package.json所在文件夹
### 按顺序输入如下命令
	1.安装环境
		yarn
	2.运行项目
		yarn start
	3.打包项目
		yarn build
		
## 项目结构
仅展示src目录
src
    ├─assets				// 资源
    │  ├─iconfont			// icon字体
    │  └─image				// 图片
    ├─components			// 组件
    │  ├─Avatar				// 头像组件
    │  └─common				// 公共组件
    │      └─SignModal		// 弹框（登陆，注册）
    ├─hooks					// hooks 包含table和list封装
    ├─layout				// 布局
    │  ├─admin				// 后台布局
    │  │  ├─header			// 头部组件
    │  │  └─sidebar			// 左侧菜单组件
    │  └─web				// 前台布局
    │      └─header			// 头部组件
    │          ├─left		// 头部左侧
    │          └─right		// 头部右侧
    ├─redux					// redux
    │  ├─admin				
    │  ├─cart
    │  └─user
    ├─routes
    │  └─modules
    ├─styles
    ├─utils					// 包含请求拦截器，公共工具方法
    └─views
        ├─admin
        │  ├─goods			// 商品
        │  ├─home			// 主页
        │  ├─order			// 订单
        │  ├─rider			// 骑手
        │  └─user			// 用户
        ├─others			// 其他界面（登陆，骑手确认）
        └─web
            ├─cart			// 购物车
            ├─home			// 主页
            └─order			// 订单