今天一早就看到 GitHub 收购 NPM 的新闻，也恭喜微软把前端的一大主要的工具链成功地集成到了自己的麾下。现在微软的前端生态上，**编辑器**有 VSCode，**代码托管**有 GitHub，**包管理**有 NPM，**编译工具链**有 TypeScript。当然还有本身来自微软自己的一些东西，像 Node-ChakraCore 和 FarbricUI 等，终于成了前端大厂。

然后群里就聊起来说，TypeScript 到底有什么用？很多时候框架层的类型标注非常复杂，会给开发者带来一些不必要的负担，并且因为 TS 只是进行编译过程，很难解决前后端通信的时候进行的 contract validation。那这个时候，作为研发团队为什么要引入 TypeScript 呢？

## TypeScript 能干什么

在这之前我们先看一下 TypeScript 能干什么。

以下面这段代码为基础，我们定义了 4 个函数。除了仅有的两个参数标记了类型之外，其他跟 JavaScript 的函数定义完全一致。

```typescript
function fnRetrunsString() { return "hello"; }

function fnDoesNothing() {}

function fnAcceptsNumberReturnsEitherNumberOrString(s: number) {
    if (s > 0) {
        return s;
    }
    return fnRetrunsString();
}

function fnTakesString(s: string) {
    return s;
}
```

然后我们尝试用 TypeScript 编译器（`tsc`）编译下面这段代码：

```typescript
fnTakesString(fnRetrunsString());
fnTakesString(fnDoesNothing());
fnTakesString(fnAcceptsNumberReturnsEitherNumberOrString(-1));
```

各位可以简单动手试一下，或者细想一下会发生的事情再继续阅读。这里到底 TypeScript 到底会对这段代码怎么处理，又回报什么错误。

我们插个话题，渐进式类型（Gradual Typing）。

### 渐进式类型 Gradual Typing

熟悉 JavaScript 的朋友肯定知道动态类型这个概念。**类型就是解析对象方式的标签**，比如 number 类型，则说明这个对象是一个数字，string 类型，则说明这个对象是一个字符串。在 JavaScript 等之类的语言中，变量的类型是可变的，这一特性可以使得 JavaScript 在作为一种脚本语言的情况下更灵活的适用各种场景。比如我有一个数组，那这个数组里可以随意地塞数字（number）或者字符串（string）或者甚至是嵌套无限层的数组和对象。

但这样通常会出现一些问题，比如当我们明确想要知道某些数据的类型的时候，就必须进行运行时的判断，于是 JavaScript 就提供了`typeof`和`instanceof`两个运算符，来帮我们做这些事情。

然后问题就来了，你可能经常会看到代码里出现这些神奇的操作：

```javascript
function doSomethingBasedOnTypeOfParam(param) {
    if (param === null || param === undefined) {
        // ...
    }

    if (typeof param === "number") {
        // ...
    }

    if (typeof param === "string") {
        // ...
    }

    if (param.hasOwnProperty("foo")) {
        // ...
    }

    // more IFs ...
}
```

因为 JavaScript 是动态类型语言，我们没办法在写代码的时候就知道参数`param`的值，于是只好写大量的**守卫（guard）代码**来对类型进行判断和检查。而往往这个时候就非常需要一个特性，让这个编程语言能够给你在这一部分做个限制。

比如同样的场景放在 Java 里面，就会是这样子的：

```java
void doSomethingBasedOnTypeOfParam(String param) {
    // do with string
}
```

同样的调用代码`doSomethingBasedOnTypeOfParam(0)`，在 Java 里面就会造成**编译错误**。

这就是静态类型存在的场景。这样做的好处是提前暴露调用方的错误操作，并且减轻接口提供方的负担。在这种情况下约定的接口保持一致，就不会破坏整个前后协作上的一致性。做到了这种程度，我们就可以说这样的程序是**类型安全**的（type safe）。

