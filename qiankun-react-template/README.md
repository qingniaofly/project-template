## 微前端脚手架


## 🚀技术栈
- [x] 构建：Babel7 Webpack(5.x)
- [x] 热更新
- [x] React(18.x)
- [x] 代码校验: Eslint
- [x] 代码格式: prettie
- [x] 微前端: qiankun

## 🏃 开始
> 为了更好的开发体验，你还需要安装以下 VSCode 插件
>
> - **Prettier - Code formatter**
> - **ESLint**



## 启动

<font color="red"> 进入对应的目录启动即可 </font>

### 启动主应用

```sh 

cd main

// 需要装依赖包执行
npm install

// 启动
npm run start
```

### 启动子应用

```sh 
// 如： 启动react18
cd subapp/react18

// 需要装依赖包执行
npm install

// 启动
npm run start
```



### 生产环境
```sh 
npm run pro 
```
将执行此命令后生成的文件拷贝到nignx/html目录下，进行替换


## 本地部署
参考nginx目录
