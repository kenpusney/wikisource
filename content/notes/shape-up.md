---
title: Shape up - Stop Running in Circles and Ship Work that Matters
date: 2020-11-30
draft: true
---

# Shape Up - Stop Running in Circles and Ship Work that Matters

by Ryan Singer at Basecamp

# Jason Fried 序


> You’ll often hear people say “execution is everything,” but that’s not quite right. In fact, it’s often quite wrong.

> - 首先，我们不用瀑布或者敏捷或者scrum
> - 其次，我们不在墙上贴便签
> - 第三，我们不做每日站会、设计冲刺、开发冲刺或者任何类比成最终把人精力耗尽的活动的事情。
> - 没有backlog、没有看板、没有velocity跟踪

> 别把他当本书。把他当成手电筒。你跟你的团队已经在漫漫长夜摸索了足够长时间了。现在你有了一些可以照亮前路的东西指引你找到自己的路。

# Introduction

## Growing Pains

- Team members feel like projects go on and on, with no end in sight.
- Product managers can't find time to think strategically about the product.
- Founders ask themselves: "Why can't we get features out of the door like we used to in the early days"

团队扩张了，但是每个人都在远程工作，所以需要一个通用语言来描述当前在做的事情以及其他需要沟通的内容，来确保适应新团队结构。

把按项目时长交付变成周期性交付。试验了很久确定了这个周期：6周。规范化了pitching和betting的过程。形成了shaping这套术语。

可以看成是两本合在一起的书:
- 一部分是提供一种更好的语言来描述和处理来自产品开发中风险、不确定性和挑战，
- 另外一部分描述了Basecamp所采用的特定流程

## 6周循环

采用6周为一个周期，因为6周足够长，可以让人完成一些有意义的东西；6周足够端，能让人感受到deadline近在咫尺。

Basecamp的大部分新特性都是在六周内完成

## 塑造工作

第二，在把工作交给团队之前先塑形。一个高级人员组成的团队与开发团队并行工作。他们定义项目解决方案中的关键元素，然后再决定是否要这个项目上面下赌注。

一个项目的定义要达到确定的抽象程序：具体到团队直到该怎么去做，但是又足够抽象能够让他们有一定的空间去解决他们感兴趣的细节。

塑造的过程中关注的并不是估算，而是胃口。与其讨论要花费多少来完成工作，不如问：我们想要在上面花费多长时间？这个主意值得在上面花费多长时间？

## 让团队负责

把全部职责都交给一个小的完整的设计师和程序员团队。他们自定义他们的工作任务、调整范围，然后在一起把相应的产品一次一部分地构建完。这跟那些方法完全不同，我们不会让管理者拆分任务，也不会只让程序员做一个工单执行器。

管理减少，高级人员可以去做更好的塑形工作，开发团队可以专注于明确边界内的开发工作。

## 瞄准风险

每一步都关注于一个特定的风险：不能准时上线。

- 在正式开始限时工作之前，先解决所有的开放问题
- 把构建过程限制在6周内，这样避免过多的投入
- 较早把设计和程序整合在一起工作

## 结构

- Shaping：项目前的前置工作
- Betting：怎么决定六周的时间如何安排
- Building：怎么完成工作的

# Part 1 Shapping

# Shapping 的原则

## 线框图太具体了

## 文字太抽象了

## 案例 Dot Grid Calendar

- v3 版的 basecamp没有 calendar，有人想要
- 之前版本的calendar只有10%的人再用，而且花费时间很长（六个月）
- calendar的交互非常复杂

## 特点1：简单粗暴（rough）

- 留一个开放的空间给设计师和程序员

## 特点2：不留疑问（solved）

- 所有的开放问题都应该得到解决

## 特点3：边界明确（bounded）

- 应该能够标注出**不做什么**

## 谁来塑形

Shaping应该包含：界面思路、技术可行性和业务优先级。所以如果要完成这件事情，就必须是一个通才，或者与几个有响应能力的人协作。

