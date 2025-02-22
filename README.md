# img-sight-bead

图片准星软件，基于 https://github.com/electron-vite/electron-vite-vue 模板开发
准星在线制作：https://crosshair.themeta.gg/

---

### 默认快捷键

- `Esc` 应用准星
- `F1` 显示窗口
- `Eenter` 窗口居中

### 本地部署

```sh
# 下载项目
git clone https://github.com/SnhAenIgseAl/img-sight-bead

# 切换目录
cd img-sight-bead

# 安装依赖
npm i

# 启动项目
npm run dev
```

### FAQ

- ###### 如何使用？
1. 打开软件，点击“+”，选择图片
2. 按下键盘“Enter”使准星居中，根据游戏窗口大小，点击右上角“最大化”或“全屏”按钮，按下键盘“Esc”应用准星
3. 点击任务栏软件图标，按下键盘“F1”显示准星窗口

- ###### 软件设置中的token是干嘛的？
  很难想象，上一秒我还在阅读api文档，下一秒picui就被墙了。图床sm imgbb picui不稳定访问，故图片采用本地存储，如需使用请自行本地部署配置图床。token设置请阅读各图床api文档。