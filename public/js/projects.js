document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll('.project-card');

    /* ===============================
       Intersection Observer
    =============================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, {
        threshold: 0.4,
        rootMargin: "0px 0px -50px 0px"
    });

    cards.forEach(card => observer.observe(card));


    /* ===============================
       Create Modal + Backdrop ONCE
    =============================== */
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'description-overlay';

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);


    /* ===============================
       Open Modal
    =============================== */
    function openModal(file) {

        modal.innerHTML = `
            <button class="close-btn">&times;</button>

            <div class="document-container">
                <div class="document-header">
                    <span class="doc-title">Project Documentation</span>
                </div>

                <div class="document-body">
                    <div class="loader"></div>
                    <iframe 
                        src="${file}#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                            class="pdf-frame">
                    </iframe>
                </div>
            </div>
        `;

        const iframe = modal.querySelector('.pdf-frame');
        const loader = modal.querySelector('.loader');

        iframe.addEventListener('load', () => {
            loader.style.opacity = "0";
            iframe.classList.add('show');
        });

        backdrop.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = "hidden";

        modal.querySelector('.close-btn')
            .addEventListener('click', closeModal);
    }


    /* ===============================
       Close Modal
    =============================== */
    function closeModal() {
        backdrop.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = "";
    }

    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeModal();
    });


    /* ===============================
       Attach Click To Cards
    =============================== */
    cards.forEach(card => {
        const img = card.querySelector('img');
        img.addEventListener('click', () => {
            openModal(card.dataset.file);
        });
    });

});