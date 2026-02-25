// API configuration
const API_BASE_URL = 'http://localhost/api'

export const api = {
  // Auth endpoints
  login: (email: string, password: string) => 
    fetch(`${API_BASE_URL}/auth/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }),
    
  register: (data: any) =>
    fetch(`${API_BASE_URL}/auth/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    
  // Bookings endpoints
  getAvailability: (date: string, massageId: number) =>
    fetch(`${API_BASE_URL}/bookings/availability.php?date=${date}&massage_id=${massageId}`),
    
  createBooking: (data: any) =>
    fetch(`${API_BASE_URL}/bookings/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    
  getMyBookings: (userId: number) =>
    fetch(`${API_BASE_URL}/bookings/my-bookings.php?user_id=${userId}`),
    
  // Massages endpoints
  getMassages: () =>
    fetch(`${API_BASE_URL}/massages/list.php`),
    
  // Reviews endpoints
  getReviews: () =>
    fetch(`${API_BASE_URL}/reviews/list.php`),
    
  createReview: (data: any) =>
    fetch(`${API_BASE_URL}/reviews/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    
  // Manager endpoints
  getTodayBookings: () =>
    fetch(`${API_BASE_URL}/manager/today-bookings.php`),
    
  checkIn: (bookingId: number) =>
    fetch(`${API_BASE_URL}/manager/check-in.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: bookingId, action: 'check_in' })
    }),
    
  checkOut: (bookingId: number) =>
    fetch(`${API_BASE_URL}/manager/check-in.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: bookingId, action: 'check_out' })
    }),
    
  getRevenue: (startDate: string, endDate: string) =>
    fetch(`${API_BASE_URL}/manager/revenue.php?start_date=${startDate}&end_date=${endDate}`),
    
  // Admin endpoints
  getStats: () =>
    fetch(`${API_BASE_URL}/admin/stats.php`),
    
  getAdminBookings: () =>
    fetch(`${API_BASE_URL}/admin/bookings.php`),
    
  getAnalytics: (period: string) =>
    fetch(`${API_BASE_URL}/analytics/revenue.php?period=${period}`)
}

// Mock data for development
export const mockData = {
  massages: [
    {
      id: 1,
      name: 'Swedish Massage',
      description: 'Relaxing full body massage with gentle pressure',
      duration: 60,
      price: 650,
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Deep Tissue Massage',
      description: 'Therapeutic massage targeting deep muscle layers',
      duration: 90,
      price: 850,
      image: 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Hot Stone Massage',
      description: 'Luxurious massage using heated stones',
      duration: 75,
      price: 950,
      image: 'https://images.pexels.com/photos/3188573/pexels-photo-3188573.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      name: 'Aromatherapy Massage',
      description: 'Relaxing massage with essential oils',
      duration: 60,
      price: 750,
      image: 'https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      name: 'Sports Massage',
      description: 'Targeted massage for athletes and active individuals',
      duration: 60,
      price: 700,
      image: 'https://images.pexels.com/photos/7654178/pexels-photo-7654178.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ],
  
  reviews: [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing experience! The Swedish massage was exactly what I needed. Very professional staff.',
      date: '2024-01-15',
      massageType: 'Swedish Massage'
    },
    {
      id: 2,
      clientName: 'Michael Brown',
      rating: 5,
      comment: 'The deep tissue massage helped with my back pain tremendously. Highly recommend!',
      date: '2024-01-14',
      massageType: 'Deep Tissue Massage'
    },
    {
      id: 3,
      clientName: 'Emily Davis',
      rating: 4,
      comment: 'Lovely hot stone massage. Very relaxing atmosphere and friendly therapists.',
      date: '2024-01-13',
      massageType: 'Hot Stone Massage'
    },
    {
      id: 4,
      clientName: 'David Wilson',
      rating: 5,
      comment: 'Best massage I have ever had! The aromatherapy oils were divine.',
      date: '2024-01-12',
      massageType: 'Aromatherapy Massage'
    },
    {
      id: 5,
      clientName: 'Lisa Anderson',
      rating: 5,
      comment: 'Perfect for post-workout recovery. The sports massage was exactly what I needed.',
      date: '2024-01-11',
      massageType: 'Sports Massage'
    }
  ],
  
  // CRITICAL: Only published specials should be visible to clients
  // This array will be filtered to show only published=true offers
  specials: [
    {
      id: 1,
      title: 'Black Friday Special',
      description: '50% off all massage services!',
      discount: 50,
      validUntil: '2024-11-30',
      active: true,
      published: false  // HIDDEN - Clients cannot see this!
    },
    {
      id: 2,
      title: 'New Client Offer',
      description: 'Get 20% off your first massage session',
      discount: 20,
      validUntil: '2024-12-31',
      active: true,
      published: true  // VISIBLE - Clients can see this
    }
  ]
}
