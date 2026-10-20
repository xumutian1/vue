# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 实验说明

### Pinia Store

- `auth`：`state.isAuthenticated` 表示登录状态；`signIn` 在登录成功时设置状态并写入 `portfolio-admin`，`signOut` 清除状态和本地记录。路由守卫在每次导航时读取该状态，保护 `/admin` 路由。
- `portfolio`：保存 `profile` 和 `skills`；`saveProfile` 在后台保存个人资料时调用。
- `projects`：`state.projects` 保存项目，`projectCount` 和 `getProjectById` 是派生查询；`addProject`、`updateProject`、`deleteProject` 分别在项目新增、编辑保存和删除时调用。
- `articles`：`state.articles` 保存文章，`articleCount` 和 `articleTimeline` 提供数量与时间线；`addArticle`、`updateArticle`、`deleteArticle` 分别在文章发布、编辑保存和删除时调用。

项目与文章分别持久化到 `xumutian-projects`、`xumutian-articles`，个人资料和技能保存在 `xumutian-portfolio`。Store 初始化时读取本地数据；写入由对应 action 完成。页面解构 state/getters 时使用 `storeToRefs`，actions 从 Store 实例直接调用。

在 Vue DevTools 的 Pinia 面板中选择 `auth`、`portfolio`、`projects` 或 `articles` 查看 state；在管理页新增、编辑、删除内容后，可观察对应 action 记录和 state 变化。登录演示账号为 `admin`，密码为 `vue2026`。

### Element Plus 组件

- `ElContainer`、`ElAside`、`ElMain`：组织后台侧栏与主内容区域。
- `ElMenu`、`ElMenuItem`：构成后台路由导航，并突出当前页面。
- `ElRow`、`ElCol`、`ElCard`：排列并承载个人页时间线内容。
- `ElTimeline`、`ElTimelineItem`：按日期展示文章学习记录。
- `ElTable`、`ElTableColumn`：展示项目和文章列表及其操作。
- `ElTag`：展示文章分类和项目技术标签。
- `ElDialog`：承载新增与编辑窗口。
- `ElForm`、`ElFormItem`：组织表单字段和标签。
- `ElInput`、`ElSelect`、`ElOption`、`ElDatePicker`：输入内容、选择项目状态和文章日期。
- `ElButton`：触发新增、编辑、删除和提交操作。
- `ElAlert`、`ElEmpty`：显示操作结果与空列表状态。

组件用法参考 [Element Plus Menu](https://element-plus.org/en-US/component/menu.html)、[Timeline](https://element-plus.org/en-US/component/timeline.html)、[Table](https://element-plus.org/en-US/component/table.html)、[Dialog](https://element-plus.org/en-US/component/dialog.html)、[Form](https://element-plus.org/en-US/component/form.html) 和 [Date Picker](https://element-plus.org/en-US/component/date-picker.html) 官方文档。
