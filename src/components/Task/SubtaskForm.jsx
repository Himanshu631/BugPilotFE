import React, { useState } from 'react';
import { createSubtask } from '../../api/subTaskApi';

export default function SubtaskForm({ taskId, onCreated, onClose, showToast }) {
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
    try {
      await createSubtask(taskId, form);
      showToast('Subtask created successfully', 'success');
      setForm({ title: '', description: '', status: '', priority: '', estimatedEffort: '' });
      onCreated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      showToast('Failed to create subtask', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-3 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="p-3 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="priority"
          placeholder="Priority"
          value={form.priority}
          onChange={handleChange}
          className="p-3 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input
        name="estimatedEffort"
        type="number"
        placeholder="Effort (hrs)"
        value={form.estimatedEffort}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Create
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
