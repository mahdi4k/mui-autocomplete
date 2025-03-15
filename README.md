# MUI Autocomplete

MUI Autocomplete is a React-based project that implements an autocomplete component using **Material-UI (MUI)**. It supports lazy loading of options, infinite scrolling, and a keyboard shortcut (**Ctrl + K**) to open the autocomplete.

## 🚀 Features
- Autocomplete with **MUI**
- Supports **lazy loading** of product options
- **Infinite scrolling** for fetching more data
- Keyboard shortcut **Ctrl + K** to open the input field
- Debounced search using **lodash.debounce**
- State management with **Redux Toolkit**
- Built with **Vite** for fast development

## 🛠️ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mahdi4k/mui-autocomplete.git
   cd mui-autocomplete
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Create a **.env** file by copying **.env.example**:
   ```sh
   cp .env.example .env
   ```
   Then, use the following address in `.env` without modification:
   ```env
   VITE_API_BASE_URL=https://dummyjson.com
   ```

## 💻 Usage

### Start the development server
```sh
yarn dev
```

### Build for production
```sh
yarn build
```

### Preview production build
```sh
yarn preview
```

### Run ESLint
```sh
yarn lint
```

## 📦 Dependencies
### Main Dependencies:
- **[@mui/material](https://mui.com/)** - UI Components
- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)** - State Management
- **[lodash.debounce](https://lodash.com/docs/4.17.15#debounce)** - Debounced Search
- **[react](https://react.dev/)** - UI Framework

### Development Dependencies:
- **[vite](https://vitejs.dev/)** - Build Tool
- **[typescript](https://www.typescriptlang.org/)** - Type Safety
- **[eslint](https://eslint.org/)** - Linting
- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)** - React Plugin for Vite
