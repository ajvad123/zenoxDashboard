import React from "react";

const EnquiryModal = ({ enquiry, onClose }) => {
  if (!enquiry) return null;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded shadow max-w-lg w-full max-h-screen overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Enquiry Details</h2>
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="text-lg">{enquiry.name}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <p className="text-lg">{enquiry.email}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Service</h3>
            <p className="text-lg">{enquiry.service}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Message</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{enquiry.message}</p>
          </div>
          {/* <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p>{formatDate(enquiry.createdAt)}</p>
          </div> */}
        </div>
        <div className="p-4 border-t bg-gray-50">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;