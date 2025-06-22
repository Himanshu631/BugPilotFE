import React, { useState, useEffect } from 'react';

const ModuleForm = ({ onRequestCreate, onDirty, onClean }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId: '',
    ownerId: '',
    tags: [],
    status: '',
    priority: '',
    order: 0,
    estimatedEffort: 0,
    customFields: {}
  });

  const [dirty, setDirty] = useState(false);

  const markDirty = () => {
    if (!dirty) {
      setDirty(true);
      onDirty?.();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    markDirty();
    if (name.startsWith('customFields.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        customFields: { ...prev.customFields, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTags = (e) => {
    markDirty();
    setFormData((prev) => ({ ...prev, tags: e.target.value.split(',') }));
  };

  useEffect(() => () => onClean?.(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequestCreate?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Module Name"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="ownerId"
          placeholder="Owner ID"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.ownerId}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        rows="3"
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="status"
          placeholder="Status"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.status}
          onChange={handleChange}
        />
        <input
          name="priority"
          placeholder="Priority"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.priority}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="order"
          type="number"
          placeholder="Order"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.order}
          onChange={handleChange}
        />
        <input
          name="estimatedEffort"
          type="number"
          placeholder="Estimated Effort (hrs)"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={formData.estimatedEffort}
          onChange={handleChange}
        />
      </div>

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        onChange={handleTags}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="customFields.riskLevel"
          placeholder="Risk Level"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          onChange={handleChange}
        />
        <input
          name="customFields.moduleType"
          placeholder="Module Type"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
      >
        Create Module
      </button>
    </form>
  );
};

export default ModuleForm;
