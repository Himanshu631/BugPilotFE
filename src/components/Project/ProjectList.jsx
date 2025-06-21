import React from 'react';

const ProjectList = ({ projects }) => {
  if (!projects?.length) return <p className="text-gray-400">No projects found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700 bg-[#1a1a1a] text-white shadow rounded-lg">
        <thead className="bg-[#222]">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Project Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Description</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Start Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">End Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase">Tags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {projects.map(project => (
            <tr key={project.id} className="hover:bg-gray-800">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{project.name}</td>
              <td className="px-4 py-2 text-sm">{project.description}</td>
              <td className="px-4 py-2 text-sm">{project.status}</td>
              <td className="px-4 py-2 text-sm">{new Date(project.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-sm">{new Date(project.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-sm">
                {project.tags.map(tag => (
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

export default ProjectList;