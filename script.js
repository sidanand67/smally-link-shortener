let submit_btn = document.getElementById("submit-btn");
let result_box = document.getElementById("result-box");
let copy_btn = document.getElementById("copy-btn"); 
let url_inp = document.getElementById("url-box");

function shortenLink() {
    let url = url_inp.value;
    if (url != "") {
        // make a fetch request to bitly api 
        if (isValidURL(url)){
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: {
                    Authorization: "27144fa5489943ba7f999b90a7a9b17048394b48",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    long_url: url,
                }),
            })
                .then((response) => response.json())
                .then(function (data) {
                    result_box.style.fontSize = "16px";
                    result_box.style.border = "2px solid #0D0630"; 
                    copy_btn.style.display = "block";
                    result_box.innerHTML = data.link;
                });
        }
        else{
            alert("Please input a valid url."); 
        }
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

// copying to clipboard
function copyURL() {
    result_box.select();
    document.execCommand("copy");
    document.getElementById("custom-tooltip").style.display = "inline";
    setTimeout(function () {
        document.getElementById("custom-tooltip").style.display = "none";
    }, 1000);
}

// Function calls
submit_btn.addEventListener("click", shortenLink);
copy_btn.addEventListener("click", copyURL); 