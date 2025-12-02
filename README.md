Vue Todo App with Authentication
Overview
A simple Todo app with user login. This project teaches:

User login with an external API
Protected routes
State management with Pinia
Todo CRUD operations
Favorites and filtering
Data persistence with localStorage

Keep code clean and minimal. Use Vue 3, Vuetify, and Pinia ONLY. No extra auth libraries.


Tech Stack
Technology
Purpose
Vue 3
Framework (Composition API with <script setup>)
Vite
Build tool
Vue Router
Routing and navigation guards
Pinia
State management
Vuetify
UI components (strictly)
vue-cookies
Cookie management (https://www.npmjs.com/package/vue-cookies)



Project Initiation
Start with the following command

npm create vuetify@latest



Phase 1: User Authentication
Login Page
Create a login page at /login
Collect username and password
Use Vuetify form components with validation rules
Show loading state during API call
Auth API
POST to: https://dummyjson.com/auth/login

Request:

{
  "username": "string",
  "password": "string"
}

Response:

{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Test Credentials
Username: emilys
Password: emilyspass
Token Storage
Store accessToken in a cookie using vue-cookies
Store user info (id, username, firstName, lastName) in Pinia auth store
No token refresh needed
Error Handling
Show API error messages using Vuetify components
Logout
Clear the cookie
Reset the store
Redirect to /login
Route Protection
Set up Vue Router guards:

Route
Auth Required
Description
/login
No
Login page
/dashboard or /
Yes
Main dashboard


Rules:

No token + protected route → Go to /login
Has token + visits /login → Go to / or /dashboard


Phase 2: Todo CRUD
Todo Structure
{
  "id": "string (unique)",
  "title": "string",
  "completed": false,
  "isFavorite": false,
  "createdAt": "ISO date string"
}

CRUD Operations on todos.
Data Persistence
Use Pinia for state
Save to localStorage on every change
Load from localStorage on login


Phase 3: Filtering and Sorting
Filters
Show todos by:
All
Active only
Completed only
Favorites only
Sorting
Sort todos by:
Date (newest/oldest first)
Alphabetically (A-Z / Z-A)
Favorites first
Implementation
Use v-btn-toggle or v-select for controls
Use computed properties in Pinia for filtered/sorted list
Keep original array unchanged


Code Expectations
Keep components small and focused
Use <script setup> for all components
Avoid unnecessary complexity
You MUST understand and explain your own code
Use Vue, Vuetify, and Pinia docs more than AI
Strictly Vuetify components only
Use Vuetify built-in CSS classes
Use Composition API throughout

