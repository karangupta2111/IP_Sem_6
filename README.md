# Auto-Save Text Editor

A modern, responsive, and feature-rich text editor built with React and Vite. This application provides a seamless writing experience with robust local storage persistence, custom history management, and a beautiful UI.

## ✨ Features

- **Real-time Auto-Save**: Your work is automatically saved to your browser's local storage as you type (debounced to optimize performance).
- **Custom Undo/Redo**: Implemented using custom stack data structures for reliable history navigation.
- **Dark & Light Mode**: A sleek theme toggle for comfortable writing in any lighting condition.
- **File Management**: 
  - Create new files
  - Open existing `.txt` files from your device
  - Download/Export your work as a `.txt` file
- **Live Statistics**: Real-time word and character count tracking.
- **Modern UI/UX**: Features a premium glassmorphism design with animated background elements.

## 🛠️ Technology Stack

- **React 19**: UI Library
- **Vite**: Build Tool & Dev Server
- **Vanilla CSS**: Custom styling and animations
- **Local Storage API**: For data persistence without a backend

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd auto-save-editor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `https://autosaver-ip-project.netlify.app/`.

### Building for Production

To create a production build:

```bash
npm run build
```

You can preview the built application locally with:

```bash
npm run preview
```

## 📁 Project Structure

- `src/components/`: Contains UI components like `Editor` and `Toolbar`.
- `src/hooks/`: Custom React hooks, including `useDebounce` for optimized auto-saving.
- `src/utils/`: Utility classes, such as the `Stack` implementation for undo/redo.
- `src/index.css`: Global styles, CSS variables, and animations.
- `src/App.jsx`: Main application container and state management.

## 📝 License

This project is created for demonstration and educational purposes. Feel free to use and modify the code as needed.
