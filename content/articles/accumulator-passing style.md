---
title: Accumulator-passing style
date: 2021-02-24
---
在你所需要知道的关于函数的一切开篇我就提到了一种把 fibonacci 函数的树状递归改成迭代式尾递归形式的方法。这种方法一直以来都是了解函数式编程入门必须要了解的内容，但穷尽了我的语言能力也没办法给他一个合适的名称。

今天恰好在微信群挖坟的时候看到了这样一个概念，Accumulator-passing style，瞬间豁然开朗。尽管使用 Google 搜索了一下发现这个词也不是那么常见，首页也就只有几个相关的结果，但确实能把这个概念相对准确地描述清楚。

顺便根据 Google 搜索结果找到了几个更加简单的实现 accumulator-passing style 的说明文档。这里选一篇的内容摘录一下，附上我改过的实例。比起在之前的教程中绕来绕去通过循环转写的方式实现（思路来自 Alexander Stepanov 的 Elements of Programming）要更加简单直接。

## 尾递归

首先要解释的一个概念是**尾递归**。（这也是之前教程中遗漏的内容 😅）

尾递归（tail-recursion）是递归的一种特殊形式。即函数的最后一个动作是对自身的尾调用（tail call）。

一个尾调用是指函数的最后一个动作是返回一个函数的调用结果。这样可以通过简化函数栈帧来进行性能优化（tail call elimination，尾调用消除）。

比如：

```js
function fact1(n) {
  if (n == 0) {
    return 1;
  }
  return n * fact1(n - 1);
}

function fact2(n, acc) {
  if (n == 0) {
    return acc;
  }
  return fact2(n - 1, n * acc);
}
```

在上面两个示例中，`fact1` 是常规的递归，`fact2` 则是尾递归的形式。因为在 `fact1` 中，除了对自身递归调用以外，还需要再拿到结果计算 `n * _`。而 `fact2` 中，最后的动作则只有简单的对自身的递归调用，所有的参数传递也是在调用之前就需要求值完成的。

## 改写成 accumulator-passing style 的步骤

只需要简单的 4 步，就可以轻松的把大部分递归改写成 accumulator style。这里以 factorial（阶乘）函数为例。

```js
function fact(n) {
  if (n == 0) {
    return 1;
  }
  return n * fact(n - 1);
}
```

**第一步**，引入 accumulator 作为参数。

```js
function factAcc(n, acc) {
  ...
```

因为 accumulator 在整个递归过程中用于累计递归的结算结果和额外的状态，所以显然把他作为参数传递给下一次调用是最好的办法。这里的 accumulator 并不仅限于一个参数。像之前提到的 fibonacci 函数，需要把前一次的结果也传递给下一次调用，也就出现两个额外参数的情况。

**第二步**，在递归的终结点返回 accumulator 的值。

```js
function factAcc(n, acc) {
  if (n == 0) {
    return acc;
  }
  ...
```

前面说了，既然 accumulator 用于累计计算结果，那到了递归终止的时候，就应该把结果返回。在 factorial 函数的例子中，当我们递归到 0 的时候，已经把前面该累乘的结果计算进了 `acc` 里面。

**第三步**，递归调用当前函数，更新参数和 accumulator 的值。

```js
function factAcc(n, acc) {
  if (n == 0) {
    return acc;
  }
  return factAcc(n - 1, acc * n);
}
```

这里是稍微困难的一步，即如何改写之前的递归调用点。这需要看对应的场景来确定如何计算累计结果。在 factorial 的例子中，就是简单的把每次递归的 n 累乘进来。而在其他很多场合，则需要更进一步的设计。如 fibonacci 的树状递归，本质上是前后两次计算结果的合并，处理起来就没这么明显。

**第四步**，写一个函数 wrap 刚才的尾递归函数，初始化 accumulator。

```js
function fact(n) {
  return factAcc(n, 1);
}
```

## 例：fibonacci 函数

```js
function fib(n) {
  if (n == 0 || n == 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}
```

**第一步**，引入 accumulator 作为参数。因为有两次递归调用，设计到结果合并，引入两个参数。

```js
function fibAcc(n, a, b) {
  ...
```

**第二步**，在递归的终结点返回 accumulator 的值。

```js
function fibAcc(n, a, b) {
  if (n == 0 || n == 1) {
    return a;
  }
  ...
```

**第三步**，递归调用当前函数，更新参数和 accumulator 的值。fibnacci 函数的定义，第 n 次结果是前两次结果（假设分别为 `a`、`b`）的和（即 `a + b`），下一次再取到的“前两次结果”就变成了 `b`、 `a + b`。

```js
function fibAcc(n, a, b) {
  if (n == 0 || n == 1) {
    return a;
  }
  return fibAcc(n-1, b, a + b);
}
```

**第四步**，写一个函数 wrap 刚才的尾递归函数，初始化 accumulator。

```js
function fib(n) {
  return fibAcc(n, 1, 1);
}
```

## 练习题

各位可以试着自行改写一下 `sum`（列表求和）、`map`（列表映射）和 `fold`（列表折叠）的实现。（前两个相对简单，第三个需要多思考一下）

其定义分别如下：

```js

// sum([a, b, c]) = a + b + c
function sum(xs) {
  if (xs.length == 0) {
    return 0;
  }
  let [first, ...rest] = xs;
  return first + sum(rest);
}

// map([a, b, c], fn) = [fn(a), fn(b), fn(c)]
function map(xs, fn) {
  if (xs.length == 0) {
    return [];
  }
  let [first, ...rest] = xs;
  return [fn(first), ...map(rest, fn)];
}

// fold([a, b, c], fn, z) == fn(a, fn(b, fn(c, zero)))
function fold(xs, fn, zero) {
  if (xs.length == 0) {
    return zero;
  }
  let [first, ...rest] = xs;
  return fn(first, fold(rest, fn, zero));
}
```
