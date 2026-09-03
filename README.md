# EMS

Employee Management System for assigning work, tracking status, and managing staff in one workspace. Built with the MERN stack: MongoDB, Express, React, and Node.js.

Admins run the company workspace. Staff members work on assigned tasks and keep their own notes. The UI supports dark and light mode.

## Features

- Cookie-based login with JWT (httpOnly, 1 hour expiry)
- Two roles: **admin** and **staff**
- Dashboard with task counts and a recent-task carousel
- Tasks with priority, status, due date, assigned staff, attachments, comments, and activity history
- Staff CRUD, search, and filters (admin only)
- Personal notes with colors
- Company settings: name, email, phone, logo, privacy policy, and terms of service
- Dark / light theme, stored in the browser
- Local file uploads for task attachments and the company logo



### Roles


|                                                   | Admin           | Staff               |
| ------------------------------------------------- | --------------- | ------------------- |
| Dashboard, tasks, notes, profile, password        | Yes             | Yes                 |
| Create tasks                                      | Yes             | No                  |
| Staff list and staff CRUD                         | Yes             | No                  |
| Company settings                                  | Yes             | No                  |
| Task comments, status changes, view assigned work | Yes (all tasks) | Assigned tasks only |




### Tasks

- Title, description, priority (`urgent`, `high`, `medium`, `low`)
- Status (`pending`, `accepted`, `completed`, `failed`)
- Due date and assigned staff
- Up to 5 attachments (JPG, PNG, WEBP, GIF, or PDF, 5MB each)
- Comments and a full activity log (create, update, status, priority, due date, assignment)



### Other modules

- **Notes** — title, description, color; each user sees their own notes
- **Settings** — company brand in the header, sidebar, and footer; privacy and terms pages at `/privacy` and `/terms`
- **Theme** — sun/moon toggle on login and in the header



## Screenshots

Add PNG files to `[docs/screenshots/](docs/screenshots/)`. Use the names below so they show up here automatically.


| Page      | Dark mode            | Light mode            |
| --------- | -------------------- | --------------------- |
| Login     | `login-dark.png`     | `login-light.png`     |
| Dashboard | `dashboard-dark.png` | `dashboard-light.png` |
| Tasks     | `tasks-dark.png`     | `tasks-light.png`     |
| Notes     | `notes-dark.png`     | `notes-light.png`     |
| Staff     | `staff-dark.png`     | `staff-light.png`     |
| Settings  | `settings-dark.png`  | `settings-light.png`  |


After those files are in the folder, they can be shown here.

## Tech stack

**Backend**

- Node.js, Express 5
- MongoDB with Mongoose
- JWT in an httpOnly cookie
- bcrypt, Helmet, CORS, express-rate-limit, express-validator, Multer

**Frontend**

- React 19, Vite, React Router 7
- Tailwind CSS 4
- Axios (credentials / cookies)
- Lucide icons, React Toastify



## Project structure

```
EMS-MERN-APP/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/          # seedAdmin.js
│   │   ├── utils/
│   │   └── validators/
│   └── uploads/              # tasks/ and logo/ (gitignored)
├── Frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
└── docs/screenshots/
```



## Getting started



### Requirements

- Node.js
- MongoDB running locally or a MongoDB URI



### 1. Backend

```bash
cd Backend
copy .env.example .env
npm install
```

On macOS/Linux use `cp .env.example .env`.

Set at least `MONGO_URI` and `JWT_SECRET` in `Backend/.env`. Use `PORT=8000` so it matches the frontend default API URL.

```bash
npm run dev
```

The API starts at `http://localhost:8000` when `PORT=8000`.

Create the first admin user:

```bash
node src/scripts/seedAdmin.js
```

The script reads `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and related values from `.env`. Set a strong `ADMIN_PASSWORD` before seeding. Change that password after the first login.

### 2. Frontend

```bash
cd Frontend
copy .env.example .env
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173). Open `/login` to sign in.

`VITE_API_URL` must point at the backend (default `http://localhost:8000`).

## Environment variables



### Backend (`.env`)


