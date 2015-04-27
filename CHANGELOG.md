# CHANGELOG

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
