# jelou-automation-e2e
Repositorio para el proyecto de pruebas E2E

![Language](https://img.shields.io/badge/language-JavaScript-yellow) ![License](https://img.shields.io/badge/license-ISC-blue) ![Playwright Version](https://img.shields.io/badge/playwright-1.40.1-blue)

# Table of Contents
1. [Running the Example Test](#running-the-example-test)
2. [HTML Test Reports](#html-test-reports)
3. [Running the Example Test in UI Mode](#running-the-example-test-in-ui-mode)
4. [Updating Playwright](#updating-playwright)
5. [Updating Visual comparisons](#updating-visual-comparisons)
6. [System requirements](#system-requirements)

## Running the Example Test
By default tests will be run on all 3 browsers, chromium, firefox and webkit using 3 workers. This can be configured in the [playwright.config file.](https://playwright.dev/docs/test-configuration) Tests are run in headless mode meaning no browser will open up when running the tests. Results of the tests and test logs will be shown in the terminal.

```
npx playwright test
```

See our doc on [Running Tests](https://playwright.dev/docs/running-tests) to learn more about running tests in headed mode, running multiple tests, running specific tests etc.

## HTML Test Reports
After your test completes, an [HTML Reporter](https://playwright.dev/docs/test-reporters#html-reporter) will be generated, which shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests. You can click on each test and explore the test's errors as well as each step of the test. By default, the HTML report is opened automatically if some of the tests failed.

```
npx playwright show-report
```

## Running the Example Test in UI Mode
Run your tests with [UI Mode](https://playwright.dev/docs/test-ui-mode) for a better developer experience with time travel debugging, watch mode and more.

```
npx playwright test --ui
```

Check out or [detailed guide on UI Mode](https://playwright.dev/docs/test-ui-mode) to learn more about its features.

## Updating Visual comparisons
Sometimes you need to update the reference screenshot, for example when the page has changed. Do this with the --update-snapshots flag.

```
npx playwright test --update-snapshots
```

>Note that `snapshotName` also accepts an array of path segments to the snapshot file such as `expect().toHaveScreenshot(['relative', 'path', 'to', 'snapshot.png'])`. However, this path must stay within the snapshots directory for each test file (i.e. `a.spec.js-snapshots`), otherwise it will throw.

## Updating Playwright
To update Playwright to the latest version run the following command:

```
npm install -D @playwright/test@latest
```

You can always check which version of Playwright you have by running the following command:

```
npx playwright --version
```

## System requirements
* Node.js 16+
* Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
* MacOS 12 Monterey or MacOS 13 Ventura.
* Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.