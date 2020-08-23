---
title: BS C++ 论文笔记
draft: true
date: 2020-08-02
---

## HOPL 4


### 背景：C with Classes

选择C语言，因为足够好并且有良好的支持：因为DMR和Brain Kernighan的办公室跟BS在同一走廊。

C with Classes：最先加入的是构造器(new function)和析构器(delete function)。这也是C++至今都非常重要而且具有特色的一个功能（real heart of C++）。

C++引导加入了函数参数类型检测，同时被C吸收，成为了“函数原型”。

K&R为C++贡献了很多，同时BS也觉得自己给C贡献了很多。（函数定义、函数原型、const、单行注释）。


Object-orieted hype：
C++从来没有声称过是一门面向对象的语言（但当年的新编程语言都说自己是“纯面向对象”）。

按照BS所认为的标准表述：“C++是一门偏向系统编程的通用编程语言（general-purpose programming language），它：

- 是一个更好的C
- 支持数据抽象
- 支持面向对象编程
- 支持泛型编程”

这依然是最准确的对C++的描述。当然相对“Everything is an object”来说，没那么吸引人。


### 第二个十年

主要是朝着工程化和标准化挺进：

#### 语言特性

- 模板
- 异常
- RTTI：dynamic_cast和typeid
- namespace
- named cast
- bool

当然最重要的是RAII。

#### 标准库

- STL
- 特性（Traits）
- 字符串
- iostream 流
- bitset
- locale 本地化支持
- valarray
- auto_ptr 智能指针

其中最重要的是基于Alexander Stepanov的标准模板库STL，以至于让C++在很长一段时间里都是泛型编程的标杆。

### 2006

HOPL 2006的39个proposal（为了接下来的C++0x，后来成为了C++11）：
 - 前25个，有24个进入了C++11
 - 26-39没有一个进入了C++17
 - 第10个proposal "Concept"最后进入了C++20

HOPL 2006 Proposal 列表：

01. decltype & auto type deduction from expressions
02. Template alias
03. Extern template
04. Move semantics
05. Static assertion
06. long long & other C99 features
07. `>>` without space to terminate 2 template specializations
08. Unicode data type
09. Variadic templates
10. Concepts
11. Generalized constant expression
12. Initializer lists as expressions
13. Scoped and strongly typed enumerations
14. Control of alignment
15. nullptr
16. Range based `for` statement
17. Deletating constructors
18. Inherited constructors
19. Atomic operations
20. Thread-local storage
21. Defaulting and inhibiting common operations
22. Lambda functions
23. Programmer-controlled garbage collection
24. In-class member intializers
25. Allow local classes as template parameters
26. Modules
27. Dynamic library support
28. Integer sub-ranges
29. Multi-methods
30. Class namespaces
31. Continuations
32. Contract programming
33. User-defined operator dot
34. switch on string
35. Simple compile-time reflection
36. #nomacro
37. GUI support (e.g. slot & signals)
38. Relfection
39. Concurrency primitives in the language (not in a library)

#### 已经进入了讨论是否要抛弃C++的阶段

原因：现代编程语言都是由一家控制并维护，C++仍处于传统的多个supplier维护，脱离于具体依赖的操作系统。

例子：
- Apple - Swift
- Facebook - Hack
- Google - Golang
- Microsoft - C#
- Mozilla - Rust

但C++：标准来自ISO、实现来自某几个vendor、各家有自己的扩展甚至是另外一种方言（C++/CLI、Objective C++）来配合自身的应用开发接口。

C++开始被其它语言超越：

- 应用编程平台逐渐脱离C++接口（Android：Java、Windows：C#）
- ABI不够稳定，导致C++作为公共编程语言不能比较好的提供稳定且灵活的接口，并且跨平台部署困难
- 因为其他“易用性更强”的语言（比如Java）针对性的宣传：
  - 通常会宣传Java GC对比C++的手动内存管理，却对RAII只字不提

#### 希望：Boost

Boost一定程度上推进了C++的进化，非常像是C++的一个标准试验田。

- regex
- thread
- shared_ptr
- variant
- file system

### 相互影响

借鉴自其他编程语言的概念：

- auto
- tuple
- regex
- Functional Programming
- future / propmise
- Range-for
- variant / any / optional
- final & override
- Three-way comparison
- await

影响了其他编程语言的概念：

- Generics：C#、Java
- Dispose：C#、Python、Java
- Compile time evaluation：D
- Lifetime based on Ctors & Dtors：Rust（但比较逗的是现在很多人觉得C++借鉴了Rust这个概念）
- 对C的反哺

### C++11：感觉就是个新语言

语言特性：

- 内存模型
- auto / decltype
- range-for
- move semantics and rvalue reference
- uniform initialization
- nullptr
- constexpr functions
- user-defined literals
- raw string literals
- attributes
- lambdas
- varidic templates
- template aliases
- noexcept
- override and final
- static_assert
- long long
- default member initializers

库：

- unique_ptr and shared_ptr
- memory model and atomic variables
- thread, mutex, condition_variables
- future, promise and packaged_task
- tuple
- type traits
- regular expression matching
- random numbers
- time
- unordered_map
- forward_list
- array
- emplace operations
- exception_ptr

总体成功的点：

