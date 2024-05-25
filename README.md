# TASK 2

This is my answer to the Tech Challenge done for Mercedes-Benz.io on the following scenario:

### Validate the negative path of enquiring the highest price at Mercedes-Benz
#### Flow:
1. Open the Mercedes-Benz Shop used cars in Australian market.
2. On “Please select your location” fill:
````
    Your State:  (e.g. 'New South Wales').
    Postal Code:  (e.g. '2007').
    Purpose: Private.
````
3. Click the filter button (top-left blue button)
4. Under the “Pre-Owned” tab, apply the following choices:
````
    Colour: "BRILLANTBLUE metallic"
````
5. Navigate to the Vehicle Details of the most expensive car on the filtered results.

6. Save the following car details to a file:
````
    VIN number
    Model Year
````
7. In the side vehicle details click “Enquire Now”

8. Fill the “Contact Details and Account Creation” form with invalid data. (e.g. with an invalid email format)

9. Click "Proceed" and validate the error.

The project is going to be done on Cypress using JavaScript that integrates [applitoolseyes](https://eyes.applitools.com/app/test-results/00000251686588029251/?accountId=4qYZ6hqKs0WK98_OH_QK3w__) extension for UI views comparisons (for future improvements).

### Structure
The e2e folder contains our code challenge

Fixtures folder contains all the static files we need for the test:
    - carDetails.json has the saved car information
    - contactDetails.js has the contact I used to fill the last Screen

PageObject folder contains the screens/pages with page-specific logic/elements


# What you need to do to run the project

- Make sure you have node version at least v20.13.1
- Install Cypress and other dependencies with once inside the project
``````
npm install
``````

- To run cypress ui you can use this command
````
npm run cy:open
````
- Choose E2E Testing option and choose a browser of your liking
- Tap on "code_challenge.cy.js" to run
- Pray to the testing gods it passes and you should be fine :D

