import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onRequestCreate, onDirty, onClean }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectManagerId: '',
    startDate: '',
    endDate: '',
    tags: [],
    workflowId: '',
    slaConfigId: '',
    visibility: 'PRIVATE',
    customFields: { budget: '', department: '' }
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
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        customFields: { ...prev.customFields, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTags = (e) => {
    markDirty();
    setFormData((prev) => ({ ...prev, tags: e.target.value.split(',') }));
  };

  useEffect(() => {
    return () => {
      if (typeof onClean === 'function') onClean();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequestCreate?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input name="name" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" />
      <input name="projectManagerId" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Project Manager ID" value={formData.projectManagerId} onChange={handleChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="startDate" type="date" className="w-full p-3 rounded-lg bg-black border border-gray-700" value={formData.startDate} onChange={handleChange} />
        <input name="endDate" type="date" className="w-full p-3 rounded-lg bg-black border border-gray-700" value={formData.endDate} onChange={handleChange} />
      </div>
      <input name="tags" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Tags (comma separated)" onChange={handleTags} />
      <input name="workflowId" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Workflow ID" value={formData.workflowId} onChange={handleChange} />
      <input name="slaConfigId" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="SLA Config ID" value={formData.slaConfigId} onChange={handleChange} />
      <select name="visibility" className="w-full p-3 rounded-lg bg-black border border-gray-700" value={formData.visibility} onChange={handleChange}>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="customFields.budget" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Budget" value={formData.customFields.budget} onChange={handleChange} />
        <input name="customFields.department" className="w-full p-3 rounded-lg bg-black border border-gray-700" placeholder="Department" value={formData.customFields.department} onChange={handleChange} />
      </div>
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
