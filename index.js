/**
 * Module dependencies
 */

var Emitter = require('emitter');
var classes = require('classes');
var events = require('events');
var delegate = require('delegate');
var prevent = require('prevent');
var attr = require('attr');
var stop = require('stop');

var currentDropdown, isBound;

/**
 * Expose
 */

exports = module.exports = DropDown;

/**
 * Dropdown Constructor
 * @param {Element} anchor 
 * @param {Element} el     
 */

function DropDown(anchor, el){
  if (!(this instanceof DropDown)) return new DropDown(anchor, el);
  if (currentDropdown) currentDropdown.hide();
  currentDropdown = this;
  this.el = el;
  this.focus = this.el.querySelector('[tabindex = "-1"]');
  this.anchor = anchor;
  this.isShown = false;
  this.autohide = true;
}

Emitter(DropDown.prototype);

/**
 * Bind events
 * @return {DropDown}
 */

DropDown.prototype.bind = function(){
  this.windowEvents = events(window, this);
  this.windowEvents.bind('resize', 'setPosition');
  this.windowEvents.bind('scroll', 'hide');
  this.docEvents = events(document, this);
  this.docEvents.bind('keyup');
  var self = this;
  setTimeout(function(){
    self.bodyEvents = events(document.body, self);
    self.bodyEvents.bind('click', 'testClose');
  }, 0);
  return this;
};

/**
 * testClose (is this necessary? or should we auto hide?)
 * @param {Event} e 
 * @return {DropDown} 
 */

DropDown.prototype.testClose = function(e){
  var t = e.target;
  if (classes(t).has('showing-dropdown')){
    prevent(e);
    stop(e);
  }
  var self = this;
  setTimeout(function(){
    if (self.autohide) self.hide();
  }, 0);  
  return this;
};

/**
 * Unbind events
 * @return {Dropdown} 
 */

DropDown.prototype.unbind = function(){
  this.windowEvents.unbind();
  this.docEvents.unbind();
  this.bodyEvents.unbind();
  return this;
}

/**
 * onkeyup listen for escape
 * @param  {Event} e 
 */

DropDown.prototype.onkeyup = function(e){
  if (e.keyCode == 27) this.hide();
};

/**
 * set position of dropdown
 * @return {DropDown} 
 */

DropDown.prototype.setPosition = function(){
  var pos = this.anchor.getBoundingClientRect();
  var style = this.el.style;
  style.top = pos.bottom + 'px';
  // eventually check to make sure that it's on the screen?
  style.left = (pos.left + (pos.right - pos.left) / 2) + 'px';
  return this;
};

/**
 * show the dropdown
 * @return {DropDown} 
 */

DropDown.prototype.show = function(){
  if (this.isShown) return;
  this.setPosition();
  attr(this.el).set('aria-hidden', false);
  classes(this.anchor).add('showing-dropdown');
  classes(this.el).add('in');
  this.isShown = true;
  this.bind();
  if (this.focus) this.focus.focus(); 
  this.emit('show');
  return this;
};

/**
 * hide the dropdown
 * @return {DropDown} 
 */

DropDown.prototype.hide = function(){
  if (!this.isShown) return;
  this.unbind();
  attr(this.el).set('aria-hidden', true);
  classes(this.anchor).remove('showing-dropdown');
  classes(this.el).remove('in');
  this.isShown = false;
  this.emit('hide');
  if (this.focus) this.anchor.focus();
  currentDropdown = null;
  return this;
};

/**
 * enable the [data-dropdown-id] api
 * @return {Delegation} 
 */

exports.listen = function(){
  if (isBound) return;
  isBound = true;
  return delegate.bind(document, '[data-dropdown-id]', 'click', function(e){
    prevent(e);
    var anchor = e.delegateTarget;
    if (classes(anchor).has('showing-dropdown')) return;
    var _id = attr(anchor).get('data-dropdown-id');
    var menu = document.getElementById(_id);
    if (menu) {
      var dd = new DropDown(anchor, menu);
      dd.show();
    }
  });
};


exports.currentDropdown = currentDropdown;

