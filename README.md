# swag_labs_test
Automated Web UI Test suite for SwagLabs demo site

These tests were created using the Cypress test framework and cover the Chrome web browser.
Assumptions were made that no text based documentation of test cases used were necessary in interest of time.

## Prerequisites:

Install Chrome browser.

To run these tests you will need to install `npm` version 8 or greater.

Clone or Fork this repository and then from the root directory 
install all dependencies using `npm install`

This should add everything necessary to run these tests including the cypress framework.


## How to run:

### Terminal
To run the test suite in unix based terminal, the package.json should already include a test script
`npm test`. This will run the tests in the terminal and provide show the results.

Alternative: `npx cypress run`

### Browser Based Format
To see the tests in Web format using cypress's in built test runner a script is provided with `npx cypress open`.

This will bring forth a window to select testing type. Select 'E2E Testing'. On the next window select 'Chrome' as the browser
followed by "Start E2E Testing in Chrome".

Within the Specs tab the tests have been split up by sections outlined in the challenge document (login, inventory, cart, footer, logout).
Clicking the section to see tested will display the web automation on the right and the results of the test (Pass or Fail) on the left. 
When finished, return to the specs tab and select the next section. Enjoy! :)

