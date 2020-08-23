---
title: C++20：从一个 Proposal 列表说起
date: 2020-08-02
---

> 连续鸽了 4 个月。一方面是因为没有大纲，并且需要准备特别多的辅助信息，导致这个系列非常难准备；另外一个原因就是 6 月份的时候 BS 的论文终于出来了，一直在苦读看能不能从他老人家那里拿点什么。
>
> 在交叉参考了 BS 的几篇论文以后，大致上才有一个大致的内容框架。
>
> 这是本系列的第二篇，我们还是得回头看，C++20 之前，到底是什么样子的。

上一次 HOPL 已经是 2006 年的事情了，如同前文所说，BS 也参与了这场会议，总结了一下 C++98 和即将到来的 C++0x，并且在那场会议上，给大家画了一个大饼。

这个大饼是怎么来的呢，？知道 2006 年的时候，已经有人开始讨论要不要放弃 C++ 了（[<del>最近几年以刘雨培为代表的东半球 C++ 专家们也讨论过类似的话题</del>](https://www.zhihu.com/answer/239870475 "放弃C++")）。

原因是，作为一门传统的编程语言，C++在很多方面力有不逮，大部分应用平台已经不再采用 C++ 作为主力的编程语言，而是跟其他编程语言一样，共同享有标准的应用编程接口。微软有 C#、苹果有 Objective-C，甚至就算是用了 C++，两家都还混合了自己的私货，造了 C++/CLI 和 Objective-C++。

另外的原因也有，比如 **ABI 不稳定**，以及像 Java 等应用编程语言**针对性的宣传**，和大学的**误导性教育**等，都使得 C++ 逐渐成为那个被人嫌弃的对象。

> 一些误导性的观点集中于 Java 的自动内存管理（垃圾回收）机制，把 C++ 宣传成一个手动管理资源的编程语言，故意撇开 RAII 这点不谈。但像 Java 这种最后还是加入了 try-with-resources 这种类似的机制。

已经到了突破和发力的时候了。

在 2006 年 HOPL 3 的 paper 里，BS 给了一个长达 39 项列表，这些都是后来要加到 C++0x（原计划 07）的。

然后从 07 变成了 08、09，逐渐变成了 1x，到 2011 年才发布 C++11。在这个 39 项的列表里面，只有 24 项成功地进入到了 2011，剩下的那些，直到 C++20 才勉强加进去了几个。

所以从那以来的很长一段时间，整个 C++ 标准委员会就是在围绕着**实现这个列表画的饼**和**给标准打补丁**这两件事儿转。当然也有些不嫌事儿多的人在继续画饼。

列表详细内容如下：

> 1.  `decltype` & `auto` type deduction from expressions
> 2.  Template alias
> 3.  Extern template
> 4.  Move semantics
> 5.  Static assertion
> 6.  `long long` & other C99 features
> 7.  `>>` without space to terminate 2 template specializations
> 8.  Unicode data type
> 9.  Variadic templates
> 10. Concepts
> 11. Generalized constant expression
> 12. Initializer lists as expressions
> 13. Scoped and strongly typed enumerations
> 14. Control of alignment
> 15. `nullptr`
> 16. Range based `for` statement
> 17. Deletating constructors
> 18. Inherited constructors
> 19. Atomic operations
> 20. Thread-local storage
> 21. Defaulting and inhibiting common operations
> 22. Lambda functions
> 23. Programmer-controlled garbage collection
> 24. In-class member intializers
> 25. Allow local classes as template parameters
> 26. Modules
> 27. Dynamic library support
> 28. Integer sub-ranges
> 29. Multi-methods
> 30. Class namespaces
> 31. Continuations
> 32. Contract programming
> 33. User-defined `operator dot`
> 34. `switch` on `string`
> 35. Simple compile-time reflection
> 36. `#nomacro`
> 37. GUI support (e.g. slot & signals)
> 38. Relfection
> 39. Concurrency primitives in the language (not in a library)

可以看到，C++20 的三个大特性（Concept、Module、Coroutine），有两个是在里面的。而 Coroutine 也可以看成某种简化了之后的 Continuation（第 31 项）。其余的特性和改进，多多少少也都与前 25 项（除了第 10 项 concept 以外都已经合并进了 C++11）有关。

---

其实十几年来 C++ 的进步也算比较快，虽然并没有按照 BS 的希望一步达成所有的结果，但在明显处于弱势的情况下保持领先，还是非常好的。

对比一些现代编程语言来说，C++ 这种由标准委员会控制语言特性，由特定的供应商开发实现的情况，某种程度上会影响编程语言的演进效率。像 Golang、Rust、Swift 等，其新特性设计和开发都对应的同一个实际控制者，所以表现的能更现代一些。当然问题也同样有：要么没有标注委员会这种综合照顾每一方的角色，会过度随意；要么没有精细考虑特性设计、过度主观，会逐步暴露问题难以进展；要么就形成一个极度偏执目无一切的社区。

纵观整个 C++0x 到 C++20 的演进过程，Concepts 是贯穿其中的非常重要的一条线。在 2009 年甚至已经合并进了标准文本中，最后又不得不删除改进成了 Concepts TS，然后在 C++20 再度合并进标准。我们接下来要聊，自然就是这部分内容。

（待续）
