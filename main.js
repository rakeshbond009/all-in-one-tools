// Tool data structure
const toolsData = {
    "image-tools": [
        { name: "Image to PNG Converter", icon: "fa-image", link: "tools/image-to-png.html" },
        { name: "Image to JPG Converter", icon: "fa-image", link: "tools/image-to-jpg.html" },
        { name: "Image Resizer", icon: "fa-expand", link: "tools/image-resizer.html" },
        { name: "Image Compressor", icon: "fa-compress", link: "tools/image-compressor.html" },
        { name: "Image Cropper", icon: "fa-crop", link: "tools/image-cropper.html" }
    ],
    "pdf-tools": [
        { name: "PDF to Image Converter", icon: "fa-file-image", link: "tools/pdf-to-image.html" },
        { name: "PDF Merger", icon: "fa-object-group", link: "tools/pdf-merger.html" },
        { name: "PDF Splitter", icon: "fa-cut", link: "tools/pdf-splitter.html" },
        { name: "PDF Compressor", icon: "fa-compress", link: "tools/pdf-compressor.html" },
        { name: "PDF Password Protector", icon: "fa-lock", link: "tools/pdf-password.html" }
    ],
    "social-media-tools": [
        { name: "Instagram Post Generator", icon: "fa-instagram", link: "tools/instagram-post.html" },
        { name: "Twitter Card Generator", icon: "fa-twitter", link: "tools/twitter-card.html" },
        { name: "Social Media Image Resizer", icon: "fa-crop-alt", link: "tools/social-image-resizer.html" },
        { name: "Hashtag Generator", icon: "fa-hashtag", link: "tools/hashtag-generator.html" },
        { name: "Bio Link Generator", icon: "fa-link", link: "tools/bio-link.html" },
        { name: "Social Media Analytics", icon: "fa-chart-line", link: "tools/social-analytics.html" }
    ],
    "seo-tools": [
        { name: "Meta Tag Generator", icon: "fa-tags", link: "tools/meta-tag-generator.html" },
        { name: "Keyword Density Checker", icon: "fa-chart-bar", link: "tools/keyword-density.html" },
        { name: "Sitemap Generator", icon: "fa-sitemap", link: "tools/sitemap-generator.html" },
        { name: "Robots.txt Generator", icon: "fa-robot", link: "tools/robots-txt-generator.html" },
        { name: "Google Index Checker", icon: "fa-google", link: "tools/google-index.html" }
    ],
    "text-tools": [
        { name: "Word Counter", icon: "fa-calculator", link: "tools/word-counter.html" },
        { name: "Character Counter", icon: "fa-text-width", link: "tools/character-counter.html" },
        { name: "Case Converter", icon: "fa-font", link: "tools/case-converter.html" },
        { name: "Plagiarism Checker", icon: "fa-copy", link: "tools/plagiarism-checker.html" },
        { name: "Grammar Checker", icon: "fa-spell-check", link: "tools/grammar-checker.html" }
    ],
    "developer-tools": [
        { name: "JSON Formatter", icon: "fa-code", link: "tools/json-formatter.html" },
        { name: "HTML to Markdown", icon: "fa-file-code", link: "tools/html-to-markdown.html" },
        { name: "CSS Minifier", icon: "fa-css3", link: "tools/css-minifier.html" },
        { name: "JavaScript Minifier", icon: "fa-js", link: "tools/js-minifier.html" },
        { name: "SQL Formatter", icon: "fa-database", link: "tools/sql-formatter.html" }
    ],
    "calculators": [
        { name: "Unit Converter", icon: "fa-exchange-alt", link: "tools/unit-converter.html" },
        { name: "Percentage Calculator", icon: "fa-percent", link: "tools/percentage-calculator.html" },
        { name: "Age Calculator", icon: "fa-birthday-cake", link: "tools/age-calculator.html" },
        { name: "BMI Calculator", icon: "fa-weight", link: "tools/bmi-calculator.html" },
        { name: "Loan EMI Calculator", icon: "fa-calculator", link: "tools/loan-emi-calculator.html" },
        { name: "Scientific Calculator", icon: "fa-square-root-alt", link: "tools/scientific-calculator.html" }
    ]
};

// Load components
async function loadComponents() {
    try {
        // Get the current path and determine the base path
        const currentPath = window.location.pathname;
        const isCategoryPage = currentPath.includes('/category/');
        const isToolPage = currentPath.includes('/tools/');
        
        // Calculate the correct base path
        let basePath = '';
        if (isCategoryPage) {
            basePath = '../';
        } else if (isToolPage) {
            basePath = '../';
        }
        
        const headerResponse = await fetch(`${basePath}components/header.html`);
        const footerResponse = await fetch(`${basePath}components/footer.html`);
        
        if (!headerResponse.ok || !footerResponse.ok) {
            throw new Error('Failed to load components');
        }
        
        const headerHTML = await headerResponse.text();
        const footerHTML = await footerResponse.text();
        
        const headerContainer = document.getElementById('header-container');
        const footerContainer = document.getElementById('footer-container');
        
        if (headerContainer) headerContainer.innerHTML = headerHTML;
        if (footerContainer) footerContainer.innerHTML = footerHTML;
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Display tools
function displayTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (toolsGrid) {
        let html = '';

        for (const [category, tools] of Object.entries(toolsData)) {
            // Add category header
            html += `
                <div class="col-12 mb-4">
                    <div class="category-header">
                        <h2 class="category-title" id="${category}">
                            <i class="fas ${tools[0].icon} me-2"></i>
                            ${category.replace('-', ' ').toUpperCase()}
                        </h2>
                    </div>
                </div>
            `;

            // Add all tools in the category
            tools.forEach(tool => {
                html += `
                    <div class="col-md-4 col-lg-3 mb-4 tool-item" data-category="${category}">
                        <div class="card h-100 tool-card">
                            <div class="card-body text-center">
                                <div class="tool-icon mb-3">
                                    <i class="fas ${tool.icon} fa-3x"></i>
                                </div>
                                <h5 class="card-title">${tool.name}</h5>
                                <a href="tools/${tool.link.split('/').pop()}" class="btn btn-primary">Use Tool</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        toolsGrid.innerHTML = html;
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const toolItems = document.querySelectorAll('.tool-item');
            
            toolItems.forEach(item => {
                const title = item.querySelector('.card-title').textContent.toLowerCase();
                const category = item.getAttribute('data-category').replace('-', ' ').toUpperCase();
                
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide category headers based on visible tools
            const categoryHeaders = document.querySelectorAll('.category-header');
            categoryHeaders.forEach(header => {
                const category = header.querySelector('.category-title').id;
                const hasVisibleTools = Array.from(toolItems).some(item => 
                    item.getAttribute('data-category') === category && 
                    item.style.display !== 'none'
                );
                header.closest('.col-12').style.display = hasVisibleTools ? '' : 'none';
            });
        });
    }
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #e9ecef;
    }
    
    .category-title {
        margin: 0;
        color: #2c3e50;
    }
    
    .tool-card {
        transition: transform 0.2s, box-shadow 0.2s;
        border: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .tool-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .tool-icon {
        color: var(--bs-primary);
    }
    
    .search-container {
        margin-bottom: 2rem;
    }
    
    .search-container .form-control {
        border-radius: 50px;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    
    .search-container .input-group-text {
        border-radius: 50px;
        background: transparent;
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    displayTools();
    setupSearch();
}); 