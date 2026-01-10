window.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/templates/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;    
        });
});

// Add scroll event listener for header shrink effect on mobile
let lastScrollTop = 0;
const header = document.querySelector('.header-nav');

if (header) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only apply shrink effect on mobile devices
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - shrink header
                header.classList.add('header-shrink');
            } else if (scrollTop < lastScrollTop || scrollTop <= 100) {
                // Scrolling up or near top - expand header
                header.classList.remove('header-shrink');
            }
        } else {
            // On desktop, remove shrink class if present
            header.classList.remove('header-shrink');
        }
        
        lastScrollTop = scrollTop;
    });
}