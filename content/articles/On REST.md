---
title: 被抛弃的REST
date: 2020-08-11
---

近期看到关于REST的讨论忽然增多，最主要围绕的一个点就是如何说服那些使用HTTP 200状态码统一返回所有业务状态并用Response wrapper封装一切的人使用RESTful API。

然而就这些人，连自己为什么要用RESTful API都没办法说出个一二来。非常多的人都是看了某些文章（比如搜索非常靠前的阮一峰的《RESTful API 设计指南》）以后了解到了某些点，并且在未经验证这些点是否合理的情况下，就觉得找到屠龙之技了。同样的问题也出现在其他任何被过度宣传了的技术概念上，而REST是表现非常明显的一个。

## 原教旨REST

我们先看看REST（REspresentational State Transfer，表现层状态转换）到底是什么。

Roy Fielding博士2000年论文中最先提出的这个概念，其论文也是与REST相关的文章中被引用最多的。另外，Wikipedia上关于RESTful或者RESTful API的定向也是REST。所以我们的起点选在这里，[*Architectural Styles and the Design of Network-based Software Architectures*](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)。



首先，REST是一种架构风格（architectural style），而不是具体的指导标准。什么是架构风格呢，在Fielding的论文中给的定义：

> An architectural style is a coordinated set of architectural **constraints** that restricts the **roles/features** of architectural elements and the allowed **relationships** among those elements within any architecture that conforms to that style.
> 
> 架构风格是一系列整理过的架构**约束**的集合，这些约束用于限制架构元素的**角色/特性**和满足这种风格的架构中各架构元素之间**关系**。

我们看到这几个突出的关键字：约束、角色、特性、关系。

类比一下architectural style在建筑领域的例子，REST大概是这种东西：

- 巴洛克
- 包豪斯
- 哥特
- 文艺复兴
- 中式园林

看出来问题了吧，REST可不是教给你怎么糊墙，怎么砌砖，怎么搅拌钢筋水泥。而是说，符合这样设计的软件架构应该会存在哪些角色、分别有什么特性、它们之间的关系是什么样的、应该满足哪些约束。人家才没有告诉你增删改查一定对应着POST DELETE PUT GET。

其次呢，REST主要针对的是网络应用架构，更具体一点的话，针对的是（当时的）现代互联网（Modern Web）。因为整个设计源自于Fielding在设计HTTP1.0协议的时候形成的设计方法。

但毕竟这个modern也已经是20多年前的事情了，连Fielding博士在2017年[重新审视REST的时候](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/46310.pdf "Reflections on the REST Architectural Style and “Principled Design of the Modern Web Architecture”")，也提到说，REST已经成了一个用来描述基于HTTP的编程方法或者实现框架的buzzword了。

## REST 架构约束

Fielding博士在论文中给出了他导出REST的6个主要约束：

- 客户端-服务器架构 Client-Server
- 无状态 Stateless
- 可缓存 Cache
- 统一接口 Uniform Interface
- 分层系统  Layered System
- （可选的）按需执行代码 Code-On-Demand

其他的几个元素在当前状态下都是比较好理解的，但统一接口这一点上，Fielding做了一些扩展，给了四个接口约束：

- 资源识别方式 identification of resources
- 通过表现层操纵资源的方式 manipulation of resources through representations
- 自描述的消息 self descriptive messages
- 超媒体作为应用状态引擎 hypermedia as the engine of application state， HATEOAS