| Variable           | Required | Description                                                |
| ------------------ | -------- | ---------------------------------------------------------- |
| `MONGO_URI`        | Yes      | MongoDB connection string                                  |
| `JWT_SECRET`       | Yes      | Secret used to sign auth tokens                            |
| `PORT`             | No       | API port (use `8000` to match the frontend default)        |
| `CLIENT_URI`       | No       | Frontend origin for CORS (default `http://localhost:5173`) |
| `NODE_ENV`         | No       | `development` or `production`                              |
| `ADMIN_USERNAME`   | No       | Username created by the seed script                        |
| `ADMIN_PASSWORD`   | No       | Password created by the seed script                        |
| `ADMIN_EMAIL`      | No       | Email for the seeded admin                                 |
| `ADMIN_FIRST_NAME` | No       | First name for the seeded admin                            |
| `ADMIN_LAST_NAME`  | No       | Last name for the seeded admin                             |
| `ADMIN_PHONE`      | No       | 10-digit phone for the seeded admin                        |


Do not commit `.env` files.

### Frontend (`.env`)


| Variable       | Required | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `VITE_API_URL` | No       | Backend base URL (default `http://localhost:8000`) |




## Frontend routes


| Path               | Access    | Page                                 |
| ------------------ | --------- | ------------------------------------ |
| `/login`           | Public    | Sign in                              |
| `/dashboard`       | Signed in | Task stats and recent tasks          |
| `/tasks`           | Signed in | Task list, filters, create/edit/view |
| `/notes`           | Signed in | Personal notes                       |
| `/profile`         | Signed in | Profile                              |
| `/change-password` | Signed in | Change password                      |
| `/privacy`         | Signed in | Privacy policy                       |
| `/terms`           | Signed in | Terms of service                     |
| `/staffs`          | Admin     | Staff list and CRUD                  |
| `/settings`        | Admin     | Company settings                     |


Unknown paths redirect to `/dashboard`. Guests are sent to `/login`.

## API overview

All `/api` routes are rate limited (300 requests / 15 minutes). Login is limited to 10 failed attempts / 15 minutes.


| Method                            | Path                             | Auth      | Notes                       |
| --------------------------------- | -------------------------------- | --------- | --------------------------- |
| `POST`                            | `/api/auth/login`                | Public    | Sets the `token` cookie     |
| `POST`                            | `/api/auth/logout`               | Public    | Clears the cookie           |
| `GET`                             | `/api/auth/me`                   | Signed in | Current user                |
| `GET`                             | `/api/staff/dashboard`           | Signed in | Dashboard counts            |
| `GET` / `POST` / `PUT` / `DELETE` | `/api/staff`                     | Admin     | Staff CRUD                  |
| `PUT`                             | `/api/staff/change-password/:id` | Signed in | Own password                |
| `GET`                             | `/api/tasks`                     | Signed in | List / filter / paginate    |
| `POST`                            | `/api/tasks`                     | Admin     | Create (multipart)          |
| `GET` / `PUT` / `DELETE`          | `/api/tasks/:id`                 | Signed in | Staff: assigned tasks only  |
| `PUT`                             | `/api/tasks/:id/status`          | Signed in | Status change               |
| `GET`                             | `/api/tasks/:id/activities`      | Signed in | Activity history            |
| `GET` / `POST` / `PUT` / `DELETE` | `/api/tasks/:taskId/comment`     | Signed in | Comments                    |
| `GET` / `POST` / `PUT` / `DELETE` | `/api/notes`                     | Signed in | Own notes                   |
| `GET`                             | `/api/settings`                  | Signed in | Company settings            |
| `POST`                            | `/api/settings/update-settings`  | Admin     | Update settings (multipart) |


Uploaded files are served from `/uploads`.

## Security

- Passwords are hashed with bcrypt and never returned in API responses
- JWT is stored in an httpOnly cookie (`Secure` + `SameSite=strict` in production)
- Helmet on all responses
- Login and API rate limits
- Staff members can only open tasks assigned to them
- Admin-only routes for staff management, task creation, and settings updates
- Uploads are type- and size-checked; upload folders are gitignored



## License

ISC