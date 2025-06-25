import React, { useState, useEffect, useCallback } from 'react';
import { fetchProjects } from '../../api/projectApi';
import { fetchModulesByProjectId } from '../../api/moduleApi';
import { fetchTasksByModuleId } from '../../api/taskApi';
import TaskForm from '../../components/Task/TaskForm';
import TaskList from '../../components/Task/TaskList';
import Toast from '../../components/Toast';

export default function TasksPage() {
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState({});
  const [showTaskForm, setShowTaskForm] = useState(true);

  const showToast = (message, type) => setToast({ message, type });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch {
        showToast('Failed to load projects', 'error');
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const loadModules = async () => {
      if (selectedProjectId) {
        try {
          const data = await fetchModulesByProjectId(selectedProjectId);
          setModules(data);
        } catch {
          showToast('Failed to load modules', 'error');
        }
      }
    };
    loadModules();
  }, [selectedProjectId]);

  const loadTasks = useCallback(async () => {
    if (selectedModuleId) {
      try {
        const data = await fetchTasksByModuleId(selectedModuleId);
        setTasks(data);
      } catch {
        showToast('Failed to load tasks', 'error');
      }
    }
  }, [selectedModuleId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-blue-400">Manage Tasks</h2>

      <div className="mb-6 flex gap-4 flex-col md:flex-row">
        <select
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded w-full md:w-1/2"
          value={selectedProjectId}
          onChange={(e) => {
            setSelectedProjectId(e.target.value);
            setSelectedModuleId('');
            setModules([]);
            setTasks([]);
          }}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded w-full md:w-1/2"
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
          disabled={!modules.length}
        >
          <option value="">Select Module</option>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {selectedProjectId && selectedModuleId && (
        <div className="mb-4">
          <button
            onClick={() => setShowTaskForm((prev) => !prev)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            {showTaskForm ? 'Cancel' : 'Create Task'}
          </button>
        </div>
      )}

      {showTaskForm && selectedProjectId && selectedModuleId && (
        <TaskForm
          projectId={selectedProjectId}
          moduleId={selectedModuleId}
          onCreated={loadTasks}
          showToast={showToast}
        />
      )}

      <TaskList tasks={tasks} onSubtaskCreate={loadTasks} showToast={showToast} />

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({})}
        />
      )}
    </div>
  );
}
