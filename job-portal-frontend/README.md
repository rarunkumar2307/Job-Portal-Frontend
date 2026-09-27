# Job Portal - Frontend

A React + Vite frontend for the existing Spring Boot "Job Portal" backend
(`com.jobportal.jobportal`). Every screen and API call in this app is wired
to an endpoint that actually exists in the uploaded backend project — see
`ENDPOINTS.md` for the full mapping this was built against.

## Stack

- React 18 + Vite
- React Router (client-side routing)
- Axios (HTTP client)
- Plain CSS (no UI library)

## Prerequisites

- Node.js 18+ and npm
- The Spring Boot backend running on `http://localhost:8080`
  (Oracle DB + Redis up, per the backend's own `application.properties`)

## Running it

```bash
cd job-portal-frontend
npm install
npm run dev
```

Vite starts on `http://localhost:5173` and proxies every `/api/**` request to
`http://localhost:8080` (configured in `vite.config.js`), so the backend's
CORS being disabled doesn't matter in development — the browser only ever
talks to `localhost:5173`.

To build a production bundle:

```bash
npm run build
npm run preview
```

For production, either enable CORS on the backend for your frontend's origin,
or serve the built `dist/` folder from the same origin as the API.

## How auth works

- `POST /api/auth/register` and `POST /api/auth/login` return
  `{ token, type, userId, name, email, role }`.
- The token is stored in `localStorage` and attached as
  `Authorization: Bearer <token>` to every subsequent request
  (see `src/api/axiosClient.js`).
- `role` from that same response drives which nav links and routes are shown
  — there is no separate "who am I" endpoint, so nothing is fetched beyond
  what login/register already returned.
- A logged-out visit to a role-specific page redirects to `/login`; a
  wrong-role visit redirects to `/`. These are UI conveniences only — the
  backend's own `SecurityConfig` role checks are still the real enforcement.

## Project structure

```
src/
  api/            one file per backend controller (authApi, jobApi,
                   candidateApi, recruiterApi, applicationApi, adminApi)
  context/        AuthContext - holds { token, userId, name, email, role }
  components/     Navbar, ProtectedRoute, Pagination, JobCard, StatusMessage
  pages/           Home, Register, Login, FindJobs, JobDetail
  pages/candidate/ Profile, Resume, Applications
  pages/recruiter/ Profile, PostJob, MyJobs, EditJob, JobApplications
  pages/admin/     Users, Jobs, Applications
```

## Known gaps / things to double check against your backend

- `PageResponse` fields (`content, pageNumber, pageSize, totalElements,
  totalPages, first, last, empty`) are read exactly as your `PageResponse.java`
  defines them. If you rename any of those fields, the pagination controls
  and table rendering will need matching updates.
- The Admin "Applications" screen is view-only, because there's no backend
  endpoint for an admin to change application status (only
  `PUT /api/applications/{id}/status`, which `SecurityConfig` restricts to
  `ROLE_RECRUITER`).
- Resume downloads use `responseType: 'blob'` — confirm your
  `CandidateController`/`RecruiterController` download endpoints return the
  raw PDF bytes with `Content-Type: application/pdf` (they do, as inspected).
