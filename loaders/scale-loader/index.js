var sharp = require('sharp');
var loaderUtils = require('loader-utils');

module.exports = function(content) {

    this.cacheable();

    var config = loaderUtils.getLoaderConfig(this, "scaleLoader");

    var callback = this.async();

    sharp(content).resize(parseInt(config.size, 10)).progressive().toBuffer((err, buffer) => {
        callback(err, buffer);
    })
}

module.exports.raw = true;