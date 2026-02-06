# SALIS AUTO Platform

A comprehensive automotive service platform connecting customers with verified service providers.

## 🚀 Features

### For Customers (B2C)

- **Smart Search**: Find service providers by specialty, location, and rating
- **Verified Providers**: All businesses are verified and rated by real customers
- **Direct Communication**: Contact providers via phone, email, or messaging
- **Reviews & Ratings**: Make informed decisions based on customer feedback

### For Businesses (B2B)

- **Business Dashboard**: Manage your service offerings and bookings
- **Customer Management**: Track customer interactions and history
- **Analytics**: Monitor performance metrics and revenue
- **SaaS Tools**: Comprehensive management system for automotive service businesses

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **Lucide React** - Beautiful icons

### Backend

- **FastAPI** - High-performance Python API
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - Python ORM
- **Pydantic** - Data validation

## 📦 Installation

### Frontend Setup

```bash
cd salisauto-platform
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Backend Setup

```bash
cd api
pip install -r requirements.txt
python main.py
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

## 🗄️ Database Setup

1. Install PostgreSQL
2. Create a database:

```sql
CREATE DATABASE salisauto;
```

1. Run the schema:

```bash
psql -U postgres -d salisauto -f api/schema.sql
```

## 📁 Project Structure

```
salisauto-platform/
├── app/                          # Next.js pages
│   ├── page.tsx                  # Landing page
│   ├── marketplace/              # Customer marketplace
│   └── business/                 # Business portal
│       └── dashboard/            # Business dashboard
├── api/                          # Python backend
│   ├── main.py                   # FastAPI application
│   ├── schema.sql                # Database schema
│   └── requirements.txt          # Python dependencies
└── public/                       # Static assets
```

## 🎨 Design Philosophy

The platform features a **dark neon theme** with:

- Gradient accents (emerald to cyan)
- Glassmorphism effects
- Smooth animations and transitions
- Premium, modern aesthetics

## 🔗 API Endpoints

- `GET /api/providers` - List service providers
- `GET /api/providers/{id}` - Get provider details
- `POST /api/providers` - Register new provider
- `GET /api/search` - Search providers
- `GET /api/specialties` - List specialties
- `POST /api/messages` - Send message to provider

## 📝 License

© 2026 SALIS AUTO. All rights reserved.
