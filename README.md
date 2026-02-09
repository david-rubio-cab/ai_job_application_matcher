## Project Structure

```txt
ai_job_application_matcher/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entrypoint
│   │   ├── api/                 # API routes
│   │   ├── model/               # ML models (training & inference)
│   │   ├── preprocessing/       # Text cleaning and preprocessing
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── services/            # Business logic (matching, scoring)
│   │   └── utils/               # Helpers (PDF parsing, etc.)
│
│   ├── data/
│   │   ├── raw/                 # Raw datasets and uploaded CVs
│   │   └── processed/           # Cleaned and processed data
│
│   ├── notebooks/               # Experiments and exploration
│   ├── requirements.txt         # Backend dependencies installable via pip
│
└── frontend/
    ├── public/                  # Static public assets
    ├── src/
    │   ├── assets/              # Images and static resources
    │   ├── App.tsx              # Root React component
    │   ├── App.css              # App-level styles
    │   ├── UploadCV.tsx         # CV upload (drag & drop) component
    │   ├── UploadCV.css         # Styles for UploadCV
    │   ├── main.tsx             # Frontend entrypoint (React + Vite)
    │   └── index.css            # Global styles
    │
    ├── index.html               # HTML template
    ├── package.json             # Frontend dependencies and scripts
    ├── package-lock.json
    ├── tsconfig.json            # TypeScript base config
    ├── tsconfig.app.json        # TS config for the app
    ├── tsconfig.node.json       # TS config for Node/Vite
    ├── vite.config.ts           # Vite configuration
    └── eslint.config.js         # ESLint configuration



