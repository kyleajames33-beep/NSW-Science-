/* ==========================================
   NSW Science Hub - Interactive Features
   Clean & Simple Animations
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Initialize all interactive features
    initAnswerToggles();
    initSmoothScrolling();
    initMobileMenu();

});

/* ==========================================
   Answer Toggle Functionality
   ========================================== */

function initAnswerToggles() {
    // Find all answer toggle buttons
    const toggleButtons = document.querySelectorAll('.answer-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the answer content associated with this button
            const answerContent = this.nextElementSibling;

            if (answerContent && answerContent.classList.contains('answer-content')) {
                // Toggle the 'show' class
                answerContent.classList.toggle('show');

                // Update button text
                if (answerContent.classList.contains('show')) {
                    this.textContent = 'Hide Answer';
                } else {
                    this.textContent = 'Show Answer';
                }
            }
        });
    });
}

/* ==========================================
   Smooth Scrolling for Anchor Links
   ========================================== */

function initSmoothScrolling() {
    // Select all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href');

            // Don't prevent default if it's just '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/* ==========================================
   Mobile Menu Toggle (for sidebar navigation)
   ========================================== */

function initMobileMenu() {
    // Check if sidebar exists
    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) return;

    // Create mobile menu toggle button (only on mobile)
    if (window.innerWidth <= 768) {
        createMobileMenuButton(sidebar);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        const existingButton = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth <= 768 && !existingButton) {
            createMobileMenuButton(sidebar);
        } else if (window.innerWidth > 768 && existingButton) {
            existingButton.remove();
            sidebar.style.display = 'block';
        }
    });
}

function createMobileMenuButton(sidebar) {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.textContent = '☰ Menu';
    toggleButton.style.cssText = `
        display: block;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    `;

    // Insert button before sidebar
    sidebar.parentNode.insertBefore(toggleButton, sidebar);

    // Initially hide sidebar on mobile
    sidebar.style.display = 'none';

    // Toggle sidebar visibility
    toggleButton.addEventListener('click', function() {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
            this.textContent = '✕ Close Menu';
        } else {
            sidebar.style.display = 'none';
            this.textContent = '☰ Menu';
        }
    });
}

/* ==========================================
   Simple Calculator Framework
   ========================================== */

// Generic calculator function that can be customized per lesson
function createCalculator(config) {
    /*
    Usage example:

    createCalculator({
        containerId: 'speed-calculator',
        inputs: [
            { id: 'distance', label: 'Distance (m)', type: 'number' },
            { id: 'time', label: 'Time (s)', type: 'number' }
        ],
        calculate: function(values) {
            return values.distance / values.time;
        },
        resultLabel: 'Speed (m/s)',
        resultUnit: 'm/s'
    });
    */

    const container = document.getElementById(config.containerId);
    if (!container) return;

    // Create form
    const form = document.createElement('div');
    form.className = 'calculator-form';
    form.style.cssText = `
        background: #f5f7fa;
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid #eceff4;
        margin: 1rem 0;
    `;

    // Create inputs
    config.inputs.forEach(input => {
        const inputGroup = document.createElement('div');
        inputGroup.style.marginBottom = '1rem';

        const label = document.createElement('label');
        label.textContent = input.label;
        label.style.cssText = `
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2d3748;
        `;

        const inputField = document.createElement('input');
        inputField.type = input.type;
        inputField.id = input.id;
        inputField.style.cssText = `
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #eceff4;
            border-radius: 12px;
            font-size: 1rem;
            background: white;
            color: #2d3748;
            transition: all 0.3s ease;
        `;

        inputField.addEventListener('focus', function() {
            this.style.borderColor = '#42a5f5';
        });

        inputField.addEventListener('blur', function() {
            this.style.borderColor = '#eceff4';
        });

        inputGroup.appendChild(label);
        inputGroup.appendChild(inputField);
        form.appendChild(inputGroup);
    });

    // Create calculate button
    const button = document.createElement('button');
    button.textContent = 'Calculate';
    button.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    `;

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });

    // Create result display
    const resultDiv = document.createElement('div');
    resultDiv.className = 'calculator-result';
    resultDiv.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        background: white;
        border: 2px solid #eceff4;
        border-radius: 12px;
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
        display: none;
        color: #2d3748;
    `;

    // Add click event
    button.addEventListener('click', function() {
        const values = {};
        let allFilled = true;

        // Gather input values
        config.inputs.forEach(input => {
            const value = parseFloat(document.getElementById(input.id).value);
            if (isNaN(value)) {
                allFilled = false;
            }
            values[input.id] = value;
        });

        if (!allFilled) {
            alert('Please fill in all fields');
            return;
        }

        // Calculate result
        const result = config.calculate(values);

        // Display result
        resultDiv.textContent = `${config.resultLabel}: ${result.toFixed(2)} ${config.resultUnit}`;
        resultDiv.style.display = 'block';
    });

    form.appendChild(button);
    form.appendChild(resultDiv);
    container.appendChild(form);
}

/* ==========================================
   Highlight Active Section in Sidebar
   ========================================== */

function highlightActiveSection() {
    const sections = document.querySelectorAll('.lesson-content section[id]');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.fontWeight = 'normal';
            link.style.color = '#2d3748';

            if (link.getAttribute('href') === `#${current}`) {
                link.style.fontWeight = 'bold';
                link.style.color = '#42a5f5';
            }
        });
    });
}

// Initialize active section highlighting on lesson pages
if (document.querySelector('.lesson-content')) {
    highlightActiveSection();
}

/* ==========================================
   Print Friendly Function
   ========================================== */

function printLesson() {
    // Reveal all hidden answers before printing
    const hiddenAnswers = document.querySelectorAll('.answer-content');
    hiddenAnswers.forEach(answer => {
        answer.classList.add('show');
    });

    window.print();
}

// Add print button if on lesson page
if (document.querySelector('.lesson-content')) {
    window.addEventListener('load', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const printButton = document.createElement('button');
            printButton.textContent = '🖨️ Print Lesson';
            printButton.className = 'btn btn-secondary';
            printButton.style.cssText = `
                width: 100%;
                margin-top: 1rem;
            `;
            printButton.onclick = printLesson;
            sidebar.appendChild(printButton);
        }
    });
}
