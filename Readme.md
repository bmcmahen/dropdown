
# dropdown

  A simple dropdown menu built using components. 


## Installation

  Using [Component](https://github.com/component/component):

    $ component install bmcmahen/dropdown

  Or use the standalone build located in the `standalone` folder.


## Use
	
  You can enable the html API, which is similar to Bootstrap and accessed through `data` attributes, by calling `listen`.

```javascript
require('dropdown').listen();
```

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

## License

  MIT
