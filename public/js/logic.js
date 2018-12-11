
const scrapeArticles = () => {
    fetch('/saved')
    .then (r => r.json())
    .then (r => {
        r.forEach(article => {
            const articleItem = document.createElement('div')
            articleItem.className = 'item'
            articleItem.innerHTML = `
            <h6>Title: ${article.title} <button class="btn" style="float:right">Save Article</button></h6>
            Link: ${article.link}
            `
            document.querySelector("#homeResults").appendChild(articleItem)
            
        })
        })
        .catch(e => console.log(e))
    }
    
    
    // <div class = "col s3"
    //     Hello
    // </div>