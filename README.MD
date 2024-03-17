Back-End Installation : 

Step 1: Environment Setup
Create a .env file and add the following configurations:

PORT=5000
MONGO=mongodb+srv://AMAANKHATRI:amaankhatriqureshishaikh@amaankhatri.bfvdktd.mongodb.net/
JWT_SECRET=80205e15f8c2854cb07a496889ac7cb3e8b39a745ec24bc4776cab4a902610a4

Note: Replace the values with your specific URLs.

Step 2: Installation
Run the following commands:
npm install
npm start

Tech Used : Javascript ,express, Jwt Json WebToken,mongoose as Orm bcrypt lib  And MongoDb cloud Database To Store The Data .

Back-end Project Structure :

                Back-end
                       |-- controllers - all the controllers logic are implemented here 
                                |-- departmentController.js
                                |-- employeeController.js
                                |-- userController.js

                        |-- middleware 
                                |-- authMiddleware - Purpose is to make any route protected with token based 
                                |-- checkManagerRole - Purpose is to make route protected as per Manager Can Only Access This Route
                        
                        |-- models 
                                |-- departmentmodels.js
                                |-- emplyeeModel.js
                                |-- userModel.js
                        
                        |-- route - where only the routes take place routes can be protected as per the project description with the help of middleware
                                |-- departmentRoute.js
                                |-- employeeRoute.js
                                |-- userRoute.js

                        |-- .env - environtment variable


Back-End Functionality:
Step 1: Authentication
1. Create routes for user login and registration.
2. Validate password fields to ensure they match.
3. Use JWT for user authentication.
4. Hash passwords using bcrypt for storage security.

Testing: Only The Register User Will Be Able To Login
http://localhost:5000/api/register

Payload : You Can Assign Role As Per Your There Are Two Role employee , manager

    {
        "username": "newName",
        "email": "name21@example.com",
        "password": "Amaan@123",
        "confirmPassword": "Amaan@123",
        "role": "employee"
    }        

Login Payload : 

           {
             "username": "newName",
             "password": "Amaan@123",       
           }

Step 2: Employee Routes : 
1. Create routes for CRUD operations on employee data.
2. Implement role-based permissions
3. Employees can only access their own data.
4. Managers can access all data.
5. Implement filtering by location and name.
6. Pagination is applied after filtering.
7. Employees can add their data but cannot update or delete it. 
   Updation and deletion can only be done by a manager for any employee.


Create Payload: POST :  you can create employee by using this url
-> http://localhost:5000/api/employees

Payload :
    {
        "name": "ipangram",
        "email": "ipangram91@gmail.com",
        "location": "Surat",
        "createdBy": "65f1e1f37f469d57a1192822"
    }

Note : - This createdBy is used Id You Need To Pass With Whom You Had Logged In

GetEmployeeByFilter : url : - http://localhost:5000/api/employees/filter?location=jaipur&name=All&pageIndex=1&pageSize=10

Note : 
1. Employee Which Is Logged In Will Be Able To See His Data Only With This Url 
2. Manager Can Access All data With This Url 

GetEmployeeWithoutFilter : url :- http://localhost:5000/api/employees?pageIndex=1&pageSize=10

Note : 
1. Employee Which Is Logged In Will Be Able To See His Data Only With This Url 
2. Manager Can Access All data With This Url 
3. this route is protected only manager will be able to access this route form front-end side to visit employee directory
4. Delete And Update Can Only Be Done By Manager 

url :- http://localhost:5000/api/employees/id -- pass id in the end to delete and put request 

Note : Pagination is Implemented In All Get Api 


step 3 : Department Routes :
1. Implement CRUD operations for department data.
2. Managers have exclusive access to department management.
3. Manager Can Assign Department To The Employee By Passing The Employee Id While Creating The Department 

Create : POST : url : http://localhost:5000/api/department
Payload : 
                    {
                    "name": "dasdas Department",
                    "description": "all responsible",
                    "location": "India",
                    "budget": 1000000,
                    "employees": []   -> here inside an array you can pass the emplyee for the particular department 
                    }
    
Get Department url : http://localhost:5000/api/department?pageIndex=1&pageSize=10  

Method : - PUT And DELETE
for update and delete just pass the id url :-http://localhost:5000/api/department


Note : Pagination Is Implemented In All The Get Api As It is Bonus Point So I think To Add it 





Front-End Installation : 

