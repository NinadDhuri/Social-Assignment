# Campaign Tracker

A full-stack web application for managing marketing campaigns, built with Django (Backend) and Next.js (Frontend).

## Features

1.  **Full CRUD Operations**: Create, View, Update, and Delete campaigns.
2.  **Dashboard/Reporting**: Visualize campaign status distribution and total budget.
3.  **Third-Party API Integration**: Live currency exchange rates for budget planning.
4.  **Responsive UI**: Built with Tailwind CSS.

## Tech Stack

*   **Backend**: Python, Django, Django REST Framework
*   **Database**: PostgreSQL (Production) / SQLite (Development)
*   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Axios, Recharts

## Local Setup

### Prerequisites

*   Python 3.9+
*   Node.js 18+
*   Git

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Set up environment variables:
    *   Copy `.env.example` to `.env` (optional for local dev as defaults are set in settings.py).

5.  Run migrations:
    ```bash
    python manage.py migrate
    ```

6.  Start the server:
    ```bash
    python manage.py runserver
    ```
    The backend will run at `http://localhost:8000`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:3000`.

## Deployment

### Backend (Railway)

1.  Connect your GitHub repository to Railway.
2.  Railway should automatically detect the `Procfile` and Python environment.
3.  Add a PostgreSQL database service in Railway.
4.  Set the `DATABASE_URL` environment variable in the backend service to the Postgres connection string.
5.  Set `SECRET_KEY` and `DEBUG=False`.
6.  The `gunicorn` command in `Procfile` will start the server.

### Frontend (Vercel)

1.  Connect your GitHub repository to Vercel.
2.  Select the `frontend` directory as the Root Directory.
3.  Vercel will detect Next.js.
4.  Set the `NEXT_PUBLIC_API_URL` environment variable to your deployed Backend URL (e.g., `https://your-backend.up.railway.app/api`).
    *   **Note**: Ensure the trailing `/api` is included or adjust `frontend/lib/api.ts` accordingly. (The code defaults to appending nothing, so set it to root of API, e.g. `.../api` if endpoints are `.../api/campaigns/`).
    *   Current code uses `baseURL` as `NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'`. So set it to `https://.../api`.

## How to Test

### UI CRUD Flow

1.  Open the frontend application (Local: `http://localhost:3000`).
2.  **Create**: Click "New Campaign" in the navbar. Fill in the details (Title, Status, Budget, Dates) and click "Save". You should be redirected to the Dashboard.
3.  **View**: On the Dashboard, scroll down to see the list of campaigns. The new campaign should be visible.
4.  **Update**: Click the "Edit" icon (pencil) next to a campaign. Change the status or budget and click "Save". Verify the changes on the Dashboard list.
5.  **Delete**: Click the "Delete" icon (trash can) next to a campaign. Confirm the dialog. The campaign should be removed from the list.

### Reporting / Visualization

1.  Navigate to the Dashboard (`/`).
2.  At the top, you will see a "Campaigns by Status" bar chart.
3.  Below the chart, you will see the "Total Budget" summary.
4.  Add or Update a campaign's status or budget to see the charts update in real-time (after page refresh or navigation).

### Third-Party API Feature

1.  Navigate to the Dashboard (`/`).
2.  On the right side (or below charts on mobile), find the "Live Exchange Rates" widget.
3.  This widget fetches real-time currency rates (EUR, GBP, JPY, CAD) from `open.er-api.com` via the backend proxy endpoint (`/api/campaigns/rates/`).

## API Endpoints

*   `GET /api/campaigns/`: List all campaigns.
*   `POST /api/campaigns/`: Create a campaign.
*   `GET /api/campaigns/{id}/`: Retrieve a campaign.
*   `PUT /api/campaigns/{id}/`: Update a campaign.
*   `DELETE /api/campaigns/{id}/`: Delete a campaign.
*   `GET /api/campaigns/stats/`: Get dashboard statistics.
*   `GET /api/campaigns/rates/`: Get exchange rates.
