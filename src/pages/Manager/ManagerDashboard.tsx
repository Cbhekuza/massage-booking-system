import { useState } from 'react'
import { Users, DollarSign, Calendar, CheckCircle, Settings, TrendingUp, UserPlus, Trash2, Edit, Eye, EyeOff, FileText, Download } from 'lucide-react'

export default function ManagerDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [showUserModal, setShowUserModal] = useState(false)
  const [showSpecialModal, setShowSpecialModal] = useState(false)
  const [editingSpecial, setEditingSpecial] = useState<any>(null)

  // Mock data
  const todayBookings = [
    {
      id: 1,
      clientName: 'John Doe',
      massage: 'Swedish Massage',
      time: '09:00',
      duration: 60,
      price: 650,
      status: 'confirmed',
      checkedIn: false,
      checkedOut: false
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      massage: 'Deep Tissue Massage',
      time: '10:00',
      duration: 90,
      price: 850,
      status: 'confirmed',
      checkedIn: true,
      checkedOut: false
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      massage: 'Hot Stone Massage',
      time: '12:00',
      duration: 75,
      price: 950,
      status: 'confirmed',
      checkedIn: true,
      checkedOut: true
    }
  ]

  const systemUsers = [
    { id: 1, name: 'Sarah Admin', email: 'sarah@massage.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Tom Manager', email: 'tom@massage.com', role: 'manager', status: 'active' },
    { id: 3, name: 'Mike Client', email: 'mike@email.com', role: 'client', status: 'active' }
  ]

  const [specialOffers, setSpecialOffers] = useState([
    {
      id: 1,
      title: 'Black Friday Special',
      description: '50% off all massage services!',
      discount: 50,
      discountType: 'percentage',
      validFrom: '2024-11-25',
      validUntil: '2024-11-30',
      published: false,
      active: true
    },
    {
      id: 2,
      title: 'New Client Offer',
      description: 'Get 20% off your first massage session',
      discount: 20,
      discountType: 'percentage',
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      published: true,
      active: true
    }
  ])

  const stats = {
    todayBookings: 8,
    todayRevenue: 5400,
    checkedIn: 5,
    completed: 3,
    totalUsers: 156,
    activeAdmins: 3,
    monthlyRevenue: 127800,
    monthlyGrowth: 23
  }

  const handleCheckIn = (bookingId: number) => {
    console.log('Check in booking:', bookingId)
  }

  const handleCheckOut = (bookingId: number) => {
    console.log('Check out booking:', bookingId)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId)
    }
  }

  const handleTogglePublish = (specialId: number) => {
    setSpecialOffers(prev => prev.map(special => 
      special.id === specialId 
        ? { ...special, published: !special.published }
        : special
    ))
  }

  const handleEditSpecial = (special: any) => {
    setEditingSpecial(special)
    setShowSpecialModal(true)
  }

  const handleDeleteSpecial = (specialId: number) => {
    if (confirm('Are you sure you want to delete this special offer?')) {
      setSpecialOffers(prev => prev.filter(s => s.id !== specialId))
    }
  }

  const handleSaveSpecial = () => {
    // Save logic here
    setShowSpecialModal(false)
    setEditingSpecial(null)
  }

  const exportToPDF = (reportType: string) => {
    console.log(`Exporting ${reportType} report to PDF...`)
    // PDF export logic will be implemented
    alert(`Exporting ${reportType} report to PDF...`)
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manager Dashboard</h2>
        <span className="badge bg-danger" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
          HIGHEST PRIVILEGE
        </span>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="dashboard-card">
            <div className="d-flex align-items-center">
              <Calendar size={40} style={{ color: 'var(--medium-brown)' }} />
              <div className="ms-3">
                <h6 className="mb-0 text-muted">Today's Bookings</h6>
                <div className="stat-number">{stats.todayBookings}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="dashboard-card">
            <div className="d-flex align-items-center">
              <DollarSign size={40} style={{ color: 'var(--medium-brown)' }} />
              <div className="ms-3">
                <h6 className="mb-0 text-muted">Today's Revenue</h6>
                <div className="stat-number">R{stats.todayRevenue}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="dashboard-card">
            <div className="d-flex align-items-center">
              <CheckCircle size={40} style={{ color: 'var(--medium-brown)' }} />
              <div className="ms-3">
                <h6 className="mb-0 text-muted">Checked In</h6>
                <div className="stat-number">{stats.checkedIn}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="dashboard-card">
            <div className="d-flex align-items-center">
              <Users size={40} style={{ color: 'var(--medium-brown)' }} />
              <div className="ms-3">
                <h6 className="mb-0 text-muted">Total Users</h6>
                <div className="stat-number">{stats.totalUsers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={18} className="me-2" />
            Analytics Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} className="me-2" />
            Today's Bookings
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} className="me-2" />
            User Management
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'specials' ? 'active' : ''}`}
            onClick={() => setActiveTab('specials')}
          >
            <Settings size={18} className="me-2" />
            Special Offers
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            <DollarSign size={18} className="me-2" />
            Revenue Reports
          </button>
        </li>
      </ul>

      {/* Analytics Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-custom me-2" onClick={() => exportToPDF('overview')}>
              <Download size={18} className="me-2" />
              Export Analytics to PDF
            </button>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Complete System Analytics</h5>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="p-4 bg-light rounded text-center">
                    <h6 className="text-muted">Total Bookings</h6>
                    <h3 className="text-primary">245</h3>
                    <small className="text-success">+12% this month</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="p-4 bg-light rounded text-center">
                    <h6 className="text-muted">Monthly Revenue</h6>
                    <h3 className="text-success">R{stats.monthlyRevenue.toLocaleString()}</h3>
                    <small className="text-success">+{stats.monthlyGrowth}% growth</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="p-4 bg-light rounded text-center">
                    <h6 className="text-muted">Active Users</h6>
                    <h3 className="text-info">{stats.totalUsers}</h3>
                    <small className="text-muted">Clients: 150 | Staff: 6</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="p-4 bg-light rounded text-center">
                    <h6 className="text-muted">Avg. Rating</h6>
                    <h3 className="text-warning">4.8 ⭐</h3>
                    <small className="text-muted">Based on 89 reviews</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Popular Services</h5>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Bookings</th>
                          <th>Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Swedish Massage</td>
                          <td>78</td>
                          <td className="text-success">R35,100</td>
                        </tr>
                        <tr>
                          <td>Deep Tissue</td>
                          <td>65</td>
                          <td className="text-success">R35,750</td>
                        </tr>
                        <tr>
                          <td>Hot Stone</td>
                          <td>52</td>
                          <td className="text-success">R33,800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">System Activity</h5>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Booking Rate</span>
                      <span className="text-success">87%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Check-in Rate</span>
                      <span className="text-info">92%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-info" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Customer Satisfaction</span>
                      <span className="text-warning">96%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Today's Bookings Tab */}
      {activeTab === 'bookings' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div></div>
            <button className="btn btn-custom" onClick={() => exportToPDF('daily-bookings')}>
              <Download size={18} className="me-2" />
              Export Today's Bookings to PDF
            </button>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5 className="mb-0">Bookings for:</h5>
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Today's Appointments - Check-in/Check-out</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayBookings.map(booking => (
                      <tr key={booking.id}>
                        <td className="fw-bold">{booking.time}</td>
                        <td>{booking.clientName}</td>
                        <td>{booking.massage}</td>
                        <td>{booking.duration} min</td>
                        <td className="text-success fw-bold">R{booking.price}</td>
                        <td>
                          {booking.checkedOut ? (
                            <span className="badge bg-success">Completed</span>
                          ) : booking.checkedIn ? (
                            <span className="badge bg-info">In Progress</span>
                          ) : (
                            <span className="badge bg-warning">Waiting</span>
                          )}
                        </td>
                        <td>
                          {!booking.checkedIn && !booking.checkedOut && (
                            <button
                              className="btn btn-sm btn-custom me-2"
                              onClick={() => handleCheckIn(booking.id)}
                            >
                              <CheckCircle size={16} className="me-1" />
                              Check In
                            </button>
                          )}
                          {booking.checkedIn && !booking.checkedOut && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleCheckOut(booking.id)}
                            >
                              <CheckCircle size={16} className="me-1" />
                              Check Out
                            </button>
                          )}
                          {booking.checkedOut && (
                            <span className="text-success">
                              <CheckCircle size={20} />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="card-title mb-0">User Management - Add/Delete Admins & Managers</h5>
              <button className="btn btn-custom" onClick={() => setShowUserModal(true)}>
                <UserPlus size={20} className="me-2" />
                Add User
              </button>
            </div>
            <div className="alert alert-info">
              <strong>Manager Privileges:</strong> You can add, edit, and delete all users including admins and managers. You have full control over system access.
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {systemUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${
                          user.role === 'manager' ? 'bg-danger' :
                          user.role === 'admin' ? 'bg-warning' :
                          'bg-primary'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success">{user.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteUser(user.id)}
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
              <h5 className="card-title mb-0">Special Offers Management - Publish/Hide & Edit</h5>
              <button className="btn btn-custom" onClick={() => {
                setEditingSpecial(null)
                setShowSpecialModal(true)
              }}>
                <UserPlus size={20} className="me-2" />
                Create New Special
              </button>
            </div>
            <div className="alert alert-warning">
              <strong>Manager Control:</strong> You control when special offers (like Black Friday) are visible to customers. Edit dates and toggle publish/hide status.
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Discount</th>
                    <th>Valid Period</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specialOffers.map(special => (
                    <tr key={special.id}>
                      <td>
                        <strong>{special.title}</strong>
                        <br />
                        <small className="text-muted">{special.description}</small>
                      </td>
                      <td>
                        <span className="badge bg-success">
                          {special.discount}% OFF
                        </span>
                      </td>
                      <td>
                        <small>
                          {new Date(special.validFrom).toLocaleDateString()} - {new Date(special.validUntil).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <span className={`badge ${special.active ? 'bg-success' : 'bg-secondary'}`}>
                          {special.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {special.published ? (
                          <span className="badge bg-primary">
                            <Eye size={14} className="me-1" />
                            Published
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            <EyeOff size={14} className="me-1" />
                            Hidden
                          </span>
                        )}
                      </td>
                      <td>
                        <button 
                          className={`btn btn-sm ${special.published ? 'btn-warning' : 'btn-success'} me-2`}
                          onClick={() => handleTogglePublish(special.id)}
                          title={special.published ? 'Hide from customers' : 'Publish to customers'}
                        >
                          {special.published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditSpecial(special)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteSpecial(special.id)}
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

      {/* Revenue Reports Tab */}
      {activeTab === 'revenue' && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="card-title mb-0">Revenue Reports - Daily, Weekly, Monthly</h5>
              <div>
                <button className="btn btn-custom me-2" onClick={() => exportToPDF('daily-revenue')}>
                  <Download size={18} className="me-2" />
                  Export Daily
                </button>
                <button className="btn btn-custom me-2" onClick={() => exportToPDF('weekly-revenue')}>
                  <Download size={18} className="me-2" />
                  Export Weekly
                </button>
                <button className="btn btn-custom" onClick={() => exportToPDF('monthly-revenue')}>
                  <Download size={18} className="me-2" />
                  Export Monthly
                </button>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="p-4 bg-light rounded text-center">
                  <h6 className="text-muted">Today</h6>
                  <h3 className="text-success">R{stats.todayRevenue.toLocaleString()}</h3>
                  <small className="text-muted">{stats.todayBookings} bookings</small>
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
                  <h3 className="text-success">R{stats.monthlyRevenue.toLocaleString()}</h3>
                  <small className="text-muted">189 bookings</small>
                </div>
              </div>
            </div>

            <h6 className="mb-3">Revenue Breakdown by Service</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Today</th>
                    <th>This Week</th>
                    <th>This Month</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Swedish Massage</td>
                    <td className="text-success">R1,350</td>
                    <td className="text-success">R9,450</td>
                    <td className="text-success">R35,100</td>
                    <td><span className="text-success">↑ 12%</span></td>
                  </tr>
                  <tr>
                    <td>Deep Tissue</td>
                    <td className="text-success">R1,700</td>
                    <td className="text-success">R11,900</td>
                    <td className="text-success">R35,750</td>
                    <td><span className="text-success">↑ 8%</span></td>
                  </tr>
                  <tr>
                    <td>Hot Stone</td>
                    <td className="text-success">R1,950</td>
                    <td className="text-success">R13,650</td>
                    <td className="text-success">R33,800</td>
                    <td><span className="text-success">↑ 15%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowUserModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select">
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <div className="alert alert-warning">
                    <small><strong>Note:</strong> As a manager, you can create users with any role including other managers and admins.</small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-custom">
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Special Offer Modal */}
      {showSpecialModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingSpecial ? 'Edit Special Offer' : 'Create New Special Offer'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowSpecialModal(false)
                    setEditingSpecial(null)
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editingSpecial?.title}
                      placeholder="e.g., Black Friday Special"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      defaultValue={editingSpecial?.description}
                      placeholder="Describe the special offer"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Discount Type</label>
                      <select className="form-select" defaultValue={editingSpecial?.discountType}>
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (R)</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Discount Value</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        defaultValue={editingSpecial?.discount}
                        placeholder="50"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Valid From</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        defaultValue={editingSpecial?.validFrom}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Valid Until</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        defaultValue={editingSpecial?.validUntil}
                      />
                    </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="publishCheck"
                      defaultChecked={editingSpecial?.published}
                    />
                    <label className="form-check-label" htmlFor="publishCheck">
                      Publish immediately (make visible to customers)
                    </label>
                  </div>
                  <div className="alert alert-info">
                    <small><strong>Note:</strong> You can publish or hide this offer anytime from the Special Offers list.</small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowSpecialModal(false)
                    setEditingSpecial(null)
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-custom"
                  onClick={handleSaveSpecial}
                >
                  {editingSpecial ? 'Update Special' : 'Create Special'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
