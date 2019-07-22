cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-pdf-generator/www/pdf.js",
        "id": "cordova-pdf-generator.pdf",
        "pluginId": "cordova-pdf-generator",
        "clobbers": [
            "cordova.plugins.pdf",
            "pugin.pdf",
            "pdf"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-pdf-generator": "2.0.8"
}
// BOTTOM OF METADATA
});