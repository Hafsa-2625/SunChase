const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');

        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function sendMessage() {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                
                // Simulate API call
                setTimeout(() => {
                    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC0jbl5Fu0bRVmWXlE6DCGV-jfGtC7qg7A`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: message
                                        }
                                    ]
                                }
                            ]
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        const botResponse = data.candidates[0].content.parts[0].text;
                        addMessage(botResponse);
                    })
                    .catch(error => {
                        addMessage('Sorry, I encountered an error. Please try again.');
                        console.error('Error:', error);
                    });
                }, 1000);
            }
        }

        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });