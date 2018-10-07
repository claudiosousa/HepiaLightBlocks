
'use strict';

import { COLORS_LETTERS, COLUMNS, LINES } from '../Constants.js'

goog.provide('LedImageField');
goog.require('Blockly.Field');
goog.require('Blockly.utils');
goog.require('goog.math.Size');

export default class LedImageField extends Blockly.Field {

    get EDITABLE() {
        return true;
    }
    get CURSOR() {
        return 'pointer';
    }

    static fromJson(options) {
        var src = Blockly.utils.replaceMessageReferences(options['src']);
        var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
        var height = Number(Blockly.utils.replaceMessageReferences(options['height']));
        var alt = Blockly.utils.replaceMessageReferences(options['alt']);
        return new LedImage(src, width, height, alt);
    }

    constructor() {
        super();

        this.sourceBlock_ = null;

        this.height_ = 19 * LINES;
        this.width_ = 19 * COLUMNS;
        this.size_ = new goog.math.Size(this.width_, this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
        this.text_ = '';
        this.setValue('fancy image');
    }

    init() {
        this.colorArray = Array(LINES * COLUMNS).fill('.');
        if (this.fieldGroup_) {
            // Image has already been initialized once.
            return;
        }
        // Build the DOM.
        /** @type {SVGElement} */
        this.fieldGroup_ = Blockly.utils.createSvgElement('g', {
            class: 'image-led-field'
        }, null);

        this.getColor();

        this.buildUI();

        // Configure the field to be transparent with respect to tooltips.
        this.setTooltip(this.sourceBlock_);
        //Blockly.Tooltip.bindMouseEvents(this.imageElement_);

        this.maybeAddClickHandler_();

        this.updateEditable();
        this.render_();
    }

    getColor() {
        // try to find a color field in the block
        if (this.colorField === undefined) {
            this.colorField = null;
            for (let input of this.sourceBlock_.inputList) {
                for (let field of input.fieldRow) {
                    if (field instanceof Blockly.FieldColour) {
                        this.colorField = field;
                        break;
                    }
                }
            }
        }
        if (!this.colorField)
            return '#ff0000';
        return this.colorField.getValue();
    }

    buildUI() {
        Blockly.utils.addClass(this.fieldGroup_, 'image-led-field');
        if (!this.visible_) {
            this.fieldGroup_.style.display = 'none';
        }
        /** @type {SVGElement} */
        for (let y = 0; y < 10; y++)
            for (let x = 0; x < 10; x++)
                Blockly.utils.createSvgElement(
                    'rect',
                    {
                        transform: `translate(${x * 19}, ${y * 19})`,
                        class: 'image-led-pixel',
                        'pixel-on': false,
                        index: y * 10 + x,
                        height: 15,
                        width: 15,
                        fill: '#A0C9F0',
                        rx: '4'
                    },
                    this.fieldGroup_);

        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    }

    maybeAddClickHandler_() {
        this.mouseDownWrapper_ =
            Blockly.bindEventWithChecks_(
                this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
    }
    isEditable() {
        return true;
    }

    setValue(colorArray) {
        if (colorArray === null) {
            return;
        }

        if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
            Blockly.Events.fire(new Blockly.Events.BlockChange(
                this.sourceBlock_, 'field', this.name, this.colorArray, colorArray));
        }
        this.colorArray = colorArray;
    }

    dispose() {
        if (this.fieldGroup_) {
            Blockly.utils.removeNode(this.fieldGroup_);
            this.fieldGroup_ = null;
        }
    }

    setTooltip(newTip) {
    }

    getValue() {
        return this.colorArray;
    }

    setText(alt) {
        if (alt === null) {
            // No change if null.
            return;
        }
        this.text_ = alt;
    }

    render_() {
        // NOP
    }

    forceRerender() {
        // NOP
    }
    updateWidth() {
        // NOP
    }

    showEditor_() {
        this.onClick_(window.event);
    }

    updateColorArray(index, color) {
        let colorArray = this.getValue();
        colorArray[index] = color ? COLORS_LETTERS[color] : '.';
        this.setValue(colorArray);
    }

    onClick_(e) {
        var cell = e.target;
        if (cell.className.baseVal != 'image-led-pixel')
            return;
        let fillColor = null;
        if (!cell.style.fill)
            fillColor = this.getColor();
        cell.style.fill = fillColor;

        this.updateColorArray(Number(cell.attributes.index.value), fillColor);
    }
}

Blockly.Field.register('LedImageField', LedImageField);

