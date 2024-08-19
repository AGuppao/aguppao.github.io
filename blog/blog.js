const postCards = document.getElementsByTagName('post-card');
let maxWidth = 0;
let maxHeight = 0;

Array.from(postCards).forEach(element => {
    maxWidth = Math.max(element.clientWidth, maxWidth);
    maxHeight = Math.max(element.clientHeight, maxHeight);
});

Array.from(postCards).forEach(element => {
    element.style.height = `${maxHeight}px`;
});


const searchbtn = document.getElementById('search-button');
const clearsearch = document.getElementById('clear-search');
const searchinput = document.getElementById('search-input');
const blogtitle = document.getElementById('blog-title');

function showAllPostCards() {
    Array.from(postCards).forEach(postCard => {
        postCard.style.display = 'grid';
    });
}

searchbtn.addEventListener('click', startsearch);
searchinput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        startsearch(event);
    }
});

searchinput.addEventListener('input', function(event) {
    if(searchinput.value === '') {
        blogtitle.innerText = 'All Posts';
        showAllPostCards();
    }
});

clearsearch.addEventListener('click', function(event) {
    searchinput.value = '';
    blogtitle.innerText = 'All Posts';
    showAllPostCards();
});

function startsearch(event) {
    const searchTerms = searchinput.value.split(',').map(term => term.trim().toLowerCase()).filter(term => term !== '');

    if (searchTerms.length === 0) {
        showAllPostCards();
    }
    else {
        let numposts = 0;
        Array.from(postCards).forEach(postCard => {
            let title = postCard.title.toLowerCase();
            let kwargs = postCard.kwargs.map(term => term.toLowerCase());
            let showPostCard = false;
            
            searchTerms.forEach(term => {
                if (title.includes(term) || kwargs.includes(term)) {
                    showPostCard = true;
                }
            });

            if (showPostCard) {
                postCard.style.display = 'grid';
                numposts++;
            }
            else {
                postCard.style.display = 'none';
            }
        });

        if (numposts === 0) {
            blogtitle.innerText = 'No Results Found';
        }
        else {
            blogtitle.innerText = `Found ${numposts} Results`;
        }
    }
}
