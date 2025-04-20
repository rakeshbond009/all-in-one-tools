document.addEventListener('DOMContentLoaded', () => {
    // Elements for "What is X% of Y?"
    const percentage1 = document.getElementById('percentage1');
    const number1 = document.getElementById('number1');
    const result1 = document.getElementById('result1');

    // Elements for "X is what percent of Y?"
    const number2 = document.getElementById('number2');
    const total2 = document.getElementById('total2');
    const result2 = document.getElementById('result2');

    // Elements for Percentage Increase/Decrease
    const originalValue = document.getElementById('originalValue');
    const newValue = document.getElementById('newValue');
    const result3 = document.getElementById('result3');

    // Function to calculate "What is X% of Y?"
    function calculatePercentageOf() {
        const percent = parseFloat(percentage1.value);
        const num = parseFloat(number1.value);
        
        if (!isNaN(percent) && !isNaN(num)) {
            const result = (percent / 100) * num;
            result1.textContent = result.toFixed(2);
        } else {
            result1.textContent = '0';
        }
    }

    // Function to calculate "X is what percent of Y?"
    function calculateWhatPercent() {
        const num = parseFloat(number2.value);
        const total = parseFloat(total2.value);
        
        if (!isNaN(num) && !isNaN(total) && total !== 0) {
            const result = (num / total) * 100;
            result2.textContent = result.toFixed(2) + '%';
        } else {
            result2.textContent = '0%';
        }
    }

    // Function to calculate Percentage Increase/Decrease
    function calculateIncreaseDecrease() {
        const original = parseFloat(originalValue.value);
        const newVal = parseFloat(newValue.value);
        
        if (!isNaN(original) && !isNaN(newVal) && original !== 0) {
            const result = ((newVal - original) / original) * 100;
            result3.textContent = result.toFixed(2) + '%';
            
            // Add color based on increase or decrease
            if (result > 0) {
                result3.classList.add('text-success');
                result3.classList.remove('text-danger');
            } else if (result < 0) {
                result3.classList.add('text-danger');
                result3.classList.remove('text-success');
            } else {
                result3.classList.remove('text-success', 'text-danger');
            }
        } else {
            result3.textContent = '0%';
            result3.classList.remove('text-success', 'text-danger');
        }
    }

    // Event listeners
    percentage1.addEventListener('input', calculatePercentageOf);
    number1.addEventListener('input', calculatePercentageOf);
    
    number2.addEventListener('input', calculateWhatPercent);
    total2.addEventListener('input', calculateWhatPercent);
    
    originalValue.addEventListener('input', calculateIncreaseDecrease);
    newValue.addEventListener('input', calculateIncreaseDecrease);

    // Add some additional styles
    const style = document.createElement('style');
    style.textContent = `
        .calculator-section {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .section-title {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .result-box {
            background-color: white;
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;
        }
        
        .result-box h4 {
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }
        
        .result {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0;
        }
        
        .text-success {
            color: var(--success-color) !important;
        }
        
        .text-danger {
            color: #dc3545 !important;
        }
        
        .input-group-text {
            background-color: #e9ecef;
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
}); 