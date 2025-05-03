import React from "react";

const ServiceDistribution = ({ enquiries, uniqueServices }) => {
  if (!enquiries || enquiries.length === 0) {
    return (
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Service Distribution</h2>
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const totalEnquiries = enquiries.length;
  
  // Calculate statistics for each service
  const serviceStats = uniqueServices.map(service => ({
    name: service,
    count: enquiries.filter(item => item.service === service).length
  }));

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Service Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceStats.map((stat, index) => (
          <div key={index} className="border rounded p-3">
            <h3 className="font-medium">{stat.name}</h3>
            <div className="flex items-center mt-2">
              <div className="bg-blue-100 h-4 rounded-full flex-grow">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${(stat.count / totalEnquiries) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-gray-700 font-medium">{stat.count}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((stat.count / totalEnquiries) * 100)}% of enquiries
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDistribution;