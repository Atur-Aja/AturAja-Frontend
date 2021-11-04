import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputField } from "../Commons/FormField";
import { createTask, deleteTaskById, updateTaskById } from "../../actions/task";
import { SaveButton, CancelButton, DeleteButton, UpdateButton } from "../Commons/LinkButton";
import { IconPlus, IconDelete } from "../Icons";
import { createTodo, deleteTodoById, updateTodoById } from "../../actions/todo";

export default function TaskModal({ onClose, show, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [due_time, setDueTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState([]);
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(createTask(title, description, due_date, due_time, todos));
    return onClose();
  };
  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(updateTaskById(task.task.id, title, description, due_date, due_time));
    dispatch(createTodo(task.task.id, newTodos));
    saveUpdatedTodo();
    setNewTodos([]);
    return onClose();
  };
  const handleDeleteTask = (e) => {
    e.preventDefault();
    dispatch(deleteTaskById(task.task.id));
    return onClose();
  };
  const handleAddTodos = () => {
    const todoList = [...todos, text];
    const newTodoList = [...newTodos, text];
    setTodos(todoList);
    setNewTodos(newTodoList);
    setText("");
  };
  const handleDeleteTodos = (i, id) => {
    const itemRemoved = todos.splice(i, 1);
    setTodos(todos.filter((todos) => todos !== itemRemoved));
    dispatch(deleteTodoById(id));
  };

  const updateTodo = (newName, i) => {
    const newTodos = [...todos];
    newTodos[i].name = newName;
    setTodos(newTodos);
  };

  const saveUpdatedTodo = () => {
    todos.map((list) => {
      dispatch(updateTodoById(list.id, list.name));
    });
  };

  const onChangeDueTime = (e) => {
    setDueTime(e.target.value);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (task.task?.id) {
      setTitle(task.task.title);
      setDescription(task.task.description);
      setDueDate(task.task.date);
      setDueTime(task.task.time);
    } else {
      setTitle("");
    }

    if (task.todo?.length) {
      let todo = task.todo.map((list) => list);
      setTodos(todo);
    }
  }, [task]);

  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center" onClick={onClose}>
      <div className="w-2/5 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-bold text-2xl text-center">{(task.task?.id && "Detail") || "New Task"}</p>
        <div className="flex mt-3">
          <div className="w-1/2 ml-2 mr-8">
            <InputField label={"Title"} placeholder={"Enter title here"} onChange={(title) => setTitle(title)} value={title} />
            <InputField
              label={"Description"}
              placeholder={"Enter description"}
              onChange={(description) => setDescription(description)}
              value={description}
            />
            {/* <p className="font-semibold mt-2">People</p>
            <p className="font-semibold mt-2">Priority</p> */}
          </div>
          <div className="w-1/2 mr-2 ml-8">
            <InputField label={"Due Date"} onChange={(date) => setDueDate(date)} value={due_date} type={"date"} />
            <input type="time" name="time" value={due_time} className="w-full border rounded-lg text-sm px-2 py-1" onChange={onChangeDueTime} />
            <p className="font-semibold mt-4">To do :</p>
            <div className="flex">
              <input
                type="text"
                className="ml-2 text-sm appearance-none bg-transparent focus:outline-none"
                placeholder="+ add todo"
                value={text}
                onChange={onChangeText}
              />
              <IconPlus width={"25"} height={"25"} onClick={handleAddTodos} />
            </div>
            <div className="ml-2 text-sm h-24 overflow-y-auto">
              {(todos?.length &&
                todos.map((todo, i) => (
                  <div className="flex my-1" key={i}>
                    {task.task?.id && (
                      <input
                        key={i}
                        type="checkbox"
                        className="w-4 h-4 mx-2 self-center cursor-pointer border border-gray-500 rounded-sm bg-abuMuda appearance-none checked:bg-biruTua checked:border-transparent"
                      />
                    )}
                    <input type="text" className="w-24" value={todo.name} onChange={(e) => updateTodo(e.target.value, i)} />
                    {/* <p>{todo.name}</p> */}
                    <IconDelete width={"16"} height={"16"} onClick={() => handleDeleteTodos(i, todo.id)} />
                  </div>
                ))) ||
                null}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {task.task?.id && <DeleteButton onClick={handleDeleteTask} />}
          <CancelButton onClick={onClose} />
          {(task.task?.id && <UpdateButton onClick={handleUpdateTask} />) || <SaveButton onClick={handleAddTask} />}
        </div>
      </div>
    </div>
  );
}
