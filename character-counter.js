document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount');
    const wordCount = document.getElementById('wordCount');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Function to count characters (including spaces)
    function countCharacters(text) {
        return text.length;
    }

    // Function to count characters (excluding spaces)
    function countCharactersNoSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    // Function to count words
    function countWords(text) {
        return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    }

    // Function to update all counters
    function updateCounters() {
        const text = textInput.value;
        charCount.textContent = countCharacters(text);
        charNoSpaceCount.textContent = countCharactersNoSpaces(text);
        wordCount.textContent = countWords(text);
    }

    // Event listeners
    textInput.addEventListener('input', updateCounters);

    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateCounters();
    });

    copyBtn.addEventListener('click', () => {
        textInput.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('btn-success');
        copyBtn.classList.remove('btn-primary');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('btn-success');
            copyBtn.classList.add('btn-primary');
        }, 2000);
    });

    // Add some additional styles for the counter boxes
    const style = document.createElement('style');
    style.textContent = `
        .counter-box {
            padding: 1rem;
            border-radius: 0.5rem;
            background-color: #f8f9fa;
            transition: transform 0.3s ease;
        }
        
        .counter-box:hover {
            transform: translateY(-5px);
        }
        
        .counter-box h3 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .counter-box p {
            color: var(--secondary-color);
            margin-bottom: 0;
        }
    `;
    document.head.appendChild(style);
}); 