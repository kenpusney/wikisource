---
refs:
  - tech/Recursion
tags:
  - recursion
  - technique
---
# Recursion 递归

递归，是指函数调用自身。

一些典型的例子，比如斐波那契数列、阶乘函数等：

```js
function fib(n) {
    if (n == 0 || n == 1) return 1;
    return fib(n - 1) + fib(n-2);
}

function fact(n) {
    if (n == 0) return 1;
    return n * fact(n - 1);
};
```

## 尾递归

尾递归指的是函数以尾调用的形式递归调用自己。

同样以阶乘函数 fact 为例，实现如下：
```js
function fact_impl(n, acc) {
    if (n == 0) return acc;
    return fact_impl(n-1, acc * n);
}

function fact(n) {
    return fact(n, 1);
}
```


