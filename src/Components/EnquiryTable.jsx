import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const EnquiryTable = ({ enquiries, loading, error, onRetry, onViewDetails, onDelete }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded shadow overflow-hidden mb-6">
        <div className="p-8 text-center">
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded shadow overflow-hidden mb-6">
        <div className="p-8 text-center">
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (enquiries.length === 0) {
    return (
      <div className="bg-white rounded shadow overflow-hidden mb-6">
        <div className="p-8 text-center">
          <p className="text-gray-600">No enquiries found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{enquiry.name}</td>
                <td className="px-4 py-2">{enquiry.email}</td>
                <td className="px-4 py-2">{enquiry.service}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    onClick={() => onViewDetails(enquiry)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    onClick={() => onDelete(enquiry._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryTable;
