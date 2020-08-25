---
title: 关于函数的一切
date: 2020-07-17
---

本文源自于我在2012～2013年写的 Meta Functions 系列文章，以及知乎专栏的《map四种》。通过细致地讲解和练习函数相关的内容来让大家更细致地认识函数、闭包、延迟计算、流和解释器。

后期根据情况看是否会加入类型检查和模式匹配相关的内容。

## 函数

我们先来实现一个简单的函数，比如斐波那契数列的定义。

```
fib(n) = fib(n - 1) + fib(n - 2)
fib(0) = 1
fib(1) = 1
```

如果你熟悉递归，可以很容易根据上面的递归定义把fib函数实现了（code 1-1）：
```js
function fib(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}
```

我们来看求fib(10)的时候的展开图：
```
fib(10) =>
fib(9) + fib(8) =>
fib(8) + fib(7) + fib(7) + fib(6) =>
fib(7) + fib(6) + fib(6) + fib(5) + fib(6) + fib(5) + fib(5) + fib(4) =>
.....
```
最后展开会是一个深度为10节点非常多的递归树。

在我的电脑上，计算fib(30)已经需要等待一段时间，明显感觉到延迟了。

### 尾递归

对于这个操作，实际可以用另外一个办法来简化，就是通过尾递归，把计算的操作合并到尾调用的参数求值中去。
（code 1-2）
```js
function fib(n, a = 1, b = 1) {
    if (n == 0) {
        return a;
    }
    return fib(n-1, b, a + b);
}
```
这个时候的fib(10)的展开：

```
fib(10) =>
fib(9, 1, 2) =>
fib(8, 2, 3) =>
fib(7, 3, 5) =>
fib(6, 5, 8) =>
fib(5, 8, 13) =>
fib(4, 13, 21) =>
fib(3, 21, 34) =>
fib(2, 34, 55) =>
fib(1, 55, 89) =>
fib(0, 89, 144) =>
89
```

所有的计算通过两个额外的参数来累加，而不是通过反复的递归调用展开，这个时候只有递归层次的深度，就连计算fib(100)也都只需要递归调用100次就好，能够立即返回结果。

如果你曾经用循环的方式实现过斐波那契，那要想导出这个尾递归版本其实并不困难：
（code 1-3）
```js
function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a+b];
    }
    return a;
}
```

好的，首先我们把循环倒过来写：
（code 1-4）
```js
function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = n; i > 0; i--) {
        [a, b] = [b, a+b];
    }
    return a;
}
```

把for改成死循环：
（code 1-5）
```js
function fib(n) {
    let a = 1;
    let b = 1;
    let i = n;
    while(true) {
        if (i === 0) {
            return a;
        }
        [i, a, b] = [i-1, b, a+b];
    }
}
```

改一下参数和变量名：
（code 1-6）
```js
function fib(n, a = 1, b = 1) {
    while(true) {
        if (n === 0) {
            return a;
        }
        [n, a, b] = [n-1, b, a+b];
    }
}
```

while(true) 里面的内容，跟为递归版的结构几乎一模一样，而这里直接改到参数的赋值，就可以一步替换为尾递归。

你可以对比code 1-2和code 1-6的内容。现实其实通常是反过来的，就是会通常是我们通过尾递归的方式写成1-2的样子，然后再由编译器优化成1-6。这样的结果是能够省掉函数传参和压栈的过程，算是一步提效明显的优化，对时间（额外的压栈和传参操作）和空间（调用栈）的开销都能节省很多，还能避免不必要的爆栈（Stack Overflow）风险。

### 练习

请实现另外一个常用递归函数阶乘（factorial）的直接递归版和尾递归版。阶乘函数的定义如下：
```
factorial(n) = n * factorial(n - 1)
factorial(0) = 1
```

## 函数进阶

我们上一节简单实现了一个函数，那么现在来认真地回顾考虑这么一个问题，函数到底是什么？

其实很简单，函数就是这么一个结构，你给他一个输入，他返回给你一个输出。而其由输入得到输出的过程，是你可以定义的。

这其实是一个非常广义的抽象，可以拿来类比各种东西，比如一个生产流水线也可以这么抽象地看，原材料作为输入，产品作为输出；而这个流水线的每一个节点又都是有自己的输入和输出。

于是我们可以看到函数的另外一个特征：可组合（Composable）。

### 可组合性

比如我们定义一个函数，去求一个数组排序后的结果：
```js
function sorted(array) {
    return array.slice().sort();
}
```

然后再定义一个函数，来求一个数组反转之后的结果：
```js
function reversed(array) {
    return array.slice().reverse();
}
```

那如果我们要求一个数组的降序排序的结果，就直接组合这两个调用就好：

```js
function sort_reversed(array) {
    return reversed(sorted(array));
} 
```

正式函数的这种可组合性，让我们能通过定义有限的正交算子，来组合出无限的操作。

> 
> 有些人可能会说，这个直接做成Array的方法，也是能够做成链式调用来组合的：
> ```javascript
> Array.prototype.sorted = function() {
>     return this.slice().sort();
> }
> 
> Array.prototype.reversed() = function() {
>     return this.slice().reverse();
> }
> ```
> 
> 实际这两种做法本质上是同一件事情。有些编程语言（比如D语言）中，`x.f(y)` 与 `f(x, y)` 是等价操作，实现的这种转换叫做**统一函数调用语法**（Uniform Function Call Syntax）。
> 

