// Homepage blog post loader for HMT Network - displays only the two newest posts
document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-posts-container');
    
    // Check if we're on the homepage by looking for the specific container
    if (!blogContainer) {
        return; // Not on homepage, exit
    }
    
    // Fetch blog posts
    fetch('/blog/data/posts.json')
        .then(response => response.json())
        .then(posts => {
            // Clear loading placeholder
            blogContainer.innerHTML = '';
            
            if (posts.length === 0) {
                blogContainer.innerHTML = '<div class="card"><p>Noch keine Blog-Einträge vorhanden.</p></div>';
                return;
            }
            
            // Sort posts by date (newest first)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Take only the two newest posts
            const latestPosts = posts.slice(0, 2);
            
            // Create blog post cards for the two newest posts
            latestPosts.forEach(post => {
                const postDate = new Date(post.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                const postCard = document.createElement('div');
                postCard.className = 'card';
                postCard.innerHTML = `
                    <div class="news-content">
                        <h3 style="font-size: 1.4rem; margin-bottom: 10px; color: var(--text-main);">${post.title}</h3>
                        <div style="margin-bottom: 15px;">
                            <span style="font-size: 0.85rem; color: var(--text-muted);">
                                <i data-lucide="calendar"></i> ${postDate} 
                                <span style="margin: 0 8px;">|</span>
                                <i data-lucide="user"></i> ${post.author}
                            </span>
                        </div>
                        <p class="card-description">${post.excerpt}</p>
                        <a href="/blog/post.html?id=${post.id}" class="btn btn-primary">Weiterlesen</a>
                    </div>
                `;
                
                blogContainer.appendChild(postCard);
            });
            
            // Add a "View All Posts" button if there are more than 2 posts
            if (posts.length > 2) {
                const viewAllContainer = document.createElement('div');
                viewAllContainer.className = 'card';
                viewAllContainer.style.textAlign = 'center';
                viewAllContainer.innerHTML = `
                    <a href="/blog/" class="btn btn-primary" style="display: inline-block;">
                        Alle Blog-Einträge anzeigen (${posts.length} insgesamt)
                    </a>
                `;
                blogContainer.appendChild(viewAllContainer);
            }
            
            // Initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<div class="card"><p>Fehler beim Laden der Blog-Einträge.</p></div>';
        });
});