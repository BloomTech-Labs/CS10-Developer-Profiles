# CS10-Developer-Profiles

## Contributors

The dream team behind this project:

- Il Ho Kim: [@ilhoKim](https://github.com/ilhoKim)
- Jean S Ariza: [@jesuarva](https://github.com/jesuarva)
- Danny Vail: [@d-vail](https://github.com/d-vail)
- Nate Flory: [@Nate152](https://github.com/Nate152)
- Samarvir Singh: [@samarv](https://github.com/samarv)

# Stack

### **Frontend**

> - JS Framework: _React_
> - CSS Freamwork: _Material Design_
> - HTTP Client: _Axios_

### **Backend**

> - Framework: _Node_
> - Server: _Express_
> - DB: _Mongo_
> - Encryption: _bcrypt_
> - Deployment platform: _Heroku - mLab_

# Backend API

> Detailed docs with installations and running instructions on [Backend.md](https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/blob/master/backend/Backend.md)

### Location:

> [./backend/](https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/tree/master/backend)

# Frontend APP

> Detailed docs with installations and running instructions on [Frontend.md](https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/blob/Documentation/frontend/Frontend.md)

### Location:

> [./frontend/lambda-in/](https://github.com/Lambda-School-Labs/CS10-Developer-Profiles/blob/jesuarva-test-devinfoedit-component/frontend/Frontend.md)

### Components structure

Components prefixed with '_**@**_', belongs to _Material Design_

```
  - index.js
      - App.js
            - LandingPage.js
            - DevLogin.js
            |     - @Paper
            |     |       - @Button : Find Developer
            |     |       - @Button : Browse
            |     |       - @Button : Profile
            |     |       - @Button : Billing
            |     |       - @Button : Setting
            |     |- @Typography : h3
            |     |- @Typography : p
            |     |- @Paper
            |             - @Typography : h3
            |             - @TextField : email
            |             - @TextField : password
            |             - @Button : Submit
            |- DevSignUp.js
                    - @Paper
                    |       - @Button : Find Developer
                    |       - @Button : Browse
                    |       - @Button : Profile
                    |       - @Button : Billing
                    |       - @Button : Setting
                    |- @Typography : h3
                    |- @Typography : p
                    |- @Paper
                            - @TextField : First name
                            - @TextField : Last name
                            - @TextField : email
                            - @TextField : Desired Title
                            - @TextField : Current location
                            - @TextField : Github
                            - @TextField : Linkedin
                            - @TextField : Portfolio
                            - @TextField : Acclaim badge
                            - @TextField : Password
                            - @TextField : Confirm password
                            - @Button : Submit
```
