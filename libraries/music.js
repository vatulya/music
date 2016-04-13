"use strict";

const recursive = require('recursive-readdir');
const _ = require('underscore');

class Music {

    constructor(path) {
        this.path = path;
    }

    getBands() {
        return new Promise((fulfill, reject) => {
            let bands = [];

            this.getFiles()
                .then((files) => {
                    files.forEach((file) => {
                        let band = file;
                        band = band.replace(this.path, '');
                        band = band.split(' - ', 2);
                        band = band[0];
                        if (/[^0-9]/.test(band)) {
                            bands.push(band);
                        }
                    });

                    bands = _.unique(bands);
                    fulfill(bands);
                })
                .catch(reject);
        });
    }

    getFiles() {
        return new Promise((fulfill, reject) => {
            recursive(this.path, [this.getFilesFilter()], (err, files) => {
                if (err) {
                    return reject(err);
                }

                return fulfill(files);
            });
        });
    }

    getFilesFilter() {
        return function (file, stats) {
            if (stats.isDirectory()) {
                return false;
            }

            let relativePath = file;
            let parts;
            let filename;

            relativePath.replace(this.path, '');
            parts = relativePath.split('\\');
            filename = parts[parts.length - 1];

            return !/^.+ - .+\.(mp3|flac|wma)/i.test(filename);
        }.bind(this);
    }

}

module.exports = Music;