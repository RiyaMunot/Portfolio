document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('portfolioContent');
    const draggables = document.querySelectorAll('.draggable');
    const colorOptions = document.querySelectorAll('.color-option');
    const templateOptions = document.querySelectorAll('.template-option');
    const saveBtn = document.getElementById('saveBtn');
    const previewBtn = document.getElementById('previewBtn');

    // Initialize drag and drop
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);

    // Make content blocks sortable
    new Sortable(dropZone, {
        animation: 150,
        handle: '.handle',
        ghostClass: 'bg-light'
    });

    // Color scheme selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            document.documentElement.style.setProperty('--primary-color', option.dataset.color);
        });
    });

    // Template selection
    templateOptions.forEach(option => {
        option.addEventListener('click', () => applyTemplate(option.dataset.template));
    });

    // Save functionality
    saveBtn.addEventListener('click', savePortfolio);

    // Preview functionality
    previewBtn.addEventListener('click', previewPortfolio);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
    }

    function dragOver(e) {
        e.preventDefault();
        this.classList.add('dragover');
    }

    function drop(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const type = e.dataTransfer.getData('text');
        const content = createContentBlock(type);
        this.appendChild(content);
    }

    function createContentBlock(type) {
        const block = document.createElement('div');
        block.className = 'content-block';
        block.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="handle"><i class="fas fa-grip-vertical"></i></span>
                <button class="btn btn-sm btn-outline-danger delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        switch (type) {
            case 'header':
                block.innerHTML += '<h2 contenteditable="true">Your Name</h2>';
                break;
            case 'text':
                block.innerHTML += '<p contenteditable="true">Enter your text here...</p>';
                break;
            case 'image':
                block.innerHTML += '<img src="/placeholder.svg?height=200&width=300" alt="Placeholder" class="img-fluid mb-2"><br><button class="btn btn-sm btn-outline-primary">Upload Image</button>';
                break;
            case 'skills':
                block.innerHTML += `
                    <h3>Skills</h3>
                    <ul contenteditable="true">
                        <li>Skill 1</li>
                        <li>Skill 2</li>
                        <li>Skill 3</li>
                    </ul>
                `;
                break;
            case 'projects':
                block.innerHTML += `
                    <h3>Projects</h3>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <img src="/placeholder.svg?height=150&width=250" class="card-img-top" alt="Project 1">
                                <div class="card-body">
                                    <h5 class="card-title" contenteditable="true">Project 1</h5>
                                    <p class="card-text" contenteditable="true">Description of Project 1</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <img src="/placeholder.svg?height=150&width=250" class="card-img-top" alt="Project 2">
                                <div class="card-body">
                                    <h5 class="card-title" contenteditable="true">Project 2</h5>
                                    <p class="card-text" contenteditable="true">Description of Project 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        block.querySelector('.delete-btn').addEventListener('click', () => block.remove());
        return block;
    }

    function applyTemplate(template) {
        dropZone.innerHTML = '';
        switch (template) {
            case 'minimal':
                dropZone.appendChild(createContentBlock('header'));
                dropZone.appendChild(createContentBlock('text'));
                dropZone.appendChild(createContentBlock('skills'));
                break;
            case 'creative':
                dropZone.appendChild(createContentBlock('header'));
                dropZone.appendChild(createContentBlock('image'));
                dropZone.appendChild(createContentBlock('text'));
                dropZone.appendChild(createContentBlock('projects'));
                break;
            case 'professional':
                dropZone.appendChild(createContentBlock('header'));
                dropZone.appendChild(createContentBlock('text'));
                dropZone.appendChild(createContentBlock('skills'));
                dropZone.appendChild(createContentBlock('projects'));
                break;
        }
    }

    function savePortfolio() {
        const content = dropZone.innerHTML;
        localStorage.setItem('portfolioContent', content);
        alert('Portfolio saved successfully!');
    }

    function previewPortfolio() {
        const content = dropZone.innerHTML;
        const win = window.open('', '_blank');
        win.document.open();
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Portfolio Preview</title>
                <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                        background-color: #f8f9fa;
                        color: #333;
                        padding: 20px;
                    }
                    .content-block {
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: #ffffff;
                        border: 1px solid #dee2e6;
                        border-radius: 5px;
                    }
                    .content-block .handle {
                        cursor: move;
                        padding: 5px;
                        background-color: #f1f3f5;
                        border-radius: 3px;
                        margin-right: 10px;
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `);
        win.document.close();
    }
});