cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-pdf-generator.pdf",
      "file": "plugins/cordova-pdf-generator/www/pdf.js",
      "pluginId": "cordova-pdf-generator",
      "clobbers": [
        "cordova.plugins.pdf",
        "pugin.pdf",
        "pdf"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-pdf-generator": "2.0.8"
  };
});