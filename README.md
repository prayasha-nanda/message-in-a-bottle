# Message in a Bottle 🌊
A small full-stack project where users can write messages, tag them by type, and send them out “in a bottle.” Random messages can be fetched back, giving the feeling of receiving thoughts from strangers across the sea.

A simple distributed message-sharing experiment built with:

* **Frontend**: React (Messages.jsx)
* **Backend**: Node.js (index.js)
* **Database Service**: Python + SQLite3

---

## ⚙️ Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/prayasha-nanda/message-in-a-bottle.git
   cd message-in-a-bottle
   ```

2. **Install dependencies**

   Install root dev dependencies:

   ```bash
   npm install
   ```

   Then install backend + frontend dependencies:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. **Set up database**

   The SQLite database is located at:

   ```
   backend/database/messages.db
   ```

   The table `messages` is already created with:

   * `id` (auto)
   * `content` (TEXT)
   * `tag` (TEXT — must be one of: `"quote"`, `"song"`, `"rambling"`)
   * `timestamp` (defaults to current time)

---

## 🚀 Running the project

From the **root folder**, run:

```bash
npm start
```

This will launch **both frontend and backend** together using concurrently!

---
## 📝 Notes

* Encoding issues (like `â€™` showing up instead of `'`) can happen if your text isn’t inserted in UTF-8. Make sure to insert messages with UTF-8 encoding.
* Tags (`quote`, `song`, `rambling`) are validated at insertion time.
---

👉 Do you want me to also add **step-by-step commands to recreate the database and run the scripts** so that someone new can follow without context?
