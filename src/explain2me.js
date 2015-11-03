// Node.js imports
var fs = require("fs");
var esprima = require("esprima");
var estraverse = require("estraverse");

// Forward Declarations
var Explainer;
var TemplateEngine;

Explainer = function(codeFile) {
    this.codeFile = codeFile;
    this.templateEngine = new TemplateEngine({});

    this.init();
};

Explainer.prototype.init = function() {
    // TODO
};

/**
 * TemplateEngine(ts)
 * Used to generate "human readable" variants of Javascript code.
 * @author Gigabyte Giant (2015)
 */
TemplateEngine = function(templateSpecs) {
    this.templates = templateSpecs;
};

/**
 * TemplateEngine.rewrite(n)
 * Rewrite a parse tree into human readable code, based on templates stored in
 *  TemplateEngine.templates.
 * @author Gigabyte Giant (2015)
 * @param {Object} node: An esprima parse tree node.
 */
TemplateEngine.prototype.rewrite = function(node) {
    // TODO
};