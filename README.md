## Ready Line

## Initial Setup 

1. Clone this repository 
1. Run `git init` from the root directory of Ready Line (the same directory that the `.sln` file is in) 

> **NOTE:** Make sure that you do this before you run `create-react-app` in the `client` directory

## SQL Database Setup

1. Run all (except for the admin scripts) of the SQL Scripts included in this Repo.
1. Run `SELECT` SQL commands in a Query window to see what data this Repo consists of.

## Server Side

1. Install Nuget Packages `Microsoft.Data.SQLClient` version 4.0.1 as well as `Microsoft.ASP.Net.Core.Authentication.JWTBearer`version 5.0.5

## Client Side

1. In `client` directory run `npx create-react-app .`
1. Install firebase and react router using `npm install react-router-dom@5.2.0 firebase@8.7.1`

> **NOTE:** When running this app run the back end server first then run `npm start` inside the `client` directory in the repo.

## How to navigate Ready Line

Upon serving the correct hosts through your browser, you will be prompted with an option to sign in or register as a new user. You will need to register as a new user.

After creating your account, you will notice 4 nav bar selections allowing users to navigate to Home, Vehicles, shop, or  logout.

You can begin begin by navigateing to Vehicles and inspect a list of all vehiles in the system where you can also view a clicked upon vehicles details and claim any vehicle that is not already claimed by a user.

Once you have have claimed a new Vehicle using the green `Claim` button it will populate under the `Home` link in the navbar. The Home page will now display your claimed vehicles under the title 'Your Vehicles...'. Under the title 'Ready For Pickup' is a list of Vehicles that are ready for pick up from the shop. On the left side of the page you will see information of the current user at the top and below will be a list of all the users in the system where you can view each user's information.

If a vehicle needs to be turned into the shop a user can navigate to the 'Shop' link in the navbar. After slecting the 'Turn in Vehicle' the user will be prompted with a form to create a new Report. Once created the report will be rendered under the 'Just Added' list on the 'Shop' page. From here only a user with the authorization status of a mechanic will be able to move the Report through to completion.

## Documentation

dbdiagram : https://dbdiagram.io/d/63cc0f33296d97641d7b3154
