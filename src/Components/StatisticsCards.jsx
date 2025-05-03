import React from "react";

const StatisticsCards = ({ totalEnquiries, uniqueServices, latestEnquiry }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700">Total Enquiries</h2>
        <p className="text-3xl font-bold text-blue-600">{totalEnquiries}</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700">Unique Services</h2>
        <p className="text-3xl font-bold text-blue-600">{uniqueServices}</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700">Latest Enquiry</h2>
        <p className="text-md font-medium text-gray-600">
          {latestEnquiry ? formatDate(latestEnquiry.createdAt) : "No enquiries"}
        </p>
      </div>
    </div>
  );
};

export default StatisticsCards;