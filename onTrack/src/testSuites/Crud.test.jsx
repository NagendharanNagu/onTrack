import { describe, it } from "vitest";
import { render, screen, fireEvent, expect } from "../test-utils";
import Crud from "../components/Crud";


describe("Crud Component", ()=>{
    it("renders heading", ()=>{
        render(<Crud/>)
        expect(screen.getByText(/Daily Task Manager/i)).toBeInTheDocument();
    })
});

it("adds a new task",()=>{
    render(<Crud />);
    const input = screen.getByPlaceholderText(/productive/i);
    const button = screen.getByRole("button",{name: /AddTask/i});

    fireEvent.change(input, {target: {value: "Learn React"}});
    fireEvent.click(button);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
})

  it("prevents duplicate tasks", () => {
    render(<Crud />);
    const input = screen.getByPlaceholderText(/productive/i);
    const button = screen.getByRole("button", { name: /AddTask/i });

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    expect(screen.getAllByText("Learn React")).toHaveLength(1);
  });

    it("marks task as completed", () => {
    render(<Crud />);
    const input = screen.getByPlaceholderText(/productive/i);
    const button = screen.getByRole("button", { name: /AddTask/i });

    fireEvent.change(input, { target: { value: "Learn Testing" } });
    fireEvent.click(button);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByRole("button", { name: /Completed/i }));

    expect(screen.getByText(/👍Learn Testing/i)).toBeInTheDocument();
  });

  // Test case for editing a task
  it("edits an existing task", () => {
    render(<Crud />);
    const input = screen.getByPlaceholderText(/productive/i);
    const addButton = screen.getByRole("button", { name: /AddTask/i });
    
    // Add the task to be edited
    fireEvent.change(input, { target: { value: "Original Task" } });
    fireEvent.click(addButton);
    
    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    // The input field should now contain the task's text
    expect(input.value).toBe("Original Task");

    fireEvent.change(input, { target: { value: "Updated Task" } });
    const updateButton = screen.getByRole("button", { name: /UpdateTask/i });
    fireEvent.click(updateButton);

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
    expect(screen.queryByText("Original Task")).not.toBeInTheDocument();
  });

  // Test case for deleting a task
  it("deletes a task", () => {
    render(<Crud />);
    const input = screen.getByPlaceholderText(/productive/i);
    const addButton = screen.getByRole("button", { name: /AddTask/i });
    
    // Add a task to be deleted
    fireEvent.change(input, { target: { value: "Task to be Deleted" } });
    fireEvent.click(addButton);
    
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText("Task to be Deleted")).not.toBeInTheDocument();
  });
  