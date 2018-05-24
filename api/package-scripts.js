/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, crossEnv, concurrent, rimraf, runInNewWindow } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory
         */
        start: {
            script: 'node dist/app.js',
            description: 'Starts the builded app from the dist directory'
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            script: series(
                'nps banner.serve',
                'nodemon --watch src --watch .env '
            ),
            description: 'Serves the current app and watches for changes to restart it'
        },
        /**
         * Setup of the development environment
         */
        setup: {
            script: series(
                'yarn install'
            ),
            description: 'Setup`s the development environment(yarn & database)'
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(
                runFast('./commands/tsconfig.ts')
            ),
            hiddenFromHelp: true
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps config',
                'nps lint',
                'nps clean.dist',
                'nps transpile',
                'nps copy'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.swagger`,
                    `nps copy.public`
                ),
                hiddenFromHelp: true
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            serve: banner('serve'),
            clean: banner('clean')
        }
    }
};

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        description: `Shows ${name} banners to the console`,
        script: runFast(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyup ${source} ${target}`;
}

function run(path) {
    return `ts-node  ${path}`;
}

function runFast(path) {
    return `ts-node --transpileOnly ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
