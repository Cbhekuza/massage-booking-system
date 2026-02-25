# Serenity Spa & Massage - Booking System

A comprehensive web-based massage booking system with client portal, manager dashboard, and admin panel.

## 📍 Business Information

**Serenity Spa & Massage**
- **Address**: 123 Sbhekuza Avenue, Ndlela Building, Sandton, 1635
- **Office Phone**: 011 123 4567
- **Email**: info@serenityspa.co.za

## 🌟 Features

### Client Portal
- User registration and login with password reset
- Browse available massage services
- View real-time available time slots (5 bookings per session per day)
- Book massage appointments
- Secure payment integration (Ozow)
- Download PDF invoices after booking
- View booking history
- Leave reviews and ratings
- View special offers and promotions

### Manager Dashboard (HIGHEST PRIVILEGE)
- **User Management**: Add/delete admins, managers, and clients
- **Complete Analytics Dashboard**: Full system oversight with comprehensive statistics
- **Today's Statistics**: Real-time booking and revenue tracking
- **Check-in/Check-out**: Client session management
- **Daily Bookings**: View and manage all appointments
- **Revenue Reports**: Daily, weekly, and monthly financial reports
- **System Control**: Full administrative access to all features

### Admin Dashboard (OPERATIONAL MONITORING)
- **Monitor All Appointments**: View and filter all bookings across the system
- **Review Management**: View and delete client reviews
- **Special Offers Management**: Create and manage promotional deals (Black Friday, etc.)
- **Revenue Analytics**: View service performance and financial reports
- **System Monitoring**: Track operational metrics and statistics

## 🔐 Role Hierarchy

**MANAGER** (Highest Privilege)
- Complete system control
- User management (add/delete all roles)
- Full analytics and reporting
- All admin capabilities plus more

**ADMIN** (Operational Level)
- Monitor appointments
- Manage reviews and specials
- View analytics
- No user management access

**CLIENT** (Basic Access)
- Book appointments
- View own bookings
- Leave reviews
- Manage profile

## 🛠️ Technology Stack

### Frontend
- React 18.2.0
- TypeScript
- Vite
- React Router DOM
- Zustand (State Management)
- Lucide React (Icons)
- jsPDF (Invoice Generation)
- date-fns (Date Handling)
- Bootstrap 5 (UI Framework)

### Backend
- PHP 8.x
- MySQL 8.x
- RESTful API Architecture

### Payment Integration
- Ozow Payment Gateway

## 📁 Project Structure

```
massage-booking-system/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── lib/                      # Utilities and mock data
│   │   └── api.ts
│   ├── pages/                    # Page components
│   │   ├── Admin/
│   │   │   └── AdminDashboard.tsx      # Admin operational monitoring
│   │   ├── Manager/
│   │   │   └── ManagerDashboard.tsx    # Manager full control panel
│   │   ├── Booking.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MyBookings.tsx
│   │   └── Register.tsx
│   ├── stores/                   # Zustand state management
│   │   └── AuthStore.ts
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── api/                          # Backend API (deploy to htdocs)
│   ├── config/
│   │   └── database.php          # Database configuration
│   ├── auth/
│   │   ├── login.php
│   │   ├── register.php
│   │   └── reset-password.php
│   ├── bookings/
│   │   ├── create.php
│   │   ├── list.php
│   │   └── update.php
│   ├── massages/
│   │   ├── list.php
│   │   └── manage.php
│   ├── manager/
│   │   ├── users.php             # User management (manager only)
│   │   ├── checkin.php
│   │   ├── reports.php
│   │   └── analytics.php
│   ├── admin/
│   │   ├── appointments.php      # Monitor appointments
│   │   ├── reviews.php           # Review management
│   │   ├── specials.php          # Special offers
│   │   └── analytics.php         # Revenue analytics
│   ├── analytics/
│   │   └── stats.php
│   └── loyalty/
│       └── points.php
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── package.json                  # Node dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── database.sql                  # Database schema
└── README.md                     # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PHP 8.x
- MySQL 8.x
- Web server (Apache/Nginx)
- Git

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/massage-booking-system.git
cd massage-booking-system
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

### Backend Setup

1. **Database Configuration**

Create a MySQL database:
```bash
mysql -u root -p
CREATE DATABASE serenity_spa;
exit;
```

2. **Import Database Schema**

Import the database structure:
```bash
mysql -u root -p serenity_spa < database.sql
```

3. **Configure Database Connection**

Edit `api/config/database.php`:
```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'serenity_spa');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

