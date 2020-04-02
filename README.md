# ReviewMe 📚📖 
---

### Project Three

**Monash University Full Stack Flex Coding Bootcamp**

**Live Version:** https://me-review.herokuapp.com/

*- Jon*

---

## User Story 👤
```
As A Consumer

I Want to find reviews on certain items

So That I can make an informed purchase
```

## Project Description 📜
**ReviewMe** is fullstack application that allows users to create and search for a review on different items. The user can search for a review by keyword, filter reviews by category, or show all reviews - from newest to oldest:

* All
* Keywords
* Category

Depending on user selection, **ReviewMe** will display the matching results.

![desktop view](https://github.com/Jmacr0/react-social/raw/master/client/src/images/readme-home.PNG "Logo Title Text 1")


## Instructions 👩‍🏫

How to use the **ReviewMe** Application:

---
1. Create a New User. Then proceed to Login.
---
2. Once Redirected to the Homepage, User can navigate to different part of the application through two main features:
 * SideBar
 * Main Page 
---
3. From the SideBar, the user can: 
* View their profile page
* Create a new review 
* View their favourited reviews
* Logout.

---
4. The Main page is where the user will view the content. The default after login presents:
* Search bar to search for a review by keyword
* A selection of categories which returns all reviews that match
---
## Features 🌠

#### Authentication 🔐

**ReviewMe** incorporated user authentication through Passport.js. This library provides a method to validate user login and prevent unauthorized users from accessing certain routes.

#### Profile Management
One of the main features of **ReviewMe** is profile management. The user can view their profile page which presents details about themselves along with a list of reviews which they have written.

The user can edit their profile including: changing their username, email, bio, and image (profile picture). The user can also change their password.

There is a ***My Favourites*** tab for the user to view a list of their favourites reviews.

Once finished, the user can then logout and is redirect to the login page. 

#### Review Creation

Another primary feature of **ReviewMe** is the ability to create a new review which others are able to view and interact with. On the SideBar, the **New Review** tab redirects the user to a page where they can write a new review. Review include:

* Item (name) *
* Title (title of the review) *
* Pros
* Cons
* Rating (1 - 5 ⭐'s) *
* Category (type that the review item falls under, eg. technology) *
* Image (currently URL only)
* Description *

*indicates mandatory fields.

Once complete, user clicks save to create the review.


#### Review Management

The **ReviewMe** application allows the user to interact with the reviews on display.

* The user can click to open the review. From here all comments linked to that review will show. The user can then create their own comment which will be added. All comments written by the user can be edited and/or deleted by the user.

* If the user is the author of the review, they have the option to edit the review and/or delete the review.

* The user can also favourite a review, from which the review will be added to their favourites and can be viewed in the ***My Favourites*** tab.

---
## Technologies 🎡

**Libraries**

* React.js for handling the front end

* MongoDB / Mongoose for database

* Node.js / Express.js to run API backend server

* React Router DOM for React route handling

* Passport.js for authentication

* React-Bootstrap for styling and layout managment

**CSS Framework**

* To style the application I used Bootstrap https://getbootstrap.com



