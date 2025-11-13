// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navbar on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Assessment Modal
const assessmentModal = document.getElementById('assessmentModal');
const startAssessmentBtn = document.getElementById('startAssessment');
const modalClose = document.querySelector('.modal-close');
const assessmentQuestions = document.getElementById('assessmentQuestions');
const assessmentResults = document.getElementById('assessmentResults');

const assessmentData = [
    {
        question: "What's your primary goal?",
        options: [
            { text: "Get coached to improve my life", value: "client" },
            { text: "Learn to become a coach", value: "coach" },
            { text: "Build a coaching business", value: "business" },
            { text: "Not sure yet, exploring options", value: "explore" }
        ]
    },
    {
        question: "What's your current experience level?",
        options: [
            { text: "Complete beginner", value: "beginner" },
            { text: "Some coaching experience", value: "intermediate" },
            { text: "Experienced but want certification", value: "advanced" }
        ]
    },
    {
        question: "What's your budget range?",
        options: [
            { text: "Under $50/month", value: "starter" },
            { text: "$50-$100/month", value: "builder" },
            { text: "Over $100/month", value: "master" }
        ]
    },
    {
        question: "How quickly do you want to get certified?",
        options: [
            { text: "As fast as possible (3-4 months)", value: "fast" },
            { text: "Steady pace (5-6 months)", value: "steady" },
            { text: "No rush, learning at my own pace", value: "flexible" }
        ]
    }
];

let currentQuestion = 0;
let assessmentAnswers = [];

if (startAssessmentBtn) {
    startAssessmentBtn.addEventListener('click', () => {
        assessmentModal.classList.add('active');
        currentQuestion = 0;
        assessmentAnswers = [];
        renderQuestion();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        assessmentModal.classList.remove('active');
        resetAssessment();
    });
}

if (assessmentModal) {
    assessmentModal.addEventListener('click', (e) => {
        if (e.target === assessmentModal) {
            assessmentModal.classList.remove('active');
            resetAssessment();
        }
    });
}

function renderQuestion() {
    if (currentQuestion < assessmentData.length) {
        const question = assessmentData[currentQuestion];
        assessmentQuestions.innerHTML = `
            <div class="assessment-question">
                <h3>${question.question}</h3>
                <div class="assessment-options">
                    ${question.options.map((option, index) => `
                        <button class="assessment-option-btn" data-value="${option.value}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
                <div class="assessment-progress">
                    Question ${currentQuestion + 1} of ${assessmentData.length}
                </div>
            </div>
        `;
        
        document.querySelectorAll('.assessment-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                assessmentAnswers.push(e.target.dataset.value);
                currentQuestion++;
                if (currentQuestion < assessmentData.length) {
                    renderQuestion();
                } else {
                    showResults();
                }
            });
        });
    }
}

function showResults() {
    const recommendations = generateRecommendations(assessmentAnswers);
    assessmentQuestions.classList.add('hidden');
    assessmentResults.classList.remove('hidden');
    assessmentResults.innerHTML = `
        <div class="assessment-result">
            <h3>Your Personalized Recommendation</h3>
            <div class="recommended-tier">
                <h4>${recommendations.tier}</h4>
                <p>${recommendations.description}</p>
            </div>
            <div class="recommended-features">
                <h5>Perfect for you because:</h5>
                <ul>
                    ${recommendations.reasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
            </div>
            <a href="#contact" class="btn btn-primary btn-block" onclick="document.getElementById('assessmentModal').classList.remove('active')">
                Start Your Free Trial
            </a>
        </div>
    `;
}

function generateRecommendations(answers) {
    const [goal, experience, budget, pace] = answers;
    
    if (budget === 'starter' || goal === 'explore') {
        return {
            tier: 'Starter Plan - $47/month',
            description: 'Perfect for getting started and exploring coaching.',
            reasons: [
                'Affordable entry point with 7-day free trial',
                '2 coaching sessions per month to experience transformation',
                'Access to learning modules and community',
                'Can upgrade anytime as you progress'
            ]
        };
    } else if (budget === 'builder' || (goal === 'coach' && experience !== 'advanced')) {
        return {
            tier: 'Builder Plan - $97/month',
            description: 'Ideal for serious learners who want to become certified coaches.',
            reasons: [
                'Full certification program included',
                '4 coaching sessions per month',
                'Practice coaching sessions with peers',
                '1-on-1 mentorship support',
                'Earn discounts through referrals and milestones'
            ]
        };
    } else {
        return {
            tier: 'Master Plan - $197/month',
            description: 'For those ready to build a serious coaching practice.',
            reasons: [
                'Unlimited coaching sessions',
                'Advanced certification and business coaching',
                'Client referral system to jumpstart your practice',
                'Revenue share opportunities',
                'Marketing and branding support'
            ]
        };
    }
}

function resetAssessment() {
    currentQuestion = 0;
    assessmentAnswers = [];
    assessmentQuestions.classList.remove('hidden');
    assessmentResults.classList.add('hidden');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.value-card, .pricing-card, .testimonial-card, .community-card, .timeline-item, .multiplier-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Starting Your Journey...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Welcome! Check Your Email ✓';
            submitButton.style.background = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 10px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 600;
            `;
            successMessage.textContent = '🎉 Welcome to CoachForge! Check your email to activate your free trial.';
            contactForm.appendChild(successMessage);
            
            // Reset button after 5 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                successMessage.remove();
            }, 5000);
            
            console.log('Form submitted:', data);
        }, 1500);
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Scroll-to-top button
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
};

