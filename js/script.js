// Cart Management
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('marketingCart')) || [];
        this.updateCartCount();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart!', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item removed from cart!', 'info');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('marketingCart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = count;
        });
    }

    showNotification(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 100px; right: 20px; z-index: 1050; min-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 3000);
    }
}

// Initialize Cart Manager
const cartManager = new CartManager();

// Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.validateForm(e));
        
        // Add input validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling?.classList?.contains('invalid-feedback') 
            ? field.nextElementSibling 
            : this.createErrorElement(field);

        // Clear previous error
        field.classList.remove('is-invalid');
        if (errorElement) errorElement.textContent = '';

        // Validate based on field type
        if (field.required && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }

        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[^\d+]/g, ''))) {
                this.showError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.appendChild(errorElement);
        return errorElement;
    }

    showError(field, message) {
        field.classList.add('is-invalid');
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.textContent = message;
        }
    }

    validateForm(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        }
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        submitBtn.disabled = true;

        try {
            // For demo purposes, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In production, you would send to your PHP endpoint
            // const response = await fetch('server/forms/contact.php', {
            //     method: 'POST',
            //     body: formData
            // });
            
            // const result = await response.json();
            
            // Simulate success response
            const result = { success: true, message: 'Form submitted successfully!' };
            
            if (result.success) {
                this.showSuccessMessage(result.message);
                this.form.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const formContainer = this.form.parentNode;
        formContainer.insertBefore(alert, this.form);
        
        setTimeout(() => alert.remove(), 5000);
    }

    showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const formContainer = this.form.parentNode;
        formContainer.insertBefore(alert, this.form);
    }
}

// Initialize form validation on contact page
if (document.getElementById('contactForm')) {
    new FormValidator('contactForm');
}

// Product Management
const products = {
    'social-media': [
        { id: 'sm1', name: 'Social Media Audit', price: 299, category: 'social-media' },
        { id: 'sm2', name: 'Content Calendar', price: 499, category: 'social-media' },
        { id: 'sm3', name: 'Influencer Campaign', price: 999, category: 'social-media' }
    ],
    'seo': [
        { id: 'seo1', name: 'SEO Audit', price: 399, category: 'seo' },
        { id: 'seo2', name: 'Keyword Research', price: 299, category: 'seo' },
        { id: 'seo3', name: 'Backlink Building', price: 799, category: 'seo' }
    ],
    'content': [
        { id: 'ct1', name: 'Blog Writing', price: 99, category: 'content' },
        { id: 'ct2', name: 'Video Production', price: 599, category: 'content' },
        { id: 'ct3', name: 'Email Newsletter', price: 299, category: 'content' }
    ]
};

// Load products on products page
if (document.getElementById('productsContainer')) {
    loadProducts();
}

function loadProducts(category = 'all') {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    let productsToShow = [];
    
    if (category === 'all') {
        Object.values(products).forEach(catProducts => {
            productsToShow.push(...catProducts);
        });
    } else {
        productsToShow = products[category] || [];
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card product-card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted">${product.category.toUpperCase()}</p>
                    <h4 class="text-primary">$${product.price}</h4>
                    <p class="card-text">Professional marketing service to boost your business growth.</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                price: parseFloat(e.target.dataset.price)
            };
            cartManager.addToCart(product);
        });
    });
}

// Load cart items on cart page
if (document.getElementById('cartItems')) {
    loadCartItems();
}

function loadCartItems() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (cartManager.cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p class="text-muted">Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        totalElement.textContent = '0.00';
        return;
    }
    
    container.innerHTML = '';
    cartManager.cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item row align-items-center';
        itemElement.innerHTML = `
            <div class="col-md-5">
                <h6 class="mb-0">${item.name}</h6>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <button class="btn btn-outline-secondary quantity-decrease" data-id="${item.id}">-</button>
                    <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="btn btn-outline-secondary quantity-increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="col-md-2">
                <h6 class="mb-0">$${(item.price * item.quantity).toFixed(2)}</h6>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(itemElement);
    });
    
    totalElement.textContent = cartManager.getTotal().toFixed(2);
    
    // Add event listeners
    document.querySelectorAll('.quantity-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const item = cartManager.cart.find(item => item.id === id);
            if (item) {
                cartManager.updateQuantity(id, item.quantity - 1);
                loadCartItems();
            }
        });
    });
    
    document.querySelectorAll('.quantity-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const item = cartManager.cart.find(item => item.id === id);
            if (item) {
                cartManager.updateQuantity(id, item.quantity + 1);
                loadCartItems();
            }
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const quantity = parseInt(e.target.value);
            if (!isNaN(quantity)) {
                cartManager.updateQuantity(id, quantity);
                loadCartItems();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            cartManager.removeFromCart(id);
            loadCartItems();
        });
    });
}

// Checkout functionality
if (document.getElementById('checkoutForm')) {
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate payment processing
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Order placed successfully! Redirecting to payment...');
            window.location.href = 'payment.html';
        }, 2000);
    });
}

// Payment simulation
if (document.getElementById('paymentForm')) {
    const paymentForm = document.getElementById('paymentForm');
    const planRadios = document.querySelectorAll('input[name="plan"]');
    const planAmounts = {
        'basic': 299,
        'standard': 599,
        'premium': 999
    };
    
    // Update amount when plan changes
    planRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const amount = planAmounts[e.target.value];
            document.getElementById('paymentAmount').textContent = amount.toFixed(2);
            document.getElementById('planName').textContent = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        });
    });
    
    // Simulate Stripe payment
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing Payment...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const plan = document.querySelector('input[name="plan"]:checked').value;
            
            // Show success message
            const successHTML = `
                <div class="text-center py-5">
                    <div class="mb-4">
                        <i class="fas fa-check-circle fa-5x text-success"></i>
                    </div>
                    <h3 class="mb-3">Payment Successful!</h3>
                    <p class="text-muted mb-4">Thank you for purchasing our ${plan} plan.</p>
                    <div class="alert alert-info">
                        <h6>Order Details:</h6>
                        <p class="mb-1">Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
                        <p class="mb-1">Amount: $${planAmounts[plan].toFixed(2)}</p>
                        <p class="mb-0">Transaction ID: PM${Date.now()}</p>
                    </div>
                    <a href="index.html" class="btn btn-primary">Return Home</a>
                </div>
            `;
            
            document.querySelector('.payment-container').innerHTML = successHTML;
            cartManager.clearCart();
        }, 3000);
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});