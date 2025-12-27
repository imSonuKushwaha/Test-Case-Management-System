# Test Case Management System

A full-stack Test Case Management System designed to help QA teams create, manage, execute, and track test cases efficiently across multiple projects with proper role-based access control.

This project is built with a frontend-first approach, using mock data initially, and is fully structured to integrate backend APIs without refactoring.

## Features Overview

### User Authentication & RBAC

JWT-based authentication (mocked on frontend)
Role-Based Access Control (RBAC)
Supported roles:
admin – full access
test-lead – manage test cases, projects, executions
tester – execute assigned test cases
read-only – view-only access
Protected routes and role-based UI rendering

## Project Management

### Implemented Features

Create and manage multiple projects
Project attributes:
Name
Description
Version
Status (Active, In Progress, Archived)
Assign team members to projects
Edit project details with prefilled data
Role restrictions:
Only admin and test-lead can create or edit projects

### Notes

User assignment is implemented using a minimal checkbox-based UI
Member data is stored in project state and is backend-ready

## Test Case Management

### Implemented Features

Create, edit, delete test cases (admin, test-lead)
View test cases (all roles)
Test case attributes:
Title
Description
Priority (Low, Medium, High, Critical)
Type (Functional, Regression, Integration, Smoke, UI, API)
Preconditions
Test steps with expected results
Test case details page
Prefilled edit form using test case ID
Bulk actions:
Select multiple test cases
Bulk delete (mock)
Bulk priority update (mock)

### Search and filter by:

ID
Title
Priority
Type

## Test Execution

### Implemented Features

Execution workspace (/executions)
Execute individual test cases (/executions/:id)
Record execution status:
Passed
Failed
Blocked
Skipped
Add execution comments
View execution history (mock data)
Role restrictions:
Execution allowed for admin, test-lead, tester

## Dashboard & Analytics

### Dashboard Features

Common summary cards for all roles:
Total test cases
Passed
Failed
Blocked
Pending

Role-based dashboard widgets:
Admin – system overview
Test Lead – team & execution progress
Tester – assigned and completed tests
Charts (Using Recharts)
Pie chart – test status distribution
Line chart – execution trend over time
Bar chart – pass/fail by priority

## Frontend Architecture

### Tech Stack

React 18
Vite
Tailwind CSS
React Router v6
Recharts
Axios (API-ready)
Key Concepts Used
React Hooks (useState, useEffect, useContext, useMemo)
Context API for authentication
Route-based code splitting with React.lazy
Reusable UI components
Clean separation of concerns
Mock services simulating backend APIs

## Folder Structure (Frontend)

### High-Level Structure

features/ – feature-based modules (auth, projects, testcases, executions)
components/ – shared layout and UI components
context/ – global state management
services/ – API abstraction layer
utils/ – helpers and constants

## Current Status

### Completed

Authentication (mocked)
Role-based access control
Project management (assessment-complete)
Test case management
Test execution flow
Dashboard with analytics
UI consistency and reuse
Edit prefilling for forms
Intentionally Skipped (Out of Scope)
Real backend implementation
File uploads
Advanced project permissions
Execution cycles and releases
CI/CD setup
