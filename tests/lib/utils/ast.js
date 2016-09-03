/**
 * @file    Tests for AST helper functions
 * @author  Casey Visco <cvisco@gmail.com>
 */

"use strict";

const assert = require("assert");
const ast = require("../../../lib/utils/ast");

describe("ast.isIdentifier", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isIdentifier();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isIdentifier({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `Identifier`", function () {
        const actual = ast.isIdentifier({ type: "Literal" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an Identifier", function () {
        const actual = ast.isIdentifier({ type: "Identifier" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isLiteral", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isLiteral();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isLiteral({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `Literal`", function () {
        const actual = ast.isLiteral({ type: "Identifier" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is a `Literal`", function () {
        const actual = ast.isLiteral({ type: "Literal" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isStringLiteral", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isStringLiteral();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isStringLiteral({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `value` attribute", function () {
        const actual = ast.isStringLiteral({ type: "Literal" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `Literal`", function () {
        const actual = ast.isStringLiteral({ type: "Identifier" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `value` type other than `string`", function () {
        const actual = ast.isStringLiteral({ type: "Identifier", value: 5 });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is a `Literal` with a `string` value", function () {
        const actual = ast.isStringLiteral({ type: "Literal", value: "foobar" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isArrayExpr", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isArrayExpr();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isArrayExpr({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `ArrayExpression`", function () {
        const actual = ast.isArrayExpr({ type: "foobar" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an `ArrayExpression`", function () {
        const actual = ast.isArrayExpr({ type: "ArrayExpression" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isObjectExpr", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isObjectExpr();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isObjectExpr({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `ObjectExpression`", function () {
        const actual = ast.isObjectExpr({ type: "foobar" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an `ObjectExpression`", function () {
        const actual = ast.isObjectExpr({ type: "ObjectExpression" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isFunctionExpr", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isFunctionExpr();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isFunctionExpr({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `FunctionExpression`", function () {
        const actual = ast.isFunctionExpr({ type: "foobar" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an `FunctionExpression`", function () {
        const actual = ast.isFunctionExpr({ type: "FunctionExpression" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isMemberExpr", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isMemberExpr();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isMemberExpr({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `MemberExpression`", function () {
        const actual = ast.isMemberExpr({ type: "foobar" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an `MemberExpression`", function () {
        const actual = ast.isMemberExpr({ type: "MemberExpression" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isExprStatement", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isExprStatement();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isExprStatement({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node contains a `type` other than `ExpressionStatement`", function () {
        const actual = ast.isExprStatement({ type: "foobar" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node is an `ExpressionStatement`", function () {
        const actual = ast.isExprStatement({ type: "ExpressionStatement" });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.isStringLiteralArray", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.isStringLiteralArray();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `type` attribute", function () {
        const actual = ast.isStringLiteral({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node `type` is not an `ArrayExpression`", function () {
        const actual = ast.isStringLiteralArray({ type: "FunctionExpression" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain an `elements` attribute", function () {
        const actual = ast.isStringLiteralArray({ type: "ArrayExpression" });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node `elements` contains non-string values", function () {
        const actual = ast.isStringLiteralArray({
            type: "ArrayExpression",
            elements: [
                { type: "Literal", value: "a" },
                { type: "Literal", value: null },
                { type: "Literal", value: 5 }
            ]
        });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if node `elements` contains only string values", function () {
        const actual = ast.isStringLiteralArray({
            type: "ArrayExpression",
            elements: [
                { type: "Literal", value: "a" },
                { type: "Literal", value: "b" },
                { type: "Literal", value: "c" }
            ]
        });
        const expected = true;

        assert.equal(actual, expected);
    });

    it("should return `true` if node `elements` is empty", function () {
        const actual = ast.isStringLiteralArray({
            type: "ArrayExpression",
            elements: []
        });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.hasParams", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.hasParams();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `params` attribute", function () {
        const actual = ast.hasParams({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if `params` is empty", function () {
        const actual = ast.hasParams({ params: [] });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node has at least one param", function () {
        const actual = ast.hasParams({
            params: [{ type: "Identifier", name: "boop" }]
        });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.hasCallback", function () {

    it("should return `false` if no argument is supplied", function () {
        const actual = ast.hasCallback();
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if node does not contain a `arguments` attribute", function () {
        const actual = ast.hasCallback({});
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if `arguments` is empty", function () {
        const actual = ast.hasCallback({ arguments: [] });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `false` if `arguments` does not contain a FunctionExpression", function () {
        const actual = ast.hasCallback({
            arguments: [{ type: "Identifier", name: "foobar" }]
        });
        const expected = false;

        assert.equal(actual, expected);
    });

    it("should return `true` if supplied node has at least one FunctionExpression argument", function () {
        const actual = ast.hasCallback({
            arguments: [{ type: "FunctionExpression" }]
        });
        const expected = true;

        assert.equal(actual, expected);
    });

});

describe("ast.ancestor", function () {
    const a = { type: "Program" };
    const b = { type: "FunctionDeclaration", parent: a };
    const c = { type: "BlockStatement", parent: b };
    const d = { type: "ReturnStatement", parent: c };

    it("should return `true` if an ancestor satisfies the predicate", function () {
        const actual = ast.ancestor((node) => node.type === "FunctionDeclaration", d);
        const expected = true;

        assert.equal(actual, expected);
    });

    it("should return `false` if no ancestor satisfies the predicate", function () {
        const actual = ast.ancestor((node) => node.type === "VariableDeclaration", d);
        const expected = false;

        assert.equal(actual, expected);
    });

});

describe("ast.nearest", function () {
    const a = { type: "Program" };
    const b = { type: "FunctionDeclaration", parent: a };
    const c = { type: "BlockStatement", parent: b };
    const d = { type: "ReturnStatement", parent: c };

    it("should return found node if an ancestor satisfies the predicate", function () {
        const actual = ast.nearest((node) => node.type === "FunctionDeclaration", d);
        const expected = b;

        assert.equal(actual, expected);
    });

    it("should return `undefined` if no ancestor satisfies the predicate", function () {
        const actual = ast.nearest((node) => node.type === "VariableDeclaration", d);
        const expected = undefined;

        assert.equal(actual, expected);
    });

});
