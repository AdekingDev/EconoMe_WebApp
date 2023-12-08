function submit() {
    console.log(12);
    const URL = "http://localhost:5503/api/users";

    const inputs = document.getElementsByClassName("input-style");
    const checkbox = document.getElementById("checkbox");

    if (checkbox.checked === false) {
        addErrorMessage("Something went wrong! You didn't agree with our T&C!");
        return;
    }
    if (inputs[1].value === ""  || inputs[2].value === "") {
        addErrorMessage("Something went wrong! Your email or email is empty!");
        return;
    }
    
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const isEmailValid = emailRegex.test(inputs[1].value);
    if (!isEmailValid) {
        addErrorMessage("Invalid email provided. Please try again using a valid email...");
        return;
    }
    
    data = {
        "name": inputs[0].value,
        "email": inputs[1].value,
        "password": inputs[2].value,
        "retyped_password": inputs[3].value
    }

    const request = new XMLHttpRequest();
    request.open("POST", URL);
    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = processData();
    
    request.send(JSON.stringify(data));

    function processData() {
        
        if (request.status === 200 || request.status === 201) {
            const data = JSON.parse(request.response);
            localStorage.setItem("user-id", data.data.user_id);
            
            window.location.replace("homepage.html")
            console.log("User registered successfully!");
            
        } 
    

       if (request.status === 400 || request.status === 500) {
            // display an error
            addErrorMessage("Failed to register a new user. Please try again...");
        }

        
    }
}


function addErrorMessage(message) {
    const existingErrorMessage = document.getElementById("errorMessage");
    if (existingErrorMessage) {
        existingErrorMessage.innerText = message;
    } else {
        const errorMessage = document.createElement("p");
        const parent = document.getElementsByClassName("container")[0];
        errorMessage.id = "errorMessage";
        errorMessage.innerText = message;
        errorMessage.classList.add("error-message"); 
        parent.appendChild(errorMessage);
    }
}

(function() {
    var phrases = ["budgeting", "currency converter", "bill payment", "investment"];
    var currentIndex = 0;
    var element = document.querySelector('.typing-effect');
    var charIndex = -1;
    var typingDelay = 200;
    var erasingDelay = 100;
    var newTextDelay = 2000; 

    function type() {
        if (charIndex < phrases[currentIndex].length) {
            if(!element.classList.contains("typing")) element.classList.add("typing");
            element.textContent += phrases[currentIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > -1) {
            element.textContent = phrases[currentIndex].substring(0, charIndex);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            currentIndex = (currentIndex + 1) % phrases.length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        if (element) type();
    });
})();