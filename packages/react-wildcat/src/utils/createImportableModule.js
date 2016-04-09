const path = require("path");
const fs = require("fs-extra");
const logCreateSuccess = require("./logCreateSuccess");

function buildImportableModule(origin, moduleBinPath) {
    return `module.exports = "${origin}/${moduleBinPath}";`;
}

module.exports = function createImportableModule(options, resolve, reject) {
    "use strict";

    const root = options.root;
    const origin = options.origin;

    const logger = options.logger;
    const logLevel = options.logLevel;

    const pathOptions = options.pathOptions;
    const modulePath = pathOptions.modulePath;
    const moduleSourcePath = pathOptions.moduleSourcePath;
    const moduleBinPath = pathOptions.moduleBinPath;
    const relativePath = pathOptions.relativePath;

    const temporaryCache = options.temporaryCache;
    const binaryToModule = options.binaryToModule;

    const importableModule = buildImportableModule(origin, moduleBinPath);

    Promise.all([
        binaryToModule ? new Promise(function importablePromise(resolveImportable, rejectImportable) {
            const res = {
                type: "application/x-es-module",
                length: importableModule.length,
                body: importableModule,
                status: 200
            };

            fs.createOutputStream(modulePath)
                .on("error", function importableStreamError(outputErr) {
                    logger.error(outputErr);
                    return rejectImportable(outputErr);
                })
                .on("finish", function importableStreamFinish() {
                    return resolveImportable(res);
                })
                .end(importableModule);
        }) : Promise.resolve(),

        new Promise(function binaryPromise(resolveBinary, rejectBinary) {
            fs.createReadStream(path.join(root, moduleSourcePath))
                .pipe(
                    fs.createOutputStream(moduleBinPath)
                        .on("open", function binaryStreamOpen() {
                            if (logLevel > 1) {
                                logger.meta(logCreateSuccess(relativePath));
                            }
                        })
                        .on("error", function binaryStreamError(outputErr) {
                            logger.error(outputErr);
                            return rejectBinary(outputErr);
                        })
                        .on("finish", function binaryStreamFinish() {
                            return resolveBinary(moduleBinPath);
                        })
                );
        })
    ])
        .then(function promiseResolve(promises) {
            if (temporaryCache) {
                // Disk write complete, delete the temporary cache
                temporaryCache.delete(modulePath);
            }

            return resolve(promises[0]);
        })
        .catch(function promiseError(err) {
            if (temporaryCache) {
                // Disk write error, delete the temporary cache
                temporaryCache.delete(modulePath);
            }

            return reject(err);
        });
};
