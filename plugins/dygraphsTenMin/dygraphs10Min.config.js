(function () {
  'use strict';

  angular
  .module('charts.dygraphs10Min', [])
  .config(configure);

  /* @ngInject */
  function configure(
    c8yNavigatorProvider,
    c8yViewsProvider,
    gettext
  ) {
    c8yNavigatorProvider.addNavigation({ // adds a menu item to the navigator with ...
      parent: gettext('Charts'), // ... the category *"Settings"*
      name: gettext('Dygraphs 10 Min'), // ... the name *"Weather"*
      path: 'dygraphs_min', // ... */weather* as path
      icon: 'cloud' // ... the cloud icon (icons are provided by the great Font Awesome library and you can use any of their [icon names](http://fontawesome.io/icons/) without the *fa-* prefix here
    });

    c8yViewsProvider.when('/dygraphs_min', { // when the path "/weather" is accessed ...
      templateUrl: ':::PLUGIN_PATH:::/views/dygraphs10Min.html' //  ... display our html file "weatherAdmin.html" inside the "views" folder of our plugin (the plugin's folder is represented using the magic string ```:::PLUGIN_PATH:::```, which is replaced by the actual path during the build process)
    });
  }
}());