- 从用户的角度来设计交互
- 定义做什么、怎么做和如何切入现有业务

- 不需要是一个程序员，但一定要有熟悉技术
- 知道哪些能做、哪些容易实现、哪些相对比较困难
- 系统知识能够指导你理解其中的机遇和阻碍

- Shaping是个闭门创新的过程

## 两条轨道

Shaping的工作不太好排期，所以会跟building同时进行，也大概需要6周的一个周期。

## Shaping的步骤

1. 设置边界
2. 粗略勾画元素
3. 找出风险和**兔子洞**
4. 编写pitch

Pitch指的是一个正式的文档，包含了问题、约束、解决方案、兔子洞和局限。pitch会被放到betting会议里讨论。如果这个项目被选中了，pitch就可以被用作kick-off用于给团队解释项目内容的材料。

# 设置边界

## 设定“食量”

你可以把“食量”想成是一个标准团队的时间预算。

通常会设置两种“食量”
- 小批量：1 designer + 1~2 programmer，1~2 week。通常把这些工作聚集到六周的一个循环
- 大批量：同等的团队规模，但是要用完整的六周时间

## 固定时间、可变范围

食量跟估算是完全相反的：估算开始于一个设计，得到一个数字；食量开始于一个数字，得到一个设计。所以在设计的过程中，使用食量来作为创新的约束

## “好” 是相对的

- 没有“最好”的
- “最好”是相对于你所定义的约束
- 没有时间限制的话，总会有更好的解决方案

## 响应未加工的想法

- “挺有趣的，也许某天会考虑吧” —— 一个温柔的“no”
- 不要过早回复，想清楚再做
- 这样可以降低期望

## 缩小问题范围

- 用户想要的可能源自于一些更简单的问题导致的
- 把：“我们能够构建一个什么方案”换成“到底哪里出问题了导致现在方案不可行”

## 当心“手提袋”

- “重新设计文件选择”，这就是个“手提袋”
- “手提袋”很难判断到底是什么意思，问题出在哪里，怎么解决
- 更直接的表达是：“我们需要重新考虑文件功能，因为分享多个文件需要太多的操作步骤”
- 这个时候就能够引导人从所面临的问题开始考虑了

一个“手提袋”的标志是“2.0”标签。

## 边界已经就位

- 未加工的想法
- “食量”
- 缩小后的问题定义

# 找出元素

## 以合适的速度前行

- 找对合适的人一起参与
- 避免画图和样稿中的错误的细节程度

需要足够具体以使我们能够得到解决方案，但又不会陷入到无穷的细节里面去。考虑以下几个问题：

- 新设计的内容会适配到当前系统的什么地方？
- 你如何用到他，怎么去使用的？
- 包含哪些关键的组件和交互？
- 能给你带来什么？

有一些工具可以方便做原型设计：面包板和粗马克笔草图

## 面包板试验

类比硬件的概念。

基本包含三部分：

1. 位置 Places
2. 功能可见性 Affordances
3. 连接线 Connection lines

## 粗马克笔草图

非常难添加细节。

## 元素是产出物

## 留给设计师的空间

## 暂时还不能交付

# 风险和兔子洞

## 风险的不同类型

塑造的好的工作不会通常不会超出1周的时间。

塑造不好的通常可能有3倍左右（18周）的延期。

## 寻找兔子洞

- 是否需要新技术
- 是否假设了各部分之间能够比较好的组合
- 是否假设存在不需要我们想出的设计方案
- 是否有我们需要提前为研发团队做的困难决策

## 指出超出边界的内容

- 团队会尝试做到各种适合的使用场景
- 但显式指出那些东西不需要支持仍然是一个好主意

## 裁剪（cut back）

- 某些看起来很酷炫的特性，可能并不是必要的
- 加上一个“nice-to-have”的标记给团队

## 呈现给专业技术人员

