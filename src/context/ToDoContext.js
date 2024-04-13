import React from 'react'

export const ToDoContext = React.createContext({
    todos: [
        {
            id: 1,
            todo: 'Task here',
            isCompleted: false,
        },
    ],
    addToDo: (todo) => { },
    updateToDo: (id, todo) => { },
    deleteToDo: (id) => { },
    toggleToDo: (id) => { },
});

export const useToDo = () => {
    return React.useContext(ToDoContext);
}

export const ToDoProvider = ToDoContext.Provider;