import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Crud from '../components/Crud';

// Mock CSS import
vi.mock('../css/crud.css', () => ({}));

describe('Daily Task Manager - CRUD Component', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    // Clear mocks before each test
    vi.clearAllMocks();
    window.alert.mockClear();
  });

  describe('Initial Render', () => {
    it('should render the main heading', () => {
      render(<Crud />);
      expect(screen.getByText('Daily Task Manager')).toBeInTheDocument();
    });

    it('should render input field with placeholder', () => {
      render(<Crud />);
      expect(screen.getByPlaceholderText("Let's make today productive! 😊")).toBeInTheDocument();
    });

    it('should render Add Task button initially', () => {
      render(<Crud />);
      expect(screen.getByText('AddTask')).toBeInTheDocument();
    });

    it('should have Add Task button disabled when input is empty', () => {
      render(<Crud />);
      expect(screen.getByText('AddTask')).toBeDisabled();
    });

    it('should render ToDo and Completed tabs', () => {
      render(<Crud />);
      expect(screen.getByText('ToDo')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('should have ToDo tab active by default', () => {
      render(<Crud />);
      expect(screen.getByText('ToDo')).toHaveClass('active-tab');
      expect(screen.getByText('Completed')).toHaveClass('inactive-tab');
    });
  });

  describe('Adding Tasks', () => {
    it('should add a new task when input is provided', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Learn Vitest');
      expect(addButton).not.toBeDisabled();
      
      await user.click(addButton);

      expect(screen.getByText('Learn Vitest')).toBeInTheDocument();
      expect(input.value).toBe('');
    });

    it('should not add empty tasks', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, '   '); // Only spaces
      expect(addButton).toBeDisabled();
    });

    it('should prevent duplicate tasks and show alert', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      // Add first task
      await user.type(input, 'Learn React');
      await user.click(addButton);

      // Try to add duplicate task
      await user.type(input, 'Learn React');
      await user.click(addButton);

      expect(window.alert).toHaveBeenCalledWith('Learn React — already in the list.');
      expect(input.value).toBe('');
    });

    it('should handle case-insensitive duplicates', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Learn React');
      await user.click(addButton);

      await user.type(input, 'LEARN REACT');
      await user.click(addButton);

      expect(window.alert).toHaveBeenCalledWith('LEARN REACT — already in the list.');
    });

    it('should handle duplicates with extra spaces', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Learn React');
      await user.click(addButton);

      await user.type(input, '  Learn React  ');
      await user.click(addButton);

      expect(window.alert).toHaveBeenCalledWith('  Learn React   — already in the list.');
    });
  });

  describe('Task Display', () => {
    it('should display multiple tasks', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      const tasks = ['Learn Vitest', 'Write Tests', 'Debug Code'];
      
      for (const task of tasks) {
        await user.type(input, task);
        await user.click(addButton);
      }

      tasks.forEach(task => {
        expect(screen.getByText(task)).toBeInTheDocument();
      });
    });

    it('should render Edit and Delete buttons for each task', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Test Task');
      await user.click(addButton);

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should render checkboxes for each task', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Test Task');
      await user.click(addButton);

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('Editing Tasks', () => {
    it('should populate input field when Edit is clicked', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Original Task');
      await user.click(addButton);

      const editButton = screen.getByText('Edit');
      await user.click(editButton);

      expect(input.value).toBe('Original Task');
      expect(screen.getByText('UpdateTask')).toBeInTheDocument();
      expect(screen.queryByText('AddTask')).not.toBeInTheDocument();
    });

    it('should update task when UpdateTask is clicked', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Original Task');
      await user.click(addButton);

      const editButton = screen.getByText('Edit');
      await user.click(editButton);

      await user.clear(input);
      await user.type(input, 'Updated Task');
      
      const updateButton = screen.getByText('UpdateTask');
      await user.click(updateButton);

      expect(screen.getByText('Updated Task')).toBeInTheDocument();
      expect(screen.queryByText('Original Task')).not.toBeInTheDocument();
      expect(screen.getByText('AddTask')).toBeInTheDocument();
      expect(input.value).toBe('');
    });

    it('should prevent updating to duplicate task names', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      // Add two tasks
      await user.type(input, 'Task One');
      await user.click(addButton);
      await user.type(input, 'Task Two');
      await user.click(addButton);

      // Try to edit Task Two to be same as Task One
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[1]); // Edit second task

      await user.clear(input);
      await user.type(input, 'Task One');
      
      const updateButton = screen.getByText('UpdateTask');
      await user.click(updateButton);

      expect(window.alert).toHaveBeenCalledWith('Task One — already in the list.');
      expect(screen.getByText('Task Two')).toBeInTheDocument(); // Original remains
    });

    it('should disable UpdateTask button when input is empty', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Test Task');
      await user.click(addButton);

      const editButton = screen.getByText('Edit');
      await user.click(editButton);

      await user.clear(input);
      
      const updateButton = screen.getByText('UpdateTask');
      expect(updateButton).toBeDisabled();
    });
  });

  describe('Deleting Tasks', () => {
    it('should delete task when Delete button is clicked', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Task to Delete');
      await user.click(addButton);

      expect(screen.getByText('Task to Delete')).toBeInTheDocument();

      const deleteButton = screen.getByText('Delete');
      await user.click(deleteButton);

      expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
    });

    it('should delete correct task when multiple tasks exist', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Keep This');
      await user.click(addButton);
      await user.type(input, 'Delete This');
      await user.click(addButton);

      const deleteButtons = screen.getAllByText('Delete');
      await user.click(deleteButtons[1]); // Delete second task

      expect(screen.getByText('Keep This')).toBeInTheDocument();
      expect(screen.queryByText('Delete This')).not.toBeInTheDocument();
    });
  });

  describe('Completing Tasks', () => {
    it('should move task to completed when checkbox is clicked', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Complete This Task');
      await user.click(addButton);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      // Task should be removed from pending
      expect(screen.queryByText('Complete This Task')).not.toBeInTheDocument();

      // Switch to completed tab
      const completedTab = screen.getByText('Completed');
      await user.click(completedTab);

      // Task should appear in completed with thumbs up emoji
      expect(screen.getByText('👍Complete This Task')).toBeInTheDocument();
    });

    it('should show completed tasks in completed tab', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      // Add and complete multiple tasks
      const tasks = ['Task 1', 'Task 2', 'Task 3'];
      
      for (const task of tasks) {
        await user.type(input, task);
        await user.click(addButton);
        const checkbox = screen.getByRole('checkbox');
        await user.click(checkbox);
      }

      // Switch to completed tab
      const completedTab = screen.getByText('Completed');
      await user.click(completedTab);

      // All completed tasks should be visible
      tasks.forEach(task => {
        expect(screen.getByText(`👍${task}`)).toBeInTheDocument();
      });
    });
  });

  describe('Tab Switching', () => {
    it('should switch between ToDo and Completed tabs', async () => {
      render(<Crud />);
      const todoTab = screen.getByText('ToDo');
      const completedTab = screen.getByText('Completed');

      // Initially ToDo should be active
      expect(todoTab).toHaveClass('active-tab');
      expect(completedTab).toHaveClass('inactive-tab');

      // Click completed tab
      await user.click(completedTab);
      expect(completedTab).toHaveClass('active-tab');
      expect(todoTab).toHaveClass('inactive-tab');

      // Click back to ToDo
      await user.click(todoTab);
      expect(todoTab).toHaveClass('active-tab');
      expect(completedTab).toHaveClass('inactive-tab');
    });

    it('should show appropriate content based on selected tab', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      // Add a pending task
      await user.type(input, 'Pending Task');
      await user.click(addButton);

      // Add and complete a task
      await user.type(input, 'Completed Task');
      await user.click(addButton);
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      // In ToDo tab - should see pending task
      expect(screen.getByText('Pending Task')).toBeInTheDocument();

      // Switch to Completed tab - should see completed task
      const completedTab = screen.getByText('Completed');
      await user.click(completedTab);
      expect(screen.getByText('👍Completed Task')).toBeInTheDocument();
      expect(screen.queryByText('Pending Task')).not.toBeInTheDocument();
    });
  });

  describe('Input Validation', () => {
    it('should trim whitespace from input', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, '  Trimmed Task  ');
      await user.click(addButton);

      expect(screen.getByText('  Trimmed Task  ')).toBeInTheDocument();
    });

    it('should handle special characters in task names', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      const specialTask = "Task with @#$%^&*() characters!";
      await user.type(input, specialTask);
      await user.click(addButton);

      expect(screen.getByText(specialTask)).toBeInTheDocument();
    });

    it('should handle long task names', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      const longTask = "This is a very long task name that might cause issues with the UI layout and functionality";
      await user.type(input, longTask);
      await user.click(addButton);

      expect(screen.getByText(longTask)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks on buttons', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');

      await user.type(input, 'Rapid Click Test');
      
      // Simulate rapid clicking
      await user.click(addButton);
      await user.click(addButton);
      await user.click(addButton);

      // Should only add one task and show alerts for duplicates
      expect(screen.getAllByText('Rapid Click Test')).toHaveLength(1);
      expect(window.alert).toHaveBeenCalledTimes(2);
    });

    it('should handle empty completed tasks list', async () => {
      render(<Crud />);
      const completedTab = screen.getByText('Completed');
      
      await user.click(completedTab);
      
      // Should not crash and should show empty state
      expect(screen.queryByText('👍')).not.toBeInTheDocument();
    });

    it('should maintain state when switching tabs multiple times', async () => {
      render(<Crud />);
      const input = screen.getByPlaceholderText("Let's make today productive! 😊");
      const addButton = screen.getByText('AddTask');
      const todoTab = screen.getByText('ToDo');
      const completedTab = screen.getByText('Completed');

      await user.type(input, 'Persistent Task');
      await user.click(addButton);

      // Switch tabs multiple times
      await user.click(completedTab);
      await user.click(todoTab);
      await user.click(completedTab);
      await user.click(todoTab);

      // Task should still be there
      expect(screen.getByText('Persistent Task')).toBeInTheDocument();
    });
  });
});


