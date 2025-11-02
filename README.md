# Inkvestor — Crowdfunding for Authours
A minimal crowdfunding frontend built with React that talks to a Django REST Framework API.


## Checklist:
### 1:

- [x] Be separated into two distinct projects: an API built using the Django Rest Framework and a website built using React.

        For front end use this link
    [https://inkvestor2.netlify.app/]

        For backend use below link
    [https://inkvestor-40ee966b1650.herokuapp.com]

### 2:

- [x]  Have a cool name, bonus points if it includes a pun and/or missing vowels. See https://namelix.com/ for inspiration. (Bonus Points are meaningless)

        see above 

### 3:

 - [x] Have a clear target audience.
  
        This platform is for aspiring authors and writers who want to publish their books but lack the funds to do so. It also serves book lovers, supporters, and patrons who are interested in backing creative literary projects and helping new voices reach readers.

### 4:

 - [x] Have user accounts. A user should have at least the following attributes:
   - [x] Username
   - [x] Email
   - [x] Password

![New User Registration Form](src/assets/screenshots/username.png)


### 5:

 - [x] Ability to create a “fundraiser” to be crowdfunded which will include at least the following attributes:
   - [x] Title
   - [x] Owner (a user)
   - [x] Description
   - [x] Target amount to raise
   - [x] Whether it is currently open to accepting new supporters or not
   - [x] When the fundraiser was created


When creating a new Fundraiser, you need to be logged in. 
![New Fundriaser Form](src/assets/screenshots/new-fundraiser-form.png)

After you created, you will see owner, status, whether it is open or not and when it is created. 

![Fundriaser Detail](src/assets/screenshots/fundraiser-id.png)

### 6:

 - [x] Ability to “pledge” to a fundraiser. A pledge should include at least the following attributes:
   - [x] Amount
   - [x] The fundraiser the pledge is for
   - [x] The supporter/user (i.e. who created the pledge)
   - [x] Whether the pledge is anonymous or not
   - [x] A comment to go along with the pledge


When you are making a pledge it asks amount, you already pick the fundraiser, it asks whether you want to be anonymous or not, and you can comment.
    ![New Pledge Form](src/assets/screenshots/new-pledge-form.png)

### 7:

 - [x] Implement suitable update/delete functionality, e.g. should a fundraiser owner be allowed to update its description?

    Logged in user is arsen and fundraiser is created by apple, so update or delete button doesnt show up at all. 
![delete others fundriaser is not allowered](src/assets/screenshots/delete-fundraiser-others.png)

    You can update your own fundraiser. You see update and delete button
![update your own fundriaser](src/assets/screenshots/update-fundraiser.png)

    you can type whatever you want to update to.You can change title, goal, description, url etc.

![update your own fundriaser](src/assets/screenshots/update-button.png)
    This is what it looks like after update
![update your own fundriaser](src/assets/screenshots/after-update.png)

### 8:

 - [x] Implement suitable permissions, e.g. who is allowed to delete a pledge?

        Pledges cannot be deleted.However, to delete or update fundraiser, only owner can do it. See above for refecences. 



### 9:

 - [x] Return the relevant status codes for both successful and unsuccessful requests to the API.

![success](src/assets/screenshots/success.png)




### 10:

 - [x] Handle failed requests gracefully (e.g. you should have a custom 404 page rather than the default error page).

As there is no logged in user, it doesnt allow to create fundriaser. ( screenshot is taken before css update)
![invalid-token](src/assets/screenshots/invalid-token.png)

You are not allowed to pledge against your own. 
![error](src/assets/screenshots/error.png)

### 11:

 - [x] Use Token Authentication, including an endpoint to obtain a token along with the current user's details.

        Token will be diaplay in the network.

![api-token](src/assets/screenshots/api-token.png)

 - [x] Implement responsive design.



![responsive](src/assets/screenshots/responsive1.png)

hamburger menu 
![hamburger](src/assets/screenshots/hamburger.png)

responsive design
![responsive](src/assets/screenshots/responsive2.png)


responsive design
![responsive](src/assets/screenshots/responsive3.png)

responsive design
![responsive](src/assets/screenshots/responsive4.png)

#### Extra features 

Sort by and search bar
![sort and seacrh](src/assets/screenshots/sortby.png)

comment on fundraiser
![comment on fundraiser](src/assets/screenshots/comment.png)