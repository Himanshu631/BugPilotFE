import React, { useState, useEffect } from 'react';
import ModuleForm from '../../components/Module/ModuleForm';
import ModuleList from '../../components/Module/ModuleList';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import { createModule, fetchModulesByProjectId } from '../../api/moduleApi';
import { fetchProjects } from '../../api/projectApi';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmCreateVisible, setConfirmCreateVisible] = useState(false);
  const [createPayload, setCreatePayload] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'error' });

  // Load all projects
  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
      if (data.length > 0) setSelectedProjectId(data[0].id); // Auto-select first
    } catch {
      setToast({ message: 'Failed to load projects', type: 'error' });
    }
  };

  // Load modules when projectId changes
  const loadModules = async (projectId) => {
    try {
      const data = await fetchModulesByProjectId(projectId);
      setModules(data);
    } catch {
      setToast({ message: 'Failed to load modules', type: 'error' });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) loadModules(selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
  }, [showForm]);

  const handleDiscardClick = () => {
    if (formDirty) setConfirmVisible(true);
    else setShowForm(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-start mb-6">
        {/* Create Button on Left */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Module
        </button>

        {/* Dropdown on Right */}
        <div className="relative inline-block w-64">
  <select
    className="appearance-none bg-gray-800 border border-gray-600 text-white px-4 py-2 pr-10 rounded w-full"
    value={selectedProjectId}
    onChange={(e) => setSelectedProjectId(e.target.value)}
  >
    <option value="">Select Project</option>
    {projects.map((proj) => (
      <option key={proj.id} value={proj.id}>
        {proj.name}
      </option>
    ))}
  </select>

  {/* Custom dropdown arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-3xl mx-auto bg-[#121212] text-white p-6 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-400">Create Module</h2>
              <button onClick={handleDiscardClick} className="text-red-400 hover:text-red-600 text-lg">✖</button>
            </div>
            <ModuleForm
              onRequestCreate={(data) => {
                setCreatePayload({ ...data, projectId: selectedProjectId });
                setConfirmCreateVisible(true);
              }}
              onDirty={() => setFormDirty(true)}
              onClean={() => setFormDirty(false)}
            />
            <div className="mt-4 text-right">
              <button
                onClick={handleDiscardClick}
                className="text-sm text-gray-300 hover:text-white underline"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      <ModuleList modules={modules} />

      {confirmVisible && (
        <ConfirmDialog
          message="Unsaved changes will be lost. Are you sure you want to discard?"
          onConfirm={() => {
            setShowForm(false);
            setFormDirty(false);
            setConfirmVisible(false);
          }}
          onCancel={() => setConfirmVisible(false)}
        />
      )}

      {confirmCreateVisible && (
        <ConfirmDialog
          message="Are you sure you want to create this module?"
          onConfirm={async () => {
            setConfirmCreateVisible(false);
            try {
              await createModule(createPayload);
              setToast({ message: 'Module Created Successfully', type: 'success' });
              setShowForm(false);
              setFormDirty(false);
              loadModules(selectedProjectId);
            } catch (err) {
              setToast({ message: 'Failed to create module', type: 'error' });
            }
          }}
          onCancel={() => setConfirmCreateVisible(false)}
        />
      )}

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ModulesPage;