静态类型语言就会有一个这种**类型安全检查**（type checking）的过程，确保程序中所有的代码复合类型安全性要求。但是这个过程都是在编译时完成的，没办法做到运行时的保障。换句话说当你尝试绕过静态类型检查，在运行时取到函数入口，随便塞些什么作为参数调用的时候，该出错的还是会出错；或者适用类型降级的方式，比如参数入口用`Map<String, Object>`，给自己制造麻烦。

什么是渐进式类型呢，通常是这两种原因产生的：1. 动态类型语言，希望加入前面的静态类型检查机制，来提升类型安全性，比如 TypeScript；2. 静态类型语言，希望加入动态类型来提升代码的表达力和灵活性，比如 C#。（*咋都跟 Anders Hejlsberg 有关系*）

先说后者，其实问题还没那么严重，因为通常的实现都是在原本运行时之上再加一个动态运行时（比如 DLR），而本身的静态类型部分的安全性，还是有强保障。但对于动态类型语言加上静态类型检查的做法，这一点就很难处理了。原因很简单，这种安全检查只能加在编译期，运行时还依然是原本裸奔的状态。

### TypeScript 的尴尬

TypeScript 就处在这么一个尴尬的位置上。

JavaScript 语言的动态性不只是类型可以随时变。对象模型也是在运行期可以进行各种操作的，反正拿到构造器的 `prototype` 往上面加方法就好了。这个时候 TypeScript 完全就成了鸡肋一样的存在。举个例子：

```javascript
function BaseObject() {
}

BaseObject.prototype.defineMethod = function(name, fn) {
    BaseObject.prototype[name] = fn;
};
```

你永远都不知道 `BaseObject` 的对象会在运行时多出什么诡异的方法来，而这也正是很多基础框架会做的事情：读到一些模版或者配置，编译处理之后在 JavaScript 运行时生成一些对象。这个时候只能靠框架设计者自觉地提供合理靠谱的`.d.ts`来确保类型检查了。

但撇开这些坑人的框架，剩下的部分 TypeScript 可以充分胜任。

### 类型检查和推导

我们回到前面提到的三行代码：

```typescript
fnTakesString(fnRetrunsString());
fnTakesString(fnDoesNothing());
fnTakesString(fnAcceptsNumberReturnsEitherNumberOrString(-1));
```

- 第一行是类型安全的，TypeScript 也不会向你抱怨什么。
- 第二行就开始出问题了：`void`不是`string`。
- 第三行也是有问题的：`string | number`不是`string`。

这里除了 fnTakesString 中参数类型之外，我们是没有额外标注诸如`void`或者`string | number`这样的信息的。能够正确得出这样的信息，就是因为 TypeScript 对整个代码进行类型检查的过程中，还对未知类型的部分做了推导。

最开始的这四个函数定义中，TypeScript 分别能推导出来的类型是：

```typescript
function fnRetrunsString(): string
function fnDoesNothing(): void
function fnAcceptsNumberReturnsEitherNumberOrString(s: number): string | number
function fnTakesString(s: string): string
```

这四个类型签名基本上跟代码和我们希望表达的逻辑是一致的。

而如果你尝试把 `fnDoesNothing` 的定义修改成：

```typescript
function fnDoesNothing(): any {}
```

会发现`fnTakesString(fnDoesNothing())`的错误提示不存在了。这个操作就是在错误的引导 TypeScript 的类型检查，因为 any 就是来摆脱强制类型检查用的，加上了 any 反倒是回产生错误的结果。

那假设你真的需要一个通用类型，又不想破坏调用方的类型契约。使用并类型（即前面出现的`string | number`或者会参与强制检查的`Object`类型会更好。

这个例子中，对于 `fnDoesNothing`，就可以变为：

```typescript
// void 表示函数没有返回值
function fnDoesNothing(): Object | void {}

// 也可以选择对这个类型做一个alias
type SafeAny = Object | void;
```

于是`fnTakesString(fnDoesNothing())`调用中的错误提示又回来了。

### TypeScript 不能干什么

前面已经说了，TypeScript 只能用于编译时的类型检查，所有超越了编译时的过程都很难通过 TypeScript 来做限制了。

