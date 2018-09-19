# Soft delete

https://stackoverflow.com/questions/2549839/are-soft-deletes-a-good-idea
https://stackoverflow.com/questions/378331/physical-vs-logical-soft-delete-of-database-record


Soft delete vs Hard delete
http://abstraction.blog/2015/06/28/soft-vs-hard-delete

Arguments:

https://blog.entelect.co.za/view/9991/arguments-between-soft-and-hard-delete

Support:
- http://udidahan.com/2009/09/01/dont-delete-just-dont/
- https://www.infoq.com/news/2009/09/Do-Not-Delete-Data

Against:
- https://ayende.com/blog/4157/avoid-soft-deletes
- http://jameshalsall.co.uk/posts/why-soft-deletes-are-evil-and-what-to-do-instead
- https://www.dbrnd.com/2015/10/database-design-the-truth-about-archive-table-and-soft-delete-of-historical-data/
- https://weblogs.asp.net/fbouma/soft-deletes-are-bad-m-kay


### Issues

 - 出现逻辑复杂的SQL查询
 - 导致运行时数据冗余
