# FastAPI Backend

## Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. During development, the Vite dev server proxies `/api` requests to this address.
