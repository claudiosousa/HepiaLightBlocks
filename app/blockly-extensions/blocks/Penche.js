const Penche = {
    init: function () {
        this.appendDummyInput()
            .appendField("Penche")
            .appendField(new Blockly.FieldDropdown([
                [{ "src": "./images/board_top.png", "width": 15, "height": 15 }, "avant"],
                [{ "src": "./images/board_right.png", "width": 15, "height": 15 }, "droite"],
                [{ "src": "./images/board_bottom.png", "width": 15, "height": 15 }, "arriere"],
                [{ "src": "./images/board_left.png", "width": 15, "height": 15 }, "gauche"]]),
                "penche_position");
        this.setOutput(true, "Boolean");
        this.setColour(45);
    },
    python: block => {
        const button = block.getFieldValue('penche_position');
        return [`penche_${button}()`, 1];
    }
};

Blockly.Blocks.Penche = Penche;
Blockly.Python.Penche = Penche.python;
