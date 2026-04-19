# 自定义卡牌图片文件夹

将你自己的卡牌图片放在这里，然后在应用内"配置图片卡池"面板中填入路径即可。

## 目录结构建议

```
user_define_card/
  common/        ← 普通卡图片（出现概率 70%）
  rare/          ← 稀有卡图片（出现概率 25%）
  legendary/     ← 传说卡图片（出现概率  5%）
```

或直接放在当前目录下（不分子文件夹），然后在卡池配置中按路径填写即可，例如：

```
user_define_card/my_card.png
user_define_card/rare_card.jpg
```

## 支持的图片格式

PNG · JPG · JPEG · GIF · WEBP

## 配置方法

1. 打开应用 → 切换到「🃏 卡牌收藏」标签
2. 点击底部「🖼️ 配置图片卡池」展开面板
3. 在对应的稀有度文本框中，每行填写一个图片路径
4. 点击「保存卡池 💾」按钮

路径相对于 `index.html` 所在目录，例如：`user_define_card/my_card.png`
