# 📚 Book Manager

A full-stack web application for managing a book collection.
Built with **Angular 17** (frontend) and **ASP.NET Core 8** with **C#** (backend).

---

## 📁 Project Structure

```
BookManager/
├── backend/
│   └── BookApi/
│       ├── Controllers/
│       │   └── BooksController.cs     ← CRUD API endpoints
│       ├── Models/
│       │   └── Book.cs                ← Book model
│       ├── Program.cs                 ← App setup + CORS
│       ├── appsettings.json
│       └── BookApi.csproj
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── book-list/         ← Main table + modals
    │   │   │   └── book-form/         ← Add / Edit form
    │   │   ├── models/
    │   │   │   └── book.model.ts      ← Book interface
    │   │   ├── services/
    │   │   │   └── book.service.ts    ← HTTP API calls
    │   │   ├── app.module.ts
    │   │   └── app.component.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| .NET SDK | 8.0+ | https://dotnet.microsoft.com/download |
| Node.js | 18.x+ | https://nodejs.org |
| Angular CLI | 17.x | `npm install -g @angular/cli` |

---

### ▶️ Step 1 — Run the Backend (ASP.NET)

```bash
cd backend/BookApi
dotnet restore
dotnet run
```

The API will start at: **http://localhost:5000**

Swagger UI available at: **http://localhost:5000/swagger**

---

### ▶️ Step 2 — Run the Frontend (Angular)

Open a **new terminal**:

```bash
cd frontend
npm install
ng serve
```

The app will open at: **http://localhost:4200**

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| POST | `/api/books` | Create new book |
| PUT | `/api/books/{id}` | Update existing book |
| DELETE | `/api/books/{id}` | Delete a book |

### Sample Request Body (POST / PUT)

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publicationDate": "2008-08-01"
}
```

---

## ✨ Features

- 📋 View all books in a clean, sortable table
- ➕ Add new books with form validation
- ✏️ Edit existing books via modal form
- 🗑️ Delete books with confirmation dialog
- ✅ ISBN, title, author, date validation
- 💾 In-memory storage (pre-loaded with 3 sample books)
- 🔄 CORS configured for Angular dev server

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17, TypeScript, HTML, CSS |
| Backend | ASP.NET Core 8, C# |
| API Style | RESTful |
| Storage | In-memory list |
| HTTP Client | Angular HttpClient |
| Forms | Angular Reactive Forms |
