
'use strict';


goog.provide('LEDImage');

goog.require('Blockly.Field');
goog.require('Blockly.utils');

goog.require('goog.math.Size');

class LEDImage extends Blockly.Field {

    get EDITABLE() {
        return true;
    }
    get CURSOR() {
        return 'pointer';
    }

    static fromJson(options) {
        var src = Blockly.utils.replaceMessageReferences(options['src']);
        var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
        var height =
            Number(Blockly.utils.replaceMessageReferences(options['height']));
        var alt = Blockly.utils.replaceMessageReferences(options['alt']);
        return new LEDImage(src, width, height, alt);
    }

    constructor() {
        super();

        this.sourceBlock_ = null;

        this.height_ = 19 * 10;
        this.width_ = 19 * 10;
        this.size_ = new goog.math.Size(this.width_, this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
        this.text_ = '';
        this.setValue('fancy image');
    }

    init() {
        if (this.fieldGroup_) {
            // Image has already been initialized once.
            return;
        }
        // Build the DOM.
        /** @type {SVGElement} */
        this.fieldGroup_ = Blockly.utils.createSvgElement('g', {
            class: 'image-led-field'
        }, null);
        Blockly.utils.addClass(this.fieldGroup_, 'image-led-field');
        if (!this.visible_) {
            this.fieldGroup_.style.display = 'none';
        }
        /** @type {SVGElement} */
        for (let y = 0; y < 10; y++)
            for (let x = 0; x < 10; x++)
                this.imageElement_ = Blockly.utils.createSvgElement(
                    'rect',
                    {
                        transform: `translate(${x * 19}, ${y * 19})`,
                        class: 'image-led-pixel',
                        'pixel-on': false,
                        height: 15,
                        width: 15,
                        fill: '#A0C9F0',
                        rx: '4'
                    },
                    this.fieldGroup_);

        // this.setValue(123);
        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

        // Configure the field to be transparent with respect to tooltips.
        this.setTooltip(this.sourceBlock_);
        Blockly.Tooltip.bindMouseEvents(this.imageElement_);

        this.maybeAddClickHandler_();

        this.updateEditable();
        this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
        this.render_();
    }

    maybeAddClickHandler_() {
        this.mouseDownWrapper_ =
            Blockly.bindEventWithChecks_(
                this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
    }
    isEditable() {
        return true;
    }
    setValue(src) {
        if (src === null) {
            // No change if null.
            return;
        }
        this.src_ = src;

        // if (this.sourceBlock_ && Blockly.Events.isEnabled() &&
        //     this.colour_ != colour) {
        //     Blockly.Events.fire(new Blockly.Events.BlockChange(
        //         this.sourceBlock_, 'field', this.name, this.colour_, colour));
        // }
        // this.colour_ = colour;
        // if (this.borderRect_) {
        //     this.borderRect_.style.fill = colour;
        // }

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
        this.onClick_(window.event);
    }

    onClick_(e) {
        var cell = e.target;
        cell.style.fill = '#FF0000';

        //this.setValue(colour);
    }
}

Blockly.Field.register('ledImage', LEDImage);

export default LEDImage;
