# Job-Quest

A full-stack MERN website that connects job seekers with employers. Users can browse for jobs, apply for them, and employers can post new jobs. The platform offers role-specific features, ensuring a seamless experience for both job seekers and employers.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Hirehub.
```bash
npm i bcrypt cloudinary cookie-parser cors dotenv express express-fileupload jsonwebtoken mongoose validator 
```

Fork the Project by using:

```bash
git clone https://github.com/your-repo/Job-Quest.git
```

Then, cd into the project by using:

```bash
cd hirehub
```

Now, install the packages by running:

```bash
npm run setup
```

Run the project with the command:

```bash
npm run dev
```

## Built with

- **FrontEnd:** React.JS, HTML, CSS, Js
- **Backend:** Node.JS, Express.JS
- **Database:** MongoDB, Mongoose

## Features

- **Sign In / Sign Up / Sign Out** for both job seekers and employers.
- **Role-Specific Dashboards:** Job seekers can find and apply for jobs, while employers can post and manage job listings.
- **Job Posting**: Employers can post new jobs and view applications for their listings.
- **Application Tracking:** Job seekers can view and manage their job applications.
- **Dynamic Content Rendering** based on user roles (job seeker or employer).

## API

### Users

- **POST /api/auth/signUp**: Register a new user.
- **POST /api/auth/signIn**: Sign in a user.
- **PATCH /api/users/:userId**: Update user details.
- **DELETE /api/users/:userId**: Delete a user.

### Jobs

- **GET /api/jobs**: Get a list of jobs.
- **GET /api/jobs/:jobId**: Get details of a specific job.
- **POST /api/jobs/addJob**: Post a new job.
- **PATCH /api/jobs/:jobId**: Update a job posting.
- **DELETE /api/jobs/:jobId**: Delete a job.

### Applications

- **GET /api/applications**: Get all job applications for a job.
- **POST /api/applications/:jobId/apply**: Apply for a job.
