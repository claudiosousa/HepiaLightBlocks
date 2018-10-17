Blockly.Toolbox.TreeControl.prototype.createNode = (createNodeFn =>
    function(label) {
        const node = createNodeFn.call(this, label);
        // node.config_.cssItem = "AAAAAAAAAAAAAAAAAAAAAAA";
        // debugger;
        return node;
    })(Blockly.Toolbox.TreeControl.prototype.createNode);
