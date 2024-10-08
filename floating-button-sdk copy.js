class FloatingButton {
    constructor(clientId, udid = undefined, authCode = undefined) {
        this.clientId = clientId;
        this.userId;
    }
    
    init() {
        this.handleAuth('test', 'test')
            .then(res => {
                console.log(res);
                this.userId = res;
                console.log('userId', this.userId);
                this.chatUrl = `https://accio-webclient-git-test-sdk-waddle.vercel.app/${this.clientId}/sdk/${this.userId}`;
            });
        console.log('this userId', this.userId);
        // Create floating button
        this.button = document.createElement('div');
        this.button.className = 'floating-button-common button-image-shrink';
        this.button.type = 'button';
        this.expandedButton = document.createElement('div');
        this.expandedButton.className = 'expanded-button';
        this.expandedText = document.createElement('p');
        this.expandedButton.appendChild(this.expandedText);
        this.expandedText.innerText = '테스트 중인 문장입니다 테스트 중인 문장입니다';
        this.expandedText.className = 'expanded-text';

        // Button click event
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault(); 
            // this.handleAuth('test', 'test')
            //     .then(res => this.userId = res);
            this.openChat(e);
        });

        document.body.appendChild(this.button);
        document.body.appendChild(this.expandedButton);

        setTimeout(() => {
            this.expandedButton.innerText = '';
            this.expandedButton.style.width = '50px';
            this.expandedButton.style.padding = 0;
            this.button.className = 'floating-button-common button-image';
        }, [2000])
    }

    openChat(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('openChat');
        const targetElem = document.getElementsByClassName('floating-button-common')[0];
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container-shrink';
        const chatHeader = document.createElement('div');
        chatHeader.className = 'chat-header';

        const iframe = document.createElement('iframe');
        console.log('chatUrl', this.chatUrl);
        iframe.src = this.chatUrl;
        iframe.className = 'chat-iframe';

        iframeContainer.appendChild(chatHeader);
        iframeContainer.appendChild(iframe);
        targetElem.appendChild(iframeContainer);

        chatHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log(e.target);
            // targetElem.removeChild(iframeContainer); 
            iframeContainer.className = 'iframe-container';
        })

        window.addEventListener('message', (e) => {
            iframeContainer.className = 'iframe-container';
        })
    }

    async handleAuth(udid, authCode) {
        try {
            const response = await fetch(
                'https://hg5eey52l4.execute-api.ap-northeast-2.amazonaws.com/dev/auth', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'G4J2wPnd643wRoQiK52PO9ZAtaD6YNCAhGlfm1Oc',
                        'udid': udid,
                        'authCode': authCode,
                    },
                    body: '',
                }
            );
            const result = await response.json();
            console.log('dlst res, ', result.body.randomId);
            return result.body.randomId
        } catch (error) {
            console.error(`Error while calling auth API: ${error.message}`);
            return null
        }
    }
}

// Export as a global variable
window.FloatingButton = FloatingButton;