// components/Module/ModuleList.jsx
import React from 'react';

const ModuleList = ({ modules }) => {
  if (!modules?.length) return <p className="text-gray-400">No modules found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-gray-700 bg-[#1a1a1a] text-white shadow rounded-lg">
        <thead className="bg-[#222]">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Description</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Priority</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Effort</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Tags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {modules.map(module => (
            <tr key={module.id} className="hover:bg-gray-800">
              <td className="px-4 py-2">{module.name}</td>
              <td className="px-4 py-2">{module.description}</td>
              <td className="px-4 py-2">{module.status}</td>
              <td className="px-4 py-2">{module.priority}</td>
              <td className="px-4 py-2">{module.estimatedEffort}</td>
              <td className="px-4 py-2">
                {module.tags.map(tag => (
                  <span key={tag} className="inline-block bg-blue-800 text-blue-100 px-2 py-1 text-xs rounded mr-1">
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleList;