除了都出现在了Fielding论文中以外，这些文字没有一个跟HTTP和API有任何直接关系。这些约束可能导出出来完全不同的另外一种架构风格，并且应用到任何可以做互联的环境中（比如2003年就有篇[Extending REST](https://www.ics.uci.edu/~rohit/Khare-Thesis-FINAL.pdf "Extending the REpresentational State Transfer (REST) Architectural Style for Decentralized Systems")提出来应用于去中心化系统中的扩展）。

## REST 元素

REST主要围绕着“资源（Resource）”及其“表现（Representation）”存在。

每个资源都有着其固定的标识符，同时也有相关的元数据和控制数据。REST中定义了下面几种数据元素：

- 资源 resource
- 资源标识 resource identifier
- 表现 representation
- 表现元数据 representation metadata
- 资源元数据 resource metadata
- 控制数据 control data

分别类比到Web场景中，可以对应如下：

| 数据元素 | Web场景中的实例 |
|-------------|-------------------|
| resource | 超文本所引用的概念实体 |
| resource identifier | URL，URN |
| representation | HTML 文档，JPEG 图片 |
| representation metadata | 媒体类型，最近修改时间 |
| resource metadata | 源链接，alternates，vary |
| control data | if-modified-since，cache-control |

所有数据通过不同的连接器（connector）来连通。REST中定义的连接器有：

- 客户端 client
- 服务端 server
- 缓存层 cache
- 解析器 resolver
- 隧道 tunnel

这里的连接器只是一个角色层面上的定义，某一个系统组件，可能既是客户端又是服务端，比如一个中间网关。而根据这些类似的角色组合关系，REST中定义了下面几种组件：

- 源服务器 origin server
- 网关 gateway
- 代理 proxy
- 用户代理 user agent

终于似乎看到了一些熟悉的字眼，但是也恰好就在这里Fielding提到了最关键的一点：

> REST does not restrict communication to a particular protocol, but it does constrain the interface between components, and hence the scope of interaction and implementation assumptions that might otherwise be made between components.
>
> REST并不限制具体的通信协议，但它的确约束组件之间的交互接口，也即组件间可能的的交互范围和预设实现。

所以不好意思有让大家失望了，还是跟HTTP没有直接的绑定关系。

那到底RESTful API这一层的概念是来自于哪里？为什么总是会有人扯URL中不能出现动词、使用HTTP请求方法实现语义和使用HTTP状态码表示业务逻辑这种问题呢？

## RFC7231: HTTP/1.1 Semantics and Content

还是得感谢Fielding博士，作为对RFC2616（HTTP/1.1）的修正性文档，2014年RFC7231的wording完全朝着REST靠拢。

你可以对比两份文档中对于HTTP GET方法的描述

> RFC2616: The GET method means retrieve whatever information (in the form of an entity) is identified by the Request-URI.
>
> RFC7231: The GET method requests transfer of a current selected representation for the target resource. 

你看这个操作是反过来的，并不是HTTP就是REST，而是在REST概念有了以后，才逐渐转换到“符合”（conform）REST的。

RFC732x系列文档的wording更新以后，一定程度上算是Fielding上承认了HTTP作为REST的de facto实例，但在这个基本的文档之上，还是没有足够的信息去支撑人去实现一个RESTful的API。原因很简单，首先只是在说如何处理资源和表示，而对于些许细节，以及作为HTTP API该有的表现，都没有规定；其次，这是HTTP协议的规范，而HTTP协议本身作为承载Web的基础，可不是只承载API的。

RESTful API的大部分理论基础都来自于这篇文档。以至于脱离了这篇文档而存在的内容就变成了myth。一个典型的例子就是，URI中不能出现动词；另外比如，API治理中的版本控制。这些东西在这个文档中并没有给出结果，于是就成了一个谁都能来说一嘴的地方。

所以回过头去看阮老师那篇文章，就到处都是槽点了。

## MYTH

REST成为一个buzzword以后，一系列的myth就开始了。

- **REST总是使用HTTP协议**
- **REST中对应的是CRUD操作** 那么其他的业务逻辑怎么办呢？
- 甚至是更进一步的道德绑架：**REST API认证应该使用OAUTH**
- **REST就是最优的设计**
- **用上HTTP就是RESTful API了**

> Some architectural styles are often portrayed as “silver bullet” solutions for all forms of software. However, a good designer should select a style that matches the needs of the particular problem being solved.
>
> ———— Roy Fielding

以上大部分观点就是我拒绝使用REST风格API架构的原因。很多时候大部分人在没有完整了解概念以及没有过相应经验的情况下，单靠吹就想做到RESTful。一定就要满足HTTP Semantics，一定就得用resource来表示一切，一定就得使用某种特定技术来表示自己做的是对的。绝大多数时候是本末倒置后产生的行为，并且在遇到一个实际的挖坑问题的时候，自己就陷进去没有结论了。

这种没能力的REST有个屁用。

## RESTful done right

其实我也没有非常done right的经验，但根据做不到的经验反推还是能有些建议的。

首先要确定团队有没有能力使用REST风格的API架构，因为基于资源和表现的抽象导致整个的设计思路会远不同于基于流程或者数据的接口设计。超出这个范围只想上RESTful，一定是脑子瓦特了。在团队推行REST之前，也一定有足够的理解和实践，不然真的遇到坑，结果会得到一个四不像。

其次是一定要有一套详细的规范，这个规范是团队所共识的。现有的实践是非常值得参考的，特别是当有心人整理出来一份详尽的文档而不是在闲扯一些脱离REST本意的解释的时候，可以参考一下。比如微软的[REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md)，就细致地讨论了很多现实问题，虽然没有具体的框架支持，但在其设计思路之上很容易在任何已有框架上面改造出来对应的解决方案。

最后，千万别再被buzzword和一些不负责任的文章给误导了。就算不做追根溯源，也没那么简单。

---

送上一个几年前编的段子：

> - 成都是个很安逸滴城市，安逸用英语咋个说？
> - RESTful
