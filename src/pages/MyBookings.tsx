import { useState } from 'react'
import { Calendar, Clock, MapPin, Star } from 'lucide-react'

export default function MyBookings() {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      massage: {
        name: 'Swedish Massage',
        duration: 60,
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-02-15',
      time: '10:00',
      price: 650,
      status: 'completed',
      checkedIn: true,
      checkedOut: true
    },
    {
      id: 2,
      massage: {
        name: 'Deep Tissue Massage',
        duration: 90,
        image: 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-02-20',
      time: '14:00',
      price: 850,
      status: 'confirmed',
      checkedIn: false,
      checkedOut: false
    },
    {
      id: 3,
      massage: {
        name: 'Hot Stone Massage',
        duration: 75,
        image: 'https://images.pexels.com/photos/3188573/pexels-photo-3188573.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2024-02-25',
      time: '16:00',
      price: 950,
      status: 'confirmed',
      checkedIn: false,
      checkedOut: false
    }
  ]

  const handleReview = (booking: any) => {
    setSelectedBooking(booking)
    setShowReviewModal(true)
  }

  const submitReview = () => {
    // In production, send to API
    console.log('Review submitted for booking:', selectedBooking.id)
    setShowReviewModal(false)
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Bookings</h2>

      <div className="row">
        {bookings.map(booking => (
          <div key={booking.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="row g-0">
                <div className="col-md-4">
                  <img 
                    src={booking.massage.image} 
                    className="img-fluid rounded-start h-100" 
                    alt={booking.massage.name}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{booking.massage.name}</h5>
                    
                    <div className="mb-2">
                      <Calendar size={16} className="me-2" />
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    
                    <div className="mb-2">
                      <Clock size={16} className="me-2" />
                      {booking.time} ({booking.massage.duration} minutes)
                    </div>
                    
                    <div className="mb-3">
                      <strong className="text-success">R{booking.price}</strong>
                    </div>
                    
                    <div className="mb-3">
                      <span className={`badge ${
                        booking.status === 'completed' ? 'bg-success' :
                        booking.status === 'confirmed' ? 'bg-primary' :
                        'bg-secondary'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                      
                      {booking.checkedIn && (
                        <span className="badge bg-info ms-2">Checked In</span>
                      )}
                      
                      {booking.checkedOut && (
                        <span className="badge bg-success ms-2">Checked Out</span>
                      )}
                    </div>
                    
                    {booking.status === 'completed' && (
                      <button 
                        className="btn btn-custom btn-sm"
                        onClick={() => handleReview(booking)}
                      >
                        <Star size={16} className="me-1" />
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Write a Review</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowReviewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select className="form-select">
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Review</label>
                  <textarea 
                    className="form-control" 
                    rows={4}
                    placeholder="Share your experience..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-custom"
                  onClick={submitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
