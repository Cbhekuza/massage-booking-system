import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/AuthStore'
import { mockData } from '../lib/api'
import { Calendar, Clock, CreditCard, Download } from 'lucide-react'
import jsPDF from 'jspdf'

export default function Booking() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedMassage, setSelectedMassage] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ]

  // Mock booked slots (in real app, fetch from API)
  const bookedSlots = ['10:00', '14:00', '16:00']

  const handleMassageSelect = (massage: any) => {
    setSelectedMassage(massage)
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleSlotSelect = (slot: string) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot)
    }
  }

  const handlePayment = () => {
    // In production, integrate with Ozow payment gateway
    const booking = {
      id: Date.now(),
      massage: selectedMassage,
      date: selectedDate,
      time: selectedSlot,
      client: user,
      price: selectedMassage.price,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    }
    
    setBookingDetails(booking)
    setBookingComplete(true)
  }

  const generateInvoice = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setTextColor(139, 111, 71)
    doc.text('SERENITY SPA & MASSAGE', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('INVOICE', 105, 30, { align: 'center' })
    
    // Invoice details
    doc.setFontSize(10)
    doc.text(`Invoice #: ${bookingDetails.id}`, 20, 50)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60)
    
    // Client details
    doc.text('Client Information:', 20, 80)
    doc.text(`Name: ${bookingDetails.client.name}`, 20, 90)
    doc.text(`Email: ${bookingDetails.client.email}`, 20, 100)
    
    // Booking details
    doc.text('Booking Details:', 20, 120)
    doc.text(`Service: ${bookingDetails.massage.name}`, 20, 130)
    doc.text(`Duration: ${bookingDetails.massage.duration} minutes`, 20, 140)
    doc.text(`Date: ${new Date(bookingDetails.date).toLocaleDateString()}`, 20, 150)
    doc.text(`Time: ${bookingDetails.time}`, 20, 160)
    
    // Price
    doc.setFontSize(12)
    doc.text(`Total Amount: R${bookingDetails.price}`, 20, 180)
    doc.text('Status: PAID', 20, 190)
    
    // Footer
    doc.setFontSize(8)
    doc.text('Developed by Ntlantla Mabindisa - NMAB TECH SERVICES', 105, 280, { align: 'center' })
    doc.text('mabindisantla92@gmail.com | +27 60 229 0710', 105, 285, { align: 'center' })
    
    doc.save(`invoice-${bookingDetails.id}.pdf`)
  }

  if (bookingComplete) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" 
                       style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-check text-white" style={{ fontSize: '40px' }}></i>
                  </div>
                </div>
                
                <h2 className="mb-4">Booking Confirmed!</h2>
                <p className="lead mb-4">Thank you for booking with Serenity Spa</p>
                
                <div className="card mb-4">
                  <div className="card-body text-start">
                    <h5 className="card-title mb-3">Booking Details</h5>
                    <p><strong>Service:</strong> {bookingDetails.massage.name}</p>
                    <p><strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {bookingDetails.time}</p>
                    <p><strong>Duration:</strong> {bookingDetails.massage.duration} minutes</p>
                    <p><strong>Amount Paid:</strong> R{bookingDetails.price}</p>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <button className="btn btn-custom" onClick={generateInvoice}>
                    <Download size={20} className="me-2" />
                    Download Invoice (PDF)
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate('/my-bookings')}>
                    View My Bookings
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Book Your Massage Session</h2>
      
      {/* Progress Steps */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <div className={`text-center mx-3 ${step >= 1 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-light'}`} 
                   style={{ width: '50px', height: '50px' }}>1</div>
              <div>Select Service</div>
            </div>
            <div className={`text-center mx-3 ${step >= 2 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-light'}`} 
                   style={{ width: '50px', height: '50px' }}>2</div>
              <div>Select Date</div>
            </div>
            <div className={`text-center mx-3 ${step >= 3 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-light'}`} 
                   style={{ width: '50px', height: '50px' }}>3</div>
              <div>Select Time</div>
            </div>
            <div className={`text-center mx-3 ${step >= 4 ? 'text-primary' : 'text-muted'}`}>
              <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step >= 4 ? 'bg-primary text-white' : 'bg-light'}`} 
                   style={{ width: '50px', height: '50px' }}>4</div>
              <div>Payment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Select Massage */}
      {step === 1 && (
        <div className="row">
          {mockData.massages.map(massage => (
            <div key={massage.id} className="col-md-4 mb-4">
              <div className="card massage-card h-100" onClick={() => handleMassageSelect(massage)} style={{ cursor: 'pointer' }}>
                <img src={massage.image} className="card-img-top" alt={massage.name} />
                <div className="card-body">
                  <h5 className="card-title">{massage.name}</h5>
                  <p className="card-text">{massage.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge-custom">
                      <Clock size={16} className="me-1" />
                      {massage.duration} min
                    </span>
                    <strong className="text-success">R{massage.price}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && selectedMassage && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <Calendar className="me-2" />
                  Select Date
                </h4>
                <p className="mb-4">Selected: <strong>{selectedMassage.name}</strong></p>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                />
                <button 
                  className="btn btn-outline-secondary w-100 mt-3"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Select Time Slot */}
      {step === 3 && selectedDate && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <Clock className="me-2" />
                  Select Time Slot
                </h4>
                <p className="mb-4">
                  Date: <strong>{new Date(selectedDate).toLocaleDateString()}</strong>
                </p>
                
                <div className="row">
                  {timeSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot)
                    const isSelected = selectedSlot === slot
                    
                    return (
                      <div key={slot} className="col-md-3 mb-3">
                        <div
                          className={`booking-slot ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          <div className="text-center">
                            <Clock size={24} />
                            <div className="mt-2">{slot}</div>
                            {isBooked && <small className="text-muted">Booked</small>}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="alert alert-info mt-4">
                  <strong>Note:</strong> Each session has a maximum of 5 bookings per day. 
                  Slots marked as "Booked" are no longer available.
                </div>
                
                <div className="d-grid gap-2 mt-4">
                  <button 
                    className="btn btn-custom"
                    disabled={!selectedSlot}
                    onClick={() => setStep(4)}
                  >
                    Continue to Payment
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="card-title mb-4">
                  <CreditCard className="me-2" />
                  Payment
                </h4>
                
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Booking Summary</h5>
                    <hr />
                    <p><strong>Service:</strong> {selectedMassage.name}</p>
                    <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedSlot}</p>
                    <p><strong>Duration:</strong> {selectedMassage.duration} minutes</p>
                    <hr />
                    <h4 className="text-success">Total: R{selectedMassage.price}</h4>
                  </div>
                </div>
                
                <div className="alert alert-warning">
                  <strong>Payment Integration:</strong> In production, this will integrate with Ozow payment gateway for secure online payments.
                </div>
                
                <div className="d-grid gap-2">
                  <button className="btn btn-custom btn-lg" onClick={handlePayment}>
                    <CreditCard size={20} className="me-2" />
                    Pay with Ozow (Demo)
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setStep(3)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
