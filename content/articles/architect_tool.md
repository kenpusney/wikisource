---
title: 软件架构的图形工具
date: 2020-07-14
---

前两天朋友在群里提了一个问题，架构师除了用框图（就是那种大框套小框的所谓架构图）之外还有什么工具（原话是，“架构师不画框框还能画啥”）。

其实所谓的架构图也没有统一的标注，日常流行的那种框图甚至都只是在国内的互联网公司中用的比较多，动不动就三四层，每一层都堆满了小方块，告诉你这一部分是什么，但实际这既没办法表示技术实现层面上的关联关系，也很难确保业务架构上的划分。唯一可能还在用的原因估计就是受众大部分已经接受了“架构图”这样一个概念（实际跟之前我吐槽的“充血模型”类似，是个本地产品），再加上方方正正是我们传统文化所能接纳的基本内容吧。

> 软件架构是一种无法以简单的一维方式进行说明的复杂实体。
> －Paul Clements 《软件架构编档》

## 架构视图模型

前面提到了，现在比较流行的“架构图”基本上就是个废物，因为起不到任何说明作用，所有的点都需要另外的信息来说明。这种图形能够吸引人无非就是在给人展示说，你看我多厉害，能把这些方块排得整整齐齐。

毕竟一个项目需要非常多的人参与，有各种类型的角色，所以为了能够让这些人分别了解到自己需要的信息，实际是有着不同的视图来展示软件架构。一个典型的归类方式是4+1架构视图模型：

- **逻辑视图 Logic View** 是系统功能特性的概念和关系描述，把具体的业务以角色和逻辑关系的形式呈现；
- **流程视图 Process View** 是系统动态性体现，展示的是系统的流程和协作，关注的是系统的运行时行为；
- **开发视图 Development View** 用于给开发人员呈现工程方面的组织、和管理方式、实现方式；
- **物理视图 Physical View** 用于提供给系统工程师和运维工程师，提供系统组件的物理结构和连接交互方式；
- **场景视图 Scenario** 由一系列的用例和场景组成，来呈现角色、对象和流程之间的交互；通常场景视图会用作识别架构元素和验证架构设计的工具。

这里的“视图”（view）并非是以图形（diagram）的方式呈现。但4+1架构视图模型会给到我们一个指导，架构设计有哪些可以呈现的部分、以及沟通和展示的方面。而涉及到具体的工具层面，各种图形也可以充分展示不同类型的信息。

## 软件设计图形的分类

软件设计图形按照用途可以分为描述结构、描述行为和描述交互的三种类型图形。

- **结构图**展示系统组件、功能特性、程序元素和物理部署等结构与这些结构相互之间的关系。比如类图、组件图、部署图。
- **行为图**展示系统或者部分的具体逻辑、流程或者状态转换等。比如用例图、活动图和流程图。
- **交互图**展示系统组件或者系统之间的行为和交互。比如时序图。

然而工作中遇到过非常多和同事沟通的场景，对方要么只能使用某一种工具来表达（最多的自然就是时序图，因为大部分人关注细节），要么就是干脆毫无逻辑的画框框和线条。虽然早已经过了1990年代和20世纪初那段疯狂吹OOAD的时代，UML等所谓的设计工具在具体的工作流程中也已经越来越少用了，但使用图形来描述思路依然是一个合格的研发人员必备的能力。无论用来与需求方沟通理清楚业务，还是与其他研发沟通讨论设计思路，使用通用语言来表达都能让沟通的效率和正确性提升。

## 松散图形

前面说过，上世纪90年代左右，随着面向对象设计的逐渐风靡和软件设计复杂度的提升，有很多老家伙们创造了不少的工具，比如GoF的《设计模式》中使用的OMT，就是James Rumbaugh在通用电气工作的时候创造的方法，后来被Grady Booch和Ivar Jacobson（三人又被称为“The Three Amigos”，Grady Booch是OOAD早期的倡导者，同时也给《设计模式》写了序）挖到了Rational，一起设计了UML。

但是OOAD的整体思路略显庞大，特别在敏捷和精益愈发被重视的今天，作为一个细节设计的方法已经不太适合当前的思路，于是在2010年后就不再太被人常提起，不过好在是给我们留下了不少工具、模式和实践方法。

UML就是OOAD的产物之一，在合并（“unified”）了多个建模工具之后有了这样一个庞然大物。但这种庞然大物必然会导致一个非常高的学习成本，所以也慢慢少有人用了。只剩一些非常直观的图形还有人能够用气。
另外本身UML设计过度复杂，并不是所有的部分都适合使用，Martin Fowler就写过一本小册子《UML精粹》（UML Distilled）来简单讲解一些图形的适用场景和设计思想，非常值得一读。

UML这种庞然大物既然不太受欢迎了，也没多少人真正能看得懂，其实就进一步地有一些不那么严谨但是也能被接受的图形出现了。

- 首先是流程图，这个产生了差不多100年左右的工具基本上稍微接触过点工程的人都能迅速理解和掌握，用来展示行为是非常有用的。

- 其次是DFD，数据流图，或者一些变形的版本。比起活动图来也更加简单，描述数据的流转和交互非常适用。

- 再者另外一个比较常见的就是由思维导图流行产生的各种相关结构图，用来“总-分”的形式描述结构。这种过于松散的结构虽然一定程度上容易引起误解，但鉴于使用非常方便，结对或者团队在讨论问题的时候仍然可以很高效的直观沟通。

其实选择的工具只要是经过团队一致统一的，并不限于具体的展示形式，UML虽然做到了“统一”，但很难统一所有人对于它的认知，所以不如把一些趁手的工具用好。最重要的其实还是要像前面提到的，确定你要沟通的场景和对象，来选择正确的表述内容。

总之不要老是画框框就好。