// 原文是 technical experts，但是“技术专家”这个词因为某些公司的原因被用烂了，所以我选择“专业技术人员”这个翻译

- Shaping是个闭门活动，如果有东西你不完全确定，需要一些技术专家来评估你的一些技术假设
- 注意不要使用“这可能实现吗？”这种短句，软件行业，什么东西都是可能的但都不是免费的。
- > Beware the simple question: “Is this possible?” In software, everything is possible but nothing is free.
- 直接邀请他们看草稿，这样方便及时变更，而不是写成一个文档或者ppt给他们演示

## 风险扫除了，准备写文档

# 编写Pitch

通常一个pitch会包含下面几部分内容（ingredient）

1. 问题 - 未加工的想法、用例、或者一些驱使产生这个项目的动机
2. 食量 - 准备花费多少资源在这上面，这些又是如何约束解决方案的
3. 解决方案 - 把核心要素以一种所有人都容易理解的方式展现出来
4. 兔子洞 - 需要避免的风险和问题的细节
5. No-gos - 超出范围的，或者是希望排除在这个项目之外的场景、需求等

## 要素1：问题

- 把问题和方案放在一起呈现
- 而不是基于假设来设计解决方案

- 直接提出来“构建个啥”——非常危险
- 没有个特定的问题，很难去验证方案的有效性，以及去对比不同的解决方案优劣

- 提出问题能够引导一个清晰的对于其投资价值的理解

- 问题最好关联一个用户故事，为什么当前状态不work
- 充分的context能够更好的帮助阅读pitch的人理解问题和方案

## 要素2：食量

- 问答题定义的另外一个关键部分：在短时间内解决问题
- 有了食量定义能够防止一些非生产性的对话
- 总有更好的办法，但在有限的时间范围内，这个方案如何？
- 每个人都可以推出昂贵或者复杂的解决方案，但需要花费一些洞察性设计来获取一个能在短时间周期内完成的简单方案

## 要素3：解决方案

- 跟脱离了问题的方案类似，有些时候会出现脱离了方案的问题
- 必须要给出解决方案

## 帮我了解他

- 需要在pitch中添加适当的细节，包括之前的草图和粗马克笔绘画

## 要素4：兔子洞

- 不用非常复杂，但需要充分的信息
- 比如可以通过URL等引用一些内容

## 要素5：No-gos

- 在这里提及一些不需要做的事情和需要避免的超越范围的事情

## 准备展示

- 如何在Basecamp里做这事儿

# Part 2 Betting

# Bets, No Backlogs

- 写完pitch以后不会进入到backlog

## No Backlogs

- Backlogs 太重了
- 数以百计的任务堆积在一起，大部分是完全没时间去看的
- 给人感觉好像一直落后进度，实际上则不一定
- 半年后相对比较重要的事情并不意味着我们需要盯着他反复看

- Backlog 也是浪费时间的神器
- 花费长时间回顾、梳理、和整理旧的想法会浪费时间关注当前问题，会分散注意力

## 很少潜在的赌注（bet）


- 每次的六周循环开始前，都会举行一次betting table（赌注圆桌）决定下一次做什么
- 挑选上个循环产出的pitch，或者是revise之后的pitch
- 不会去回顾过去的想法
- 待讨论的pitch就是仅有的潜在赌注

- 6周一次，并不频繁；比较短，只审核pitch；相对高效

- pitch被选中了，进入下个循环去构建，否则就被丢弃了，不会有任何跟踪或者保留

- 如果这个pitch真的很不错，但时机不对怎么办？有人有想法的话记住他就好了，六周以后有时间再说

## 分布式列表

- 没有一个中心化的backlog，所以每个人都可以自己跟踪觉得重要的pitch、bug、请求或者他们觉得需要记录的事情
- 这样就分散了排列优先级和跟踪问题的相关责任
- 每一次讨论的关键点都是最新的，而不必去review公共的backlog（也不存在）

## 重要想法回归

