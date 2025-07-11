# ChillPath
Tracking deliveries and cold storage for Dairy Products

Project Progress Summary: ChillPath – Delivery Temp Tracking System
Work Completed:

Initial Setup and Structure

Established Express.js backend with modular route structure.

Set up static front-end using vanilla JavaScript and HTML5.

Created basic file-based storage system using fileStorage.js utility for persistence.

CRUD Functionality for Products and Outlets

Implemented POST endpoints for /api/products and /api/outlets.

Enabled front-end forms for adding products and outlets dynamically.

Integrated dropdown population from stored product/outlet data.

Delivery Record Management

Added POST /api/deliveries for recording new delivery logs.

Created logic to show temperature status as "OK" or "At Risk".

Included delivery form and log table in the UI.

Filtering and Sorting Enhancements

Implemented dropdown filter by product.

Added date range filtering for delivery records.

Ensured sorting of deliveries in descending order by date.

Edit & Update Support

Integrated edit button functionality for delivery entries.

Created PUT /api/deliveries/:id endpoint with proper validation.

Updated delivery form to switch between add/edit mode with reset logic.

Delete Functionality

Added DELETE /api/deliveries/:id endpoint to remove records.

Hooked front-end delete buttons to backend route with confirmation.

UI Improvements & Fixes

Fixed filter layout and structure for intuitive flow.

Corrected delivery submission behavior to support both new entries and edits.

Handled edge cases where values like 0 were being rejected by validation.

Error Handling and Debugging

Resolved multiple 500 and 400-level backend issues caused by improper validations.

Added frontend-side messaging and logging to help with runtime issues.


