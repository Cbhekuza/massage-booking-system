import { useState } from 'react'
import { Calendar, TrendingUp, Trash2, Edit, Plus } from 'lucide-react'
import { mockData } from '../../lib/api'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('appointments')
  const [showSpecialModal, setShowSpecialModal] = useState(false)

  const reviews = mockData.reviews

  const allAppointments = [
    { id: 1, date: '2024-01-15', client: 'John Doe', service: 'Swedish Massage', time: '09:00', status: 'completed', revenue: 650 },
    { id: 2, date: '2024-01-15', client: 'Jane Smith', service: 'Deep Tissue', time: '10:00', status: 'completed', revenue: 850 },
    { id: 3, date: '2024-01-16', client: 'Mike Johnson', service: 'Hot Stone', time: '12:00', status: 'confirmed', revenue: 950 },
    { id: 4, date: '2024-01-16', client: 'Sarah Williams', service: 'Aromatherapy', time: '14:00', status: 'pending', revenue: 500 },
    { id: 5, date: '2024-01-17', client: 'Tom Brown', service: 'Sports Massage', time: '11:00', status: 'confirmed', revenue: 600 }
  ]

  const handleDeleteReview = (reviewId: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      console.log('Delete review:', reviewId)
    }
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <span className="badge bg-warning text-dark" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
          OPERATIONAL MONITORING
        </span>
      </div>

      <div className="alert alert-info mb-4">
        <strong>Admin Role:</strong> Monitor appointments, manage reviews and special offers, view revenue analytics. For user management and full system control, contact your manager.
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={18} className="me-2" />
            Monitor Appointments
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <TrendingUp size={18} className="me-2" />
            Review Management
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'specials' ? 'active' : ''}`}
            onClick={() => setActiveTab('specials')}
          >
            <Plus size={18} className="me-2" />
            Special Offers
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={18} className="me-2" />
            Revenue Analytics
          </button>
        </li>
      </ul>

      {/* Monitor All Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">All Appointments - System Monitoring</h5>
            <div className="mb-3">
              <div className="row">
                <div className="col-md-3">
                  <input type="date" className="form-control" placeholder="From Date" />
                </div>
                <div className="col-md-3">
                  <input type="date" className="form-control" placeholder="To Date" />
                </div>
                <div className="col-md-3">
                  <select className="form-select">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-custom w-100">Filter</button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments.map(apt => (
                    <tr key={apt.id}>
                      <td>{new Date(apt.date).toLocaleDateString()}</td>
                      <td>{apt.time}</td>
                      <td>{apt.client}</td>
                      <td>{apt.service}</td>
                      <td>
                        <span className={`badge ${
                          apt.status === 'completed' ? 'bg-success' :
                          apt.status === 'confirmed' ? 'bg-info' :
                          apt.status === 'pending' ? 'bg-warning' :
                          'bg-secondary'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="text-success fw-bold">R{apt.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Review Management Tab */}
      {activeTab === 'reviews' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Review Management - View & Delete Reviews</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.id}>
                      <td>{review.clientName}</td>
                      <td>{review.massageType}</td>
                      <td>
                        <div className="rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </td>
                      <td>{review.comment.substring(0, 50)}...</td>
                      <td>{new Date(review.date).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Special Offers Management Tab */}
      {activeTab === 'specials' && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="card-title mb-0">Special Offers Management - Black Friday Deals</h5>
              <button className="btn btn-custom" onClick={() => setShowSpecialModal(true)}>
                <Plus size={20} className="me-2" />
                Add Special Offer
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Discount</th>
                    <th>Valid Until</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.specials.map(special => (
                    <tr key={special.id}>
                      <td>{special.title}</td>
                      <td>{special.description}</td>
                      <td className="text-success fw-bold">{special.discount}%</td>
                      <td>{new Date(special.validUntil).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${special.active ? 'bg-success' : 'bg-secondary'}`}>
                          {special.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Revenue Analytics & Reports</h5>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="p-4 bg-light rounded text-center">
                  <h6 className="text-muted">Today's Revenue</h6>
                  <h3 className="text-success">R5,400</h3>
                  <small className="text-muted">8 bookings</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-4 bg-light rounded text-center">
                  <h6 className="text-muted">This Week</h6>
                  <h3 className="text-success">R32,500</h3>
                  <small className="text-muted">52 bookings</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-4 bg-light rounded text-center">
                  <h6 className="text-muted">This Month</h6>
                  <h3 className="text-success">R127,800</h3>
                  <small className="text-muted">189 bookings</small>
                </div>
              </div>
            </div>

            <h6 className="mb-3">Service Performance</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Swedish Massage</td>
                    <td>78</td>
                    <td className="text-success">R35,100</td>
                    <td>4.8 ⭐</td>
                  </tr>
                  <tr>
                    <td>Deep Tissue</td>
                    <td>65</td>
                    <td className="text-success">R35,750</td>
                    <td>4.9 ⭐</td>
                  </tr>
                  <tr>
                    <td>Hot Stone</td>
                    <td>52</td>
                    <td className="text-success">R33,800</td>
                    <td>4.7 ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Special Modal */}
      {showSpecialModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Special Offer</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowSpecialModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="e.g., Black Friday Special" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={3}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Discount (%)</label>
                    <input type="number" className="form-control" min="0" max="100" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valid Until</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="activeCheck" defaultChecked />
                      <label className="form-check-label" htmlFor="activeCheck">
                        Active
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowSpecialModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-custom">
                  Add Special
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
