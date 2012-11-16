/**
 * 
 * Super simple vanilla JS dropdown menu
 * inspired by Bootstrap, uikit.
 * 
 */

// XXX need way of closing other opened menus when
// clicking new menu. 


// API (not much of one, yet...)
// return the dropdown menu object, and automatically setup event handler
module.exports = function(selector){
	return new Dropdown(document.querySelector(selector))._toggleClick();
}

// Keep track of opened dropdown so that we can close it
// if another dropdown trigger is clicked.
var openDropdown = null;

// Constructor
var Dropdown = function(element){
	this.element = element; 
	this.parent = element.parentNode; 
	this.list = this.parent.querySelector('.dropdown-menu');
	this.isShown = false; 
}

// Functions
Dropdown.prototype = {

	// Either show or hide, depending on currentState
	toggle: function(){
		this.isShown ? this.hide() : this.show(); 
	},

	// Hide the element, and remove window event listener
	hide: function(){
		var self = this
			, parent = self.parent
			, list = self.list; 

		if (!this.isShown)
			return

		openDropdown = null; 
		self._removeEvents(); 

		self.isShown = false; 
		parent.className = parent.className.replace( /(?:^|\s)open(?!\S)/g , '' )
		list.setAttribute('aria-hidden', true);

		return this; 
	},

	// Show element, and add window event listener
	show: function(){
		var self = this
			, parent = self.parent
			, list = self.list; 

		if (openDropdown)
			openDropdown.hide(); 

		openDropdown = self; 
		self._addEvents(); 

		if (self.isShown)
			return

		self.isShown = true; 

		parent.className += ' open';
		list.setAttribute('aria-hidden', false);
		var toFocus = list.querySelector('[tabindex = "-1"]');
		if (toFocus)
			toFocus.focus(); 

		return this; 
	},

	// Primary event handler for clicking trigger element
	_toggleClick: function(){
		var self = this
			, el = self.element; 

		el.onclick = function(e){
			self.toggle();
			e.stopPropagation(); 
			e.preventDefault(); 
			return false; 
		}

		return this; 
	},

	// Add event handler for clicking on the window, to close dropdown.
	_addEvents: function(){
		var self = this;
		self.htmlEvent = document.querySelector('html');
		self.htmlEvent.onclick = function(){
			self.hide(); 
		};
	},

	// Remove the window event handler, so it doesnt keep firing
	// when the dropdown isnt shown. XXX potential conflict here?
	_removeEvents: function(){
		this.htmlEvent.onclick = null; 
	}
}