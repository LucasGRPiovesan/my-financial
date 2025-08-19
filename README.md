<<<<<<< HEAD
# my-financial
=======
# Finance Management Dashboard

A modern, responsive financial management dashboard built with **React**, **TypeScript**, **Tailwind CSS**, **Headless UI**, and **Chart.js**. This panel allows users to manage accounts, banks, transactions, and investments in an intuitive and visually appealing interface.

## Features

### Dashboard
- Overview of total invested, profitability, institutions, and recent activities.
- Interactive cards showing summarized financial metrics.
- Dark mode support.

### Transactions / Movements
- List of transactions with detailed information.
- Filtering and pagination for operational management.
- Semantic icons for transaction types.

### Accounts
- Management of bank accounts.
- Upcoming payments displayed in a side panel.
- Optional calendar view to visualize account due dates.
- Hover effects and modals for detailed information.
- Smooth transitions across elements.

### Banks
- Manage multiple banks and their profiles.
- Add, edit, and view bank details.
- Paginated bank listing with logos and items.

### Investments
- Overview of investments with total invested and total profitability.
- Interactive charts using **Chart.js** for investment distribution.
- List of individual investments with bank logos, type, value, and yield.
- Modal for viewing or adding new investments.
- Smooth transitions and semantic UI elements.

## Technologies

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Headless UI** for accessible components and modals
- **Chart.js** for data visualization
- **date-fns** for date management and localization
- **Lucide React** for icons

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/finance-dashboard.git
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Open http://localhost:5173 to view in your browser.

## Project Structure

```bash
src/
├── components/         # Reusable components (TopBar, modals, cards)
├── pages/              # Main pages
├── assets/             # Images, logos, icons
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── styles/             # Tailwind CSS configuration and base styles
└── App.tsx             # Main application entry
```
>>>>>>> 20dd469 (first commit)
