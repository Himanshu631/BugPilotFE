import React, { useState } from "react";
import SubtaskForm from "./SubtaskForm";
import { fetchSubtasksByTaskId } from "../../api/subTaskApi";

export default function TaskList({ tasks, refreshTasks, showToast }) {
  const [activeTask, setActiveTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);

  const handleViewSubtasks = async (task) => {
    try {
      const data = await fetchSubtasksByTaskId(task.id);
      setSubtasks(data);
      setViewingTask(task);
    } catch (err) {
      console.error(err);
      showToast("Failed to load subtasks", "error");
    }
  };

  if (!tasks.length) return <p className="text-gray-400">No tasks found.</p>;

  return (
    <div className="mt-6">
      <table className="min-w-full bg-[#1a1a1a] text-white rounded-lg overflow-hidden">
        <thead className="bg-[#222]">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Effort</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-800">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.priority}</td>
              <td className="px-4 py-2">{task.estimatedEffort}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTask(task)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                  >
                    Add Subtask
                  </button>
                  <button
                    onClick={() => handleViewSubtasks(task)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    View Subtasks
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Subtask Modal */}
      {activeTask && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-[#181818] p-6 rounded-xl w-full max-w-xl">
            <h3 className="text-lg mb-4 text-blue-400">
              Create Subtask for "{activeTask.title}"
            </h3>
            <SubtaskForm
              taskId={activeTask.id}
              onCreated={() => {
                refreshTasks();
                setActiveTask(null);
              }}
              onClose={() => setActiveTask(null)}
              showToast={showToast}
            />
          </div>
        </div>
      )}

      {/* View Subtasks Modal */}
      {viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-[#1f1f1f] p-6 rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl text-blue-400 mb-4">
              Subtasks for "{viewingTask.title}"
            </h3>
            {subtasks.length ? (
              <ul className="space-y-2">
                {subtasks.map((sub) => (
                  <li key={sub.id} className="bg-[#2a2a2a] p-3 rounded">
                    <p className="font-semibold">{sub.title}</p>
                    <p className="text-sm text-gray-400">
                      {sub.status} • {sub.priority} • {sub.estimatedEffort} hrs
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No subtasks found.</p>
            )}
            <button
              className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
              onClick={() => setViewingTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
