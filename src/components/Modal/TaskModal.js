import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField, SelectField } from "../Commons/FormField";
import { createTask, deleteTaskById, updateTaskById } from "../../redux/actions/task";
import { GreenButton, WhiteButton, DeleteButton } from "../Commons/LinkButton";
import { IconPlus, IconDelete, IconSearch, IconCheck } from "../Icons";
import { createTodo, deleteTodoById, updateTodoById } from "../../redux/actions/todo";
import { searchFriend } from "../../redux/actions/friend";
import Swal from "sweetalert2";
import { baseUrl } from "../../helpers/config";

const priorityOptions = [
  {
    label: "none",
    value: "0",
  },
  {
    label: "less urgent",
    value: "1",
  },
  {
    label: "urgent",
    value: "2",
  },

  {
    label: "very urgent",
    value: "3",
  },
];

export default function TaskModal({ onClose, show, task, selDate }) {
  const users = useSelector((state) => state.friend.results);
  const [addLoad, setAddLoad] = useState(false);
  const [delLoad, setDelLoad] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [due_time, setDueTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodos, setNewTodos] = useState([]);
  const [friend, setFriend] = useState([]);
  const [text, setText] = useState();
  const [priority, setPriority] = useState(priorityOptions[0].label);
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);

  const dispatch = useDispatch();
  const handleAddTask = (e) => {
    e.preventDefault();
    setAddLoad(true);
    dispatch(createTask(title, description, due_date, due_time, newTodos, friend, priority)).then(() => {
      Swal.fire({
        text: "Your task has been created successfully.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      });
      setAddLoad(false);
      onClose();
    });
  };
  const handleUpdateTask = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure want to update this taks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#c1c1c1",
      confirmButtonText: "update",
    }).then((result) => {
      if (result.isConfirmed) {
        setAddLoad(true);
        dispatch(createTodo(task.task.id, newTodos));
        saveUpdatedTodo();
        dispatch(updateTaskById(task.task.id, title, description, due_date, due_time, friend, priority)).then(() => {
          Swal.fire({ title: "Updated!", text: "Your task has been updated successfully.", icon: "success", timer: 3000, timerProgressBar: true });
          setAddLoad(false);
          onClose();
        });
        setNewTodos([]);
      }
    });
  };
  const handleDeleteTask = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this taks? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c1c1c1",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setDelLoad(true);
        dispatch(deleteTaskById(task.task.id)).then(() => {
          Swal.fire({ title: "Deleted!", text: "Your task has been deleted successfully.", icon: "success", timer: 3000, timerProgressBar: true });
          setDelLoad(false);
          onClose();
        });
      }
    });
  };
  const handleAddTodos = () => {
    if (text != "") {
      const data = { name: text };
      const todoList = [...todos, data];
      const newTodoList = [...newTodos, text];
      setTodos(todoList);
      setNewTodos(newTodoList);
      setText("");
    }
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
      return dispatch(updateTodoById(list.id, list.name, list.status));
    });
  };

  const onChangeDueTime = (e) => {
    setDueTime(e.target.value);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSearchUser = (e) => {
    setName(e.target.value);
    setSearchLoad(true);
    dispatch(searchFriend(e.target.value)).then(() => setSearchLoad(false));
  };

  const handleAddPeople = (username, id) => {
    if (!people.some((e) => e.username === username)) {
      setPeople([...people, { username, id }]);
      setFriend([...friend, id]);
    }
  };
  const handleDeletePeople = (id) => {
    setPeople(people.filter((e) => e.id !== id));
    setFriend(friend.filter((e) => e !== id));
  };

  useEffect(() => {
    if (task.task?.id) {
      setTitle(task.task.title);
      setDescription(task.task.description);
      setDueDate(task.task.date);
      setDueTime(task.task.time);
      setPriority(task.task.priority);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setCurrentTime();
      setPriority(priorityOptions[0].label);
    }

    if (task.member?.length) {
      const people = task.member.map((mem) => ({ username: mem.username, id: mem.id }));
      setPeople([...people]);
      const peopleIds = people.map((person) => person.id);
      setFriend([...peopleIds]);
    }

    setTodos([]);
    if (task.todo?.length) {
      let todo = task.todo.map((list) => list);
      setTodos(todo);
    }
  }, [task]);

  function addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }

  const setCurrentTime = () => {
    const date = new Date();
    var hours = "0";
    if (date.getHours() + 1 == 24) {
      hours = "01";
    } else {
      hours = addZeroBefore(date.getHours() + 1);
    }
    const minutes = addZeroBefore(date.getMinutes());
    setDueDate(selDate);
    setDueTime(hours + ":" + minutes);
  };

  const handleMarkTodo = (e, idx) => {
    e.stopPropagation();
    const newTodos = [...todos];
    newTodos[idx].status = !newTodos[idx].status;
    setTodos(newTodos);
  };

  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center" onClick={onClose}>
      <div className="w-2/5 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-bold text-2xl text-center">{(task.task?.id && "Detail") || "New Task"}</p>
        <div className="flex">
          <div className="w-1/2 ml-2 mr-8">
            <InputField label={"Title"} placeholder={"Enter title here"} onChange={(title) => setTitle(title)} value={title} />
            <InputField
              label={"Description"}
              placeholder={"Enter description"}
              onChange={(description) => setDescription(description)}
              value={description}
            />
            <p className="font-semibold mt-2">Invited members</p>
            <div className="py-1 pr-3 border-b border-biruTua flex justify-between">
              <input
                className="appearance-none bg-transparent px-2 py-1 w-3/4 text-gray-700 leading-tight focus:outline-none border-none"
                placeholder="Search username"
                onChange={(e) => handleSearchUser(e)}
                value={name}
              />
              <div className="flex self-center">
                {searchLoad ? <div className="mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-600 h-4 w-4" /> : null}
                <IconSearch width={"1rem"} height={"1rem"} />
              </div>
            </div>
            <div className="flex mt-2">
              {(people?.length &&
                people.map((list) =>
                  list.username == localStorage.getItem("username") ? null : (
                    <div className="relative text-sm px-2 py-1 shadow-lg rounded-md bg-ijo ml-1">
                      <label className="absolute z-50 -top-3 -right-1 cursor-pointer" onClick={() => handleDeletePeople(list.id)}>
                        x
                      </label>
                      {list.username}
                    </div>
                  )
                )) ||
                null}
            </div>
            {(users?.length &&
              users.map((list) => (
                <div className="flex justify-between mt-2" key={list.id}>
                  <div className="flex">
                    <div className="w-8 h-8 border border-black border-opacity-5 rounded-full bg-abuTua">
                      <img
                        className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                        src={`${baseUrl}/api/user/image/${list.photo}`}
                        alt="Profile"
                      />
                    </div>
                    <p className="ml-3 self-center">{list.username}</p>
                  </div>
                  <div className="flex self-center">
                    <button
                      className="bg-biruTua hover:bg-biru text-white text-xs rounded-md px-3 h-5 mx-2"
                      onClick={() => handleAddPeople(list.username, list.id)}
                    >
                      add
                    </button>
                  </div>
                </div>
              ))) ||
              null}
          </div>
          <div className="w-1/2 mr-2 ml-8">
            <InputField label={"Due Date"} onChange={(date) => setDueDate(date)} value={due_date} type={"date"} />
            <input type="time" name="time" value={due_time} className="w-full border rounded-lg text-sm px-2 py-1" onChange={onChangeDueTime} />
            <SelectField
              placeholder={"choose priority"}
              label={"Priority"}
              options={priorityOptions}
              value={priority}
              onChange={(priority) => setPriority(priority)}
            />
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
                todos.map((todo, idx) => (
                  <div className="flex my-1" key={idx}>
                    <div
                      className={
                        `w-4 h-4 mx-2 cursor-pointer border border-gray-500 rounded-sm appearance-none flex justify-center text-abuMuda ` +
                        (todo.status ? "bg-biruTua border-transparent" : "bg-abuMuda")
                      }
                      onClick={(e) => handleMarkTodo(e, idx)}
                    >
                      <IconCheck />
                    </div>
                    <input type="text" className="w-24" value={todo.name} onChange={(e) => updateTodo(e.target.value, idx)} />
                    {(todo.update_by && (
                      <div className="relative text-xs px-4 h-5 self-center rounded-full bg-gray-300 ml-2" onClick={(e) => e.stopPropagation()}>
                        {todo.update_by}
                      </div>
                    )) ||
                      null}
                    <IconDelete width={"16"} height={"16"} onClick={() => handleDeleteTodos(idx, todo.id)} />
                  </div>
                ))) ||
                null}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {task.task?.id && <DeleteButton onClick={handleDeleteTask} loading={delLoad} />}
          <WhiteButton onClick={onClose} text={"cancel"} />
          {(task.task?.id && <GreenButton onClick={handleUpdateTask} loading={addLoad} text={"update"} />) || (
            <GreenButton onClick={handleAddTask} loading={addLoad} text={"save"} />
          )}
        </div>
      </div>
    </div>
  );
}
