// Navbar
let menuIcon = document.getElementById("menu-icon");
let closeBtn = document.getElementById("closeBtn");
let navlist = document.getElementById('nav-list');
menuIcon.addEventListener('click',()=>{
    navlist.classList.add('show');
})
closeBtn.addEventListener('click',()=>{
    navlist.classList.remove('show');
});
let country = 'in';
let apiKey = '867d2c11f9b54bbcb686729b23a83188';
// FETCHING NEWS
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', ` https://secret-ocean-49799.herokuapp.com/http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
            
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
              <b>BREAKING NEWS ${index+1} :</b> ${element.title}
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
              <div class="accordion-body">
                ${element.content}<a href="${element.url}">READ MORE...</a>
              </div>
            </div>
          </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()


