---
title: 人工智能取代程序员？
date: 2017-10-09
---

> [原文](https://mp.weixin.qq.com/s/kvMZnPQiLWm2eBUOVCkOPQ)发表于 2017 年 10 月 09 日，“几米饭”（kimmyfun）公众号。

人工智能，或者说，机器学习；或者更进一步地，深度学习，是近两年火的不能再火的领域。似乎现在你做个啥软件不加入点智能化的东西总觉得哪儿有点不对劲的感觉。但是，任何技术越处在风口浪尖上，就越容易被偷换概念后拿来炒作。据说，在知乎，[机器学习都已经被标成了计算机四大俗](https://www.zhihu.com/question/38623027 "机器学习都已经被标成了计算机四大俗")。

## AI Programmer

今天我们要提的这个神奇的 AI programmer，也正是这个时代浪潮之巅的产物。
这来自于 arxiv 上的一篇 CS 论文：[AI Programmer: Autonomously Creating Software Programs Using Genetic Algorithms](https://arxiv.org/pdf/1709.05703.pdf "AI Programmer: Autonomously Creating Software Programs Using Genetic Algorithms")。文中讲述了一个利用机器学习来自动生成软件程序的系统，叫做 AI Programmer，这个 AI Programmer 的架构如下：

![AI Programmer 架构](https://imgkr.cn-bj.ufileos.com/df391574-bed8-48bf-9dfb-0aba0cb1dd65.jpeg)

乍一看真的好神奇，又是 GA（Genetic Algorithm，遗传算法），又是 Embedded Interpreter，看上去似乎结合了很多深层次的计算机科学的内容，然而当我们细看这套所谓的解释器的指令时，我是惊呆的：

![AI Programmer 指令集](https://imgkr.cn-bj.ufileos.com/a0df3d59-1715-4b81-8806-b5d7031daa37.jpeg)

这……不就是 [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck "Brainfuck")？（可以参考我之前的文章[三十分钟七语言](https://mp.weixin.qq.com/s/oQY9yB2zkS3TWWm9CWJ3eQ)，其中有对这个极简编程语言进行过介绍）。

也就是说这个神奇的 AI Programmer 就只是一个使用遗传算法来验证和改进 Brainfuck 程序的框架。这种硬扯也能跟机器学习的概念沾边东西，直接被炒成了“**AI 系统首次实现真正自主编程，完爆初级程序员**”。

![反正吹牛也不上税](https://imgkr.cn-bj.ufileos.com/711999d3-71aa-4305-8c24-9e71d8335d59.png)

这种通过遗传算法改进程序的方法早就已经存在并被应用，这篇论文里面也不过是把复杂的编程语言逻辑替换成简单的 Brainfuck，这样一步简化也只是增加了具体编程的难度（毕竟 Brainfuck 的局限性决定了完成复杂的任务需要的指令数会异常的多）。至于是否完爆初级程序员，很简单，拿大学本科 C 语言作业题来考一下它就知道了（逃…

## 自动编程之路

现在抛开这个炒概念的 AI Programmer，我们来看一下究竟人工智能实现自动编程有多困难。

首先，编程的基本元素和模式很简单，但是**组合结果却是无穷的**，而且关键是，实际的业务需求导致这个组合其实并不是确定和可靠的。比如，运营部门可能随时都会出现一些调整业务或者流程的需求。而对于这种特别考验程序灵活性的改动，自动编程并不一定能够胜任。换句话说，自动生成的程序的可维护性并不高，除非跟人工智能完全集成。

第二就是，实际业务需求中可能存在的**业务上下文信息会非常的丰富**，而且**有极强的领域性**。所以如果是人工智能来编程的话，需要有效地获取和掌握这些信息才行。一种方式是针对不同领域甚至是不同的业务开发不同的识别和获取业务信息的智能系统，**当然除非这些系统你也尝试来使用人工智能编程来实现（递归了）**；另外一种是提供额外的交互接口来让业务人员**提供这些信息给人工智能来作为输入**，这其实就是变相地做了一套通过 DSL 来生成产品代码的工具，不需要人工智能也可以实现。无论哪种方式，都会是一系列的额外工作。而且，按照[格林斯潘第十定律](https://mp.weixin.qq.com/s/pqkXYl2x5XJ4RLToABmUMg)，这个 DSL 就会变成另外一个编程语言，而所谓的人工智能编程，就沦落成了另外一个编译器。

第三，人工智能编程的**结果验证起来难度大**，除非有**非常详尽的用例**来对其功能进行**全面的覆盖**。特别是对于人机接口的测试，更是有无穷多种可能。当然，一个解决方案是，在生成业务代码的时候也顺便生成与之对应的测试/验证代码。

综上，即便是所有问题都得到了解决，一个人工智能的自动编程系统依然还是需要实现下面这些：

- **核心**：一个通用的编程逻辑生成系统，能够转换业务逻辑到程序逻辑，并且有一套通用的业务逻辑模型
- **输入采集**：一个能够识别并获取复杂业务逻辑并转换成内部模型的组件
- **验证工具**：能够（或者提供工具）生成并自动验证用例的组件

其实这三步对应的分别也就是**程序员**、**业务分析师**和**测试工程师**的工作内容。

按照现的发展情形来看，这三类人十年之内失业的可能性还是很低：每一个角色承担的都是具有创造力的工作而不是简单的机械性的重复，而且来自机器学习领域的模式识别能力还远不能达到自动识别这种复杂的情况。

> 题图：《图灵测试》游戏封面。