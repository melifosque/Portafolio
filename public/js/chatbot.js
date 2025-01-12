document.addEventListener("DOMContentLoaded", () => {
    // Funcionalidad del chatbot
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbot = document.getElementById("chatbot");
    const closeChatbotButton = document.getElementById("close-chatbot");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // Mostrar/ocultar el chatbot
    chatbotButton.addEventListener("click", () => {
        if (chatbot.classList.contains("open")) {
            chatbot.classList.remove("open");
        } else {
            chatbot.classList.add("open");
        }
    });

    // Cerrar el chatbot
    closeChatbotButton?.addEventListener("click", () => {
        chatbot.classList.add("hidden");
    });

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage("Yo", message);
            userInput.value = "";
            showDefaultOptions();
        }
    };

    let isUserScrolling = false;

    const addMessage = (sender, message) => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
    
        const messageElement = document.createElement("div");
        messageElement.textContent = `${sender}: ${message}`;
        messageElement.classList.add("chatbot-message");
    
        // Añadir mensaje al contenedor
        messageContainer.appendChild(messageElement);
        chatbotMessages.appendChild(messageContainer);

        if (!isUserScrolling) {
            scrollToLastMessage();
        }
    };
    

    function scrollToLastMessage() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotMessages.addEventListener("scroll", () => {
        const atBottom = chatbotMessages.scrollHeight - chatbotMessages.scrollTop === chatbotMessages.clientHeight;

        if (!atBottom) {
            isUserScrolling = true;
        } else {
            isUserScrolling = false;
        }
    });

    function showDefaultOptions() {
        const options = ['Contacto', 'LinkedIn', 'GitHub'];
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chatbot-message', 'bot-message');
        messageContainer.textContent = "Hola soy Melina! ¿Cómo puedo ayudarte?";
        chatbotMessages.appendChild(messageContainer);

        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.classList.add('option-btn');
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => handleOption(option));
            chatbotMessages.appendChild(optionButton);
        });
    }

    // Función para manejar las opciones seleccionadas
    function handleOption(option) {
        const botMessages = chatbotMessages.querySelectorAll('.bot-message, .option-btn');
        botMessages.forEach(message => message.remove());

        const userMessage = document.createElement('div');
        userMessage.classList.add('chatbot-message', 'user-message');
        userMessage.textContent = option;
        chatbotMessages.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('chatbot-message', 'bot-message');

        if (option === 'Contacto') {
            botMessage.textContent = 'Puedes contactarnos al correo: Melifosque@gmail.com';
        } else if (option === 'LinkedIn') {
            botMessage.textContent = 'Visita mi perfil en LinkedIn: https://www.linkedin.com/in/Melina-Fosque';
        } else if (option === 'GitHub') {
            botMessage.textContent = 'Puedes ver mis proyectos en GitHub: https://github.com/melifosque';
        }

        chatbotMessages.appendChild(botMessage);

        if (!isUserScrolling) {
            scrollToLastMessage();
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