createScrollToTop();

// Animate numbers on scroll
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/,/g, ''));
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 30);
                    
                    numberObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => numberObserver.observe(stat));
};

// Initialize number animation
document.addEventListener('DOMContentLoaded', animateNumbers);

// Add hover effects to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Add CSS for assessment modal content
const style = document.createElement('style');
style.textContent = `
    .assessment-question {
        margin-bottom: 2rem;
    }
    
    .assessment-question h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--text-dark);
    }
    
    .assessment-options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .assessment-option-btn {
        padding: 1rem 1.5rem;
        background: var(--light-color);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-dark);
        cursor: pointer;
        transition: all 0.3s;
        text-align: left;
    }
    
    .assessment-option-btn:hover {
        background: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
        transform: translateX(5px);
    }
    
    .assessment-progress {
        text-align: center;
        color: var(--text-light);
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .assessment-result {
        text-align: center;
    }
    
    .assessment-result h3 {
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 2rem;
        color: var(--text-dark);
    }
    
    .recommended-tier {
        background: var(--gradient-1);
        color: var(--white);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
    }
    
    .recommended-tier h4 {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
    }
    
    .recommended-features {
        text-align: left;
        margin-bottom: 2rem;
    }
    
    .recommended-features h5 {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-dark);
    }
    
    .recommended-features ul {
        list-style: none;
        padding: 0;
    }
    
    .recommended-features li {
        padding: 0.75rem 0;
        color: var(--text-light);
        border-bottom: 1px solid var(--border-color);
    }
    
    .recommended-features li:last-child {
        border-bottom: none;
    }
    
    .recommended-features li::before {
        content: '✓ ';
        color: var(--success-color);
        font-weight: 700;
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);

// Savings Calculator
function calculateSavings() {
    const planPrice = parseInt(document.getElementById('calcPlan').value);
    const referrals = parseInt(document.getElementById('calcReferrals').value) || 0;
    const mentorCount = parseInt(document.getElementById('calcMentor').value) || 0;
    const communityDiscount = parseInt(document.getElementById('calcCommunity').value) || 0;
    
    // Calculate savings
    const referralSavings = referrals * 10; // $10 per referral
    const communitySavings = Math.floor(planPrice * (communityDiscount / 100));
    const totalSavings = referralSavings + communitySavings;
    
    // Calculate earnings
    const mentorEarnings = mentorCount * 50; // $50 per mentee
    
    // Calculate new price
    const newPrice = Math.max(0, planPrice - totalSavings);
    
    // Calculate annual savings
    const annualSavings = totalSavings * 12;
    
    // Update display
    document.getElementById('monthlySavings').textContent = `$${totalSavings}`;
    document.getElementById('newPrice').textContent = `$${newPrice}`;
    document.getElementById('annualSavings').textContent = `$${annualSavings}`;
    document.getElementById('earnings').textContent = `+$${mentorEarnings}`;
    
    // Animate the values
    animateValue('monthlySavings', 0, totalSavings, 500);
    animateValue('newPrice', planPrice, newPrice, 500);
    animateValue('annualSavings', 0, annualSavings, 500);
    animateValue('earnings', 0, mentorEarnings, 500);
}

function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();
    const isPrice = elementId === 'newPrice';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        if (isPrice) {
            element.textContent = `$${current}`;
        } else if (elementId === 'earnings') {
            element.textContent = `+$${current}`;
        } else {
            element.textContent = `$${current}`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Initialize calculator
const recalculateBtn = document.getElementById('recalculateBtn');
if (recalculateBtn) {
    recalculateBtn.addEventListener('click', calculateSavings);
    
    // Auto-calculate on input change
    ['calcPlan', 'calcReferrals', 'calcMentor', 'calcCommunity'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', calculateSavings);
            element.addEventListener('input', calculateSavings);
        }
    });
    
    // Initial calculation
    calculateSavings();
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
