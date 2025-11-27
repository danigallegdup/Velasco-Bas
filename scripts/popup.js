function showPopup(event) {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('emailPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('emailPopup').style.display = 'none';
}

function copyEmail() {
    const emailText = document.getElementById('emailText');
    emailText.select();
    document.execCommand('copy');
    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = '✔';
    setTimeout(() => {
        copyButton.textContent = '📋';
    }, 3000);
}

// New: copy buttons next to email addresses
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async (e) => {
        const btn = e.target.closest('.copy-email');
        if (!btn) return;
        const email = btn.getAttribute('data-email');
        if (!email) return;

        // copy to clipboard (modern API with fallback)
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const tmp = document.createElement('textarea');
                tmp.value = email;
                tmp.style.position = 'fixed';
                tmp.style.left = '-9999px';
                document.body.appendChild(tmp);
                tmp.select();
                document.execCommand('copy');
                document.body.removeChild(tmp);
            }

            // brief feedback on the button
            const original = btn.textContent;
            btn.textContent = '✔';
            setTimeout(() => btn.textContent = original, 1500);

            // previously appended to a dashboard list; dashboard removed
            // If you want persistence or a visible history, we can store to localStorage here.
        } catch (err) {
            console.error('Copy failed', err);
        }
    });
    
    // Call button intentionally does nothing now (per user request).
    // Keep a no-op click handler to avoid accidental default behaviors.
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.call-button');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        // no action
    });
});