Step 1: Environment Setup : 
Create a .env file and add the following configurations:

REACT_APP_BASE_URL = http://localhost:5000/api

Step 2: Installation
Run the following commands:
npm install
npm start


Fornt-End Tech Used : 
1. Typescript, 
2. Tailwind css ,
3. Mui Library - for inbuild popup and drawer , 
4. Redux-Toolkit For StateManagement , 
5. axios - for Data Fetching,  
6. formik - for Creating Form,
7. yup - for Form Validation,
8. react-icons - for icons ,
9. react-table - for table view
10. react-toastify - for toast messages 

Project Structure : 

                    src 
                    |-- components - This Are The Reusable Global Component Which Can Be Used For All Over The Application 
                            |- confirmDailog.tsx - For Delete Dailog Global component
                            |- DataTable.tsx  - Table Global component
                            |- Pagination.tsx - Pagination Global Component Just Need To Pass The Props 
                    |-- services
                            |- ApiServices.ts -----
                                                    | - This Both Services Are Resposible for Token Store And Implementation Of Axios Interceptors And     Return The Response of success and failure error
                            |- BaseService.ts -----
                
                            |- authServices.ts      -----------         This All Services Have There Own Role With There Own Slices This Services 
                            |- DepartmentService.ts            |        Are Responseible To Write The Method create,update,delete,post
                            |- employeeDetailService.ts        | ---->  And To Write The All url Which We Passed Inside params or Query params          
                            |- employeeDirectory.ts ---------  |        This Are Connected With The ApiService 
                    |-- store                                    
                            |- slices
                                |- autSlice.ts      -----------         All The Slices Are Used To Handle There Own Logic As Per There Own Components
                                |- departmentSlice.ts           | ->    They Are Connected With There own Services inside this we write logic 
                                |- employeeSlice.ts -----------         And inside Service we Write url and method to make well structure
                            |- store.ts -----------> store is responsible to import all slices to that we can use it all over application
                    |-- utils
                            |- commonFunction    -------> this are the common function which are suppose to get the localstorage and remove localstorage 
                                |- common.ts               item which is been used videly in application 
                            |- hooks   ---------------> this are the custom hook which has there own specific role 
                                |- auth.tsx      ------> auth.tsx is protected route for token based only if token then only the route will be accessible
                                |- PermissionRoute.tsx ----> PermissionRoute.tsx this route is been used on permssion based as per the                 
                                                             manager and employee route are protected please be noted .. 
                    |-- views ------------------------------------------          
                            |- Employee Management                      |
                                |- DepartmentList                       |
                                |- EmployeeDetails                      |    
                                |- EmployeeList                         |
                                |- Header                               |
                            |- pages   ---------------------------------|------------------------
                                |- AccessDenied                         |                       |
                                |- Department                           |                       |
                                |- EmployeeDetailsPage                  |                       |
                                |- EmployeeListPage                     |                       |
                                |- Login                                |                       |
                                |- Register                             |                       |
                                 ---------------------------------------|                       |                                                           
                    |-- App.tsx                                                                 |
                    |-- index.css                                                               |
                    |-- index.tsx                                                               |
                                                                                                |
                            ---------------------------------------------------------------------                                                           |         

1. This Views And Pages Folder Are Reponsble To View the Ui Each Folder Have there own Specific login
2. If There Are Multiple Component In Each Folder Then They Are moved inisde The Component Folder 
3. Each Folder Should Have There One Main File and one index file 
4. main file is used to wrap the component and is exported inside index file 
5. so that it can be easssily accessible by it's own index file


Page : this component are imported inside the pages folder to render on to the ui 
each have there own index.ts file to export explicity 

Note : The Reason Behind To Keep The index file is when we import it they are there each folder 

let suppose inside login folder we have login/login.tsx 

so with the help of index.ts we can make the import order well structure we can directly import /login

Now Page - Register Page -- For user Registration
           Login Page --- For User Login 
           Access Denied ---- When User Any Random Route This Page Will Be Show 
           Department ---- to render Department Components 
           Employee Details Page --- to Render Employee As Per Employee - crete can be done by employee edit and update is done by manager only 
           Employee Directory --- to render all employee detail manager is only visble this 



App.tsx - the route are protected so first you need to register the user as per role and then login 
          there are two protected route one is to manage token based and one is to manage role permission 
          they are implemented with the help of common function and hooks