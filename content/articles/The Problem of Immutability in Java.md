---
title: Java 中的不可变性问题
draft: true
---
# The Problem of Immutability in Java

# 

> 原文作者 Bartłomiej Mazur，Allegro Tech 后端工程师

As a developer interested in both web technologies and game development I always found myself disagreeing with a large part of articles about using a particular technology to solve some problems. While such articles are often true, they often skip some important details that make given solution unacceptable in some other cases. And in this article I will try to look at immutability in a negative way from game development perspective and how it can affect web services too. It is always more fun to look in a negative way at something everyone loves ;)

作为一个同时对Web技术和游戏开发都深有兴趣的开发者，我发现自己总是不赞同一大部分的使用特定技术解决某些问题的文章。尽管这些文章大部分时候是正确的，他们通常会略过很多细节，而这些细节在某些场景下会让文章中给出的方案无效。这篇文章我尝试从一个消极的方式从游戏开发和Web服务开发的角度来探讨一下“不可变性”。以消极的方式去解读大家都喜欢的东西，总是能带来更多乐趣。

So what are these problems:

- how hard it is to use immutable pattern correctly in Java compared to other languages
- impact on the performance in Java, and how other languages deal with it

这是我准备在本文探讨的问题：

- 与其他编程语言相比，在Java中正确地使用不可变模式有多困难
- 不可变性对Java性能造成的影响，以及其他编程语言是怎么解决它的

While I can’t really propose any good solution for these problems I hope I will be able to show you that while immutability is a great tool, not all languages are fully ready to utilize all benefits, and in some cases immutability might even cause some issues. My motivation for this article is the huge amount of articles recommending immutability for every problem without analysing how it can actually affect your application in some cases.

其实我并不能针对上面的问题给出什么好的解决方案，我仍希望这篇文章能够告诉你，尽管“不可变”这点非常好用，然而并非所有编程语言都能够驾驭它，充分获取不可变性带来的所有好处，甚至在某些场景下，不可变性还会带来一些问题。这篇文章的动机源自于一大堆推荐不可变性的文章，这些文章建议使用不可变性解决所有问题，却没有分析这到底对你的应用有什么其他不好的影响。

## Immutability across languages

## 不同编程语言中的不可变性

In most cases immutability is a powerful tool that allows us to keep our code clean and simple even in a multithreaded environment. Each language allow us to write such code in a different way, and the majority of popular languages just allow us to define all fields of such object as final/readonly/notmutable. For example, in Java our immutable type definition would look like this:

大部分情况下，不可变性是一个非常强大的工具，可以允许我们在多线程的环境下保持代码的简单整洁。每种语言都允许我们以不同的方式写出这样的代码，绝大部分编程语言仅仅允许我们声明一些对象的某字段是 final/readonly/notmutable。比如，在Java中一个不可变类型的定义如下：

```java
public final class Enemy {
    private final int id;
    private final EnemyType type;
    private final String name;
    // +constructor
}
```

