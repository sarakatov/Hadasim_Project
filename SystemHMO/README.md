
# A system for managing a HMO
A system for managing a HMO Project - Full Stack Web App (MongoDB, Node.js and react)


### description
This system provides a comprehensive solution for managing a health insurance fund,  
 from registering members, through managing medical information, to handling vaccination data and  
  monitoring the health status of members. With the help of innovative technologies,  
   the system provides an efficient and convenient solution for all parties involved.

### Requirements

- [Nodejs](https://nodejs.org) 
- [MongoDB](https://www.mongodb.com) 
- [React](https://react.dev/)

## server side-node.js

### install   
npm i mongoose  
npm i dotenv  
npm i express    
npm i cors  
npm i joi

#### Development

### Start
##### Add .env file should contain DB_CONNECTION & PORT
    PORT=3500
    DB_CONNECTION='mongodb+srv://sara_katov:ruti2468@cluster0.ktlnbjc.mongodb.net/sara_clinic?retryWrites=true&w=majority'

**terminal:** `node server.js `


### Rest Api:

| CRUD   | Response              | Explain                 | Method | Send in Body | URL                  |   |
|--------|-----------------------|------------------------|--------|--------------|----------------------|------------------|
| Create | New member object       | Add a new member to the system | POST   | JSON Object (see below) | /api/members                       |
| Read   | List of members         | Retrieve a list of all members | GET    |    ---          | /api/members           |
| Read   | Single member by ID     | Retrieve details of a specific member | GET          |    ---       |/api/members/:id            |
| Update | Updated member object   | Update an existing member | PUT    | JSON Object (see below) | /api/members/:id       | 
| Delete | Deleted member object   | Delete a member from the system | DELETE | ---          | /api/members/:id                     |

### Stop

**terminl:** `ctrl+c`

 

## client side-react

### install   
npm i @emotion/styled  
npm i @emotion/react  
npm i @hookform/resolvers  
npm i @mui/material  
npm i @mui/x-charts  
npm i @reduxjs/toolkit  
npm i @testing-library/jest-dom 
npm i @testing-library/react  
npm i @testing-library/user-event    
npm i axios  
npm i joi  
npm i react  
npm i react-dom  
npm i react-hook-form  
npm i react-redux  
npm i react-router-dom  
### start

**terminal:** `npm  start `

### Stop

**terminl:** `ctrl+c`

### screenshot

![details](../photos/allMembers.png)
![details](../photos/addMember.png)
![details](../photos/memberDetails.png)
![details](../photos/updateMember.png)
![details](../photos/validate1.png)
![details](../photos/validate2.png)
![details](../photos/validate3.png)
![details](../photos/conflict.png)
![details](../photos/numSickPerDay.png)


 



   
    

 
 


 

 




 