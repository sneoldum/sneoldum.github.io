function redirecting(element) {
    var value = element.value;
    if (value == "Home page") {
        alert("Redirecting to home page!");
        window.location.href = "./index.html";
    } else if (value == "About") {
        alert("Redirecting to about page!");
        window.location.href = "./about.html";
    } else if (value == "Contact") {
        alert("Redirecting to contact page!");
        window.location.href = "./contact.html";
    }
}


