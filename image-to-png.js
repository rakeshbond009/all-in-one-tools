document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const previewSection = document.getElementById('previewSection');
    const optionsSection = document.getElementById('optionsSection');
    const actionButtons = document.getElementById('actionButtons');
    const originalPreview = document.getElementById('originalPreview');
    const pngPreview = document.getElementById('pngPreview');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const lockAspectRatio = document.getElementById('lockAspectRatio');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');

    let originalImage = null;
    let aspectRatio = 1;
    let isAspectRatioLocked = true;

    // Event Listeners
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    qualitySlider.addEventListener('input', updateQualityValue);
    widthInput.addEventListener('input', handleWidthChange);
    heightInput.addEventListener('input', handleHeightChange);
    lockAspectRatio.addEventListener('click', toggleAspectRatio);
    convertBtn.addEventListener('click', convertToPNG);
    downloadBtn.addEventListener('click', downloadPNG);
    clearBtn.addEventListener('click', clearAll);

    // Functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    }

    function processImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                aspectRatio = originalImage.width / originalImage.height;
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                
                originalPreview.src = e.target.result;
                previewSection.classList.remove('d-none');
                optionsSection.classList.remove('d-none');
                actionButtons.classList.remove('d-none');
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updateQualityValue() {
        qualityValue.textContent = `${qualitySlider.value}%`;
    }

    function handleWidthChange() {
        if (isAspectRatioLocked && widthInput.value) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        }
    }

    function handleHeightChange() {
        if (isAspectRatioLocked && heightInput.value) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
    }

    function toggleAspectRatio() {
        isAspectRatioLocked = !isAspectRatioLocked;
        lockAspectRatio.innerHTML = isAspectRatioLocked ? 
            '<i class="fas fa-lock"></i>' : 
            '<i class="fas fa-lock-open"></i>';
    }

    function convertToPNG() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = widthInput.value || originalImage.width;
        const height = heightInput.value || originalImage.height;
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(originalImage, 0, 0, width, height);
        
        const quality = qualitySlider.value / 100;
        pngPreview.src = canvas.toDataURL('image/png', quality);
    }

    function downloadPNG() {
        const link = document.createElement('a');
        link.download = 'converted-image.png';
        link.href = pngPreview.src;
        link.click();
    }

    function clearAll() {
        fileInput.value = '';
        originalPreview.src = '';
        pngPreview.src = '';
        widthInput.value = '';
        heightInput.value = '';
        qualitySlider.value = 100;
        qualityValue.textContent = '100%';
        previewSection.classList.add('d-none');
        optionsSection.classList.add('d-none');
        actionButtons.classList.add('d-none');
        originalImage = null;
    }

    // Add some additional styles
    const style = document.createElement('style');
    style.textContent = `
        .upload-area {
            border: 2px dashed #dee2e6;
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .upload-area:hover, .upload-area.dragover {
            border-color: var(--primary-color);
            background-color: rgba(0, 123, 255, 0.05);
        }
        
        .upload-content {
            color: var(--secondary-color);
        }
        
        .image-preview {
            border: 1px solid #dee2e6;
            border-radius: 0.25rem;
            padding: 0.5rem;
            margin-bottom: 1rem;
            background-color: #f8f9fa;
        }
        
        .image-preview img {
            max-width: 100%;
            max-height: 300px;
            object-fit: contain;
        }
        
        .form-range::-webkit-slider-thumb {
            background: var(--primary-color);
        }
        
        .form-range::-moz-range-thumb {
            background: var(--primary-color);
        }
        
        #lockAspectRatio {
            width: 40px;
        }
    `;
    document.head.appendChild(style);
}); 