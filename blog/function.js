// people that have the right to publish posts
let userPool = ['mats/post.txt', 'meeuwis/post.txt', 'mats/post.txt'];

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
        urls.map(url => fetch(url).then((response) => response.blob()))
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
                    postDatabase.push(lineArray[s].split(','));
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


function buildPage(){

    // filter database based on date
    postDatabase.sort(function(date2,date1){
        a = new Date(date1[0]);
        b = new Date(date2[0]);
        if (a>b) return 1;
        else if (a<b)  return -1;
        else return 0;
    });

    console.log(postDatabase);

    for(let i = 0; i < postDatabase.length; i++){
        let link = document.createElement("div")
        let date = document.createElement("h5");
        let title = document.createElement("h4");

        date.textContent = postDatabase[i][0];
        title.textContent = postDatabase[i][1];

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
                        close.textContent = "x";
                        close.classList.add("close");
                        content.append(close);

                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        document.querySelector(".close").addEventListener("click", function(){ 
                            document.getElementById("contentWrapper").style.display = "none";
                        });
                    }

                    reader.onerror = function() {
                        console.log(reader.error);
                    }
                });
            }
            contentWrapper.style.display = "block";
        });

        link.appendChild(date);
        link.appendChild(title);
        links.appendChild(link);
    }

}