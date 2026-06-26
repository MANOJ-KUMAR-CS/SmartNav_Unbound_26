# 🛡️ SmartNav Dependency Installation Guide

This document lists all the dependencies required to run the client, server, and Python backend of the SmartNav project, along with instructions for installation.

---

## ⚡ Automated Installation (Recommended)

An automated script `install_all.bat` is available in the root directory. To install all dependencies for all services automatically:

1. Double-click the `install_all.bat` file in the project folder, OR
2. Open your terminal/command prompt, navigate to the `SmartNav` root, and run:
   ```cmd
   install_all.bat
   ```

---

## 🛠️ Manual Installation & Dependency List

If you prefer to install packages manually or want to understand what each dependency does, see the details below:

### 1. 🖥️ Client Side (`/client`)
Built with **React 18** and **Vite**.

#### How to Install:
```bash
cd client
npm install
```

#### Production Dependencies:
| Dependency | Version | Description |
| :--- | :--- | :--- |
| `@react-google-maps/api` | `^2.20.7` | Google Maps integration for React |
| `firebase` | `^12.9.0` | Backend/database services integration (Auth, Data store) |
| `leaflet` | `^1.9.4` | Core Leaflet library for 2D mapping |
| `lucide-react` | `^0.542.0` | Premium, modern icon set |
| `react` | `^19.1.1` | Front-end UI library |
| `react-dom` | `^19.1.1` | React rendering package for DOM |
| `react-globe.gl` | `^2.37.0` | 3D WebGL Globe component for interactive visuals |
| `react-leaflet` | `^5.0.0` | React wrapper for Leaflet maps |
| `react-router-dom` | `^7.8.2` | Client-side routing library |
| `three` | `^0.183.1` | 3D graphics library powering WebGL elements |
| `web3` | `^4.16.0` | Ethereum JavaScript API (if blockchain hooks are used) |

#### Development Dependencies:
| Dependency | Version | Description |
| :--- | :--- | :--- |
| `vite` | `^7.1.2` | High-performance bundler and development server |
| `@vitejs/plugin-react` | `^5.0.0` | React support plugin for Vite |
| `eslint` | `^9.33.0` | Static code analyzer for identifying issues |
| `@eslint/js` | `^9.33.0` | ESLint rules configuration |
| `eslint-plugin-react-hooks` | `^5.2.0` | Linter rules for React Hooks |
| `eslint-plugin-react-refresh` | `^0.4.20` | React Refresh support for Vite HMR |
| `globals` | `^16.3.0` | Global variables list for ESLint |
| `@types/react` | `^19.1.10` | TypeScript definitions for React |
| `@types/react-dom` | `^19.1.7` | TypeScript definitions for React DOM |

---

### 2. ⚙️ Server Side Backend (`/server`)
Built with **Node.js** and **Express**.

#### How to Install:
```bash
cd server
npm install
```

#### Production Dependencies:
| Dependency | Version | Description |
| :--- | :--- | :--- |
| `express` | `^5.1.0` | Robust, minimalist web framework for APIs |
| `cors` | `^2.8.5` | Middleware to enable Cross-Origin Resource Sharing |
| `dotenv` | `^17.2.2` | Loads environment variables from `.env` |
| `mysql2` | `^3.14.5` | MySQL client for database storage and queries |
| `bcryptjs` | `^3.0.2` | Secure password hashing library |
| `jsonwebtoken` | `^9.0.2` | JSON Web Token implementation for session security |
| `axios` | `^1.13.6` | Promise-based HTTP client for API requests |
| `body-parser` | `^2.2.0` | Request body parsing middleware |
| `nodemailer` | `^8.0.1` | Email delivery service integration |
| `twilio` | `^5.12.2` | Twilio SDK for dispatching SMS SOS alerts |
| `puppeteer` | `^24.39.0` | Headless browser API for automated scraping and testing |

#### Development Dependencies:
| Dependency | Version | Description |
| :--- | :--- | :--- |
| `nodemon` | `^3.1.10` | Automatically restarts node app upon file changes |

---

### 3. 🐍 Python Intelligence Engine (`/py_server`)
Handles geospatial calculations, safety routing, and automated news scraping.

#### How to Install:
```bash
cd py_server
pip install -r requirements.txt
```

#### Dependencies (`requirements.txt`):
| Package | Description |
| :--- | :--- |
| `Flask` | Micro-web framework for serving python API endpoints |
| `Flask-CORS` | CORS headers support for Flask endpoints |
| `pandas` | Data manipulation and analysis library |
| `geopandas` | Extends pandas to support spatial operations on geometric types |
| `folium` | Generates interactive Leaflet maps using Python |
| `shapely` | Manipulation and analysis of planar geometric objects |
| `requests` | HTTP library for web queries and API consumption |
| `beautifulsoup4` | Parses HTML/XML content (used in news scraping) |
| `selenium` | Web browser automation framework for dynamic scraping |
| `openpyxl` | Reader/writer library for Excel XLSX files |
| `lxml` | Fast XML and HTML parser |
| `xlsxwriter` | Creates Excel XLSX files with formatting |

---

## 🏃 Running the Application

After installing all dependencies, you can start all services concurrently using:
```cmd
start_all.bat
```
This launches separate command windows running:
- **Frontend client** on `http://localhost:5173`
- **Node backend** on `http://localhost:5000`
- **Python intelligence service** on `http://127.0.0.1:5001`
