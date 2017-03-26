'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tests = new Module('tests');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tests.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  Tests.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Tests.menus.add({
    title: 'tests example page',
    link: 'tests example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tests.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tests.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tests.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Tests;
});
