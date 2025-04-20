document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const metaTagForm = document.getElementById('metaTagForm');
    const resultsSection = document.getElementById('resultsSection');
    const generatedCode = document.getElementById('generatedCode');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Form submission handler
    metaTagForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateMetaTags();
    });

    // Clear form handler
    clearBtn.addEventListener('click', function() {
        metaTagForm.reset();
        resultsSection.classList.add('d-none');
    });

    // Copy to clipboard handler
    copyBtn.addEventListener('click', function() {
        const code = generatedCode.textContent;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    // Generate meta tags
    function generateMetaTags() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const keywords = document.getElementById('keywords').value.trim();
        const author = document.getElementById('author').value.trim();
        const robots = document.getElementById('robots').value;
        const viewport = document.getElementById('viewport').value;
        const charset = document.getElementById('charset').value;
        const language = document.getElementById('language').value;

        let metaTags = '';

        // Add charset meta tag
        metaTags += `<meta charset="${charset}">\n`;

        // Add viewport meta tag
        metaTags += `<meta name="viewport" content="${viewport}">\n`;

        // Add title
        if (title) {
            metaTags += `<title>${title}</title>\n`;
        }

        // Add description
        if (description) {
            metaTags += `<meta name="description" content="${description}">\n`;
        }

        // Add keywords
        if (keywords) {
            metaTags += `<meta name="keywords" content="${keywords}">\n`;
        }

        // Add author
        if (author) {
            metaTags += `<meta name="author" content="${author}">\n`;
        }

        // Add robots
        metaTags += `<meta name="robots" content="${robots}">\n`;

        // Add language
        metaTags += `<meta http-equiv="Content-Language" content="${language}">\n`;

        // Display generated code
        generatedCode.textContent = metaTags;
        resultsSection.classList.remove('d-none');
    }

    // Add character count functionality
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    titleInput.addEventListener('input', function() {
        const count = this.value.length;
        const feedback = this.nextElementSibling;
        feedback.textContent = `Recommended: 50-60 characters (${count}/60)`;
        if (count > 60) {
            feedback.classList.add('text-danger');
        } else {
            feedback.classList.remove('text-danger');
        }
    });

    descriptionInput.addEventListener('input', function() {
        const count = this.value.length;
        const feedback = this.nextElementSibling;
        feedback.textContent = `Recommended: 150-160 characters (${count}/160)`;
        if (count > 160) {
            feedback.classList.add('text-danger');
        } else {
            feedback.classList.remove('text-danger');
        }
    });

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .code-container {
            position: relative;
            margin-bottom: 1rem;
        }
        
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0;
        }
        
        .form-text {
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .text-danger {
            color: #dc3545 !important;
        }
    `;
    document.head.appendChild(style);
}); 