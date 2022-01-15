let submit_btn = document.getElementById("submit-btn");
let result_box = document.getElementById("result-box");
let url_inp = document.getElementById("url-box");

function printResult() {
    let url = url_inp.value;
    if (url != "" && isValidURL(url)) {
        // make a fetch request to bitly api 
        fetch("https://api-ssl.bitly.com/v4/shorten", {
            method: "POST",
            headers: {
                Authorization: "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                long_url: url,
            }),
        })
            .then((response) => response.json())
            .then(function(data){
                result_box.innerHTML = data.link; 
            });
    }
}

function isValidURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}

// Function calls
submit_btn.addEventListener("click", printResult);
