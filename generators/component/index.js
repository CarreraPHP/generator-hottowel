'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('lodash');
var str = require('underscore.string');
_.mixin(str);

var ComponentGenerator = yeoman.Base.extend({

    constructor: function () {
        this.compName = '';
        this.packageJson = '';

        yeoman.Base.apply(this, arguments);

        this.argument('compName', { type: String, required: true });
        this.argument('packageJson', { type: String, required: false })
        this.compName = _.camelize(_.slugify(_.humanize(this.compName)));

        this.composeWith('ng1-generate:controller', {
            args: [this.compName],
            // arguments: [this.compName]
        });
    },

    prompting: function () {
        // If we passed in the app name, don't prompt the user for it
        // if (this.appName) {
        //     return;
        // }

        var done = this.async();

        var prompts = [];
        
        //below is handled as part of controller....

        // if (!!!this.packageJson) {
        //     prompts.push({
        //         type: 'input',
        //         name: 'packageJson',
        //         message: 'Locate package.json file(relative to pwd):',
        //         default: this.packageJson || './package.json',
        //         store: true
        //     });
        // }

        // this.prompt(prompts, function (answers) {
        //     this.packageJson = answers.packageJson;
        //     this.packageJson = this.packageJson || './package.json';

        //     if(!fs.existsSync(this.packageJson)) {
        //         this.log(chalk.red('unable to locate package.json file at the specified path : ') + chalk.bgYellow(chalk.black('\'' + this.packageJson + '\'')));
        //         // done(new Error('Component are generated inside npm module, use \'npm init\' to generate one...'));
        //     }

        //     done();
        // }.bind(this));

        done();
    },

    initializing: function () {
        
        this.log(yosay(
            'Welcome to ng1-generate:component generator'
        ));
    },

    end: function () {

    },

    componentFiles: function() {
        this.log("This will be running at last by default.....");

        this.fs.copyTpl(this.templatePath('_.component.js'), this.destinationPath(this.compName + '.component.js'), {
            compName: this.compName,
            moduleName: this.moduleName || 'app'
        });
    },

    paths: function() {
        this.log(this.destinationPath('index.js'));
        this.log(this.destinationRoot());

        this.log(this.templatePath('index.js'));
        this.log(this.sourceRoot());

        this.log('package json : ' + this.packageJson);
    }

});

module.exports = ComponentGenerator;