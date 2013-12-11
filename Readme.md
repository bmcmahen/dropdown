
# dropdown

  A simple dropdown menu built using components. 


## Installation

  Using [Component](https://github.com/component/component):

    $ component install bmcmahen/dropdown

  Or use the standalone build located in the `standalone` folder.


## Use
	
  The standard API is similar to Bootstrap and accessed through `data` attributes in your HTML.

```html
<a id='dlabel' href='#' data-dropdown-id='mydropdown'>User Menu</a>
<div id='mydropdown' role='menu' aria-labelledby='dlabel' aria-hidden='true' class='dropdown'>
  <div class='arrow'></div>
  <ul>
    <li><a role='menuitem' tabindex='-1' href='#'> User Settings... </a></li>
    <li><a role='menuitem' tabindex='-1' href='#'> Logout</a></li>
  </ul>
</div>
```

```javascript
require('dropdown');
```
  
  You are encouraged to use `role`, `aria-labelledby` and `aria-hidden` attributes to ensure full accessibility. 

  You can also use the javascript API. 

```javascript
var Dropdown = require('dropdown');
var mine = new Dropdown(anchor, menu);
mine.show();

setTimeout(function(){
  mine.hide();
}, 5000);

mine.on('hide', function(){
  console.log('dropdown is hidden!');
});
```

  If you want to turn off the `data-attribute` api, pass in `false` as the third argument to the constructor. Not ideal -- I know -- and I'm gladly open to API suggestions.



## License

  MIT
