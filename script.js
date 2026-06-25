// Promotional Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderDots = document.querySelector('.slider-dots');

// Create slider dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = sliderDots.querySelectorAll('span');

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        dots[index].classList.remove('active');
    });
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Auto slide
setInterval(() => {
    changeSlide(1);
}, 5000);

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter.parentElement);
});

// Results Slider
let currentResultSlide = 0;
const resultSlides = document.querySelectorAll('.result-slide');

function updateResultSlider() {
    resultSlides.forEach((slide, index) => {
        slide.classList.remove('active');
    });
    resultSlides[currentResultSlide].classList.add('active');
}

function changeResultSlide(direction) {
    currentResultSlide = (currentResultSlide + direction + resultSlides.length) % resultSlides.length;
    updateResultSlider();
}

// Auto slide for results
setInterval(() => {
    changeResultSlide(1);
}, 4000);

// Testimonial Slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

function updateTestimonialSlider() {
    testimonialSlides.forEach((slide, index) => {
        slide.classList.remove('active');
    });
    testimonialSlides[currentTestimonial].classList.add('active');
}

function changeTestimonial(direction) {
    currentTestimonial = (currentTestimonial + direction + testimonialSlides.length) % testimonialSlides.length;
    updateTestimonialSlider();
}

// Auto slide for testimonials
setInterval(() => {
    changeTestimonial(1);
}, 6000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form Validation
const enquiryForm = document.getElementById('enquiryForm');

enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (name.length < 3) {
        alert('Please enter a valid name');
        return;
    }
    
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (course === '') {
        alert('Please select a course');
        return;
    }
    
    // Form is valid
    const formData = {
        name,
        mobile,
        email,
        course,
        message,
        timestamp: new Date().toISOString()
    };
    
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! Our team will contact you shortly.');
    enquiryForm.reset();
});

// Chatbot Toggle
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    chatbotToggle.querySelector('.chatbot-badge').style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message
    setTimeout(() => {
        removeTypingIndicator();
        const response = processMessage(message);
        addMessage(response, 'bot');
        
        // Check if lead capture is needed
        if (response.includes('Our Admission Team can help you further')) {
            showLeadCaptureForm();
        }
    }, 1000);
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function sendQuickReply(text) {
    chatbotInput.value = text;
    sendMessage();
}

// Load chatbot data
let chatbotData = {};

