📝 Daily Task Manager (CRUD)

📌 Overview
A simple, responsive web application to manage daily tasks with "ToDo" and "Completed" tabs.
Built using React, following clean component structure, and implementing complete CRUD operations.

🎯 Functional Requirements
Add a new task with a default status of "PENDING".
View tasks filtered by status (PENDING or COMPLETED).
Edit the task description.
Delete a task permanently.
Mark as Completed using a checkbox (moves task to "COMPLETED" tab).
Switch Tabs between ToDo and Completed lists.
Persist Data in localStorage so tasks remain after page reload.

🏗 High-Level Design (HLD)
Architecture
UI Layer (Frontend): React functional components with Hooks.
State Management: useState.

Component Structure
App
 └── Crud → Handles all CRUD logic & UI
      ├── Tabs (inside Crud)        → Switch between "ToDo" & "Completed"
      ├── TaskForm (inside Crud)    → Add new tasks
      └── TaskList (inside Crud)    → Render tasks for selected tab
           └── TaskItem (inside Crud) → Single task (checkbox, text, edit, delete)

📊 Data Flow
User Action → Event Handler (inside Crud) → State Update (useState) → Re-render UI
Workflow:
User adds/edits/deletes a task through form or buttons.
Event handler in Crud updates the tasks state.
React re-renders the UI with updated tasks.
Current tab state (PENDING or COMPLETED) decides which list is displayed.
No backend or localStorage — data is lost on refresh.

## 🔍 Low-Level Design
- App.jsx:
- Crud.jsx: Manages state & CRUD functions, Handles tab switching, Adds new tasks, Displays tasks & Shows individual task with actions

🛠 Low-Level Design (LLD)
States:
| State Variable | Type         | Purpose                                   |
| -------------- | ------------ | ----------------------------------------- |
| `tasks`        | Array        | Stores task objects `{id, text, status}`  |
| `currentTab`   | String       | `"PENDING"` or `"COMPLETED"`              |
| `taskInput`    | String       | Holds text input value for new/edit tasks |
| `editTaskId`   | Number\|null | Tracks which task is being edited         |

Event Handlers:
| Function                  | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `addTaskHandler()`        | Adds a new task with `"PENDING"` status          |
| `editTaskHandler(task)`   | Sets edit mode for the selected task             |
| `updateTaskHandler()`     | Updates the text of the selected task            |
| `deleteTaskHandler(task)` | Removes the task from state                      |
| `checkboxHandler(task)`   | Moves task between `"PENDING"` and `"COMPLETED"` |
| `setCurrentTab(tab)`      | Switches UI between tabs                         |


📌 Component Responsibilities:
Crud (Single Component):
UI Management:
Render tab buttons, task form, and task list.
Conditionally display tasks based on currentTab.

State Management:
Store all task-related data in useState.
Control which tab is active.
Handle form inputs and edit mode.

Business Logi:
Add, edit, delete, and toggle task status.
Keep all operations synchronous in memory (no external storage yet).


🚀 Installation & Usage
git clone <https://github.com/NagendharanNagu/onTrack.git>
npm install
npm run dev
