import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleChackbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-700 text-white min-h-[80vh] md:w-[35%] ">
        <h1 className="font-bold text-center text-3xl">Manage My ToDo 😊</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a ToDo</h2>
          <div class="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="text-black w-full px-5 py-1 rounded-xl"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-gray-900 hover:bg-gray-950 disabled:bg-gray-800 p-4 py-2 mx-2 text-sm font-bold rounded-xl "
            >
              Add
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
        />
        <label className="mx-2" for="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">Your ToDos</h2>
        <div className="todos">
          {todos.length == 0 && (
            <div className="m-5 text-gray-950"> No ToDo to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleChackbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    {item.isCompleted ? (
                      <button>
                        <FaRegThumbsUp />
                      </button>
                    ) : (
                      <button>
                        <FaRegThumbsDown />
                      </button>
                    )}
                    <div
                      className={
                        item.isCompleted
                          ? "line-through w-[200px] break-words whitespace-normal"
                          : "w-[200px] break-words whitespace-normal"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div class="buttons h-full flex">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-gray-900 hover:bg-gray-950 p-2 py-1 text-sm font-bold rounded-md mx-1"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-gray-900 hover:bg-gray-950 p-2 py-1 text-sm font-bold rounded-md mx-1"
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
