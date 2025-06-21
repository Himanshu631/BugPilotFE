import React, { useState, useEffect } from 'react';
import ProjectForm from '../../components/Project/ProjectForm';
import ProjectList from '../../components/Project/ProjectList';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import { fetchProjects, createProject } from '../../api/projectApi';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmCreateVisible, setConfirmCreateVisible] = useState(false);
  const [createPayload, setCreatePayload] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'error' });

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      setToast({ message: 'Failed to load projects', type: 'error' });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
  }, [showForm]);

  const handleDiscardClick = () => {
    if (formDirty) setConfirmVisible(true);
    else setShowForm(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Project Management</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Create Project
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-3xl mx-auto bg-[#121212] text-white p-6 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-400">Create Project</h2>
              <button onClick={handleDiscardClick} className="text-red-400 hover:text-red-600 text-lg">✖</button>
            </div>
            <ProjectForm
              onRequestCreate={(data) => {
                setCreatePayload(data);
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

      <div className="mt-10">
        <ProjectList projects={projects} />
      </div>

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
          message="Are you sure you want to create this project?"
          onConfirm={async () => {
            setConfirmCreateVisible(false);
            try {
              await createProject(createPayload);
              setToast({ message: 'Project Created Successfully', type: 'success' });
              setShowForm(false);
              setFormDirty(false);
              loadProjects();
            } catch (err) {
              setToast({ message: 'Failed to create project', type: 'error' });
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

export default ProjectsPage;
