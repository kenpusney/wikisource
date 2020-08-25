---
title: API Gotchas
refs:
  - tech/SOLID Services
date: 2017-11-15
---
# API Gotchas

## API Category

1. Back-end for front-end
2. Domain API
3. System API
4. Aggregation Layer

### 1. Version Hell

#### 场景

  - v1：支撑最初业务需求的API
  - v2：新需求导致业务流程需要简单改进
  - v3：组织新的微服务架构需要改进API之间的接口
  - v4：上面那堆东西写成了一坨屎，我们新建一个项目吧
  - v5：不好意思新需求又来了

#### 原因

  - 版本与消费者（客户端）的管理不到位
  - 业务场景划分不明确导致频繁变更

#### 解决方案

？

### 2. Version Tree

#### 场景

BFF或者Aggregator：
  - v1依赖A-v1和B-v1
  - v2依赖A-v1和B-v2
  - v3引入新依赖C-v1并升级到A-v3
  - Version Hell导致v1 v2 v3都不能被彻底摆脱
  - 新建项目把所有依赖升级到最新版

#### 原因

  - Provider Management
  - Cross-Refed Dependency

#### 解决方案

？

### 3. Schema Violation

#### 场景

Consumer与Provider之间采用强Schema进行约束，任何一方都绝对依赖于另外一方。

#### 解决方案

？

### 4. Exposed Domain Entity

#### 场景

Provider将自身内部的领域对象整体暴露出去

#### 解决方案

？

### 5. God service

#### 场景

The service that was cross-layered and depended by most of other services.

#### 解决方案

?

### 6. Circular Reference/Dependency

#### 场景

Lower stream services have ex/implicit dependency for higher stream services.

#### 解决方案

?

### 7. Schema Inference

#### 场景

Services provide nothing but an endpoint, client must try to understand the schema and behaviour by combinating every possible inputs.

#### 解决方案

?