fetch('chatbot-data.json')
    .then(response => response.json())
    .then(data => {
        chatbotData = data;
    })
    .catch(error => {
        console.error('Error loading chatbot data:', error);
        // Use default data if file not found
        chatbotData = {
            admission: {
                process: "Our admission process is simple: 1) Fill the enquiry form, 2) Attend counselling session, 3) Complete registration, 4) Join classes.",
                registration: "Registration can be done online or offline. Visit our center or call us for registration details.",
                documents: "Required documents: Aadhar card, passport size photos, educational certificates, and address proof."
            },
            fees: {
                structure: "Our fee structure varies by course. Please contact our admissions team for detailed fee information.",
                payment: "We accept all payment modes including cash, card, UPI, and EMI options are available.",
                scholarship: "We offer scholarships based on merit and scholarship test performance. Up to 100% scholarship available."
            },
            courses: {
                upsc: "UPSC course includes complete preparation for Prelims, Mains, and Interview. Duration: 12-18 months.",
                ssc: "SSC course covers CGL, CHSL, MTS, and other exams. Duration: 6-12 months.",
                banking: "Banking course prepares for IBPS, SBI, and other bank exams. Duration: 4-8 months.",
                railway: "Railway course covers RRB NTPC, Group D, JE exams. Duration: 4-6 months.",
                defence: "Defence course includes NDA, CDS, AFCAT preparation. Duration: 6-12 months.",
                state_pcs: "State PCS course is tailored for specific state exams. Duration: 8-14 months."
            },
            demo: {
                booking: "You can book a free demo class by filling the contact form or calling our admissions team.",
                timing: "Demo classes are available Monday to Saturday between 10 AM to 6 PM.",
                online: "Yes, we offer online demo classes as well. Contact us for the link."
            },
            facilities: {
                hostel: "We provide hostel facility assistance for outstation students. Contact us for details.",
                library: "Our library is open from 8 AM to 8 PM on all working days.",
                online: "All our courses are available online with live classes and recorded lectures."
            },
            contact: {
                phone: "You can reach us at +91-XXXXXXXXXX",
                email: "Email us at info@yourinstitute.com",
                address: "Visit us at Your Institute Address, City, State",
                timing: "We are open Monday-Saturday: 9 AM - 8 PM, Sunday: 10 AM - 5 PM"
            }
        };
    });

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check admission queries
    if (lowerMessage.includes('admission') || lowerMessage.includes('register') || lowerMessage.includes('enroll')) {
        if (lowerMessage.includes('process') || lowerMessage.includes('how')) {
            return chatbotData.admission?.process || "Our admission process is simple: 1) Fill the enquiry form, 2) Attend counselling session, 3) Complete registration, 4) Join classes.";
        }
        if (lowerMessage.includes('document') || lowerMessage.includes('required')) {
            return chatbotData.admission?.documents || "Required documents: Aadhar card, passport size photos, educational certificates, and address proof.";
        }
        return chatbotData.admission?.registration || "Registration can be done online or offline. Visit our center or call us for registration details.";
    }
    
    // Check fee queries
    if (lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment')) {
        if (lowerMessage.includes('scholarship')) {
            return chatbotData.fees?.scholarship || "We offer scholarships based on merit and scholarship test performance. Up to 100% scholarship available.";
        }
        if (lowerMessage.includes('emi') || lowerMessage.includes('installment')) {
            return chatbotData.fees?.payment || "We accept all payment modes including cash, card, UPI, and EMI options are available.";
        }
        return chatbotData.fees?.structure || "Our fee structure varies by course. Please contact our admissions team for detailed fee information.";
    }
    
    // Check course queries
    if (lowerMessage.includes('course') || lowerMessage.includes('upsc') || lowerMessage.includes('ssc') || lowerMessage.includes('bank') || lowerMessage.includes('railway') || lowerMessage.includes('defence') || lowerMessage.includes('pcs')) {
        if (lowerMessage.includes('upsc')) {
            return chatbotData.courses?.upsc || "UPSC course includes complete preparation for Prelims, Mains, and Interview. Duration: 12-18 months.";
        }
        if (lowerMessage.includes('ssc')) {
            return chatbotData.courses?.ssc || "SSC course covers CGL, CHSL, MTS, and other exams. Duration: 6-12 months.";
        }
        if (lowerMessage.includes('bank')) {
            return chatbotData.courses?.banking || "Banking course prepares for IBPS, SBI, and other bank exams. Duration: 4-8 months.";
        }
        if (lowerMessage.includes('railway')) {
            return chatbotData.courses?.railway || "Railway course covers RRB NTPC, Group D, JE exams. Duration: 4-6 months.";
        }
        if (lowerMessage.includes('defence') || lowerMessage.includes('nda') || lowerMessage.includes('cds')) {
            return chatbotData.courses?.defence || "Defence course includes NDA, CDS, AFCAT preparation. Duration: 6-12 months.";
        }
        if (lowerMessage.includes('state') || lowerMessage.includes('pcs')) {
            return chatbotData.courses?.state_pcs || "State PCS course is tailored for specific state exams. Duration: 8-14 months.";
        }
        return "We offer courses for UPSC, SSC, Banking, Railway, Defence, State PCS, CUET, NDA, and CDS. Which course are you interested in?";
    }
    
    // Check demo queries
    if (lowerMessage.includes('demo') || lowerMessage.includes('trial') || lowerMessage.includes('free class')) {
        if (lowerMessage.includes('book') || lowerMessage.includes('register')) {
            return chatbotData.demo?.booking || "You can book a free demo class by filling the contact form or calling our admissions team.";
        }
        if (lowerMessage.includes('time') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
            return chatbotData.demo?.timing || "Demo classes are available Monday to Saturday between 10 AM to 6 PM.";
        }
        if (lowerMessage.includes('online')) {
            return chatbotData.demo?.online || "Yes, we offer online demo classes as well. Contact us for the link.";
        }
        return chatbotData.demo?.booking || "You can book a free demo class by filling the contact form or calling our admissions team.";
    }
    
    // Check facility queries
    if (lowerMessage.includes('hostel') || lowerMessage.includes('accommodation')) {
        return chatbotData.facilities?.hostel || "We provide hostel facility assistance for outstation students. Contact us for details.";
    }
    if (lowerMessage.includes('library')) {
        return chatbotData.facilities?.library || "Our library is open from 8 AM to 8 PM on all working days.";
    }
    if (lowerMessage.includes('online') || lowerMessage.includes('recorded') || lowerMessage.includes('app')) {
        return chatbotData.facilities?.online || "All our courses are available online with live classes and recorded lectures.";
    }
    
    // Check contact queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone') || lowerMessage.includes('mobile')) {
        return chatbotData.contact?.phone || "You can reach us at +91-XXXXXXXXXX";
    }
    if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
        return chatbotData.contact?.email || "Email us at info@yourinstitute.com";
    }
    if (lowerMessage.includes('address') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
        return chatbotData.contact?.address || "Visit us at Your Institute Address, City, State";
    }
    if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('open')) {
        return chatbotData.contact?.timing || "We are open Monday-Saturday: 9 AM - 8 PM, Sunday: 10 AM - 5 PM";
    }
    
    // Check scholarship queries
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('discount') || lowerMessage.includes('free')) {
        return chatbotData.fees?.scholarship || "We offer scholarships based on merit and scholarship test performance. Up to 100% scholarship available. Register for our scholarship test!";
    }
    
    // Check batch queries
    if (lowerMessage.includes('batch') || lowerMessage.includes('start') || lowerMessage.includes('timing')) {
        return "New batches start every month. Contact our admissions team for the current batch schedule and timings.";
    }
    
    // Check study material queries
    if (lowerMessage.includes('material') || lowerMessage.includes('book') || lowerMessage.includes('notes')) {
        return "We provide comprehensive study material including books, notes, practice papers, and current affairs. Material is included in the course fee.";
    }
    
    // Check test series queries
    if (lowerMessage.includes('test') || lowerMessage.includes('mock') || lowerMessage.includes('practice')) {
        return "We provide regular test series with detailed performance analysis. Test series is included in our comprehensive courses.";
    }
    
    // Default response - lead capture
    return "Our Admission Team can help you further. Please provide your details so we can assist you better.";
}

