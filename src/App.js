// import React, { useState, useEffect } from 'react';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);

//   // Add a new task
//   const addTask = () => {
//     if (inputValue.trim()) {
//       const newTask = { id: Date.now(), text: inputValue, isCompleted: false };
//       setTasks([...tasks, newTask]);
//       setInputValue('');
//     }
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   // Start editing a task
//   const startEdit = (task) => {
//     setIsEditing(true);
//     setCurrentTask(task);
//     setInputValue(task.text);
//   };

//   // Update the task
//   const updateTask = () => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === currentTask.id ? { ...task, text: inputValue } : task
//       )
//     );
//     setIsEditing(false);
//     setInputValue('');
//     setCurrentTask(null);
//   };

//   // Toggle task completion
//   const toggleComplete = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
//       )
//     );
//   };

//   // Sort tasks (completed tasks go to the bottom)
//   const sortTasks = () => {
//     setTasks([
//       ...tasks.filter((task) => !task.isCompleted),
//       ...tasks.filter((task) => task.isCompleted),
//     ]);
//   };

//   // Use effect to sort tasks whenever there’s a change
//   useEffect(() => {
//     sortTasks();
//   }, [tasks]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow p-5">
//         <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
//         <div className="flex mb-4">
//           <input
//             type="text"
//             className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
//             placeholder="Add a new task..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button
//             onClick={isEditing ? updateTask : addTask}
//             className={`px-4 py-2 text-white rounded-r-md ${
//               isEditing ? 'bg-blue-500' : 'bg-green-500'
//             }`}
//           >
//             {isEditing ? 'Update' : 'Add'}
//           </button>
//         </div>
//         <ul>
//           {tasks.map((task) => (
//             <li
//               key={task.id}
//               className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded mb-2"
//             >
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={task.isCompleted}
//                   onChange={() => toggleComplete(task.id)}
//                   className="mr-2"
//                 />
//                 <span
//                   className={`${
//                     task.isCompleted ? 'line-through text-gray-400' : ''
//                   }`}
//                 >
//                   {task.text}
//                 </span>
//               </div>
//               <div>
//                 <button
//                   onClick={() => startEdit(task)}
//                   className="mr-2 text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteTask(task.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortType, setSortType] = useState('default'); // New state to manage sort type

  // Add a new task
  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = { id: Date.now(), text: inputValue, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEdit = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setInputValue(task.text);
  };

  // Update the task
  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, text: inputValue } : task
      )
    );
    setIsEditing(false);
    setInputValue('');
    setCurrentTask(null);
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Sort tasks based on the selected sort type
  const sortTasks = () => {
    let sortedTasks = [...tasks];
    if (sortType === 'alphabetical') {
      sortedTasks.sort((a, b) => a.text.localeCompare(b.text)); // Sort alphabetically
    } else if (sortType === 'completed') {
      sortedTasks = [
        ...sortedTasks.filter((task) => !task.isCompleted),
        ...sortedTasks.filter((task) => task.isCompleted),
      ]; // Sort by completion status
    }
    setTasks(sortedTasks);
  };

  // Re-sort tasks whenever tasks or sort type changes
  useEffect(() => {
    sortTasks();
  }, [tasks, sortType]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-5">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        {/* Sorting Options */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Sort By:</label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="completed">Completion Status</option>
          </select>
        </div>

        {/* Add or Update Task */}
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={isEditing ? updateTask : addTask}
            className={`px-4 py-2 text-white rounded-r-md ${
              isEditing ? 'bg-blue-500' : 'bg-green-500'
            }`}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>

        {/* List of Tasks */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded mb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleComplete(task.id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    task.isCompleted ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div>
                <button
                  onClick={() => startEdit(task)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
