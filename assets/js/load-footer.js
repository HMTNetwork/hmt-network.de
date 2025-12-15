window.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/templates/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
    
    // Füge das Server-Status-Popup hinzu
    const popup = document.createElement('div');
    popup.className = 'server-status-popup';
    popup.innerHTML = `
        <div class="status-indicator">
            <div class="status-dot"></div>
            <div class="status-text">SERVER OFFLINE</div>
        </div>
        <div class="message">
            Unser Server ist aktuell noch offline und befindet sich im Aufbau. Schau gerne später wieder vorbei!
        </div>
    `;
    document.body.appendChild(popup);
});