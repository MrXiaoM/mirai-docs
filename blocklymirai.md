---
description: BlocklyMirai - 不会编程人士的福音
---

# BlocklyMirai 帮助

## 使用者

暂无内容

## 开发者

积木块列表： `blockly/javascript/blocks.js`

根据积木块生成代码：`blockly/javascript/mirai.js`

积木块格式示例：
 ```javascript
	Blockly.Blocks['onenable'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("插件启用时执行");
			this.appendStatementInput("content")
				.setCheck(null);
			this.setColour(230);
			this.setTooltip("");
			this.setHelpUrl("");
			this.setDeletable(false);
 			this.contextMenu = false;
			this.imports = ['net.mamoe.mirai.event.GlobalEventChannel'];
		}
	};
 ```

其中 `onenable` 是这个而积木块的 ID，数组 `imports` 的内容会在导出代码的时候添加到代码文件开头的 import 中。避免之后维护困难，请务必在 `// BlocklyMirai START` 和 `// BlocklyMirai END` 之间写。添加积木块之后要把积木块添加的工具箱才能给用户使用，这时需要编辑 `index.html`，mirai 的工具箱分类在最后面，以 `<block type="积木块ID"</block` 的格式来填。

生成代码格式示例：
 ```javascript
  Blockly.Mirai['onenable'] = function(block) {
    var statements_content = Blockly.Mirai.statementToCode(block, 'content');

    return '@Override\n' +
        Blockly.Mirai.INDENT + 'public void onEnable() {\n' +
        statements_content + '\n' +
        Blockly.Mirai.INDENT + Blockly.Mirai.INDENT + 'GlobalEventChannel.INSTANCE.registerListenerHost(this);\n' +
        Blockly.Mirai.INDENT + '}';
  };
 ```

没什么好说的，说起来太复杂了，去看帮助文档吧

[blockly 创建自定义积木块的帮助文档](https://developers.google.cn/blockly/guides/create-custom-blocks/overview) 

[在线积木块编辑器(静态网页，可以在 blockly 的仓库里找到)](https://google.github.io/blockly/demos/blockfactory)

具体的积木块开发文档之后会写
