---
title: "Rethink JSONSpec"
date: 2019-04-29
---

# Rethink JSONSpec

### JSONSpec

01. [JSONSpec: Build a well-typed Web]({{< relref "/articles/JSONSpec/01. Build a well-typed Web.md" >}})
02. [JSONSpec: Build an enhanced service]({{< relref "/articles/JSONSpec/02. Build an enhanced service.md" >}})
03. [JSONSpec: TypeSpec - Typescript-based JSONSpec]({{< relref "/articles/JSONSpec/03. TypeSpec - Typescript-based JSONSpec.md" >}})
04. [JSONSpec: Workflow as a Service]({{< relref "/articles/JSONSpec/04. Workflow as a Service.md" >}})
05. [JSONSpec: AST as a Service]({{< relref "/articles/JSONSpec/05. AST as a Service.md" >}})
06. [JSONSpec: Data Driven Design]({{< relref "/articles/JSONSpec/06. Data Driven Design.md" >}})
07. [JSONSpec: Next step]({{< relref "/articles/JSONSpec/07. Next step.md" >}})
08. [JSONSpec: GraphQL]({{< relref "/articles/JSONSpec/08. GraphQL.md" >}})
09. [JSONSpec: Why spec]({{< relref "/articles/JSONSpec/09. Why spec.md" >}})

这个目录里的是一系列我个人于2015年5月到8月之间发表的关于Web接口、服务和后端应用设计的一系列文章。这个思考过程也逐渐影响了我工作中所使用和坚持的一些实践，比如 Schema First，比如偏好强类型和显示标注的接口设计，比如使用从 RAML / Swagger 到 GraphQL 这些框架和工具。

实践证明这也是一个明显的趋势，从Web端TypeScript的逐步火热，到Schema First的设计逐渐流行，都说明了，类型、Specification等在编程活动中起到了非常重要的作用：建模、验证和生成代码以及测试工具，都有各种对应的轮子。我个人也挖了不少坑来辅助这件事儿。（见对应文章 Why Spec）

但目前这块儿还是不够非常的完善，比如一个理想的过程是，我定义好了的schema，对应其实已经可以把业务数据和处理过程也能加进去（就是Workflow as a service和AST as a service中提到的），这样整个后端过程其实都是非常灵活可配接的了。然后接下来我们要考虑的是如何把数据绑定在前端，去展示给终端用户：这个过程，在这段时间的实践来看，也可以逐步做成自动的。

### 新思路

这样我们来看一下一个应用的处理过程，可以分为以下几部分：

 - **数据源** 第三方服务，或者应用自己的数据存储库，提供给应用必要的数据。通过约束数据模式或者服务的契约，来保证语义的完整性和安全性。
 - **输入** 来自于用户，以及客户端应用提供的数据，这些数据对应用来说是一手数据，需要进一步通过pipeline处理、入库或者转发到其他的服务中。
 - **数据处理管线** 这一层是以往应用的核心部分，包括不同的服务处理程序，以及ETL处理程序和其他的定时器处理程序等。这里作为一个统一的模型，定义为数据处理管线，因为所有这些都满足`输入-处理-输出`的流程。这一点其实也能通过像AWS Lambda或者Azure Function体现，一个简单到极致的服务其实就是这样一个过程。
 - **Schema** 每一个处理管线的模式和类型约束，每一个输入输出的接口约束以及每一个数据源的模型，都可以通过相应的schema来满足。
 - **输出/呈现** 按照对应的schema提供数据，交由前端实现。

由此其实我们也能导出一个应用的实现过程：
  1. 设计Schema
  2. 链接输入、输出、数据源
  3. 设计处理管线
  4. 扩展schema，回到 1

这样应用所有部分的内容，都是由不同地方的“数据”组合起来的。所有的处理流程，都是某一个简单的处理管线过程。比如如果我们需要加一条数据处理的流程，聚合每天的事务数据得到一个处理结果，那这部分获取 + 转换的过程，几乎就可以复用之前管线的过程。

### 基础设施

于是我们发现还有这些东西是需要的，一个自动建模的工具、一个管理和动态配接管线的框架以及一个验证工具。

可能这就是接下来要做的事情了。

2019-04-29
