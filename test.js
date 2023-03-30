
function redirecting(element) {
    var value = element.value;
    console.log(value);
    if (value) {
        alert("Redirecting to "+ value + " page!");
        if (value == "Home") {
            window.location.href = "./index.html";
        }else{
        window.location.href = "./"+value+".html";
        }
    }
}


