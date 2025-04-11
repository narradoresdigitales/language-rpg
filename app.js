document.addEventListener("DOMContentLoaded", function () {
    const gameText = document.getElementById("game-text");
    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit-command");
    const instructions = document.getElementById("instructions");
    const imageContainer = document.getElementById("image-container");
    const directionImage = document.getElementById("direction-image");

    let currentLanguage = "";
    let gameStarted = false;

    const images = {
        forward: "path/to/forward-image.jpg", // Replace with your image path
        left: "path/to/left-image.jpg",      // Replace with your image path
        right: "path/to/right-image.jpg",    // Replace with your image path
        back: "path/to/back-image.jpg"       // Replace with your image path
    };

    const messages = {
        English: {
            instructions: "Use ⬆️ (Up) to move forward, ⬅️ (Left) to look left, ➡️ (Right) to look right, and Spacebar to move back. Type when interacting.",
            welcome: "Welcome to the Language RPG! Type 'Spanish' or 'Russian' to start.",
            select: "You selected: ",
            moveForward: "You move forward in your quest.",
            moveBack: "You step back cautiously.",
            lookLeft: "You look to the left and see nothing unusual.",
            lookRight: "You look to the right and see nothing unusual.",
            typeToInteract: "An NPC appears! Type your response in the selected language.",
            invalid: "Invalid input. Please type 'Spanish' or 'Russian'."
        },
        Spanish: {
            instructions: "Usa ⬆️ (Arriba) para avanzar, ⬅️ (Izquierda) para mirar a la izquierda, ➡️ (Derecha) para mirar a la derecha, y la barra espaciadora para retroceder. Escribe cuando interactúes.",
            welcome: "¡Bienvenido al Juego de Idiomas! Escribe 'Español' o 'Ruso' para empezar.",
            select: "Seleccionaste: ",
            moveForward: "Te mueves hacia adelante en tu misión.",
            moveBack: "Das un paso atrás con cautela.",
            lookLeft: "Miras hacia la izquierda y no ves nada inusual.",
            lookRight: "Miras hacia la derecha y no ves nada inusual.",
            typeToInteract: "¡Aparece un NPC! Escribe tu respuesta en el idioma seleccionado.",
            invalid: "Entrada no válida. Por favor, escribe 'Español' o 'Ruso'."
        },
        Russian: {
            instructions: "Используйте ⬆️ (Вверх), чтобы двигаться вперед, ⬅️ (Влево) смотреть влево, ➡️ (Вправо) смотреть вправо, и пробел, чтобы двигаться назад. Печатайте при взаимодействии.",
            welcome: "Добро пожаловать в Языковую RPG! Введите 'Испанский' или 'Русский', чтобы начать.",
            select: "Вы выбрали: ",
            moveForward: "Вы движетесь вперед в своем приключении.",
            moveBack: "Вы осторожно отступаете назад.",
            lookLeft: "Вы смотрите налево и не видите ничего необычного.",
            lookRight: "Вы смотрите направо и не видите ничего необычного.",
            typeToInteract: "Появляется NPC! Напишите ответ на выбранном языке.",
            invalid: "Неверный ввод. Пожалуйста, введите 'Испанский' или 'Русский'."
        }
    };

    // Start the game with the initial instruction
    gameText.innerText = messages.English.welcome;

    function processLanguageSelection(input) {
        const normalizedInput = input.toLowerCase().trim();

        // Check if the input is valid language
        if (normalizedInput === "spanish" || normalizedInput === "español") {
            currentLanguage = "Spanish";
        } else if (normalizedInput === "russian" || normalizedInput === "русский") {
            currentLanguage = "Russian";
        } else {
            appendMessage(messages.English.invalid);
            return;
        }

        // Game starts after selecting a language
        gameStarted = true;
        instructions.innerText = messages[currentLanguage].instructions;
        appendMessage(messages[currentLanguage].select + currentLanguage);
        appendMessage(messages[currentLanguage].moveForward);
    }

    function handleMovement(event) {
        if (!gameStarted) return;
    
        let message = "";
        let direction = "";
    
        switch (event.key) {
            case "ArrowUp":
                message = messages[currentLanguage].moveForward;
                direction = "forward";
                break;
            case "ArrowDown":
            case " ":
                message = messages[currentLanguage].moveBack;
                direction = "backward";
                break;
            case "ArrowLeft":
                message = messages[currentLanguage].lookLeft;
                direction = "left";
                break;
            case "ArrowRight":
                message = messages[currentLanguage].lookRight;
                direction = "right";
                break;
        }
        
        if (message) {
            appendMessage(message);
            showImage(direction); // Display the corresponding image
        }
    }
    
    function showImage(direction) {
        // Hide all images first
        const allImages = document.querySelectorAll('.movement-image');
        allImages.forEach(image => image.style.display = 'none');
    
        // Show the specific image for the direction
        const imageToShow = document.getElementById(`${direction}Image`);
        if (imageToShow) {
            imageToShow.style.display = 'block';
        }
    }
    
    

    function handleUserInput() {
        const input = userInput.value.trim();
        if (!gameStarted) {
            processLanguageSelection(input);
        } else {
            appendMessage("🗣️ " + input);  // NPC interaction in selected language
        }
        userInput.value = ""; // Clear input field after processing
    }

    function appendMessage(text) {
        const newMessage = document.createElement("p");
        newMessage.innerText = text;
        gameText.appendChild(newMessage);
        gameText.scrollTop = gameText.scrollHeight;
    }

    // Event listeners
    document.addEventListener("keydown", handleMovement);
    
    // Handle Submit Button
    submitButton.addEventListener("click", function () {
        handleUserInput();
    });
    
    // Handle Enter Key Press
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            handleUserInput();
        }
    });
});