- 支持并发
- 简化使用
- 提升对泛型编程的支持
- 提升静态类型安全性
- 支持更方便地构建库
- 提供一些方便的标准库组件

### C++14：完善C++11

- 二进制字面量和数值分隔符
- 变量模板
- 函数返回类型推导
- Generic lambda
- constexpr函数中的局部变量
- lambda中move捕获
- 通过类型取tuple的元素
- 标准库提供预定义的用户自定义字面量

### Concepts

#### 史前时代

C++模板设计的时候主要希望实现泛型编程，并且具备以下特性：

- 完整的通用性和表达能力
- 对比手工编写的代码，要zero overhead
- 要有良好的规范接口

但是在实现过程中，很难同时达到三个点，所以只有：

- 图灵完备的模板
- 比手写稍微好的性能
- 糟糕的接口（编译时鸭子类型），但基本能保证静态类型安全

前两点确保了C++模板的成功，但因为接口约束的问题，以至于直到C++17，模板的错误信息依然几乎不可读。所以BS在很早就在考虑如何设计模板约束。

Concepts来自Alex Stepanov在70年代后期的“Algebric structures”（"代数结构"），大概比Haskell的type class还要早了10年。90年代的时候Alex开始使用“concept”这个名字。

早期的Concepts现在看起来问题挺多，但大致上提供了一些现有Concepts的雏形：

- 提出了Concepts的概念
- 以用例的方式来提供基础的约束
- 提供了多参数concepts
- 值和类型都可以作为concepts的参数
- 提供了更简短的表述方式（作为模板参数或者函数类型约束）
- 使用auto作为最基本的约束类型
- 提供了统一函数调用（uniform function call）的支持

#### C++0x Concepts

C++0x的Concepts来自于不同两拨人达成一致后的设计成果：一波是“印第安纳派”，Andrew Lumsdaine和Dogulas Gregor，其想法是把concept作为建模工具；一波是“德克萨斯派”，Bjarne Stroustrup和Gabriel Dos Reis，想法是把concept作为类型约束。

这两者思路合并以后也就成了后面的一系列问题。

C++0x的定义非常像一个类结构。使用起来比较简单，把Concept作为模板的约束（类似C#的where，后改成requires）或者作为模板参数的约束。

同时C++0x的concept加入了定义检查，如果在被约束的类型中使用了未在concept中声明的操作，将会导致编译错误。而混用未加约束的代码更容易带来这个问题，于是加入了late_check块来避免。

但是对于concept和类型的关系，需要用concept_map来显式实例化。（这就是“建模”方面的倾向）。经过这样的显式实例化以后，可以非侵入式地给一个自定义类型添加操作。

但是如果作为约束的话，这样就很麻烦了，每个类型都要进行concept_map一下，而如果这个concept并没有添加新的功能，这样的动作就显得很多余。于是德克萨斯派提供了一套隐式concept_map的做法，即在concept定义的时候添加一个auto关键字，会自动对对应需要约束的类型自动作concept_map。

于是关于显式或者隐式这个观点，就成了一个争议点，一直都没能达成统一。

另外除了concept_map外，C++0x的Concepts作为一个大而全的设计，还加入了late_check、axiom等额外的功能。但这样一来，不止整个Concepts变得越来越复杂，相对于未加concept约束的代码，编译时间远超了很多倍。

加上因为混合concept_map、late_check和约束/非约束代码的混合带来的整体混乱，以及“建模”概念对于大部分程序员“可能”的“不友好”，委员会决定把concept移出C++0x。

#### Concepts TS

C++0x Concepts得出的设计结论：
  - Concepts必须具备语义
  - Concepts的数量相对应该较少
  - Concepts应该基础的，而不是极小的

Alex Stepanov在2011年拉了个会讨论新的Concepts，主要的关注点是，以使用者的角度设计一套STL泛型算法的约束。这个角度比C++0x的方向要直接得多，直接结果就是2016年的Concepts TS和C++20 concepts，并且这套设计从2012年就由Andrew Sutton实现并一直随着GCC 6.0发布验证。

Concepts TS的主要关注点是：

- Concepts基于编译时断言
- 以用例的形式指定基础约束
- concept可以被用在requires中、替换typename或者替换函数的类型名
- 隐式匹配被约束的类型（没有concept_map）
- 用于重载的concept之间的关系也是隐式的
- 没有定义检查（至少目前来说，没有late_check）
- 没有axiom，至少在当前不设计

#### C++20 Concepts

C++20的主要变动就是Concepts使用的时候的表示法，以某种形式增强了Concepts TS的语法，来避免可能存在的歧义。

### C++17

语言特性：

- Constructor template argument deduction(CTAD)
- Deduction guide
- Structured biding
- inline variables
- Fold expressions
- Explicit test in conditions
- Guaranteed copy elision
- Stricter expression evaluation order
- auto as a template arugment type
- Standard attributes to catch common mistakes
- Hexadecimal folating-point literals
- Constant expression if

库：

- optional, variant, any
- shared_mutex, shared_lock
- parallel STL
- file system
- string_view
- Mathematical special functions

其中有部分非常希望进入C++17但没有的特性：

- Concepts
- Networking library
- Operator dot
- Uniform Function Call
- Default comparison operators
- Coroutines

