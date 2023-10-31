//document.getElementById("year").innerHTML = new Date().getFullYear();

function redirecting(element) {
    var value = element.value;
    console.log(value);
    if (value) {
        value = value.toLowerCase();
        alert("Redirecting to "+ value + " page!");
        if (value == "home") {
            window.location.href = "./index.html";
        }else{
        window.location.href = "./"+value+".html";
        }
    }
}
