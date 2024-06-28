// *.min.js
class FloatingButton {
    constructor(chatUrl, buttonText = 'Chat Now', customStyles = {}) {
        this.chatUrl = chatUrl;
        this.buttonText = buttonText;
        this.customStyles = customStyles;
    }

    init() {
        // Create floating button
        this.button = document.createElement('button');
        this.button.innerText = this.buttonText;
        this.button.className = 'floating-button';
        this.applyCustomStyles(this.button, this.customStyles);

        // Button click event
        this.button.addEventListener('click', () => {
            this.openChat();
        });

        document.body.appendChild(this.button);
    }

    applyCustomStyles(element, styles) {
        for (const [key, value] of Object.entries(styles)) {
            element.style[key] = value;
        }
    }

    openChat() {
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';

        const iframe = document.createElement('iframe');
        iframe.src = this.chatUrl;
        iframe.className = 'chat-iframe';

        iframeContainer.appendChild(iframe);
        document.body.appendChild(iframeContainer);

        iframeContainer.addEventListener('click', () => {
            document.body.removeChild(iframeContainer);
        });
    }
}

// Export as a global variable
window.FloatingButton = FloatingButton;