function showLeadCaptureForm() {
    const leadForm = document.createElement('div');
    leadForm.className = 'lead-capture-form';
    leadForm.innerHTML = `
        <div class="lead-form-content">
            <h4>Please share your details</h4>
            <input type="text" id="leadName" placeholder="Your Name">
            <input type="tel" id="leadMobile" placeholder="Mobile Number">
            <input type="text" id="leadCourse" placeholder="Interested Course">
            <button onclick="submitLead()">Submit</button>
        </div>
    `;
    chatbotMessages.appendChild(leadForm);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function submitLead() {
    const name = document.getElementById('leadName').value.trim();
    const mobile = document.getElementById('leadMobile').value.trim();
    const course = document.getElementById('leadCourse').value.trim();
    
    if (name && mobile) {
        const leadData = {
            name,
            mobile,
            course,
            timestamp: new Date().toISOString()
        };
        
        console.log('Lead captured:', leadData);
        
        // Remove the form
        const leadForm = document.querySelector('.lead-capture-form');
        if (leadForm) {
            leadForm.remove();
        }
        
        addMessage('Thank you! Our admissions team will contact you shortly.', 'bot');
    } else {
        alert('Please enter your name and mobile number');
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .course-card, .faculty-card, .facility-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animations
document.querySelectorAll('.feature-card, .course-card, .faculty-card, .facility-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

console.log('Website loaded successfully!');