4. **Deploy API to Server**

Copy the `api/` folder to your web server's htdocs directory:
```bash
# For XAMPP/WAMP
cp -r api/ C:/xampp/htdocs/serenity-spa-api/

# For Linux servers
sudo cp -r api/ /var/www/html/serenity-spa-api/
```

5. **Set Permissions** (Linux/Mac):
```bash
sudo chmod -R 755 /var/www/html/serenity-spa-api/
sudo chown -R www-data:www-data /var/www/html/serenity-spa-api/
```

6. **Update Frontend API URL**

Edit `src/lib/api.ts` to point to your API:
```typescript
const API_BASE_URL = 'http://your-domain.com/serenity-spa-api';
```

## 🗄️ Database Structure

The system uses the following main tables:
- **users**: Client and staff accounts with role hierarchy
- **massages**: Available massage services
- **bookings**: Appointment bookings
- **time_slots**: Available time slots
- **reviews**: Client reviews and ratings
- **specials**: Promotional offers
- **payments**: Payment transactions
- **loyalty_points**: Client loyalty program

See `database.sql` for complete schema.

## 🔐 Default Users

After importing the database, you can login with:

**Manager Account** (HIGHEST PRIVILEGE)
- Email: manager@serenityspa.co.za
- Password: manager123
- Role: Manager
- Access: Full system control

**Admin Account** (OPERATIONAL)
- Email: admin@serenityspa.co.za
- Password: admin123
- Role: Administrator
- Access: Monitoring and content management

**Test Client Account**
- Email: client@example.com
- Password: client123
- Role: Client
- Access: Booking and profile management

⚠️ **Important**: Change these passwords immediately in production!

## 💳 Payment Configuration

### Ozow Integration

1. Sign up for an Ozow merchant account at https://ozow.com
2. Get your API credentials (Site Code, Private Key, API Key)
3. Update payment configuration in `api/config/payment.php`
4. Configure webhook URL for payment notifications

## 📧 Email Configuration

Configure SMTP settings in `api/config/email.php` for:
- Booking confirmations
- Password reset emails
- Invoice delivery
- Promotional emails

## 🔒 Security Notes

- Passwords are stored unhashed (as per requirement - change for production!)
- Enable HTTPS in production
- Configure CORS properly for API access
- Implement rate limiting for API endpoints
- Regular database backups recommended
- Keep dependencies updated
- Role-based access control enforced at API level

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Database connection failed:**
- Check MySQL service is running
- Verify database credentials in `config/database.php`
- Ensure database exists and is accessible

**API not accessible:**
- Check Apache/Nginx is running
- Verify API folder is in htdocs/www directory
- Check file permissions (755 for directories, 644 for files)

**CORS errors:**
- Enable CORS headers in API responses
- Check API URL configuration in frontend

## 📊 Business Rules

- Maximum 5 bookings per massage session per day
- Bookings must be made at least 2 hours in advance
- Cancellations allowed up to 24 hours before appointment
- Loyalty points: 1 point per R10 spent
- Special offers can be time-limited and quantity-limited
- **Manager has highest privilege** - can manage all users including admins
- **Admin focuses on operations** - monitors appointments, manages content

## 🔄 Deployment

### GitHub Deployment

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create GitHub repository and push:
```bash
git remote add origin https://github.com/yourusername/massage-booking-system.git
git branch -M main
git push -u origin main
```

### Cloud Server Deployment

1. **Frontend** (Vercel/Netlify):
```bash
npm run build
# Upload dist/ folder to hosting service
```

2. **Backend** (VPS/Shared Hosting):
- Upload `api/` folder to server
- Import database
- Configure environment variables
- Set up SSL certificate

## 👨‍💻 Developer

**Developed by Ntlantla Mabindisa**
- Email: mabindisantla92@gmail.com
- Phone: +27 60 229 0710
- Company: NMAB TECH SERVICES

## 📞 Support

For technical support or inquiries:
- Email: mabindisantla92@gmail.com
- Phone: +27 60 229 0710
- Office: 011 123 4567

## 📄 License

© 2024 Serenity Spa & Massage. All rights reserved.

## 🙏 Acknowledgments

- React Team
- Vite Team
- Lucide Icons
- Bootstrap Team
- Ozow Payment Gateway
