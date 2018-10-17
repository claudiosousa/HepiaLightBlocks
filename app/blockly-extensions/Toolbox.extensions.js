Blockly.Toolbox.TreeControl.prototype.createNode = (createNodeFn =>
    function(label) {
        const node = createNodeFn.call(this, label);
        node.config_ = {
            ...node.config_,
            cssFileIcon: `tree-node-icon-${label}`
        };
        return node;
    })(Blockly.Toolbox.TreeControl.prototype.createNode);

Blockly.Toolbox.prototype.addColour_ = (addColour_ =>
    function(node) {
        addColour_.call(this, node);
        if (!node || !node.hexColour) return;
        const rowElement = node.getRowElement();
        if (!rowElement) return;
        rowElement.style.color = node.hexColour;
    })(Blockly.Toolbox.prototype.addColour_);