- ideas are cheap
- 想想你啥时候忘记过非常重要的想法？
- 下次提出来就好了

# 赌注圆桌

## 6周循环

- 如果不知道哪些人在哪些时间是可用的，安排时间很困难
- 特别是如果项目交叉的时候
- 如果所有人你都按照同样的循环来工作，就可以简化这个问题

- 一些公司使用两周循环
- 如果太短很多有意义的事情并没有办法完成
- 并且会提前规划很多东西，导致一些额外的代价

- 足够长以完成一些大项目，但足够短以保证在开始时就能预见结束
- 所以6周时长能让他们感觉到deadline就在眼前，不至于早项目前期浪费时间

## 冷却时间

- 反复进行六周循环会把人拖垮
- 也没有空闲时间考虑接下来做什么
- 每个循环结束期间最糟糕，因为大家都在关注完成项目、准时交付

- 所以每六周循环之后，会有两周的冷却时间（cool-down）
- 没有特定安排的工作
- 可以做各种相关的事儿，比如修bug、探索新想法和尝试新的技术

## 团队和项目规模

- 1个设计师带1~2个程序员
- 后期会加入一个QA进行集成测试
- 大批量项目，每个项目花费一整个周期（六周时间）
- 或者多个小批量项目

## 赌注圆桌

- cool-down期间进行
- 关键干系人决定再下一个周期做什么事情
- 没有梳理、backlog等过程

- CEO（Jason）、CTO（DHH）、产品战略官
- 所以会议氛围是“不浪费任何时间”
- 会议开始前都有机会提前阅览所有待讨论的pitch
- 通常之前的一些1-1对话也会给他们北京
- 所以开会会直接讨论观点和决策

- 会议的结果是个循环计划
- 这个循环有哪些可用的资源、业务优先级是什么、最近在进行的工作是什么，这些都是会议决策的输入

- 因为会议的结果是最高决定人拍板的，所以不存在进一步的验证和审批，没有任何人可以再打断已经安排好的工作

- 这种由顶层做的决策会让循环比较正常的进行
- 会议比较短、各种选项也都是设计好的、参与人也不会太多
- 于是赌注桌基本上就是决定产品方向的讨论，而不是争抢资源或者争论优先级

## “下赌注”的意思

为什么要用bet这个词，而不是用规划（planning）呢？

- 首先，bet意味着有一定的支出（payout）
- 并不是把一系列的任务塞满时间盒
- 并不是两周时间完成某个特性然后看增量进度，而是有意使用六周时间完成一个更有意义的工作
- pitch中包含了要付出的具体量

- 其次，bets意味着承诺（commitment）
- bet了6周，意味着这六周就专注工作在这上面，不能有任何中断
- 并不是在尝试高效使用程序员的每一个小时，而是集中使用六周的时间完成特定的工作

- 第三，一个合适的bet可以容错，及时止损
- 一次bet六周，意味着最大的损失也就只有六周

接下来更详细地看后面的两个问题

## 不可中断的时间

- 6周时间内并不允许其中有任何中断
- when you make a bet, you honor it
- 任何人说“只要几个小时”或者“只要一天”的时候，别信他
- **动量和进度都是二阶量，跟“成长”和“加速”类似，你不可能通过一个点就能描述他们**
- 你需要一个由不中断的点集合而成的曲线
- 当你打断某些人以后，你丧失的不只是那段时间，还有他们在那个时候构建出的动量。这动量还是需要他们花费一段时间才能再找回来
- 所以失去一个小时可能浪费一整天，失去一天可能浪费一整个星期

- 如果有重要的事情发生，也不会中断
- 如果不是影响很大，可以放到一个循环以后再进行处理
- 除非有非常严重的危机发生。但严重的危机一般非常少

## circuit breaker （断路器）

- 不可中断搭配超时断路，组合成的就是一个非常有效的工具
- 如果特定时间完不成项目，也不会给扩展
- 
