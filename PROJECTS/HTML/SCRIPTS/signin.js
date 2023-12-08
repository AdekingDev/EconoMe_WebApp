function submit() {
    // get data from inputs 
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    const password = inputs[1].value; 
    const data = {
        "email": email,
        "password": password
    } 
    const jsonData = JSON.stringify(data);

    const request = new XMLHttpRequest();

    // open a connection to my api 
    request.open("POST", "http://localhost:5503/api/signin");

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = signinCompleted;
    
    request.send(JSON.stringify(data));

    function signinCompleted() {
        const response = JSON.parse(request.response);
        console.log(response.data);
        localStorage.setItem("user-id", response.data.user_id);
        const userId = parseInt(localStorage.getItem("user-id"));
        console.log(userId);
            if (parseInt(userId) == 1) {
                window.location.href = "admin.html";
            }
            else {
                window.location.href = "homepage.html";
            }
        
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
