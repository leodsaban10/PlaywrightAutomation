Scenario: The app works on other devices
GIVEN a customer wants to shop using their preferred device
WHEN they open the saucedemo app
THEN the layout should adjust to fit the screen
AND all features function accordingly

Scenario: Log in securely and successful
GIVEN the customer has an account
WHEN they enter valid credentials
THEN they should be logged in
AND taken to the products page

Scenario: Attempt to log in but fails
GIVEN the customer has an account
WHEN they enter invalid credentials
THEN they should see an error message
AND should stay on the same page

Scenario: Secure checkout Page (crash free)
GIVEN a customer wants to add a product to the cart
WHEN a customer goes to check out
THEN the transaction should be secure
AND the site shouldn't crash, and they receive a confirmation message

Scenario: Customer want to buy products easily
GIVEN the customer wants to shop for a product
WHEN the customer sees something they like
THEN they can click add to cart
AND proceed to checkout

Scenario: Accurate product information is displayed
GIVEN a customer is browsing the products page
WHEN they view the products listing
THEN click on the name of the product, it should display correct info about the product

Scenario: Related/Suggested products display while browsing
GIVEN the customer is browsing through the products page
WHEN they scroll to the bottom of the page
THEN they see related/suggested products