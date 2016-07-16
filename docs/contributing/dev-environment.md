# Development Environment

This plugin has a lightweight development environment that's very similar to ESLint's own.

## Setup

This is a step-by-step guide to setting up a local development environment that will let you contribute to the project.

### Step 1: Install Node.js and npm

Download and install the latest stable version from http://nodejs.org/. Alternatively, you may use a version manager such as [Node Version Manager](https://github.com/creationix/nvm) or [n](https://github.com/tj/n). Most installers also include [npm](http://npmjs.org/).

### Step 2: Fork and checkout this repository

Go to the [eslint-plugin-requirejs repo](https://github.com/cvisco/eslint-plugin-requirejs) and click the “Fork” button. Follow the GitHub documentation for forking and cloning.

Once you’ve cloned the repository, run `npm install` to get all the necessary dependencies:

    $ cd eslint-plugin-requirejs
    $ npm install

### Step 3: Add the upstream source

The upstream source is the main repository that active development happens on. Setting the upstream source will allow you to pull in the latest code whenever you want.

To add the upstream source for eslint-plugin-requirejs, run the following in your repository:

    $ git remote add upstream git@github.com:cvisco/eslint-plugin-requirejs.git

### Step 4: Run the tests

Running the tests is the best way to ensure you have correctly set up your development environment. Make sure you’re in the the eslint-plugin-requirejs directory and run:

    $ npm test

The testing should only take a few seconds to complete. If any tests fail, that likely means one or more parts of the environment setup didn’t complete correctly. The upstream tests always pass.

## Development Workflow

Whenever you make changes to the source files, you’ll need to run `npm test` to rerun the tests. The workflow is:

1. Make changes
2. Run `npm test` to run tests on the command line

You’ll have to do this each time you make a change. The tests are run automatically whenever a pull request is received, so make sure to verify your changes work before submitting them.

## Build Scripts

This project has several build scripts that help with various parts of development.

### npm test

The primary script to use is `npm test`, which does several things:

1. Lints all JavaScript (including tests and makefile)
2. Runs all tests
3. Checks code coverage targets

Be sure to run this after making changes and before sending a pull request with your changes.

### npm run unit

If you need to skip the lint check for any reason (useful during debugging), you can use this script to run the tests by themselves.

### npm run lint

You can use this script to lint the code without running the tests.
