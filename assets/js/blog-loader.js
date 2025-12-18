// Blog post loader for HMT Network
document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-posts-container');
    
    // Fetch blog posts
    fetch('https://blog.hmt-network.de/data/posts.json')
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
            
            // Create blog post cards
            posts.forEach(post => {
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