/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-cli-font-awesome',

  init: function(app) {

    // Enable ES7 decorators via Babel
    // https://www.npmjs.com/package/ember-computed-decorators#setup-with-addon
    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.optional = this.options.babel.optional || [];
    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators');
    }

  },

  included: function(app, parentAddon) {

    // Quick fix for add-on nesting
    // https://github.com/ember-cli/ember-cli/issues/3718
    // https://github.com/aexmachina/ember-cli-sass/blob/v5.3.0/index.js#L73-L75
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app;
    }


    // https://github.com/ember-cli/ember-cli/issues/3718#issuecomment-88122543
    this._super.included.call(this, app);


    // Per the ember-cli documentation
    // http://ember-cli.com/extending/#broccoli-build-options-for-in-repo-addons
    var target = (parentAddon || app);
    var options = target.options.emberCliFontAwesome || {};


    var faPath = path.join(target.bowerDirectory, 'font-awesome');
    var cssPath = path.join(faPath, 'css');
    var fontsPath = path.join(faPath, 'fonts');


    // Make sure font-awesome is available
    if (!fs.existsSync(faPath)) {
      throw new Error(
        this.name + ': font-awesome is not available from bower (' + faPath + '), ' +
        'install it into your project by running `bower install font-awesome --save`'
      );
    }


    if (!('includeFontAwesomeAssets' in options)) {
      options.includeFontAwesomeAssets = true;
    }

    if (options.includeFontAwesomeAssets) {
      if (!options.useScss) {
        target.import(path.join(cssPath, 'font-awesome.css'));
      }

      target.import(path.join(fontsPath, 'fontawesome-webfont.eot'), { destDir: 'fonts' });
      target.import(path.join(fontsPath, 'fontawesome-webfont.svg'), { destDir: 'fonts' });
      target.import(path.join(fontsPath, 'fontawesome-webfont.ttf'), { destDir: 'fonts' });
      target.import(path.join(fontsPath, 'fontawesome-webfont.woff'), { destDir: 'fonts' });
      target.import(path.join(fontsPath, 'fontawesome-webfont.woff2'), { destDir: 'fonts' });
      target.import(path.join(fontsPath, 'FontAwesome.otf'), { destDir: 'fonts' });
    }

  }

};
