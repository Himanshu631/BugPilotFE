import React, { useState } from 'react';
import { createTask } from '../../api/taskApi';

export default function TaskForm({ projectId, moduleId, onCreated, showToast }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    estimatedEffort: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectId || !moduleId) {
      showToast('Please select both project and module.', 'error');
      return;
    }

    const payload = {
      ...form,
      projectId,
      moduleId,
    };

    console.log('Submitting Task:', payload); // For debugging

    try {
      await createTask(payload);
      setForm({
        title: '',
        description: '',
        status: '',
        priority: '',
        estimatedEffort: '',
      });
      showToast('Task created successfully', 'success');
      onCreated?.();
    } catch (error) {
      console.error('Task creation failed:', error);
      showToast('Failed to create task', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-[#121212] border border-gray-700 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />
        <input
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        rows="3"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="priority"
          placeholder="Priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />
        <input
          name="estimatedEffort"
          type="number"
          placeholder="Estimated Effort (hrs)"
          value={form.estimatedEffort}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
      >
        Create Task
      </button>
    </form>
  );
}
