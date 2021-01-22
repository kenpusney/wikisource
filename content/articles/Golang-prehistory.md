---
title: Golang 的前世今生
date: 2021-01-22
draft: true
---

https://docs.google.com/document/d/1OaatvGhEAq7VseQ9kkavxKNAfepWy2yhPUBs96FGV28/

今天在群里聊起来微软发布的windows-rs项目，提到了Golang是有Runtime overhead的，但与Rust不同的是，Go并没有依赖llvm和libc，而是自己提供了一整套的运行时库，默认也是做静态链接，可以直接发布成二进制单文件。

有网友对比了一下，说还是Google实力雄厚，能够把这些脏活都给做了。尽管llvm把大部分的事儿都包揽了，但还是看得出来Rust在投入成本上捉襟见肘。

要说还真不是这么简单。Rust虽然是借助了llvm升了不少的心，可以尽情地在前端反复横跳；Golang其实也是站在了前人的肩膀上。只是这条暗线走的相对隐蔽，在Golang出现之前，都很少进入大众的眼底。而Golang从这条隐蔽的线中继承过来了很多东西也都是当年Go发布时出现的各种争议点。

事情还得从 50 年前说起。

## Unix 与 C

20世纪60年代，由MIT、贝尔实验室和通用电气为GE-645主机打造了分时操作系统MULTICS（MULTiplexed Information and Computing Service）。因为其设计规模过于复杂，贝尔实验室的一些研究员逐渐退出这个项目。作为其开发者之一，Ken Thompson捎带着在摸鱼的间隙开发了Space Travel这样一个太空模拟游戏。但随着贝尔实验室逐渐脱离Multics项目，Thompson迫切地需要一个更高效并且更便宜的平台来继续这个摸鱼计划。最终他找到了贝尔实验室闲置的一台PDP-7，把Space Travel移植了上去。为了能够更好让这个游戏在该平台上运行，还专门实现了一套文件系统、以及进程、设备文件和命令行解释器等。1969年8月，Ken Thompson把这些部件组合起来，实现了一个自托管的操作系统。新操作系统包括了汇编器、编辑器和shell，以及一些通用工具。

因为是摸鱼项目，新的操作系统并没有组织级别的支持，也没有名字。新系统设计成了一个单任务系统，于是这几位模仿MULTICS的名字，把Multiplex（多）替换成了Uniplex（单），杜撰了UNICS这个名字，随后又改成了Unix。

最初Ken Thompson使用汇编来实现Unix。但是已经到了60年代了，第一个编译器都出来十几年了，如何使用高级语言提高生产效率，成了一个切实的问题。随后Douglas McIlroy把TMG（TransMoGrifier，一个编译器生成器）移植到了PDP-7上，终于带来了更为先进的生产力。Ken Thompson开始尝试用TMG实现Fortran这个知名的编程语言。但是一段时间后发现这个本来用于科学计算的编程语言并不能胜任他所希望的系统编程，所以直接拿了另外一个编程语言BCPL，裁剪掉了部分功能，设计了B语言。

不过最终还是有一部分的工具无法使用B语言来编写，因为相对来说实在是太慢了。而且随着DEC推出了更新的小型机PDP-11，B语言已经无法充分利用这个当时最先进的小型机了。1972年，Dennis Ritchie开始上手升级B语言的工作，这个当时被称作叫做“New B”（是的你没看错）的语言后来就变成了C语言。1973年发布的Unix V4就完全用C语言重写了。按照McIlroy的说法，那一年他们产出了近十万行代码。

C语言和Unix系统这两个组合逐渐开始了他们的改变世界之路。


OS 的黄金时代

Inferno

compiler、assembler 和 linker

Newsqueak、Alef 和 Limbo