We need to keep in mind and remember that every referenced object must be immutable too. If we added a field with a list in it, we would either need to use some `ImmutableList` as field type or ensure in constructor that provided list is copied to some immutable collection. A common mistake here is using and trusting [lombok](https://projectlombok.org/features/Value). Adding `@Value` to our class does not magically handle immutability of collections and other references for us. This is similar to using Kotlin, but mostly when using Kotlin code from Java. Because even if Kotlin list appears immutable it is just compiler syntax sugar, and your List will get compiled to normal mutable Java list type, and depending on how the list was created it might be mutable too.

需要牢记的一点是，要保证一个对象整体不可变，所有引用的对象也都必须是不可变的。如果我们添加了一个List字段，那么就需要使用一些比如`ImmutableList`的构造或者保证构造函数中提供的列表是来自于一些不可变集合。这里常见的错误是过度相信[lombok](https://projectlombok.org/features/Value)。添加一个`@Value`注解到我们的类上，并不会发生什么魔幻操作导致我们的集合（或者其他引用对象）不可变。使用Kotlin也有同样的问题，通常见于在Java中引用Kotlin代码。因为即便Kotlin的list是不可变的，那也只是编译器的语法糖，你的List对象依然会被编译成普通的Java list，并且根据这个list创建的场景，它也可能是可变的。

Some languages provide more interesting constructs, for example [D language](https://dlang.org/spec/const3.html):

一些编程语言提供了更有趣的构造，比如[D语言](https://dlang.org/spec/const3.html)：

```d
class C {
/* 默认可变 */          C mField;
             const     C cField;
             immutable C iField;
}
// 接下来
    C c = new C();
    c.mField = c; // 没问题

    // 编译期错误，因为我们尝试去改变一个不可变字段`iField` ———— 注意它是间接被改变的，
    // 实际上我们要去改变的是它内部的可变字段。
    c.iField.mField.mField = c;

    immutable C c = new C();
    c.mField = c; // 错误

// 或者直接声明整个类型都是不可变的
immutable class X {
    int a;
}
```

Here we can define each field/parameter as either normal mutable variable, const/final one — so we can’t change the value of that variable, or to mark a field directly as immutable one. Then no matter what, we don’t need to worry about mutating anything in that variable, even if it is a reference that contains mutable fields inside them — we will not be able to mutate them using our immutable reference.

这里我们可以定义每一个字段/参数作为常规的可变对象，或者是不可变对象————这样我们就无法改变这个对象的值了，或者直接标记整个类型都是不可变的。无论怎么标记，我们都不用担心会修改到这个对象的任何一个部分；甚至在这个对象内部包含可变字段的时候，我们也没办法通过一个不可变引用去修改到他们。

[Rust](https://doc.rust-lang.org/1.29.0/book/first-edition/mutability.html) is another interesting example. Here by default everything is immutable but at the same time there is the `Cell` type that can be used to skip immutability, so

另一个有趣的例子是[Rust](https://doc.rust-lang.org/1.29.0/book/first-edition/mutability.html)。Rust中默认所有对象都是不可变的，但与此同时`Cell`类型可以用来跳过不可变性验证，所以：

```rust
struct Point {
    x: i32,
    y: i32,
}
let mut a = Point { x: 5, y: 6 };
a.x = 10;

let b = Point { x: 5, y: 6 };
b.x = 10; // 错误：不能给不可变字段 `b.x` 赋值。 

// 但是
struct Point {
    x: i32,
    y: Cell<i32>,
}
let point = Point { x: 5, y: Cell::new(6) };

point.y.set(7); // 这样就可以了～
```

So we can’t be sure that our reference is fully immutable either, but if it is, it was a fully conscious choice of the code’s author, so we probably don’t need to worry about it.

因此这样我们也没法确定我们的对象是否完全不可变，但如果是可变的，那也完全是代码作者有意为之，我们就没必要担心了。

My point is: Java has one of the worst ways of defining immutability and tools like Lombok and Kotlin often only hide this instead of helping. While immutability is promising to keep developers safe from many issues, it’s not that easy to keep immutable values safe from developers without better support from the language itself. But why is that? Was Java never designed to be used with immutable values?

我的点在于：Java使用了最糟糕的定义不可变性的方式，并且像Lombok和Kotlin这些通常会更多地隐藏问题。不可变性据说是可以解决开发者面临的绝大多数问题的，但在语言层面没有保障的时候让开发者来保证对象的不可变性并不是件容易的事情。为什么会出现这种情况呢？Java从来没有考虑过不可变对象的问题？

## Performance cost of immutability in Java

## Java 不可变性带来的性能消耗

We all know (I hope so) about the good sides of using immutable values, mostly related to multi-threaded code, but did you ever wonder what the trade-off is? In many native languages such immutable objects usage can often be heavily optimized and a lot of allocations are just skipped, but that’s not the case with Java — it can still reduce the number of allocations but in a much more limited way. Many people don’t think about it, but you can allocate objects/memory fast enough to slow down your application to noticeable degree. Application then will both spend more time allocation objects and then on cleaning them up duringing GC. To cause such issues you need to constantly allocate a lot of objects in very short time, so in a typical web application it’s not that easy to encounter issues with allocation rates. And when it happens you can tweak a few GC settings and scale your application.

（至少我希望）大家都知道使用不可变对象的好处————大部分都是在多线程场景下，但你有想过这样做的代价是什么吗？大部分native编程语言，这样的不可变对象通常被高效地优化，省去了非常多的空间分配（allocation）过程，Java的情况却并非如此————确实能够省掉一些空间分配，但是情况十分有限。很多人从来没考虑过这个问题，你可以尝试分配大量对象/内存导致可感知地拖慢你应用的情况看一下。这个时候应用会在分配对象和GC（Garbage Collection，垃圾回收）的过程中清理这些对象上花费大量时间。要验证这个场景你需要在短时间内不断分配大量的对象，在一个常规的Web应用中并不太容易遇到这种情况。当真的出现的时候，你可以调整GC的设置或者扩展你的应用。

Imagine a piece of game code where we want to invoke a function for generated positions in world:

考虑下面这段游戏代码， 我们想要调用函数处理游戏世界中生成的位置信息：

```java
class Example {
    void example(Supplier<Position> positionGenerator, World world) {
        Stream.generate(positionGenerator)
            .limit(1000000)
            .forEach(pos -> world.updateAt(pos));
    }
}
```
This is what the update itself looks like:

这是`updateAt`函数的结构：

```java
class World {
    void updateAt(Position position) {
        position.forAllNeighborsInRange(3, newPosition -> spawnMonsterIfNotPresent(newPosition)); // cube 7x7x7
        spawnChestIfNotPresent(position);
    }
}
```
In games such a thing would probably be part of game loop, running dozens of times per second. Maybe not necessarily spawning new monsters, but definitely there is always a lot to do.

这段代码可能是游戏循环的一部分，每秒运行数十次。可能并不一定是生成新的怪物等，但总有很多事情需要这样处理。

We will use [JMH](https://openjdk.java.net/projects/code-tools/jmh/) for benchmarking. Full benchmark code will be linked at the end of article.

我们使用[JMH](https://openjdk.java.net/projects/code-tools/jmh/)来做benchmark。文章后面会给出完整的benchmark代码。

```java
@Benchmark
public void tick() throws Throwable {
    Stream.generate(positionGenerator)
            .limit(ITERATIONS)
            .forEach(pos -> world.updateAt(pos));
}
```
Let’s just benchmark such code and see the results

我们看一下benchmark的结果：

```
Benchmark       Score   Error  Units
tick            68.875  0.088  ms/op
tick:tick p0.99 71.620         ms/op
```
This already limits us to 14 (1000 ms / 71 ms ≈ 14) updates per second, but we probably want to do more than this. What if we removed all allocations here? Let’s make our Position mutable and just pass the same instance. We only use 1 thread here so we don’t need to worry about concurrency or other possible issues as long as position is not stored anywhere:



```
Benchmark                     Score   Error  Units
tickNoAlloc                   30.817  0.019  ms/op
tickNoAlloc:tickNoAlloc p0.99 31.130         ms/op
```
It’s twice as fast! We don’t do much in that code, so you might think that in general such optimization would not matter, but remember that we are talking about something running in a game loop, 35ms less means we can spin our game loop faster or add more features before our game will run too slow, and that’s a lot of time!

In other languages people often try to connect benefits of immutable code and less allocation by allocating such values on the stack. Sadly Java once again does not have any tool for that (Java can get rid of allocations in some cases, but these are internal JIT optimizations that we can’t control or assume if/when they are used). The only alternative would be to use raw values directly, so instead of passing a Position object we can just pass 3 double values. In java we have no way to return 3 values at once (structures would solve this too), so our generator of positions must support generation of each value (x/y/z) separately.

```
Benchmark                   Score   Error  Units
tickNoHeap                  23.562  0.012  ms/op
tickNoHeap:tickNoHeap p0.99 23.839         ms/op
```
And not only it does run faster now, but can also be used again in multithreaded way without any issues. The only issue is that we would not be able to do this with larger objects, and it already looks much more complicated and less readable, and all of this because Java lacks simple structures that can be allocated on stack (but maybe someday we will see some form of structures thanks to [Valhalla](https://openjdk.java.net/projects/valhalla/) project). Note that using a struct would not always be better, it depends on size of our data. If we use large object then it would be better to use normal object/reference as copying it would cost more than cost of dereferencing it later.

## Stressing GC
Now let’s run this code using more threads and see what happens:

```java
@Benchmark
@Threads(-1) // use all cores
public void tick_threaded() throws Throwable {
    Stream.generate(positionGenerator)
            .limit(ITERATIONS)
            .forEach(pos -> world.updateAt(pos));
}
@Benchmark
@Threads(-1)
public void tickNoHeap_threaded() throws Throwable {
    IntStream.rangeClosed(0, ITERATIONS)
            .forEach(pos -> world.updateAt_NoHeap(noHeapPositionGenerator.nextX(), noHeapPositionGenerator.nextY(), noHeapPositionGenerator.nextZ()));
}
```
And results:

```
Benchmark                                     Score   Error  Units
tickNoHeap_threaded                            29.051 0.076  ms/op
tickNoHeap_threaded:tickNoHeap_threaded p0.00  25.330        ms/op
tickNoHeap_threaded:tickNoHeap_threaded p0.95  40.567        ms/op
tickNoHeap_threaded:tickNoHeap_threaded p0.99  51.773        ms/op
tick_threaded                                 189.682 0.849  ms/op
tick_threaded:tick_threaded p0.00             101.712        ms/op
tick_threaded:tick_threaded p0.95             231.224        ms/op
tick_threaded:tick_threaded p0.99             256.379        ms/op
```
Now we can see this issue even more, as we are allocating a lot of objects that later need to be cleaned up.

Another thing we can check is what will happen if we want to limit available memory. Currently all the code was running on 2GB of memory, that is quite a lot for code which does nothing. Let’s limit memory to 128MB and 20MB:

```
Benchmark                                             Score     Error  Units
tickNoHeap_threaded128M                                26.313   0.104  ms/op
tickNoHeap_threaded128M:tickNoHeap_threaded128M p0.00  24.674          ms/op
tickNoHeap_threaded128M:tickNoHeap_threaded128M p0.99  45.200          ms/op
tickNoHeap_threaded20M                                 26.292   0.093  ms/op
tickNoHeap_threaded20M:tickNoHeap_threaded20M p0.00    24.707          ms/op
tickNoHeap_threaded20M:tickNoHeap_threaded20M p0.99    41.484          ms/op
tick_threaded128M                                     211.826   0.726  ms/op
tick_threaded128M:tick_threaded128M p0.00             184.812          ms/op
tick_threaded128M:tick_threaded128M p0.99             240.910          ms/op
tick_threaded20M                                      427.533   1.430  ms/op
tick_threaded20M:tick_threaded20M p0.00               411.042          ms/op
tick_threaded20M:tick_threaded20M p0.99               478.224          ms/op
```

New version with objects is struggling even more to maintain good performance, and this is actually something you might observe in your web application too, when more and more time goes for GC and allocation. Some of these issues can be sometimes solved (or make them less visible) by adjusting young gen size. Issue will still be there, but now it will occur at another point, and at the end you will finally hit a limit of how much you can scale your application vertically.

## Conclusion?

The point of this article was to show that while immutability gives us a lot of safety, Java does not give us enough tools to use immutable data in a performant way. While it’s still a good idea to write code using immutable values, we should sometimes also consider using other methods if we need much higher throughput and scaling horizontally is either impossible or just starting to get too expensive (with games you are often limited by performance of a single PC). As a wannabe game developer myself — I’m especially looking at other web developers interested in game development, as reading web influenced game code often hurts, not only the performance of the game, but also the people who will read that code later ;)

Immutability is just a tool in a software engineer’s hand, and every tool has its own good uses, but there is no universal tool and the job of a software engineer is to choose the right tools for given job.

[Full source code for benchmark can be read on gist](https://gist.github.com/GotoFinal/2f057616f300045c7638bd11b250c20a)