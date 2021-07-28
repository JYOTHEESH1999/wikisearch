let search = document.getElementById('searchInput');
let con = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendResult(result) {
    let div = document.createElement("div");
    div.classList.add("result-item");
    let a1 = document.createElement("a");
    a1.classList.add("result-title");
    a1.setAttribute("href", result.link);
    a1.setAttribute("target", "_blank");
    a1.textContent = result.title;
    div.appendChild(a1);
    let br = document.createElement("br");
    div.appendChild(br);
    let a2 = document.createElement("a");
    a2.classList.add("result-url");
    a2.setAttribute("href", result.link);
    a2.setAttribute("target", "_blank");
    a2.textContent = result.link;
    div.appendChild(a2);
    let br1 = document.createElement("br");
    div.appendChild(br1);
    let p = document.createElement("p");
    p.classList.add("link-description");
    p.textContent = result.description;
    div.appendChild(p);
    con.appendChild(div);
}

function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let i = 0; i < search_results.length; i++) {
        let result = search_results[i];
        createAndAppendResult(result);
    }
}

function searchwiki(event) {
    let searchinp = search.value;
    if (event.key === "Enter") {
        con.textContent = "";
        spinner.classList.toggle("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchinp;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
search.addEventListener("keydown", searchwiki);
