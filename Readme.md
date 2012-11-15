
# dropdown

  A simple dropdown menu written in vanilla javascript, with structural styling. Inspired by Bootstrap.

## Installation

		Install Component through NPM:

		$ npm install component

		Go to your directory and install this component:

    $ component install bmcmahen/dropdown
    $ component build

    The beauty of Component is that you can install multiple modules and easily build them into one file. 

    $ component install bmcmahen/modal
    $ component install bmcmahen/notification
    $ component build

## Use
	
Use HTML like you would use for the Bootstrap dropdown menu.

```javascript

	<div class='dropdown'>
		<a class='dropdown-toggle' href='#' role='button'>dropdown</a>
		<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel'>
			<li><a tabindex='-1' href='#'>Action</a></li>
			<li><a tabindex='-1' href='#'>Another action</a></li>
			<li class='divider'></li>
			<li><a tabindex='-1' href='#'>Separated link</a></li>
		</ul>
	</div>

```

Import the dropdown class, and pass in the selector string of your trigger element.

```javascript

	var dropdown = require('dropdown');
	var myDropdown = dropdown('a.dropdown-toggle');

```

Clicking the link should show the dropdown menu. You can also use a few methods:

```javascript
myDropdown.show();
myDropdown.hide();
myDropdown.toggle(); 
```

## License

  MIT