### 函数对象

回到上面的排序函数。

JavaScript有一个问题，就是排序默认是用的文本序，对数字也是如此，也就是说，111是会排在12前面的，而JavaScript的Array.prototype.sort函数会让我们传递一个匿名函数进去来作为排序的比较器（Comparator），达到对数值做排序的目的。

这个比较器就是一个函数对象。

```js
[1, 111, 12].sort((x, y) => x - y)
// => [1, 12, 111]
```

函数对象，又叫匿名函数，在某些语境下面也叫lambda表达式（因其源自于lambda演算）。一个函数对象是可以赋值给某个变量、作为参数传递的；或者说，函数对象，是第一类值（first class value）。

比如上文中的 `(x, y) => x - y`。

### 闭包

既然函数是第一类值，那么我们也就能有方式来构造他了。

通常一个函数在传递过程中不只是作为一个独立的单位存在，还会包括一些上下文，这样组合起来的一个结构就叫闭包。

比如，我们定义以下函数，会返回一个函数对象，而这个函数对象每次调用都会累加一次，行为表现像是一个计数器：

```js
function makeCounter() {
    let count = 0;
    return () => count ++;
}
```

这里返回的函数对象，其实就捕获了makeCounter函数中的变量count，并一直持有。在任何时候我们操作这个函数，都会改变这个变量的值。这个时候的变量可以被成为upvalue（因为是上层（upper）函数中的值（value））。

这样看起来似乎毫无意义。

我们来看一个深入的结构：

```js
function pair(left, right) {
    return (fn) => fn(left, right);
}

function left(a, b) {
    return a;
}

function right(a, b) {
    return b;
}

let p = pair(1, 2);

p(left) // => 1;
p(right) // => 2;
```

pair给我们构造了一个对象（这个时候已经不仅仅限于函数对象了），然后我们通过另外定义的两个函数来去访问这个对象的内部结构，而这个实际的内部结构并没有直接暴露给我们。

上面这段话你看到了哪些关键的东西？

- **对象**：pair构造了一个有序对，这个对象可以由我们后续定义的方法来操作和访问
- **方法**：left和right两个函数本身并没有实际的意义，与pair对象绑定以后，可以利用pair中的数据来实现预期的行为
- **封装**：pair的内部结构在构造时确定，无法在外部获取和改变内部结构，只能通过定义pair的方法来处理

在只有“函数”这个构造的情况下我们也能做这些事情。甚至在一些编程语言（比如Java/C++）里面，函数对象就是通过结构/类+特定的方法来实现的，也就只有这样他们才能做捕获形成闭包。

## 数据抽象

### 可变性

我们知道OO的一个特色是可变性来描述状态，闭包在这里也完全可以实现。当然需要借助一些额外的结构。

```js
function mutablePair(a, b) {
    return (fn) => {
        let x;
        [a, b, x] = fn(a, b)
        return x;
    }
}

function getLeft(a, b) {
    return [a, b, a];
}

function getRight(a, b) {
    return [a, b, b];
}

function setLeft(value) {
    return (a, b) => [value, b, a]
}

function setRight(value) {
    return (a, b) => [a, value, b]
}

let mp = mutablePair(1, 2);

mp(getLeft); // 1
mp(getRight); // 2
mp(setLeft(5)); // 1
mp(getLeft); // 5
```

其实可以看到，mp接受的每个函数都是(a, b) => [a, b, x] 这种形式。这样就是能够给传递函数充分地信息来获取结构，然后生成充分足够地信息来更新mp闭包的内部。如果我们再简化一点，把a和b作为一个对象比如this或者self来看，mp接受的每个函数变成了 (self) => result。其中对self的改变也包括在内。

这其实就是大部分编程语言的面向对象的“方法”的实现机制，都会给这些方法绑定一个this或者self变量，让方法内部可控制。

你看，就这么简单。

### 练习

1. 给mutablePair实现一个方法，可以交换pair左右两边的值。

2. 有没有更简单地只用函数来实现mutablePair的方式？

### 生成器

我们回想一下上一个场景中的计数器，其实是一个非常有用的结构。

比如我们希望得到斐波那契数列，但又不希望提前获取这所有内容的时候：

```js
function fibGenerator() {
    let n = 0;
    return () => fib(n++)
}
```

实际，你看，进一步地我们可以抽象出来这样一个结构，就叫生成器，根据你提供的函数再来求一个结果：

```js
function generator(fn) {
    let n = 0;
    return () => fn(n++);
}

y = generator(fib);

y(); // 1
y(); // 1
y(); // 2
y(); // 3
y(); // 5
y(); // 8
```

然后，不知道你是否发现了这么一个问题，就是，这个生成器只能前向迭代，也就是说，没法倒带的。

来我们看一下怎么实现：

```js
function bidirectionalGenerator(fn) {
    let n = 0;
    return (direct) => {
        let result;
        [n, result] = direct(n, fn);
        return result;
    }
}

function backward(n, fn) {
    return [n-1, fn(n-1)];
}

function forward(n, fn) {
    return [n+1, fn(n+1)];
}

let bg = bidirectionalGenerator(fib);
bg(forward); // 1
bg(forward); // 2
bg(forward); // 3
bg(forward); // 5
bg(forward); // 8
bg(backward); // 5
bg(backward); // 3
bg(forward); // 5
bg(forward); // 8
```

### 练习

给generator加上范围限制。