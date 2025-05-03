import { useState, useEffect } from "react";
import EnquiryTable from "./EnquiryTable";
import EnquiryModal from "./EnquiryModal";
import StatisticsCards from "./StatisticsCards";
import ServiceDistribution from "./ServiceDistribution";
import { fetchSoftwareEnquiries, deleteSoftwareEnquiry } from "../services/api";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("");

  // Fetch enquiries from the server
  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchSoftwareEnquiries();
      setEnquiries(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch enquiries");
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  // Handle deletion of an enquiry
  const handleDelete = async (enquiryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) return;

    try {
      await deleteSoftwareEnquiry(enquiryId);
      setEnquiries((prevEnquiries) => prevEnquiries.filter((enq) => enq._id !== enquiryId));
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      alert("Failed to delete enquiry. Please try again.");
    }
  };

  // Calculate statistics
  const totalEnquiries = enquiries.length;
  const uniqueServices = [...new Set(enquiries.map(item => item.service))];

  // Filter enquiries based on search and service filter
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = searchTerm === "" || 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = filterService === "" || enquiry.service === filterService;
    
    return matchesSearch && matchesService;
  });

  // View details of a specific enquiry
  const viewEnquiryDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Zenox Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {/* Statistics Cards */}
        <StatisticsCards 
          totalEnquiries={totalEnquiries} 
          uniqueServices={uniqueServices.length} 
          latestEnquiry={enquiries.length > 0 ? enquiries[0] : null} 
        />

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search by name, email or message..."
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border rounded"
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
              >
                <option value="">All Services</option>
                {uniqueServices.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={loadEnquiries}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Enquiries Table */}
        <EnquiryTable 
          enquiries={filteredEnquiries} 
          loading={loading} 
          error={error} 
          onRetry={loadEnquiries}
          onViewDetails={viewEnquiryDetails}
          onDelete={handleDelete}
        />

        {/* Service Statistics */}
        <ServiceDistribution 
          enquiries={enquiries} 
          uniqueServices={uniqueServices} 
        />
      </main>

      {/* Modal for enquiry details */}
      {selectedEnquiry && (
        <EnquiryModal 
          enquiry={selectedEnquiry} 
          onClose={() => setSelectedEnquiry(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
