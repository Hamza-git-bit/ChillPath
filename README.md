# ChillPath – Cold Chain Delivery Tracking System

**Student Name:** Muhammad Hamza Shahid  
**Student ID:** 20066492  
**Project Name:** ChillPath – Cold Chain Delivery Tracking System  
**Submission Type:** Individual Assignment  
**Technology Stack:** Node.js, Express, JSON storage, Jest

---

## Business Information

- **Business Name:** Mazhar Dairy  
- **Industry:** Dairy Distribution & Supplier  
- **Location:** [https://g.co/kgs/z9Uve1m](https://g.co/kgs/z9Uve1m)

---

## Project Overview

ChillPath is a simple but complete proof-of-concept information system built for Mazhar Dairy — a small local dairy distributor. The aim of the system is to track cold chain deliveries of products like milk and yogurt, which are temperature-sensitive and need to be handled carefully.

The system was developed to demonstrate a real-world application of CRUD operations using a combination of vanilla JavaScript for the frontend and Node.js (with Express) on the backend. It uses JSON files to simulate persistent data storage, removing the need for a database in this prototype phase.

---

## Key Features

### Frontend

- Built using plain HTML and JavaScript (no frameworks)
- Uses the fetch API to call backend RESTful endpoints
- DOM is dynamically updated — no page reloads
- Filters for date range and product
- Edit and delete buttons added dynamically to delivery logs

### Backend

- RESTful API built with Express
- Simple file-based “database” using JSON files
- Routes for managing:
  - `/api/products`
  - `/api/outlets`
  - `/api/deliveries`
- Data validation included, ensuring required fields and handling 0 as a valid input

---

## Commit Highlights & Project Milestones

### Project Setup

- **Initial Commit:** Uploaded 14 working files in a single commit, which included the base project setup, outlets/products/deliveries endpoints, and client-server interaction.

### Basic Functionality

- **Added JS form handler for my Product form**  
  Enabled adding new products via a form, with data going to the API.

- **added clear table button**
- **This clears the table body by setting its HTML to empty**  
  Added a button to clear the delivery table on the frontend dynamically.  
  *ChatGPT assisted with logic for clearing DOM elements.*

- **Added clear view buttons for product list, outlet list, and delivery form**
  Implemented buttons to reset various views for a cleaner user experience.  
  *Conceptual advice taken from ChatGPT around DOM manipulation.*

- **Updated backend route in deliveries to handle PUT**  
  Added backend logic to allow editing (PUT requests) of delivery entries.  
  *ChatGPT helped clarify differences between POST/PUT and update logic.*

### Editing & Updating Delivery Entries

- **Updated loadDeliveries() in app.js and Added "Edit" Button to Each Delivery Row**
- **Added Global editingId Variable to track when we're editing instead of adding**
- **Added Delete and Edit handlers in app.js**  
  This trio of commits implemented full edit/update/delete functionality on the client side, including tracking editing state.  
  *ChatGPT helped with event listeners, updating rows in-place, and toggling form behaviors.*

- **Refactor File Read/Write Helpers into utils/fileStorage.js to Improve readability**
- **Refactor routes/outlets.js to Use Shared File Storage**
- **Refactor deliveries route to use shared file storage utility**  
  Cleaned up code by modularizing file access logic, improving route readability and DRYness.  
  *ChatGPT helped structure reusable functions and modular directories.*

### Delivery List Enhancements

- **Showing Product and Outlet Names in Delivery Log (Instead of Just IDs)**
- **Fixed broken routes by replacing undefined helper functions**
- **Fixed delivery delete, dropdown loading, and product/outlet POST issues**  
  Improved output formatting for logs, and fixed several bugs in delivery loading.  
  *ChatGPT assisted in mapping product/outlet IDs to names and debugging load logic.*

### Filters & UI Tweaks

- **Sorted deliveries by most recent date first**
- **Added Date Filter Logic**
- **Added date range filter to delivery log**  
  Users can now filter the delivery list based on date range, improving usability.  
  *ChatGPT helped structure filtering logic and date comparisons.*

- **Fix delivery log layout: correctly position product filter and date inputs above the table**
- **Show product unit next to name in delivery dropdown**
- **Improve form clarity with better input labels and examples**
- **Style action buttons for better delivery management UX**
- **Added clean CSS styles**  
  A series of UI improvements making forms easier to understand and logs easier to interpret.

### Testing Added

- **Create placeholder test files**
- **created a Unit Test for deliveries.test.js**
- **created a Unit Test for fileStorage.js**
- **Add and pass complete unit and integration tests for deliveries, products, outlets, and file storage**  
  Tests were written and passed using Jest and Supertest.  
  *ChatGPT helped craft API test cases and mock file usage properly.*

---

## Testing Summary

### Unit Tests
- `fileStorage.test.js`: Validates file read/write utility functions work correctly
- `deliveries.test.js`: Covers scenarios for adding, editing, and removing deliveries

### Integration Tests
- Simulates creating a delivery via frontend input and confirms backend updates the JSON file and reflects changes in log

Test framework used: **Jest**  
API testing library: **Supertest**

---

## System Architecture

- Backend: Node.js + Express
- Frontend: HTML + JavaScript 
- Data storage: JSON files (`products.json`, `outlets.json`, `deliveries.json`)
- No external DBs or CSS frameworks used
- Fully modularized with utility folders and route separation

---

## Attribution Summary

This summary outlines all instances where external resources (documentation, Ai tool) were used in alignment with the assessment’s academic integrity policies. All integrations, inspirations, and troubleshooting support have been properly attributed below and adapted to the project’s original structure and logic.

### Purpose of Assistance

During the development of **ChillPath – Cold Chain Delivery Tracking System**, third-party sites and tools were consulted in the following areas:

- Understanding and implementing backend CRUD operations using Express.js
- Structuring frontend JavaScript logic for fetch requests and DOM manipulation
- Debugging and optimizing Node.js routing and data handling
- Resolving validation and asynchronous behavior issues
- Structuring unit and integration tests using Jest and Supertest
- Formatting project structure and designing modular code

---

### Attributions and Types of Work Influenced or Informed by Outside Resources

- **Backend CRUD Design (routing, validation, error handling)**: Guided by Express.js and Chat GPT.
- **Frontend Logic (fetch APIs, input handling, DOM updates)**: References taken from Chat GPT.
- **Form Validation**: Assistance from ChatGPT to handle edge cases like allowing 0 as valid form input.
- **Unit & Integration Testing**: Structured using official Jest and Supertest documentation.
- **Troubleshooting Asynchronous Issues and Data Mapping**: ChatGPT provided guidance that was translated into working custom code.
- **Modular Code Refactoring**: Applied patterns suggested by AI tools to clean up file structures.

---

### Academic Note

All third-party content used during development was either:
AI-based suggestions that were not directly copied or pasted, but rewritten, tested, and adapted with clear understanding and modification.

No code belonging wholly to an external source was integrated as-is. Every aspect of the system was written, tested, and structured by the student. Where ideas or solutions were adapted, transformation and learning were clearly demonstrated.

---

This attribution supports transparency, follows academic guidelines, and ensures credit is properly given.