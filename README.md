# brhtw

basic react how to work

这个项目很多地方都是看了卡颂老师 big-react 进行实现和分析的 ，有的地方自己的理解可能会不对，大家要自己看源码进行分析一下。

# 卡颂老师的 big-react 项目地址

https://github.com/BetaSu/big-react

# 看 react 的流程

我个人建议是可以先简单的看一下这个项目的 jsx 的大致实现
然后去调用一下源码 大家可以 先通过软连接 将 react、 react-dom 或者你要看的包 软连接到你创建的 react 项目

# 软连接 react 的方式

我的建议是参考卡颂老师的技术揭秘这本书 具体软连接是 理念篇的第二章前置知识那里 react 源码可以进行软连接
https://react.iamkasong.com/preparation/file.html

但是目前写的这个项目不能进行软连接，不知道为什么会 (0 , react_jsx_dev_runtime**WEBPACK_IMPORTED_MODULE_0**.jsxDEV) is not a function 这个错误，可能是因为 webpakck 打包的问题。 后续如果有解决方案我会修改一下，如果这期间有好心的大佬也可以提一些解决方案给我。
