# SynesisIT Blog Application

## Overview

This project is a React-based blog application that allows users to view, search, and interact with blog posts. The application is designed with a responsive UI and includes features such as dynamic blog fetching, search functionality, and a "Read More" option for extended content.

## Features

- Dynamic Blog Fetching: Retrieves blog data from a mock API.
- Search Functionality: Enables users to search for blogs by title or content.
- Responsive Design: Ensures optimal viewing across various devices.
- Read More: Displays a truncated version of the blog content with an option to read the full post.

## Getting Started

### Prerequisites

- Node.js: Ensure that Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the Repository:

   git clone https://github.com/LazyOlaf/SynesisIT.git
   cd SynesisIT

2. Install Dependencies:

   npm install

### Running the Application

To start the development server:

npm start

The application will be accessible at `http://localhost:3000` in your browser.

## Assumptions and Decisions

### Assumptions

- API Data: The application fetches blog data from a mock API endpoint.
- User Interface: The design is intended to be clean and user-friendly, focusing on core functionalities.

### Decisions

- State Management: Utilizes React's built-in `useState` and `useEffect` hooks for managing state and side effects.
- Styling: Employs CSS modules for component-scoped styling to prevent class name conflicts.
- Routing: Implements React Router for navigation between different pages within the application.

## Available Scripts

In the project directory, you can run:

- npm start: Runs the app in development mode. Open `http://localhost:3000` to view it in the browser.
- npm test: Launches the test runner in interactive watch mode.
- npm run build: Builds the app for production to the `build` folder.
- npm run eject: Removes the single build dependency from your project. Note: this is a one-way operation. Once you `eject`, you can't go back!