比如前面说起过的，前后端数据通信的验证。拿到后端的数据肯定都是在运行时了，这个过程早就不再是 TypeScript 参与的阶段，而拿到的数据是 JSON 或者其他的序列化结构，也并非常规的 JavaScript 对象。

这个时候一些做法可能是通过 JavaScript 的**装饰器**（decorator）配合`reflect-metadata`这样的库生成出来运行时可用的信息作为程序的一部分，然后配合做处理（我参与过的 TypeGraphQL 这个框架就采用了这种方式）。另外的做法是引入一些**运行时的类型检查**库来做验证。

我在去年也专门针对这种类型特点的数据设计过一个非常简单的**类型系统**[infer](http://kimleo.net/infer/ " infer")，同时提供了 Java 和 JavaScript 实现来做对运行时无模式的数据进行检查和验证：

```javascript
const { Schema, Union } = require("infer-schema");

// 定义类型模式
const Phone = new Schema({
    areaCode: String,
    number: String,
    extension: String,
});

const Name  = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
});

const Contact = new Schema({
    emails: [ { tag: String, email: String } ],
    phones: [ { tag: String, phone: new Union(String, Phone) } ],
});

const Party = new Schema({
    nickname: String,
    names: {
        legal: Name,
        prefered: Name,
        foreign: [ { tag: String, name: Name } ],
    },
    contact: Contact,
    tags: [String],
    extensions: Object,
});

// 验证数据对象
Party.validate(party);

// 生成示例数据
Party.declval();
```

## TypeScript 最佳实践

很明显即便是静态类型检查，TypeScript 也还是能阻止很多愚蠢的错误的。所以如果团队成员能够广泛接受静态类型所带来的思维转变，引入 TypeScript 是一个百利无一害的事情。这里就针对本文讨论的一些话题，聊一聊 TypeScript 的最佳实践。

### 不要使用 any

**永远记住这一条**。有太多血淋淋的教训都是因为使用了 any 导致整个 TypeScript 类型检查都没了存在的意义。

这样既破坏了 TypeScript 检查的正确性，延后了问题出现的时机，也降低了整个系统的类型准确度和完整度，破坏性非常强。

在团队整体约定好的情况下，你可以参考前面我给出的`SafeAny`的方案。

### 尽可能多利用 TypeScript 的类型推导

通过工具来给出一个自然的类型结果。这样其实有一个好处是能够引导你写出来更简洁直观逻辑，和相容性比较一致的数据结构：TypeScript 推导出的类型也是要满足 KISS 和单一职责原则的，否则这直接说明你代码本身就过度复杂了。

### 使用 `type alias` 和 `interface` 定义更表意的领域类型

上面的 SafeAny 就是一个例子。在类型标注需要稍微复杂的情况下，仔细考虑这个对象其具备的价值，给出一个表意性强的类型名，比代码中飘着各种基本类型和复合类型要好得多。

另外 type alias 还有一个好处，就是可以把重复的内容抽取到一起，方便改动或者重构。

### 避免过度的动态操作

TypeScript 提供了对动态语言特性的一些支持，但这仍然不能满足现有 JavaScript 的动态性（前文`BaseObject`的例子）。所以如果涉及到太多动态的操作和现有 TypeScript 的类型系统难以兼容，尽可能避免出现在业务代码中。

如果真的有这个需要，把他们封装起来作为库来提供，并给出满足类型安全性要求的`.d.ts`声明文件，比直接暴露在原始代码库牺牲整体的类型安全性，要稳妥一些。

## 结论

TypeScript 作为给 JavaScript 引入 Gradual Typing 的一个方案，整体的完备性已经非常好了。在团队能力达标的情况下非常值得引入使用。只是运行时的一些操作仍然需要注意多利用社区的生态来完善。

我个人是强烈支持静态类型的，如果你有看过[之前的文章](https://mp.weixin.qq.com/s/E2rfuPvIpUTP2qOHNS40-w)也知道我的态度。无论什么时候，我们都应当追求增强系统整体的安全性，以及让机器（编译器）来代替人工做事情。静态类型检查恰好能满足这一切，不香吗？
