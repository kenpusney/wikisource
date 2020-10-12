---
title: Monorepo
date: 2020-10-10
----

"Every code commit essentially becomes a release with monorepo!" （https://itsvit.com/blog/monorepo-google-way-ci-cd/）

- https://en.wikipedia.org/wiki/Monorepo

## Advantages

- **Ease of code reuse** – Similar functionality or communication protocols can be abstracted into shared libraries and directly included by projects, without the need of a dependency package manager.
- **Simplified dependency management** – In a multiple repository environment where multiple projects depend on a third-party dependency, that dependency might be downloaded or built multiple times. In a monorepo the build can be easily optimized, as referenced dependencies all exist in the same codebase.
- **Atomic commits** – When projects that work together are contained in separate repositories, releases need to sync which versions of one project work with the other. And in large enough projects, managing compatible versions between dependencies can become dependency hell. In a monorepo this problem can be negated, since developers may change multiple projects atomically.
- **Large-scale code refactoring** – Since developers have access to the entire project, refactors can ensure that every piece of the project continues to function after a refactor.
- **Collaboration across teams** – In a monorepo that uses source dependencies (dependencies that are compiled from source), teams can improve projects being worked on by other teams. This leads to flexible code ownership.

## Disadvantages

- **Loss of version information** – Although not required, some monorepo builds use one version number across all projects in the repository. This leads to a loss of per-project semantic versioning.
- **Lack of per-project access control** – With split repositories, access to a repository can be granted based upon need. A monorepo allows read access to all software in the project, possibly presenting new security issues.



其他参考资料：

- https://www.sohu.com/a/165037119_575744

Google:
- https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext
- https://itsvit.com/blog/monorepo-google-way-ci-cd/
- 


Facebook:

- https://engineering.fb.com/core-data/scaling-mercurial-at-facebook/
- https://www.infoq.com/news/2014/01/facebook-scaling-hg/
- https://www.theregister.com/2016/10/18/facebook_mercurial_devs_forget_git/

Others:
- Coinbase: https://blog.coinbase.com/bootstrapping-the-coinbase-monorepo-575cf981c859
- https://www.fourtheorem.com/blog/monorepo
- https://blog.nrwl.io/misconceptions-about-monorepos-monorepo-monolith-df1250d4b03c
- https://www.squash.io/the-issue-with-monorepos/
- https://blog.nrwl.io/misconceptions-about-monorepos-monorepo-monolith-df1250d4b03c

