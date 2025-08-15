# 🍳 iCook — AI-Powered Recipe App

iCook is a modern, minimal recipe web application that uses the **Gemini API** to instantly generate delicious recipes.  
Search for any dish or let iCook surprise you with a random recipe based on your chosen meal type and cuisine.

---

## ✨ Features

- 🔍 **Search Recipes** — Enter any meal name and get a structured recipe with description, prep time, cook time, ingredients, and instructions.
- 🎲 **Random Meal Generator** — Pick **Breakfast / Lunch / Dinner** + one of 30+ cuisines for an instant AI-generated recipe.
- 📋 **Copy & Download** — Copy recipes to your clipboard or save them as `.txt` files.
- 🎨 **Beautiful UI** — Clean white-and-red gradient theme with smooth animations and icons.
- 🔒 **Secure Backend** — API key is safely stored on the server (never exposed to the browser).

---

## 🛠 Tech Stack

- **Frontend:** React + Vite + TailwindCSS + Framer Motion + lucide-react icons
- **Backend:** Express.js API proxy (hides Gemini API key)
- **AI:** Google Gemini 2.0 Flash model

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/icook.git
cd icook
```

## Install dependencies
```
npm install
```

## ⚙️ Setup
Create a .env file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5174
```

- Note: Do not commit your .env file to version control.

## 🚀 Running the App
Run the backend proxy:

```
npm run server
```

Run the frontend:
```
npm run dev
```

Or run both together:
```
npm run dev:all
```

- Open in your browser:
http://localhost:5173

## 🧩 API Usage

All requests are routed through the /api/recipe endpoint on the backend.
The backend sends a structured prompt to Gemini and formats the AI’s JSON response.

## 📜 License

MIT License — free to use and modify.

## ❤️ Credits

Built with ☕ and 🍳 by R.Maunick

# Lovable project

## Project info

**URL**: https://lovable.dev/projects/390be1e4-52cf-4b81-bdad-1b0a5f0055da

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/390be1e4-52cf-4b81-bdad-1b0a5f0055da) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/390be1e4-52cf-4b81-bdad-1b0a5f0055da) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
