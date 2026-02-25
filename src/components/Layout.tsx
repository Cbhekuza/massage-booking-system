import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>Serenity Spa & Massage</h5>
              <p>Your journey to relaxation and wellness starts here.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                <li><a href="/booking" className="text-white text-decoration-none">Book Now</a></li>
                <li><a href="/my-bookings" className="text-white text-decoration-none">My Bookings</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Follow Us</h5>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="developer-credit">
            <p className="mb-1">
              <strong>Developed by Ntlantla Mabindisa</strong>
            </p>
            <p className="mb-1">
              <a href="mailto:mabindisantla92@gmail.com">mabindisantla92@gmail.com</a> | 
              <a href="tel:+27602290710"> +27 60 229 0710</a>
            </p>
            <p className="mb-0">
              <strong>NMAB TECH SERVICES</strong>
            </p>
          </div>
          
          <div className="text-center mt-3 pt-3 border-top border-secondary">
            <p className="mb-0">&copy; 2026 Serenity Spa & Massage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
