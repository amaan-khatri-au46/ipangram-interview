Back-End Installation : 

Step 1 : Create .env file And 

            1. PORT = 5000
            2. MONGO = mongodb+srv://AMAANKHATRI:amaankhatriqureshishaikh@amaankhatri.bfvdktd.mongodb.net/ 
            3. JWT_SECRET = 80205e15f8c2854cb07a496889ac7cb3e8b39a745ec24bc4776cab4a902610a4

Note : -
        This are mine url you can add your specific url 


Step 2 : 

        1. npm install 
        2. npm start 


Back-End Functionality :

     step 1. Crete a Route For Login And Register Only The Register User Will Be Able To Login 
          2. Validate the Password Field Password And Confirm Password Should Match 
          3. The Functionality of Only Register User Can Only Be Able To Login By Using JsonwebToken node package 
          4. use bcrypt library to hash the password to store inside the database 
            Testing : url -> http://localhost:5000/api/register
            Json Object : 
                        {
                            "username": "newName",
                            "email": "name21@example.com",
                            "password": "Amaan@123",
                            "confirmPassword": "Amaan@123",
                            "role": "employee"
                        }

            Once The User Is Register You Can Only Login With That User 
                    Json Object : 
                            {
                            "username": "newName",
                            "password": "Amaan@123",
                        }


Note :  1. if you need to give particular user role as manager you need to include that inside the json object  while registering user

         step 2 : Rouets For Employee Based On Role Permission ...
                 1. The user employee who created the employee only he/she will be able to access her data 
                 2. An employee can only see their data, not others.
                 3. Manager Can See All Data When You Logged In With Manager You Will Be Able To Visit The Data 
                 4. Filter Api For Employee Location Only For That Particaly Employee Will Be Able To get the filter data who has created it 
                 5. Manager Will Be Able To See All The Data Whether He Created Or Not 
                 6. only manager can update the employee and delete the employee 
                 7. no employee can delete or update the data whether he/she crete his that particluar employee or not 
                
                url -> http://localhost:5000/api/employees
        
                    json object : {
                                    "name": "ambani",
                                    "email": "ambani91@gmail.com",
                                    "location": "Surat",
                                    "createdBy": "65f1e1f37f469d57a1192822"
                                }

                url for filter -> http://localhost:5000/api/employee/locations - this will basically gives array with id and names of all employee location
                                -> http://localhost:5000/api/employee/name
                                -> http://localhost:5000/api/employee/filter?location={location}&name={name} => this is how we pass query params to filter 
            
            Note : Here Created By Is the user from which you are creating the employee so that delete and update can be perfom /employee/:id



        step 3 : Routes To Create Department Data As Per The Role Permission ...
                    1. only the manager will able to perform the certain tasks of crud
                    2. Managers can see departments with assigned employees. while creating it 

                 url -> http://localhost:5000/api/department

                 json object -> 
                                {
                                "name": "Finance Department",
                                "manager": "65f2a17d9363610270521206", 
                                "description": "Responsible for financial planning, reporting, and analysis",
                                "location": "India",
                                "budget": 1000000,
                                "employees": [
                                    "65f2b77525fbcbe0a2eb8fc5",
                                    "65f2c0119a11cf998efd9951"
                                ]
                                }
                Note : Employee Id Can Be Given From The Employee Which You Have Been Created

                Final Note : The Url Which Has Been Provided For All Of Them Is For Creating and Fetching if you need to perform delete, update,  
                             You Can Give The Id After The Url



Fornt-End Part 

        Step 1 : create .env file and paste this -> REACT_APP_BASE_URL = http://localhost:5000/api
        Step 2 : npm i 
        step 3 : npm start 


Fornt-End Tech Used 
Mui , Tailwind , Typescript , Redux-toolkit For State management 

Q . where to start looking the file ?

    -> First Look the Project structure 

            src 
                -> component - this is global reusable component which we can reuse not the main component this component having reusable table , 
                and reusable ConfirmDailog 
            
                -> services
                            -> api service - which basically made using interceptors which helps to store the token including baseService
                            -> now there are three service 
                                1. auth service - which basically shows store the url and method regarding the register and login 
                                2. department - whcih basically shows the department url and methods
                                3. employeeService - which basically shows the employee method and service 


                - store 
                        -> store had main store.js where all the slice comibines together and can be used in our application 
                        -> slices 
                            there are three slices responsible to handle the api's 
                            
                            1. authSlice - which connects with the auth service and api service to handle the api's
                            2. departmentSlice - which connect with the department service and use to handle the api's of department page
                            3. employeeSlice - which connect with the department service and use to handle the api's of employee page's
                
                utils 
                    - utils folder include utilities files 
                        1. commonFunciton 
                            - > a function which is commonly used in the whole component which is resposible to give the token remove token 
                            -> function for userDetails
                        2. hooks 
                            -> here comes a demanding part custom hooks which is being used in the application for toast messgaes and to show the header
                            -> the header will be show according to the role and permission 
                        3. Permission route - >
                            -> the route that can be redirect if we try to access without permission 
            

Now Our Main File Comes Into The Picture 

    1. View Responsible to show the components and pages on the ui 
        there are four componenet are there inside this 

    Note : - Each And EveryComponent And Pages Have One Main File And One Index File
             Main File Is Responsible For Budle One Single Page Component And That Single File Can Be Essaily Exprted In Index.ts
             So While Importing Our Sturture Looks Good 

    4 component and there main file : 

            1. DepartmentList - DepartmentList.tsx With Index.ts to export it 
                    -> inside this DepartmentList.tsx file 
                    -> there are all component which have been imported 
                    <DepartmentActions />
                    <DepartmentDeleteDailog />
                    <DepartmentForm />
                    <DepartmentTable />
            
            2. Employee Detail here we need to show the simple table that's why we have just taken only one file and with index.ts

            3. Employee List File With Main File EmployeeList inside it 
                    component which are wrapped
                        <EmployeeDeleteDialog />
                        <EmployeeForm />
                        <EmployeeActions />
                        <EmployeeTable />
            
            4. Header Which Is Our Header Which Can Be Imported 


Now Inside View Folder There Is The Pages Folder 

    there are 6 pages 
           1.  Department Page in which header and departmentList.tsx is being imported 
           2. EmployeeDetailsPage - In Which 
                <Header />
                 <EmployeeDetails />

           3. EmployeeListPage 

                    <Header />
                    <EmployeeList />

        
            4. Login Page 

            5. Register Page 

            6 Access Denied 
                    - this pages is basically used to show when the user is entring random route 



Points To Note : 

    1. Toast Messages Are Handle From The Front-End Side Not Back-end Side Using Custom Hooks 
    2. When You Register The User Please Try To Register With The Manager So That All Route Will Be Visible 
    3. When You Login With the Employee Only The Employee Will Be Able To see there own data 
    4 . no edit and update can be done for that particalur employee 


things Which Manage :

Proper Filter, Custom Hooks , DataTable For Global Table , user registration and manage routing through role permission 



if Any Confusion To Uderstand The Project Sturcture or think that what type of Structure is i request you to contact once : 


Main Focuse Is On The Role Permission And The Funcitonlity For Now 