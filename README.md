# Project Documentation
[Vercel App](https://spacex-next-js-wien.vercel.app/login)

## Overview

This project is a web application built with TypeScript, JavaScript, React, and Next.js. It provides a login system and displays information about rockets. The application fetches data from an API and displays it in a user-friendly format.

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Running the Application

To run the application, use the command `npm run start`. This will start the application on `localhost:3000`.
Create a .env file in the root directory and add the following line:
```credentials=user@test.com:password```. For vercel deployed app user name is "user@test.com" and password is "password".
Currently signup feature is not available in the app so user can only login with the above credentials or change credentials in thier local environment. 



## Environment Variables

- `credentials`: This variable stores the login credentials for the application in the format `email:password`.



## Login System

The application includes a login system. The login page is defined in `src/app/%28pages%29/login/page.tsx`. The page includes a form where users can enter their email and password. On form submission, the application checks the entered credentials against the `credentials` environment variable. If the credentials match, the user is redirected to the rockets page.

## Styling

The application uses Tailwind CSS for styling. The configuration for Tailwind CSS is defined in `tailwind.config.ts`.

