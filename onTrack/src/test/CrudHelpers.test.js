// src/test/CrudHelpers.test.js
import { describe, it, expect } from 'vitest';

// Test helper functions that could be extracted from the component
describe('CRUD Helper Functions', () => {
  describe('Duplicate Task Detection', () => {
    it('should detect exact duplicates', () => {
      const tasks = [
        { id: 1, text: 'Learn React' },
        { id: 2, text: 'Write Tests' }
      ];
      const inputValue = 'Learn React';
      
      const isDuplicate = tasks.some(task => 
        task.text.trim().toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      expect(isDuplicate).toBe(true);
    });

    it('should detect case-insensitive duplicates', () => {
      const tasks = [
        { id: 1, text: 'Learn React' },
      ];
      const inputValue = 'LEARN REACT';
      
      const isDuplicate = tasks.some(task => 
        task.text.trim().toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      expect(isDuplicate).toBe(true);
    });

    it('should detect duplicates with extra whitespace', () => {
      const tasks = [
        { id: 1, text: 'Learn React' },
      ];
      const inputValue = '  Learn React  ';
      
      const isDuplicate = tasks.some(task => 
        task.text.trim().toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      expect(isDuplicate).toBe(true);
    });

    it('should not detect false duplicates', () => {
      const tasks = [
        { id: 1, text: 'Learn React' },
      ];
      const inputValue = 'Learn Vue';
      
      const isDuplicate = tasks.some(task => 
        task.text.trim().toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      expect(isDuplicate).toBe(false);
    });
  });

  describe('Task ID Generation', () => {
    it('should generate unique IDs', () => {
      const id1 = Date.now();
      // Small delay to ensure different timestamps
      setTimeout(() => {
        const id2 = Date.now();
        expect(id1).not.toBe(id2);
      }, 1);
    });
  });

  describe('Task Filtering', () => {
    it('should filter out deleted task', () => {
      const tasks = [
        { id: 1, text: 'Keep This' },
        { id: 2, text: 'Delete This' },
        { id: 3, text: 'Keep This Too' }
      ];
      const taskToDelete = { id: 2, text: 'Delete This' };
      
      const filteredTasks = tasks.filter(task => task.id !== taskToDelete.id);
      
      expect(filteredTasks).toHaveLength(2);
      expect(filteredTasks.find(task => task.id === 2)).toBeUndefined();
    });

    it('should find task for completion', () => {
      const tasks = [
        { id: 1, text: 'Task 1' },
        { id: 2, text: 'Task 2' },
      ];
      const taskToComplete = { id: 2, text: 'Task 2' };
      
      const foundTasks = tasks.filter(task => task.id === taskToComplete.id);
      
      expect(foundTasks).toHaveLength(1);
      expect(foundTasks[0]).toEqual(taskToComplete);
    });
  });

  describe('Task Update Logic', () => {
    it('should update task text correctly', () => {
      const tasks = [
        { id: 1, text: 'Original Text' },
        { id: 2, text: 'Other Task' },
      ];
      const selectedTask = { id: 1, text: 'Original Text' };
      const newText = 'Updated Text';
      
      const tempArr = [...tasks];
      const currentValueIndex = tempArr.findIndex(p => p.id === selectedTask.id);
      const currentData = tempArr[currentValueIndex];
      currentData.text = newText;
      
      expect(tempArr[0].text).toBe('Updated Text');
      expect(tempArr[1].text).toBe('Other Task'); // Unchanged
    });
  });
});
