import { Link } from 'react-router-dom'
import { Star, Calendar, Award, Users } from 'lucide-react'
import { mockData } from '../lib/api'

export default function Home() {
  const { massages, reviews, specials } = mockData

  // CRITICAL: Only show published specials to clients
  const publishedSpecials = specials.filter(s => s.active && s.published === true)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content container">
          <h1 className="display-3 fw-bold mb-4">Welcome to Serenity Spa</h1>
          <p className="lead mb-4">Experience the ultimate relaxation with our professional massage services</p>
          <Link to="/booking">
            <button className="btn btn-custom btn-lg">Book Your Session Now</button>
          </Link>
        </div>
      </section>

      {/* Specials Section - ONLY PUBLISHED OFFERS */}
      {publishedSpecials.length > 0 && (
        <section className="container my-5">
          {publishedSpecials.map(special => (
            <div key={special.id} className="special-banner">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-3">
                    <Award className="me-2" />
                    {special.title}
                  </h2>
                  <p className="lead mb-0">{special.description}</p>
                  <small>Valid until: {new Date(special.validUntil).toLocaleDateString()}</small>
                </div>
                <div className="col-md-4 text-center">
                  <div className="display-1 fw-bold">{special.discount}% OFF</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <Calendar size={48} className="mb-3" style={{ color: 'var(--medium-brown)' }} />
              <h4>Easy Booking</h4>
              <p>Book your session online in just a few clicks</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <Users size={48} className="mb-3" style={{ color: 'var(--medium-brown)' }} />
              <h4>Expert Therapists</h4>
              <p>Certified professionals with years of experience</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <Award size={48} className="mb-3" style={{ color: 'var(--medium-brown)' }} />
              <h4>Premium Service</h4>
              <p>Top-quality massage treatments and facilities</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-4">
              <Star size={48} className="mb-3" style={{ color: 'var(--medium-brown)' }} />
              <h4>5-Star Rated</h4>
              <p>Highly rated by our satisfied clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Massage Services Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5">Our Massage Services</h2>
        <div className="row">
          {massages.map(massage => (
            <div key={massage.id} className="col-md-4 mb-4">
              <div className="card massage-card">
                <img src={massage.image} className="card-img-top" alt={massage.name} />
                <div className="card-body">
                  <h5 className="card-title">{massage.name}</h5>
                  <p className="card-text">{massage.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge-custom">{massage.duration} minutes</span>
                    <strong className="text-success">R{massage.price}</strong>
                  </div>
                  <Link to="/booking" className="btn btn-custom w-100 mt-3">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5">What Our Clients Say</h2>
        <div className="row">
          {reviews.slice(0, 3).map(review => (
            <div key={review.id} className="col-md-4 mb-4">
              <div className="review-card">
                <div className="rating mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-3">"{review.comment}"</p>
                <div className="d-flex justify-content-between">
                  <strong>{review.clientName}</strong>
                  <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                </div>
                <small className="text-muted">{review.massageType}</small>
              </div>
            </div>
          ))}
        </div>
        
        {/* Review Form */}
        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Share Your Experience</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>
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
                    <textarea className="form-control" rows={4} placeholder="Tell us about your experience..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-custom">Submit Review</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
