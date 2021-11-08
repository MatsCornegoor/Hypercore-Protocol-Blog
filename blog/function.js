// people that have the right to publish posts
let userPool = ['mats/post.txt', 'meeuwis/post.txt', 'meeuwis/post.txt', 'meeuwis/post.txt', 'meeuwis/post.txt'];

// init showdown converter
let conv = new showdown.Converter();

// database array for postMessage.txt files
let postDatabase = [];

// if link div is on page, start fetching links
let links = document.getElementById("links");
if(links != null){
    fetchLinks(userPool);
}

async function fetchLinks(urls){
    
    Promise.all(
        urls.map(url => fetch(url).then((response) => response.blob()) )
    ).then((data) => {

        // loop through fetch pool and add data to post data array
        for(let i = 0; i < data.length; i++){
            let reader = new FileReader();
            reader.readAsText(data[i]);
            reader.onload = function() {
                // turn file into line separated array
                let lineArray = reader.result.split(/\r\n|\n/);
                for(let s = 0; s < lineArray.length; s++){
                    // split each line into comma separated array and add to post database
                    postDatabase.push(lineArray[s].split(', '));
                    // if all lines are added to post database, make link list
                    if(i == data.length -1 && s == lineArray.length -1){
                        buildPage();
                    }
                }
            }
            reader.onerror = function() {
                console.log(reader.error);
            }
        }

    });     
}

// file fetcher based on url
async function fetchUrl(url) {
    const fetcher = await fetch(url);
    const response = await fetcher.blob();
    return response;
}

// filter function
function filterCatagory(cat){
    let el = document.querySelectorAll(".filter");

    for(let i = 0; i < el.length; i++){
        el[i].style.display = "none";
    }

    let el2 = document.querySelectorAll("." + cat);

    for(let i = 0; i < el2.length; i++){
        el2[i].style.display = "block";
    }
}


function buildPage(){

    // filter database based on date
    postDatabase.sort(function(date2,date1){
        a = new Date(date1[0]);
        b = new Date(date2[0]);
        if (a>b) return 1;
        else if (a<b)  return -1;
        else return 0;
    });


    let filters = document.getElementById("filters");
    // array to save previous filters based on database
    let filterArray = [];

    // Add "all" catagory to filters
    let filterButton = document.createElement("h4");
    filterButton.textContent = "all";
    filterButton.classList.add("selected");

    filterButton.addEventListener("click", function(){ 
        filterCatagory("filter");
        // remove selected class from all buttons
        let selected = document.querySelectorAll(".selected");
        for(let i = 0; i < selected.length; i++){
            selected[i].classList.remove("selected");
        }
        // add selected class to clicked button
        filterButton.classList.add("selected");
    });
    filters.appendChild(filterButton);


    for(let i = 0; i < postDatabase.length; i++){
        let link = document.createElement("div")
        let date = document.createElement("h5");
        let title = document.createElement("h4");

        date.textContent = postDatabase[i][0];
        link.classList.add("filter");
        link.classList.add(postDatabase[i][1]);
        title.textContent = postDatabase[i][2];

        // if filter button does not already exist, add it to filters
        if(!filterArray.includes(postDatabase[i][1])){
            let filterButton = document.createElement("h4");
            filterButton.textContent = postDatabase[i][1];

            filterButton.addEventListener("click", function(){ 
                filterCatagory(postDatabase[i][1]);
                // remove selected class from all buttons
                let selected = document.querySelectorAll(".selected");
                for(let i = 0; i < selected.length; i++){
                    selected[i].classList.remove("selected");
                }
                // add selected class to clicked button
                filterButton.classList.add("selected");
            });

            filters.appendChild(filterButton);
            filterArray.push(postDatabase[i][1]);
        }


        // add click event listner to link element
        link.addEventListener("click", function(){ 

            // replace content with html based on file destination
            let content = document.getElementById("content");
            let contentWrapper = document.getElementById("contentWrapper");
            if(content != null){
                fetchUrl(postDatabase[i][3]).then(text => {

                    let reader = new FileReader();
                    reader.readAsText(text);

                    reader.onload = function() {
                        // console.log(reader.result);
                        // convert markdown to html
                        content.innerHTML = conv.makeHtml(reader.result);

                        let close = document.createElement("h4");
                        close.textContent = "close";
                        close.classList.add("close");
                        content.append(close);

                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        document.querySelector(".close").addEventListener("click", function(){ 
                            document.getElementById("contentWrapper").style.display = "none";
                            links.style.display = "block";
                        });
                    }

                    reader.onerror = function() {
                        console.log(reader.error);
                    }
                });
            }
            contentWrapper.style.display = "block";
            links.style.display = "none";
        });

        link.appendChild(date);
        link.appendChild(title);
        links.appendChild(link);

    }

}