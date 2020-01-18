# actix-web 已死，unsafe 永生。

> 以下内容是我个人观点，与任何企业/组织无关。转载需经过我许可。

今天的热文是 Steve Klabnik 的 [A sad day for Rust](https://words.steveklabnik.com/a-sad-day-for-rust "A sad day for Rust")。

第一句话就是，“actix-web is dead”。

## actix-web 是什么

actix-web 是 Rust 社区的一个基于 actor 的 web 框架。也是前段时间 TechEmpower Web 框架的跑分冠军。作者是 Nikolay Kim，微软员工。actix 也是其个人在业余时间主要维护的一套框架，作为一个开源项目托管在 GitHub 上。

## 发生了什么事

这得从 Rust 这个编程语言说起。

Rust 解决的头等大事是 safety。通过强类型、ownership 和 lifetime 这套机制把内存安全、线程安全和类型安全都紧紧地把握住。但这样做的一个非常严重的问题，由于 onwership 和 lifetime 强检查的存在，不能轻松实现大部分数据结构，这个时候只能靠编译器开洞来解决。

## unsafe

这个开洞方式就是 [unsafe](https://doc.rust-lang.org/nomicon/index.html "unsafe")。

这个来自于 C#等前辈们的关键字，专门用于绕开编译器的一些强检查，让开发者能够做一些可控范围外的操作，比如使用裸指针。这样就能在 unsafe 块里开心地实现原来各种限制情况下做不到的事情了。Rust 标准库里的一部分代码也是 unsafe 包裹起来的，因为只有这样才能和 ffi 交互、实现一些链式结构或者是达到某些特殊的目的。

这里其实是有一个设计上的问题，就是开洞之后这个权限放开了，后面的事情就不可控了。在有规则限制的情况下，所有的操作都会通过强行编译错误来决绝一些不合规的代码，但 unsafe 里面就做不到了。

于是 Rust Reference 文档里面提及了一些[未定义行为](https://doc.rust-lang.org/reference/behavior-considered-undefined.html "未定义行为")（undefined/unspecified behaviour，UB），并且特别提醒**建议**不要这样做。但他们也只能做到“建议”，没办法做更强的约束。

## unsafe PTSD

Rust 社区有这么一群人，Rust China Community 群主 Chaos 称他们是 unsafe PTSD（创伤后应激障碍）。这群人在各种开源项目里寻找 unsafe 的存在，然后去建议把这部分内容给改掉，因为，unsafe 可能会导致 UB。

Nikolay Kim 就是这个行为的受害者。

## actix-web 之死

具体的事情详情可以看 Steve 的文章，总之在长达一年多的 unsafe PTSD 的迫害以后，Nikolay 彻底放弃了。原因在于，Nikolay 已经把一些致命的 unsafe 代码给修复了；而这些人依然再挑 unsafe 的用法的坑，要么是不配合复现或者修复，要么是即便是这些人把 unsafe 的代码替换成了“safe”的版本，实际也是在做一些“无聊的”（Nikolay 原话）事情，并且在我看来还有种碰瓷热门框架的嫌疑。

然后很简单，爷不陪你们玩了。Nikolay 在 [actix-web](https://github.com/actix/actix-web "actix-web") 的仓库 README 写了篇长文，表示了下对开源社区的失望，随即把 actix-web 转移成为了个人仓库。

然后 Steve 写出了 A sad day for Rust。

## 再谈 unsafe

前面提到过了，unsafe 这个东西的存在，对于 Rust 语言和社区来说，就是个不可控的东西。作为一个 feature，既然已经发布出来了，社区就应该接受所有因为它产生的所有结果。因为必然会有人错用和乱用。而同样地来把一个 feature 引发的“建议”作为几乎道德标准一样来要求开源软件开发者的 unsafe 警察们无处不在地挑剔别人的问题，也是个错误的表现。

对于这一点，每一个开源软件/社区都有自己的公约，actix 作为一个追求极致性能的开源框架，已经不再存在滥用 unsafe 的行为了，而且也有自己的[行为准则（Code of Conduct）](https://actix.rs/community/coc/ "行为准则（Code of Conduct）")，而这群人在反复之下根本都不去理会作为一个开源贡献者的 Nikolay 自己在这件事情上的付出，直接通过贴标签等方式去诋毁，其实对整个 Rust 社区/生态的强破坏。

当然你可以这么说，在 Rust 社区，safe 就是政治正确，反过来 unsafe 就是政治不正确。但这种公共的约定作为行为或者道德规范是没有效果的，毕竟编程语言是通过编译器的约束规则来做限制，这才是唯一的 law。

## 解决

社区也在探讨这个问题的解决方案。一方面 unsafe 作为一个已发布的 feature，是很难再去掉的，另外一方面，unsafe 还是在持续地带来更多的不可控代码，除非社区对这个转变成 open 的态度（像其他 unsafe 语言一样），否则只能是靠更强的约束来限制。

Chaos 老师的一个提议是把 unsafe 关键字换个名字，比如叫 trust_me，这样就能让这些写 unsafe 代码的人背上人性的考验：毕竟如果真的出来 segment fault 了，那就是信誉问题了。甚至还给出了快捷解决方案：

我觉得其实没必要搞那么麻烦，这种事情无非是 unsafe 警察们希望能够通过约束来做权力寻租，那给他们这个权限就好了。Rust 编译器在遇到 unsafe 的代码之后，检测本地是否装有 Rust 社区颁发的允许使用 unsafe 的证书，这个证书只有被授权的人才能使用，否则编译器直接报错，insufficient privilege。

想 unsafe 的人申请证书通过认证就好，真的出错了也是颁发认证的人去背这个责任。

以上。
