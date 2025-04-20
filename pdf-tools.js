// PDF.js library
const pdfjsLib = window.pdfjsLib || {};
const { PDFDocument } = PDFLib;

class PDFTools {
    constructor() {
        // Initialize PDF.js if available
        if (pdfjsLib.GlobalWorkerOptions) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        
        // Initialize PDF.co API key with the provided key
        this.pdfcoApiKey = 'rakeshbond009@gmail.com_6yfcjddHRaEIrBvKd8sOShh2rDbM3Fuc9LWbVVWqsMP3zHW3Ulxeg28nyvsnhylH';
        localStorage.setItem('pdfcoApiKey', this.pdfcoApiKey);
    }

    // Load API key from localStorage
    loadApiKey() {
        // Always use the hardcoded API key
        this.pdfcoApiKey = 'rakeshbond009@gmail.com_6yfcjddHRaEIrBvKd8sOShh2rDbM3Fuc9LWbVVWqsMP3zHW3Ulxeg28nyvsnhylH';
    }

    // Check if API key is configured - now always returns true since we have the key
    async checkApiKey() {
        return true;
    }

    // Test API key validity
    async testApiKey(apiKey) {
        try {
            const response = await fetch('https://api.cloudconvert.com/v2/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    "tasks": {
                        "test-task": {
                            "operation": "import/url",
                            "url": "https://example.com/test.pdf"
                        }
                    }
                })
            });

            if (response.status === 403) {
                throw new Error('Invalid API key or insufficient permissions');
            }

            return true;
        } catch (error) {
            console.error('API key test failed:', error);
            return false;
        }
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 MB';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Download file
    downloadFile(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Merge PDFs
    async mergePDFs(files) {
        const PDFLib = window.PDFLib;
        const mergedPdf = await PDFLib.PDFDocument.create();
        
        for (const file of files) {
            const fileBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(fileBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save({
            useObjectStreams: true,
            addDefaultPage: false,
        });
        return new Blob([mergedPdfBytes], { type: 'application/pdf' });
    }

    // Split PDF
    async splitPDF(file, ranges) {
        const PDFLib = window.PDFLib;
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(fileBuffer);
        const totalPages = pdf.getPageCount();

        const splitPdfs = [];
        for (const range of ranges) {
            const newPdf = await PDFLib.PDFDocument.create();
            const start = Math.max(1, range.from) - 1;
            const end = Math.min(range.to, totalPages) - 1;
            
            const pages = await newPdf.copyPages(pdf, Array.from(
                { length: end - start + 1 }, 
                (_, i) => start + i
            ));
            pages.forEach(page => newPdf.addPage(page));
            
            const newPdfBytes = await newPdf.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });
            splitPdfs.push(new Blob([newPdfBytes], { type: 'application/pdf' }));
        }
        
        return splitPdfs;
    }

    // Compress PDF
    async compressPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            // Save with maximum compression
            const compressedBytes = await pdfDoc.save();
            
            return new Blob([compressedBytes], { type: 'application/pdf' });
        } catch (error) {
            console.error('Error compressing PDF:', error);
            throw new Error('Failed to compress PDF. Please try again.');
        }
    }

    // Add password to PDF
    async protectPDF(file, options) {
        try {
            const { userPassword } = options;
            
            if (!userPassword) {
                throw new Error('Password is required');
            }
            
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            const protectedBytes = await pdfDoc.save({
                password: userPassword
            });
            
            return new Blob([protectedBytes], { type: 'application/pdf' });
        } catch (error) {
            console.error('Error protecting PDF:', error);
            throw new Error('Failed to protect PDF. Please try again.');
        }
    }
}

// Export the class
window.PDFTools = PDFTools; 