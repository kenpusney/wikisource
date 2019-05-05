# 微服务中的 SOLID 原则

## Single Responsibility Principle

每一个服务应该专注于其对应的domain，同时服务接口应该尽可能的做简单的逻辑，通过接口间组合来实现复用。

## Open-Close Principle

服务实现应该对接口扩展开放，对破坏约束封闭。

## Liskov Substitution Principle

服务切换不同的实现，应该保持接口的一致。同时任何被替换实现的接口不应该有行为上的变动。

## Interface Segregation Principle

服务间应该只通过接口相互依赖，实现之间相互隔离，独立部署。

## Dependency Inversion Principle

服务间不应该通过部署实例直接相互依赖，而是通过接口和服务发现机制。
