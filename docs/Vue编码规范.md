## Vue Router

### 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

比如：

```js
watch: {
    '$store.state.lang': function () {
        this.goProjectPost(this.$route.params.slug)	// 组件与特定路由耦合
    }
}
```

<span style="color: red">使用 `props` 将组件和路由解耦：</span>

先在路由中将`props`选项打开，

```js
{
    path: 'post/:slug',
	name: 'route-projects-post',
	component: () => import('@/components/projects/ProjectPost'),
    props: true	// 设置为true，注意父级路由影响不到子级路由
}
```

然后在组件中设置props属性，直接使用：

```js
<script>

    export default {
		// ......
        props: ['slug'],
        // ......
        watch: {
            '$store.state.lang': function () {
                this.goProjectPost(this.slug)
            }
        }
    }

</script>
```

视情况而定，如果你的组件不是通用组件，项目不复杂的话，直接用`$route`反而方便和容易理解。