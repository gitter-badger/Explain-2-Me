// Node.js imports
var fs = require("fs");
var esprima = require("esprima");
var estraverse = require("estraverse");

// Forward Declarations
var Explainer;

// Template Spec
var templates = {
    "VariableDeclarator": function(node) {
        var template = "Declare a new variable called \"{varName}\", and set it's value to \"{varVal}\"";
        return template
            .replace("{varName}", node.id.name)
            .replace("{varVal}", node.init.value);
    }
};

Explainer = function(code) {
    this.userCode = code;
    this.templates = templates;
    this.abstractSyntaxTree = null;
};

Explainer.prototype.explain = function(node) {
    // TODO: Make this recursive, maybe?
    if (this.templates.hasOwnProperty(node.type)) {
        console.log(this.templates[node.type](node));
    }
};

Explainer.prototype.run = function() {
    this.abstractSyntaxTree = esprima.parse(this.userCode);

    if (this.abstractSyntaxTree !== null) {
        var self = this;
        estraverse.traverse(this.abstractSyntaxTree, {
            enter: function(node) {
                console.log(node.type);

                switch (node.type) {
                    case "VariableDeclarator":
                        self.explain(node);
                        break;
                    default:
                        break;
                }
            }
        });
    }
};

var removeSpareLines = function(code) {
    var actualCode = [];

    for (var i = 0; i < code.split("\n").length; i++) {
        if (code.split("\n")[i] !== "") {
            actualCode.push(code.split("\n")[i]);
        }
    }

    return actualCode.join("\n");
};

fs.readFile("testCode.js", "utf8", function(error, code) {
    if (error) {
        throw error;
    } else {
        if (code.length > 0) {
            console.log(code);

            var myExplainer = new Explainer(removeSpareLines(code));
            myExplainer.run();
        }
    }
});