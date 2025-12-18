// Blog post detail loader for HMT Network
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const postContainer = document.getElementById('blog-post-container');
    
    if (!postId) {
        postContainer.innerHTML = '<div class="card"><h2>Fehler</h2><p>Keine Blog-ID angegeben.</p></div>';
        return;
    }
    
    // Fetch blog posts
    fetch('https://blog.hmt-network.de/data/posts.json')
        .then(response => response.json())
        .then(posts => {
            const post = posts.find(p => p.id === postId);
            
            if (!post) {
                postContainer.innerHTML = '<div class="card"><h2>Fehler</h2><p>Blog-Eintrag nicht gefunden.</p></div>';
                return;
            }
            
            // Load Markdown content
            return fetch(`https://blog.hmt-network.de/data/posts/${post.contentFile}`)
                .then(response => response.text())
                .then(markdownContent => {
                    // Update meta tags
                    document.title = `${post.title} - HMT Network Blog`;
                    document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
                    document.querySelector('meta[property="og:title"]').setAttribute('content', post.title);
                    document.querySelector('meta[property="og:description"]').setAttribute('content', post.excerpt);
                    document.querySelector('meta[property="og:url"]').setAttribute('content', `https://hmt-network.de/blog/post.html?id=${postId}`);
                    document.querySelector('meta[name="twitter:title"]').setAttribute('content', post.title);
                    document.querySelector('meta[name="twitter:description"]').setAttribute('content', post.excerpt);
                    
                    // Format date
                    const postDate = new Date(post.date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    // Create post content
                    postContainer.innerHTML = `
                        <article class="card">
                            <h1 style="margin-bottom: 10px;">${post.title}</h1>
                            <div style="margin-bottom: 30px;">
                                <span style="font-size: 0.9rem; color: var(--text-muted);">
                                    <i data-lucide="calendar"></i> ${postDate} 
                                    <span style="margin: 0 10px;">|</span>
                                    <i data-lucide="user"></i> ${post.author}
                                </span>
                            </div>
                            
                            <div class="blog-post-content" style="line-height: 1.8;">
                                ${formatPostContent(markdownContent)}
                            </div>
                            
                            ${post.tags && post.tags.length > 0 ? `
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                                <strong>Tags:</strong> 
                                ${post.tags.map(tag => `<span class="tag" style="display: inline-block; background: var(--accent-primary); color: var(--bg-color); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; margin-right: 8px; margin-bottom: 8px;">${tag}</span>`).join('')}
                            </div>
                            ` : ''}
                        </article>
                    `;
                    
                    // Initialize Lucide icons
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                });
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            postContainer.innerHTML = '<div class="card"><h2>Fehler</h2><p>Fehler beim Laden des Blog-Eintrags.</p></div>';
        });
});
// Format Markdown content using Marked.js
function formatPostContent(content) {
    // Configure Marked.js options
    marked.setOptions({
        breaks: true, // Convert \n to <br>
        gfm: true, // Enable GitHub Flavored Markdown
        smartypants: true, // Prettier quotes and dashes
        highlight: function(code, lang) {
            // Simple code highlighting (optional)
            return code;
        }
    });
    
    // Render Markdown to HTML
    return marked.parse(content);
}
