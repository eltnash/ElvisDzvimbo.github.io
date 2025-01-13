document.addEventListener('DOMContentLoaded', function() {
    // Get all special links
    const specialLinks = document.querySelectorAll('a.special');
    
    specialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle active class on the link
            this.classList.toggle('active');
            
            // Find the associated expandable content
            const content = this.nextElementSibling;
            if (content && content.classList.contains('expandable-content')) {
                content.classList.toggle('expanded');
            }
        });
    });
}); 