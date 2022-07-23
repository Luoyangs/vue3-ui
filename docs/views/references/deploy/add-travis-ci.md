# 为Github Page集成Travis CI
## 写在前面
为了给编写的vue libs增加一个可预览的demo站点，采用了[Github Pages](https://pages.github.com/), 可以将编译好的静态html上传到github免费部署。

但是每次手动部署都需要在本地先编译vue libs的源码，然后生成demo的内容，最后编译demo才生成静态的html。这中间的过程完全是可复制的，因此可以借助集成工具进行自动化部署。

[Travis CI](https://app.travis-ci.com/)功能强大，操作简单，可以实现类似[GitLab CI/CD](https://docs.gitlab.com/ee/ci/)的功能。

## 使用Travis CI的过程：
- 注册[Travis](https://app.travis-ci.com/)账号, 可以使用github账号登录
- 进入设置页面，"GitHub Apps Integration"点击”Activate“进行github repositories授权，这里会跳转到github
- 输入github密码，会跳转到”settings/installations“
- 这里可以看到Travis CI的配置，”Repository access“里面可以配置你想授权的github project
- 然后点击”Approve and install“
- 稍等一会就可以完成绑定

上面是绑定Travis CI和Github的过程，但是要在项目里面使用Travis CI，还需要给项目添加配置文件.travis.yml
```bash
bunlanguage: node_js
node_js:
  - lts/*
install:
  - yarn install
before_script:
  - rm -rf docs/.vitepress/dist
  - node bin/deploy.js
script:
  - yarn build
  - ENV=prod yarn vitepress build docs
  - node bin/append-meta.js
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vitepress/dist
  github_token: $GITHUB_TOKEN
  keep_history: false
  on:
    branch: master
```

## 配置GITHUB_TOKEN
脚本内容一目了然，唯一需要备注的是变量$GITHUB_TOKEN的配置。
- 进入Github Repository
- 点击右上角头像，进入setting
- 进入"Developer settings"
- 选择”Personal access tokens“
- 点击”Generate new token“，填写一些备注信息，然后点击”Generate token“
- 复制生成的token, 进入”Travis CI“
- 选择需要配置的项目，点击”More options“进入”settings“
- 选择"Environment Variables"，添加一条配置，name是GITHUB_TOKEN，value就是你复制的token, 点击”add“保存
- 回到项目，重新提交代码到”master“分支，就会看到Travis CI开始工作了。
- Travis CI成功后，你会看到github project下面多了一个”gh-pages“的分支，里面就是Travis CI 编译的静态html.

## 启用Github Pages
github page可以是html也可以是.md格式的内容。这里我们主要配置html格式的站点。
- 进入github project的”setting“
- 选择”pages“, 可以看到GitHub Pages
- 在”Source“里面可以配置GitHub Pages的源码仓库
- 这里我们直接选择刚刚Travis CI自动部署生成的gh-pages的根目录
- 可以选择主题，我们这里是自己设置网站样式，就不用它的主题了
- 然后点击save就可以完成, 会看到github给你生成的url
- github pages会自动部署
