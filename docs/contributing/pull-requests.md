# Pull Requests

If you want to contribute to the eslint-plugin-requirejs repo, please use a GitHub pull request. This is the fastest way for us to evaluate your code and to merge it into the code base.

## Getting Started

If you’d like to work on a pull request, follow these steps:

1. Set up a [development environment](dev-environment.md).
2. Ensure there’s an issue that describes what you’re doing. You can [create a new issue](issues.md) or work on an [existing issue](https://github.com/cvisco/eslint-plugin-requirejs/issues).
3. Documentation-only changes do not require an issue and may be submitted directly from the GitHub website.

## Working with the Code

The process of submitting a pull request for this plugin is almost identical to that of ESLint and follows the same pattern each time:

### Step 1: Create a new branch

Create a new branch in your eslint-plugin-requirejs fork. Give the branch a descriptive name that describes what it is you’re fixing, such as:

    $ git checkout -b issue-12

You should do all of your development for the issue in this branch.

**Note:** Do not combine fixes for multiple issues into one branch. Use a separate branch for each issue you’re working on.

### Step 2: Make your changes

Make the changes to the code, tests and relevant documentation, following the existing code conventions as you go. Once you have finished, commit the changes to your branch:

    $ git add -A
    $ git commit

Our commit message format is as follows:

    Tag: Short description (fixes #12)

    Longer description here if necessary

The first line of the commit message (the summary) must have a specific format.

The `Tag` is one of the following:

* `Fix` - for a bug fix.
* `Update` - for a backwards-compatible enhancement or change to an existing rule.
* `New` - implemented a new feature or rule.
* `Breaking` - for a backwards-_incompatible_ enhancement or feature.
* `Docs` - changes to documentation only.
* `Build` - changes to build process only.
* `Upgrade` - for a dependency upgrade.
* `Chore` - for refactoring, adding tests, etc. (anything that isn’t user-facing).

The message summary should be a one-sentence description of the change, and it must be 72 characters in length or shorter. The issue number should be mentioned at the end.

The commit message format is important because these messages are used to automatically generate a changelog for each release. The tag and issue number help to create more consistent and useful changelogs.

### Step 3: Rebase onto upstream

Before you send the pull request, be sure to rebase onto the upstream source. This ensures your code is running on the latest available code.

    $ git fetch upstream
    $ git rebase upstream/master

### Step 4: Run the tests

After rebasing, be sure to run all of the tests once again to make sure nothing broke:

    $ npm test

If there are any failing tests, update your code until all tests pass.

### Step 5: Push your changes

Next, push your changes to your clone:

    $ git push origin issue-12

If you are unable to push because some references are old, do a forced push instead:

    $ git push -f origin issue-12

### Step 6: Submit the pull request

Now you’re ready to send the pull request. Go to your eslint-plugin-requirejs fork and then follow the [GitHub documentation](https://help.github.com/articles/creating-a-pull-request/) on how to send a pull request.

## Code Review

Once your pull request is sent, it may take some time to fully review. In the mean time, here are a few points to keep in mind:

* Monitor the status of the Travis CI build for your pull request. If it fails, please investigate why. We will not merge pull requests with broken tests or reduced code coverage.
* Respond to comments left on the pull request from reviewers. Remember, we want to help you land your code, so please be receptive to feedback.
* We may ask you to make changes, rebase, or squash your commits.

### Updating the Commit Message

If your commit message is in the incorrect format, you’ll be asked to update it. You can do so via:

    $ git commit --amend

This will open up your editor so you can make changes. After that, you’ll need to do a forced push to your branch:

    $ git push -f origin issue-12

### Updating the Code

If you are asked to make code changes, there’s no need to close the pull request and create a new one. Just go back to the branch on your fork and make your changes. Then, when you’re ready, you can add your changes into the branch:

    $ git add -A
    $ git commit --amend
    $ git push -f origin issue-12

This adds all your new changes, then amends the previous commit with them.

### Rebasing

If your code is out-of-date, you may be asked to rebase. That means we want you to apply your changes on top of the latest upstream code. Make sure you have set up a development environment and then you can rebase using these commands:

    $ git fetch upstream
    $ git rebase upstream/master

You might find that there are merge conflicts when you attempt to rebase. Please resolve the conflicts and then do a forced push to your branch:

    $ git push -f origin issue-12
