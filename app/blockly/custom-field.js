
'use strict';

goog.provide('Blockly.FieldImage2');

goog.require('Blockly.Field');
goog.require('Blockly.utils');

goog.require('goog.math.Size');


/**
 * Class for an image on a block.
 * @param {string} src The URL of the image.
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @param {Function=} opt_onClick Optional function to be called when the image
 *     is clicked.  If opt_onClick is defined, opt_alt must also be defined.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldImage2 = function(src, width, height, opt_alt, opt_onClick) {
  this.sourceBlock_ = null;

  // Ensure height and width are numbers.  Strings are bad at math.
  this.height_ = Number(height);
  this.width_ = Number(width);
  this.size_ = new goog.math.Size(this.width_,
      this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
  this.text_ = opt_alt || '';
  this.setValue(src);

  if (typeof opt_onClick == 'function') {
    this.clickHandler_ = opt_onClick;
  }
};
goog.inherits(Blockly.FieldImage2, Blockly.Field);

/**
 * Construct a FieldImage2 from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (src, width, height, and
 *                          alt).
 * @returns {!Blockly.FieldImage2} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldImage2.fromJson = function(options) {
  var src = Blockly.utils.replaceMessageReferences(options['src']);
  var width = Number(Blockly.utils.replaceMessageReferences(options['width']));
  var height =
      Number(Blockly.utils.replaceMessageReferences(options['height']));
  var alt = Blockly.utils.replaceMessageReferences(options['alt']);
  return new Blockly.FieldImage2(src, width, height, alt);
};

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldImage2.prototype.EDITABLE = false;

/**
 * Install this image on a block.
 */
Blockly.FieldImage2.prototype.init = function() {
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
  this.imageElement_ = Blockly.utils.createSvgElement(
      'image',
      {
        'height': this.height_ + 'px',
        'width': this.width_ + 'px'
      },
      this.fieldGroup_);
  this.setValue(this.src_);
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  // Configure the field to be transparent with respect to tooltips.
  this.setTooltip(this.sourceBlock_);
  Blockly.Tooltip.bindMouseEvents(this.imageElement_);

  this.maybeAddClickHandler_();
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldImage2.prototype.dispose = function() {
  if (this.fieldGroup_) {
    Blockly.utils.removeNode(this.fieldGroup_);
    this.fieldGroup_ = null;
  }
  this.imageElement_ = null;
};

/**
 * Bind events for a mouse down on the image, but only if a click handler has
 * been defined.
 * @private
 */
Blockly.FieldImage2.prototype.maybeAddClickHandler_ = function() {
  if (this.clickHandler_) {
    this.mouseDownWrapper_ =
        Blockly.bindEventWithChecks_(
            this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
  }
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Blockly.FieldImage2.prototype.setTooltip = function(newTip) {
  this.imageElement_.tooltip = newTip;
};

/**
 * Get the source URL of this image.
 * @return {string} Current text.
 * @override
 */
Blockly.FieldImage2.prototype.getValue = function() {
  return this.src_;
};

/**
 * Set the source URL of this image.
 * @param {?string} src New source.
 * @override
 */
Blockly.FieldImage2.prototype.setValue = function(src) {
  if (src === null) {
    // No change if null.
    return;
  }
  this.src_ = src;
  if (this.imageElement_) {
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', src || '');
  }
};

/**
 * Set the alt text of this image.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldImage2.prototype.setText = function(alt) {
  if (alt === null) {
    // No change if null.
    return;
  }
  this.text_ = alt;
};

/**
 * Images are fixed width, no need to render.
 * @private
 */
Blockly.FieldImage2.prototype.render_ = function() {
  // NOP
};

/**
 * Images are fixed width, no need to render even if forced.
 */
Blockly.FieldImage2.prototype.forceRerender = function() {
  // NOP
};

/**
 * Images are fixed width, no need to update.
 * @private
 */
Blockly.FieldImage2.prototype.updateWidth = function() {
  // NOP
};

/**
 * If field click is called, and click handler defined,
 * call the handler.
 */
Blockly.FieldImage2.prototype.showEditor_ = function() {
  if (this.clickHandler_) {
    this.clickHandler_(this);
  }
};

Blockly.Field.register('field_image2', Blockly.FieldImage2);
