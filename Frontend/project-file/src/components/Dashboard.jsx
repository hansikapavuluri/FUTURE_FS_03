import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard({ setAuth }) {
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fetchAdmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admissions", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setAdmissions(data);
      } else {
        setAdmissions(data.admissions || []);
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      setAdmissions([]);
    }
  };

  useEffect(() => {
    fetchAdmissions();

    // ✅ Clear token when leaving dashboard
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admissions/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      fetchAdmissions();
    } catch (error) {
      console.error("Error approving admission:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admissions/${id}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      fetchAdmissions();
    } catch (error) {
      console.error("Error rejecting admission:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/admissions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchAdmissions();
    } catch (error) {
      console.error("Error deleting admission:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filtering
  const filteredAdmissions = admissions.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade ? a.grade === filterGrade : true;
    const matchesStatus = filterStatus ? a.status === filterStatus : true;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Sorting
  const sortedAdmissions = [...filteredAdmissions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const totalPages = Math.ceil(sortedAdmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAdmissions = sortedAdmissions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-container">

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
            <option value="">All Grades</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>Name</th>
              <th onClick={() => requestSort("email")}>Email</th>
              <th onClick={() => requestSort("grade")}>Grade</th>
              <th>Message</th>
              <th onClick={() => requestSort("createdAt")}>Date</th>
              <th onClick={() => requestSort("status")}>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAdmissions.map((admission) => (
              <tr key={admission._id}>
                <td>{admission.name}</td>
                <td>{admission.email}</td>
                <td>{admission.grade}</td>
                <td>{admission.message}</td>
                <td>{new Date(admission.createdAt).toLocaleDateString()}</td>
                <td>{admission.status || "Pending"}</td>
                <td>
                  {admission.status === "Approved" ? (
                    <button className="reject-btn" onClick={() => handleReject(admission._id)}>Reject</button>
                  ) : (
                    <button className="approve-btn" onClick={() => handleApprove(admission._id)}>Approve</button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(admission._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>◀ Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next ▶</button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
