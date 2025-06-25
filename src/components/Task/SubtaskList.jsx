import React, { useEffect, useState } from 'react';
import { fetchSubtasksByTaskId } from '../../api/subTaskApi';

export default function SubtaskList({ taskId }) {
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubtasks = async () => {
    setLoading(true);
    try {
      const data = await fetchSubtasksByTaskId(taskId);
      setSubtasks(data);
    } catch (err) {
      console.error('Failed to load subtasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) loadSubtasks();
  }, [taskId]);

  if (loading) return <p className="text-gray-400">Loading subtasks...</p>;

  if (!subtasks.length) return <p className="text-gray-500 text-sm mt-2">No subtasks yet.</p>;

  return (
    <div className="mt-4 ml-4 border-l border-gray-700 pl-4">
      <h4 className="text-sm text-gray-300 mb-2">Subtasks</h4>
      <ul className="space-y-2">
        {subtasks.map((subtask) => (
          <li
            key={subtask.id}
            className="bg-[#1e1e1e] rounded px-4 py-2 border border-gray-700"
          >
            <div className="text-sm font-medium">{subtask.title}</div>
            <div className="text-xs text-gray-400">
              {subtask.status} • {subtask.priority} • {subtask.estimatedEffort} hrs
            </div>
            {subtask.description && (
              <p className="text-xs text-gray-500 mt-1">{subtask.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
