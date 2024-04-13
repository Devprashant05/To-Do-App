import React, { useEffect } from "react";
import { useState } from "react";
import { ToDoProvider } from "./context/index";
import { ToDoForm, ToDoItem } from "./components";

function App() {
    const [todos, setToDos] = useState([]);

    const addToDo = (todo) => {
        setToDos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateToDo = (id, todo) => {
        setToDos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    const deleteToDo = (id) => {
        setToDos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
    };

    const toggleToDo = (id) => {
        setToDos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
                    : prevTodo
            )
        );
    };

    //Local storage usage when website loads
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setToDos(todos);
        }
    }, []);

    //For adding new todos in localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <ToDoProvider
            value={{ todos, addToDo, deleteToDo, updateToDo, toggleToDo }}
        >
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        Manage Your Todos
                    </h1>
                    <div className="mb-4">
                        <ToDoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                            <div className="w-full" key={todo.id}>
                                <ToDoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToDoProvider>
    );
}

export default App;
