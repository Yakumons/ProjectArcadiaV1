function openFeatureModal(featureType) {
    const modal = document.getElementById(`${featureType}Modal`);
    if (modal) {
        document.body.style.overflow = 'hidden';
        modal.classList.add('active');
        
        // Ensure images are loaded when modal opens
        const images = modal.querySelectorAll('.feature-item img');
        images.forEach(img => {
            if (img.dataset.src && !img.src.includes(img.dataset.src)) {
                img.src = img.dataset.src;
            }
        });
    }
}

function closeFeatureModal(featureType) {
    const modal = document.getElementById(`${featureType}Modal`);
    if (modal) {
        document.body.style.overflow = '';
        modal.classList.remove('active');
    }
}

// Simplify lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('.feature-item img[data-src]');
    images.forEach(img => {
        if (!img.src) {
            img.src = img.dataset.src;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    // Add click handlers for close buttons
    const closeButtons = document.querySelectorAll('.close-feature');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.feature-modal');
            if (modal) {
                const featureType = modal.id.replace('Modal', '');
                closeFeatureModal(featureType);
            }
        });
    });

    // Close on outside click
    const modals = document.querySelectorAll('.feature-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const featureType = modal.id.replace('Modal', '');
                closeFeatureModal(featureType);
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.feature-modal.active');
            if (activeModal) {
                const featureType = activeModal.id.replace('Modal', '');
                closeFeatureModal(featureType);
            }
        }
    });
});
