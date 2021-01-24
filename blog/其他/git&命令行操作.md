> 作为一个程序猿，命令行的操作和 git 的使用是吃饭的本事。一个合格的程序猿应当牢记命令行和 git 基本操作。

# 命令行&git 的常规操作

```
增：
mkdir
touch
echo
删：
rm -rf
改：
cp old-path new-path
mv old-path new-path
```

# git 的初始配置

```
git config --global user.name LinZhihui
git config --global user.email 519403248@qq.com
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "vim"
```

# git 的本地操作

```
git init 本地仓库初始化
git add target 将target放入暂存区
git commit -m "推送" 将暂存区提交至.git仓库
git status -sb 查看当前暂存区状态（红？红M 绿M）
git log 查看历史
```

# Git-Hub 创建仓库

## 空仓库

```
echo "# frontend" >> README.mdr
git init
git add README.mdr
git commit -m "first commit"
git remote add origin git@github.com:xxx.git
git push -u origin master
```

## 本地仓库同步至 Git-Hub

```
git remote add origin git@github.com:xxx.git
git push -u origin master
```

## Git-Hub 同步至本地仓库

```
git clone git@github.com:xxx.git
```

# 分支

## 创建 xxx 分支

```
git branch xxx
```

## 转入 xxx 分支

```
git checkout xxx
```
