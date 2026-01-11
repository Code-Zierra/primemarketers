# PrimeMarketers - Professional Marketing Agency Website

![PrimeMarketers Website](https://img.shields.io/badge/Status-Complete-success)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, responsive marketing agency website with full e-commerce functionality, service packages, and a simulated payment system.

## 🌟 Live Demo

[View Live Demo](#) | [Video Walkthrough](#)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Key Features](#key-features)
- [Database Setup](#database-setup)
- [Form Handling](#form-handling)
- [Payment Simulation](#payment-simulation)
- [Customization](#customization)
- [Performance Optimizations](#performance-optimizations)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## ✨ Features

### Core Features
- ✅ **8 Complete Pages**: Home, About, Services, Products, Contact, Cart, Checkout, Payment
- ✅ **Responsive Design**: Mobile-first approach with Bootstrap 5
- ✅ **Interactive Shopping Cart**: Add/remove items, quantity management
- ✅ **Product Categories**: Filterable products with subcategories
- ✅ **Service Packages**: Basic, Standard, Premium plans
- ✅ **Contact Form**: PHP backend with validation
- ✅ **Checkout Process**: Multi-step order flow
- ✅ **Payment Simulation**: Stripe-like payment processor demo

### Technical Features
- ✅ **Local Storage**: Cart persistence across sessions
- ✅ **Form Validation**: Client-side and server-side validation
- ✅ **AJAX Form Submission**: Smooth contact form experience
- ✅ **Dynamic Content Loading**: JavaScript-based product filtering
- ✅ **Smooth Animations**: CSS animations and transitions
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **SEO Optimized**: Meta tags and structured content

## 🛠 Tech Stack

**Frontend:**
- HTML5 (Semantic markup)
- CSS3 (Custom animations, Flexbox, Grid)
- Bootstrap 5.3.0 (Responsive framework)
- Font Awesome 6.4.0 (Icons)
- Vanilla JavaScript (ES6+)

**Backend:**
- PHP 7.4+ (Contact form processing)
- JSON File Storage (Demo mode)
- MySQL (Production-ready schema provided)

**Development Tools:**
- Local Storage API
- Fetch API (AJAX)
- FormData API
- CSS Custom Properties

## 🚀 Installation

### Prerequisites
- Web server (Apache, Nginx, or local server like XAMPP/WAMP/MAMP)
- PHP 7.4 or higher (for form processing)
- Modern web browser

### Quick Start (Local Server)

1. **Clone/Download the project:**
```bash
git clone https://github.com/Code-Zierra/primemarketers.git
cd primemarketers
```

2. **For basic static hosting (HTML/CSS/JS only):**
   - Simply open `index.html` in your browser
   - Note: Contact form requires PHP server

3. **For full functionality (with PHP):**
```bash
# Using PHP built-in server
php -S localhost:8000

# Using Python (for static only)
python -m http.server 8000
```

### Using XAMPP/WAMP/MAMP

1. Install XAMPP/WAMP/MAMP
2. Place the project folder in the `htdocs` directory
3. Start Apache server
4. Access via `http://localhost/primemarketers`

## 📁 Project Structure

```
primemarketers/
├── index.html                    # Home page
├── about.html                    # About us page
├── services.html                 # Services and packages
├── products.html                 # Products with categories
├── contact.html                  # Contact form page
├── cart.html                     # Shopping cart
├── order.html                    # Checkout process
├── payment.html                  # Payment simulation
├── css/
│   └── style.css                # Custom styles
├── js/
│   └── script.js                # Main JavaScript file
├── server/
│   └── forms/
│       └── contact.php          # PHP form processor
├── contacts.json                # Form submissions (auto-generated)
└── README.md                    # This file
```

## 📄 Pages Overview

### 1. **Home (`index.html`)**
- Hero section with CTA
- Features showcase
- Service highlights
- Call-to-action section

### 2. **About (`about.html`)**
- Company story and mission
- Core values
- Team profiles
- Statistics and achievements

### 3. **Services (`services.html`)**
- 6 marketing service categories
- Detailed service modals
- Pricing plans (Basic/Standard/Premium)
- Service package comparison

### 4. **Products (`products.html`)**
- Product categories with filtering
- Product cards with add-to-cart
- Subcategory breakdown
- Featured products

### 5. **Contact (`contact.html`)**
- Multi-field contact form
- Form validation
- Interactive map
- FAQ section

### 6. **Cart (`cart.html`)**
- Shopping cart interface
- Quantity adjustments
- Order summary
- Promo code application

### 7. **Order (`order.html`)**
- Multi-step checkout
- Billing information form
- Order review
- Shipping options

### 8. **Payment (`payment.html`)**
- Service plan selection
- Payment form simulation
- Security badges
- Terms and conditions

## 🔧 Key Features Explained

### Shopping Cart System
- **Local Storage**: Cart data persists across sessions
- **Real-time Updates**: Cart count updates dynamically
- **Quantity Management**: Increase/decrease item quantities
- **Total Calculation**: Automatic tax and total calculation

### Product Management
```javascript
// Example product structure
{
  id: 'sm1',
  name: 'Social Media Audit',
  price: 299,
  category: 'social-media',
  quantity: 1
}
```

### Form Validation System
- **Client-side**: Real-time field validation
- **Server-side**: PHP validation with JSON response
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages

### Payment Simulation
- **Test Card**: `4242 4242 4242 4242`
- **Plan Selection**: Basic/Standard/Premium
- **Order Processing**: Simulated payment flow
- **Receipt Generation**: Order confirmation with details

## 🗄️ Database Setup

For production use, set up MySQL database:

```sql
-- Create database
CREATE DATABASE primemarketers_db;
USE primemarketers_db;

-- Contacts table
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(100),
    budget VARCHAR(50),
    message TEXT NOT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Update PHP Configuration
Edit `server/forms/contact.php` to use MySQL:

```php
// Replace the demo JSON storage with:
$pdo = new PDO('mysql:host=localhost;dbname=primemarketers_db', 'username', 'password');
$stmt = $pdo->prepare('INSERT INTO contacts (...) VALUES (...)');
```

## 📧 Form Handling

### Contact Form Endpoint
**URL:** `server/forms/contact.php`  
**Method:** POST  
**Content-Type:** `application/x-www-form-urlencoded`

### Form Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | text | Yes | Customer first name |
| lastName | text | Yes | Customer last name |
| email | email | Yes | Valid email address |
| phone | tel | No | Phone number |
| company | text | No | Company name |
| service | select | No | Service interest |
| budget | select | No | Budget range |
| message | textarea | Yes | Inquiry message |
| newsletter | checkbox | No | Newsletter subscription |

### Response Format
```json
{
  "success": true,
  "message": "Thank you for your message!",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 💳 Payment Simulation

### Test Credentials
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (MM/YY)
- **CVV:** Any 3 digits
- **Plan Prices:** Basic ($299), Standard ($599), Premium ($999)

### Integration with Real Stripe
Replace the simulation with actual Stripe:

```javascript
// In production, replace with:
const stripe = Stripe('pk_test_your_key_here');
const elements = stripe.elements();
// ... Stripe integration code
```

## 🎨 Customization

### Brand Colors
Edit `css/style.css`:

```css
:root {
  --primary-color: #4a6fa5;
  --secondary-color: #166088;
  --accent-color: #4fc3a1;
  --dark-color: #2c3e50;
  --light-color: #f8f9fa;
}
```

### Company Information
Update in all HTML files:
- Company name
- Contact details
- Address
- Social media links

### Service Plans
Modify `services.html`:
- Plan names
- Pricing
- Features list
- Package details

### Products
Update `js/script.js` products object:
```javascript
const products = {
  'category': [
    { id: 'prod1', name: 'Product Name', price: 199, category: 'category' }
  ]
};
```

## ⚡ Performance Optimizations

### Implemented
- **Minified assets**: CSS and JavaScript
- **Lazy loading**: Images load on scroll
- **Browser caching**: Local storage utilization
- **Code splitting**: Modular JavaScript

### Recommended for Production
- **CDN hosting**: For static assets
- **Image optimization**: WebP format with fallbacks
- **GZIP compression**: For faster loading
- **Database indexing**: For form submissions

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| iOS Safari | 12+ | ✅ Full |
| Chrome Android | 60+ | ✅ Full |

## 🚢 Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel)
1. Upload all files except `server/` folder
2. Update contact form to use Formspree or similar service
3. Update base URLs if necessary

### Full Hosting (with PHP)
1. **Shared Hosting** (cPanel):
   - Upload all files via FTP
   - Set folder permissions: `chmod 755 server/forms/`
   - Configure database in cPanel

2. **VPS/Dedicated Server**:
   ```bash
   # Copy files to web root
   sudo cp -r primemarketers /var/www/html/
   
   # Set permissions
   sudo chown -R www-data:www-data /var/www/html/primemarketers
   
   # Configure Apache/Nginx
   ```

3. **Docker** (Optional):
   ```dockerfile
   FROM php:7.4-apache
   COPY . /var/www/html/
   RUN a2enmod rewrite
   EXPOSE 80
   ```

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test across browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email: support@primemarketers.com  
Project Issues: [GitHub Issues](#)  
Documentation: [Wiki](#)

---

## 🎯 Quick Commands

```bash
# Start local PHP server
php -S localhost:8000

# Start Python server (static only)
python -m http.server 8000

# Check PHP version
php --version

# Test form submission
curl -X POST http://localhost:8000/server/forms/contact.php \
  -d "firstName=John&lastName=Doe&email=test@example.com&message=Test"
```

## 🔄 Changelog

### v1.0.0 (Initial Release)
- Complete 8-page website
- Shopping cart functionality
- Contact form with PHP backend
- Payment simulation
- Responsive design
- Cross-browser compatibility

---

**Built with ❤️ by the PrimeMarketers Team**  
*Professional Marketing Solutions for the Digital Age*
