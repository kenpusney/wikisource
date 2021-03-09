---
title: 结合性
draft: true
date: 2021-03-01
---

> 这里与 C 语言中的运算符优先级和结合性没有直接关系，主要是在探讨二元函数的特性。

前两篇讲APS和CPS的文章里面我在练习和示例里用的函数是fold。在大多数编程语言里面都有类似实现，如Java里的Steam#reduce、JavaScript的Array.prototype.reduce和Array.prototype.reduceRight。

像 JavaScript 这种存在两种实现的情况也不在少数，比如Haskell中，也有分别的foldl和foldr（左折叠和右折叠），这里正是对应了fold函数中所使用的折叠运算的结合性。

什么是结合性呢。

一个函数的类型通常会存在下面几种类型：

- `f1: (t: T, u: T) => T` 参数和返回结果的类型一致
- `f2: (t: U, u: T) => U` 左侧参数和返回结果的类型一致
- `f3: (t: T, u: U) => U` 右侧参数和返回结果的类型一致
- `f4: (t: T, u: U) => V` 参数和返回结果类型没有关系（包括 `T=U` 的情况）

第四种是个非常普遍的场景，在我们所讨论的范围之外。对于前三种类型，我们是可以把该函数的结果拿到再去应用到该函数的调用参数上的。这正是列表折叠的时候所需要用到的场景。所不同的是，对于第二种和第三种类型，会存在以下区别：

假设分别应用在列表上，折叠成为 T 类型（f2）或者 U 类型（f3）。对于列表 [a, b, c] 和初值 zero：

- f2的应用顺序为：f2(f2(f2(zero, a), b), c)
- f3的应用顺序为：f3(a, f3(b, f3(c, zero)))

f2的结果在下一次调用时都会被应用为**左侧**参数，f3的结果则会被应用为**右侧**参数。并且折叠的顺序也不同，f2是从**左**到右，f3是从**右**到左

这里的左和右就是其结合性。

我们在前两篇文章里面实现的fold函数都是适用于右结合函数的，效果上类似JavaScript中的reduceRight和Haskell中的foldr。选择右结合也是出于练习和引入CPS的考虑。因为左结合的fold函数太容易实现了，写出来就是尾递归的。

```js
function foldLeft(xs, fn, zero) {
  if (xs.length == 0) {
    return zero;
  }

  let [first, ...rest] = xs;
  return foldLeft(rest, fn, fn(zero, first));
}
```

并且实际fold函数就是像sum/map这种常见的列表处理函数的抽象化版本，即把像sum这种用于累计数据的操作抽象成为一个通用的函数fn，所以另外一种方式就是通过提取sum/map中的操作来实现foldLeft。

```js
function sumAcc(xs, acc) {
  if (xs.length == 0) {
    return acc; // zero
  }
  let [first, ...rest] = xs;
  return sumAcc(rest, first + acc /* fn */);
}

function sum(xs) {
  return sumAcc(xs, 0);
}

// 使用fold来实现
function sumWithFold(xs) {
  const plus = (x, y) = x + y;

  return foldLeft(xs, plus, 0); // 同样可以使用右折叠
}
```

通常给出的示例中（如上面的sum）所采用的折叠运算都是满足交换律和结合律的，这种情况使用左折叠和右折叠都没有任何问题。但大部分情况下还是需要考虑如果折叠结果与列表类型不同，单独给出实现。

另外，左结合和右结合的函数可以通过一个高阶函数来实现转换，即 flip （类型为`(fn: (t: T, u: U) => V) => (u: U, t: T) => V` ）。

```js
// flip = (fn) => (y, x) => fn(x, y)
function flip(fn) {
  return (y, x) {
    return fn(x, y);
  }
}
```

注意flip只是反转了参数的顺序，行为还是没有变的。一些函数 flip 之后会因此呈现出一种很滑稽的效果：

```js
const cons(a, l) = [a, ...l];

fold([1, 2, 3], cons, []); // => [1, 2, 3]
foldLeft([1, 2, 3], flip(cons), []); // => [3, 2, 1]
```

