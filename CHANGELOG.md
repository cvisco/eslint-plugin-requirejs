# CHANGELOG

### v0.5.2 - August 8, 2015

* Prevent no-commonjs-return false positive (fixes #36)
* Update: Provide schema for enforce-define rule
* Build: Update eslint version to 1.1.0

### v0.5.1 - July 20, 2015

* Fix: Compare basename against ignore list in enforce-define (fixes #33) (Casey Visco)

### v0.5.0 - July 20, 2015

* New: Implement enforce-define rule (fixes #28) (Casey Visco)
* Build: Upgrade eslint and eslint-tester versions (Casey Visco)

### v0.4.2 - June 29, 2015

* Fix: only include string literals in array returned from util.getDependencyNodes (fixes #32) (Casey Visco)

### v0.4.1 - June 25, 2015

* Fix: no-invalid-define rule affecting other rules (Andrew Sutton)

### v0.4.0 - June 13, 2015

* New: Implement no-invalid-require rule (fixes #19)
* New: Implement no-js-extension rule (fixes #29)
* Fix: Warn on invalid callback in no-invalid-require rule (fixes #30)
* Update: Cleanup code in `util#isValidRequire`
* Build: Execute coverage as part of `npm test`

### v0.3.0 - April 27, 2015

* New: Implement no-dynamic-require rule (fixes #18)
* New: Implement no-conditional-require rule (fixes #22)
* New: Implement no-require-tourl rule (fixes #21)
* New: Implement no-assign-require rule (fixes #20)
* Fix: Verify callee is an Identifier when testing CallExpression name (fixes #25)

### v0.2.3 - April 19, 2015

* Fix: Prevent rules from warning on non-define calls (fixes #23)

### v0.2.2 - April 16, 2015

* Update: Remove unused helpers lib
* Docs: Clarify installation instructions
* Docs: Add link to CHANGELOG from README

### v0.2.1 - April 16, 2015

* Fix: Permit named modules in no-invalid-define rule (fixes #17)
* Fix: Flag named AMD module definitions as warning in no-amd-define (fixes #16)
* Fix: Flag named CommonJS definitions as warning in no-commonjs-wrapper (fixes #15)
* Fix: Flag named function definitions as warning in no-function-define (fixes #14)
* Fix: Flag named object modules as warning in no-object-define (fixes #13)
* Fix: Allow other forms of named modules in no-named-define (fixes #12)

### v0.2.0 - April 13, 2015

* Docs: Link to RequireJS home page from README
* Docs: Sort rules in README by type (fixes #9)
* New: Implement no-commonjs-module-exports rule (fixes #11)
* New: Implement no-commonjs-exports rule (fixes #3)
* New: Implement no-commonjs-return rule (fixes #4)
* New: Implement no-assign-exports rule (fixes #6)

### v0.1.2 - April 3, 2015

* Fix: Allow plugin to work with wider range of eslint versions (fixes #8)

### v0.1.1 - April 2, 2015

* Docs: Cleanup README

### v0.1.0 - March 30, 2015

* Initial Release
