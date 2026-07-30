# Terminal Portfolio

An interactive, terminal-styled personal portfolio built with React, TypeScript, and Vite. Instead of scrolling through sections, visitors navigate the site like a Unix shell — running commands like `ll`, `cd`, and `cat` to explore projects, skills, and info stored in a virtual file system.

## Features

- 🖥️ Retro terminal UI with a blinking prompt and command input
- 📂 Virtual file system (`treeData`) representing folders and files (projects, about, contact, etc.)
- ⌨️ Familiar shell commands:
  - `ll` — list the contents of the current directory
  - `cd <path>` — change directory (supports relative and absolute paths)
  - `cat <file>` — print the contents of a file
  - `help` — show all available commands
  - `clear` — clear the terminal output
- 📜 Command history navigation with `↑` / `↓` arrow keys
- ⚠️ Friendly error output for unknown commands, missing files, and bad arguments

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`) in your browser.

### Build

```bash
npm run build
```

The production-ready output is generated in the `dist/` folder.

## Usage

Once the app is running, try typing commands into the terminal prompt:

```
ll
cd projects
ll
cat my-project.md
cd ..
help
clear
```

## Project Structure

```
src/
├── App.tsx          # Main terminal logic, command handling, UI
├── App.css          # Global styles
├── MainHeader.tsx    # ASCII/welcome header shown on load
├── treeData.tsx      # Virtual file system data (folders & files)
└── main.tsx          # App entry point
```

## Customization

Edit `src/treeData.tsx` to add your own folders and files — each `file` node's `content` is what gets printed by `cat`, and each `folder` node's `children` array defines what shows up under `ll` and `cd`.

## License

This project is open source and available under the [MIT License](LICENSE).