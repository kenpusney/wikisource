---
title: "JSONSpec: Build an enhanced service"
date: 2015-05-10
---

> 原文发布于 2015-05-10 我的Lofter：http://kimleo.lofter.com/post/46977_6e75c68

前面简单说了一下JSONSpec，主要是关于如何给一个JSON文档加上类型约束，和这样做的意义。

之后看到有人评论说，这跟JSON-Schema很像。

嘛，其实我在简略设计完JSONSpec之后就去网上找了找是否有类似或者同样的东西存在，就发现了JSON-Schema。但是简单做了一下对比发现，JSON-Schema并不是我所期待的那种。

 一方面它实在是过于庞大，甚至是臃肿，继承了XMLSchema的一切但又没有XMLSchema那种特殊的表现形式；另一方面，为了完整模仿XMLSchema，还额外定义了两个增加JSON格式负担的JSON-Reference和JSON-Pointer，更是失去了JSON本来相较于XML的优势。

 但是就像是我们预先期待的那样，JSONSpec要有一种描述服务或者是约束的能力。对数据的限定可以像前文中提到的type spec来加以限定，但是服务，或者是约束，或者是规范（Specification），并不只是特定数量type spec的集合。其中还要包含依赖、语义、以及整体暴露出去的接口等等。

 所以除了type spec之外我们还需要有对spec的spec。

示例如下：

```json
{
    "name": "JSONSpec",
    "version": "draft0",
    "base": "http://spec.kimleo.net/JSONSpec/draft0/",
    "published": [
        {
            "path": "/validate",
            "accept": "JSONSpec",
            "type": "ValidateResult"
        }
    ],
    "type": [
        {
            "name": "JSONSpec",
            "path": "/type/JSONSpec.type.json"
        },
        {
            "name": "ValidateResult",
            "base": "http://spec.kimleo.net/JSONSpec/draft0/common",
            "path": "/type/ValidateResult.type.json"
        }
    ], 
    ... ...
}
```

嗯，我们能从这里看到什么呢？

1. 当我去访问 http://spec.kimleo.net/JSONSpec/draft0/JSONSpec.spec.json 的时候，我们可以知道同时该网站提供一项验证服务：只要POST符合JSONSpec type spec规定的格式的文档到 http://spec.kimleo.net/JSONSpec/draft0/validate ，就会自动进行验证，同时返回给你验证结果（ValidateResult）。
2. JSONSpec validate服务有一项外部的type spec依赖，直接在ValidateResult中做了一个简单的声明，就可以重用该type spec了。
3. … …

 

published节中声明了所有的本spec暴露出来的接口，其中要符合的各项约束则来自type节中的规定。两者相互关联，就能够提供更加完善的约束和语义，许多可能会遇到的问题也迎刃而解。

待续。
