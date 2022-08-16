# Support Desk

Support Desk is a flexible ticketing system that can be used in small oranizations to keep track of the employee tickets for IT/HR/Management for instance.

### About

It has 2 types of user access in the app, `User Access` & `Admin Access`.

#### User Access

- Users can login to the application.
- Create a new ticket by selecting a perticular project.
- View all of the previous tickets created by that user.

##### Screens

###### Login Page

![](Screens/01_Login.png)

###### Home Page

![](Screens/02_Home_Page.png)

###### Create New Ticket Page

![](Screens/03_Create_New_Ticket.png)

###### View My Tickets Page

![](Screens/04_View_My_Tickets.png)

##### Admin Access

- All the same access as User.
- Additionally gets access to the admin modules/options.
- Admin Options includes, `Add a new user to the system`, `Add/Delete Projects`, and `Dashboard`.
- Dashboard has 3 different KPIs (Total number of tickets, Open tickets, Resolved tickets) and a table where admin user can see all the tickets raised by all the users (with their email address and name) and they have the option to change a ticket status to closed.

##### Screens

###### Admin Options

![](Screens/Admin/01_Admin_Options.png)

###### Add Users

![](Screens/Admin/02_Admin_Add_User.png)

###### Add New Project

![](Screens/Admin/03_Admin_Add_New_Project.png)

###### View/Delete Projects

![](Screens/Admin/04_Admin_View_Projects.png)

###### Dashboard

![](Screens/Admin/05_Admin_Dashboard.png)

###### Dashboard -> Close Ticket

![](Screens/Admin/06_Admin_Dashboard_Close_Ticket.png)


### Teck Stack

- ReactJS + React Router v6 + Bootstrap for the components
- Redux Toolkit
- Axios
- Node + Express JS

### To run the development server

- Create a `.env` file in the root directory with the following variables
    1. NODE_ENV - Put it as development
    2. PORT - The backend API port
    3. MONGO_URI - Your mongodb connection string
    4. JWT_SECRET - The secrect used to hash the password.

- Run `npm i` in the root directory to install backend dependencies.
- Run `npm i` in the frontend folder to install frontend dependencies.
- Run `npm run dev` (It will start the frontend and backend app together) in the root directory to run the project.