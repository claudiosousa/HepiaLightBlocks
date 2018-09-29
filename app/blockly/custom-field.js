
'use strict';


goog.provide('LEDImage');

goog.require('Blockly.Field');
goog.require('Blockly.utils');

goog.require('goog.math.Size');

class LEDImage extends Blockly.Field {

    static get EDITABLE() {
        return false;
    }

    static fromJson(options) {
        var src = Blockly.utils.replaceMessageReferences(options['src']);
        var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
        var height =
            Number(Blockly.utils.replaceMessageReferences(options['height']));
        var alt = Blockly.utils.replaceMessageReferences(options['alt']);
        return new LEDImage(src, width, height, alt);
    }

    constructor(src, opt_alt) {
        super();

        this.sourceBlock_ = null;

        // Ensure height and width are numbers.  Strings are bad at math.
        this.height_ = 19 * 10;
        this.width_ = 19 * 10;
        this.size_ = new goog.math.Size(this.width_,
            this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
        this.text_ = opt_alt || '';
        this.setValue(src);
        //goog.inherits(LEDImage, Blockly.Field);
    }

    init() {
        if (this.fieldGroup_) {
            // Image has already been initialized once.
            return;
        }
        // Build the DOM.
        /** @type {SVGElement} */
        this.fieldGroup_ = Blockly.utils.createSvgElement('g', {}, null);
        if (!this.visible_) {
            this.fieldGroup_.style.display = 'none';
        }
        /** @type {SVGElement} */
        for (let y = 0; y < 10; y++)
            for (let x = 0; x < 10; x++)
                this.imageElement_ = Blockly.utils.createSvgElement(
                    'rect',
                    {
                        transform:`translate(${x*19}, ${y*19})`,
                        class: 'blocklyLedOff',
                        height: 15,
                        width: 15,
                        fill: '#A0C9F0',
                        rx: '4'
                    },
                    this.fieldGroup_);

        this.setValue(this.src_);
        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

        // Configure the field to be transparent with respect to tooltips.
        this.setTooltip(this.sourceBlock_);
        Blockly.Tooltip.bindMouseEvents(this.imageElement_);

        this.maybeAddClickHandler_();
    }

    maybeAddClickHandler_() {
        if (this.clickHandler_) {
            this.mouseDownWrapper_ =
                Blockly.bindEventWithChecks_(
                    this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
        }
    }

    setValue(src) {
        if (src === null) {
            // No change if null.
            return;
        }
        this.src_ = src;
        if (this.imageElement_) {
            this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
                'xlink:href', src || '');
        }
    }

    dispose() {
        if (this.fieldGroup_) {
            Blockly.utils.removeNode(this.fieldGroup_);
            this.fieldGroup_ = null;
        }
        this.imageElement_ = null;
    }

    setTooltip(newTip) {
        this.imageElement_.tooltip = newTip;
    }

    getValue() {
        return this.src_;
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
        if (this.clickHandler_) {
            this.clickHandler_(this);
        }
    }
}

Blockly.Field.register('field_image2', LEDImage);

export default LEDImage;
