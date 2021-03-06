---
title: 函数式编程、服务端组件与 Service Builder
date: 2019-12-01
---

Service Builder 这个概念已经构思了大半年，一直都没机会来实验。今天看到前同事杨云的[类型流方法论](https://zhuanlan.zhihu.com/p/94522501)（TypeFlow），感觉遇到了一个非常合适的构建工具。也把我这边的思路整理出来分享给大家。

## 函数

先说这个广义的抽象，基本上驱动了数学和计算机的很大的发展。函数的的模型非常简单，接受输入，产生输出，同时中间执行一些业务逻辑。

```
(input) => output
```

这里的输入，包括且不限于请求/输入参数、文件和数据库读入、触发器或者监听器产生的事件等等。

输出也一样，到其他函数的调用、文件或者数据库的写入请求、转发事件通知等。

这样几乎所有的逻辑都可以归于一个直观的函数，输入 A，调用 X、Y、Z，输出 B。当然，[TypeFlow](https://github.com/notyy/TypeFlow)里面的函数相对更纯一些，没办法控制是否调用其他函数的，只能输入 -> 输出，分发的过程有专门的 dispatch。

## 函数式编程

有了上面个灵活的抽象，我们就能拿来做一些别的事情了。

首先要从 FP 领域借过来的一个概念是组合。当然，组合之前我们要先有个意识，就是每个函数都是加了类型的：

```
fn1: (input: I) => O
fn2: (input: O) => U

fn2(fn1())
```

这样自由组合（也不算太自由，毕竟有类型约束）就能够让我们通过有限的原子函数完成更丰富的功能。

## 服务端组件

这里衍生出来的概念就是“服务端组件”，可能是一个 serverless 的函数，也可能是一个常驻在后端服务器中的 service，但只要能够前面我们提到的要求：有输入输出、类型化、可组合，那就能够拿来作为一个组件来用了。

这里的组件与前端组件化的概念类似，可以是一个纯粹只对数据做处理然后输出的基本组件（比如加密），也可以是包含了业务逻辑能够实现特定功能（比如支付）的业务组件。

这样一个具体的前端业务流程就可以用这些基础组件和业务组件的组合来完成，而这些组件和组合过程其实就是所谓的“中台”要提供的基本功能和能力。

## Service Builder

这样我们来回顾审视下这种条件下的前台产品实现过程：

1. 设计 Schema
2. 链接输入、输出、数据源
3. 设计处理管线
4. 扩展 schema，回到 1

Service Builder 就是需要提供这部分能力的一套必要框架，大概是我期待能够实现的目标。在我的 Wiki 文章Rethink JSONSpec[3]里也提到了如果实现一个 Service Builder 需要哪些必须的功能：

> 一个自动建模的工具、一个管理和动态配接管线的框架以及一个验证工具

杨云老师的 TypeFlow 是一个非常棒的工具，而且沿袭自 FP 社区的这套建模方法和理论也解决了很大一部分的问题，特别是对于前面提到的必要功能都提供有专门的方法论和解释。比如如何基于业务场景建模：

- 找出每个业务流程的输入输出
- 剥离纯函数和副作用

我也简单尝试用这个思路来整理了下一些业务流程，感觉整个进行下来的结果就是我前面提到的服务端组件组合的样子。

## 结论

Service Builder 的概念源自于前同事吕靖的前端构建工具，整体的思路也是在尝试对后端的业务流和构建方式进行一个函数式方向的简化和重组。杨云老师 TypeFlow 提供了一套建模思路和工具，能够有效地利用函数式 + serverless 来更好地进行后端开发。这篇文章串起两部分来也希望是能够给大家提供一个新的设计和构建思路。
