## URL规则

### API版本
规范的API应该包含版本信息。
#### 将版本信息放在请求的url中
这是最简单的办法，如
```text
/api/v1/posts/
/api/v2/articles/
```
#### 使用HTTP header中的accept来传递版本信息
**待补充**

### 用名词，不用动词
url应该是指向资源的，而不是描述行为的，因此设计API时应使用名词而不是动词来描述语义，否则会引起混淆和语义不清。
```markdown
~~/api/getPosts/xxx~~
/api/posts/xxx
```


## 参考
+ [RESTful API 编写指南](https://juejin.im/post/57d168e9bf22ec005f98a3a5)
