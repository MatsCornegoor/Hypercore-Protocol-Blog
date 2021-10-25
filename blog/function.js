// init showdown converter
var conv = new showdown.Converter();

// file fetcher based on url
async function fetchUrl(url) {
    const fetcher = await fetch(url);
    const response = await fetcher.blob();
    return response;
}

let links = document.getElementById("links");
if(links != null){
    fetchUrl('mats/post.txt').then(text => {

        let reader = new FileReader();
        reader.readAsText(text);

        reader.onload = function() {
            // turn file into line separated array
            let resultArray = reader.result.split(/\r\n|\n/);
            for(let i = 0; i < resultArray.length; i++){
                console.log(resultArray[i]);

                // turn lines in comma separated array
                let lineArray = resultArray[i].split(',');
                
                // create link and title elements
                let link = document.createElement("div")
                let title = document.createElement("h4");
                title.textContent = lineArray[2];

                // add click event listner to link element
                link.addEventListener("click", function(){ 

                    // replace content with html based on file destination
                    let content = document.getElementById("content");
                    if(content != null){
                        fetchUrl(lineArray[3]).then(text => {

                            let reader = new FileReader();
                            reader.readAsText(text);

                            reader.onload = function() {
                                console.log(reader.result);
                                // convert markdown to html
                                content.innerHTML = conv.makeHtml(reader.result);
                            }

                            reader.onerror = function() {
                                console.log(reader.error);
                            }
                        });
                    }
                });
                
                link.appendChild(title);
                links.appendChild(link);
            }
        }

        reader.onerror = function() {
            console.log(reader.error);
        }

    });
}




