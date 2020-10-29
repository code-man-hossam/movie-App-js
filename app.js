const input = document.getElementById('input');
const form = document.getElementById('form');
const moviesEl = document.querySelector('.movie');
const movieDetails = document.querySelector('.movie-detail');


const api = 'http://www.omdbapi.com/?apikey=2f518825&s='

form.addEventListener('submit', getMovies);
moviesEl.addEventListener('click', getMovieDetails)
movieDetails.addEventListener('click', hideDetails)

function getMovies(e) {
    e.preventDefault()

    fetch(`${api}${input.value}`)
    .then(res => res.json())
    .then(data => {

        let movies = data.Search
        moviesEl.innerHTML = ''
        movies.forEach(item => {

            let li = document.createElement('li')

            li.innerHTML = `<img src="${item.Poster}"> <h5>${item.Title}</h5> <button id="${item.imdbID}" class="details">Details</button>`
            moviesEl.appendChild(li)
            input.value = ''
            movieDetails.classList.remove('active')
        });
    })
}

function getMovieDetails(e) {
    

   if(e.target.classList.contains('details')){
    let id = e.target.id;

    fetch('http://www.omdbapi.com/?apikey=2f518825&i='+id)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        movieDetails.classList.add('active')
        movieDetails.innerHTML = `
        <div class="pic-details">
                    <div class="pic">
                        <img src="${data.Poster}" alt="">
                    </div>
                    <div class="detail">
                        <h6>Released: ${data.Released}</h6>
                        <h6>Geners: ${data.Genre}</h6>
                        <h6>Country: ${data.Country}</h6>
                        <h6>Production: ${data.Production}</h6>
                        <h6>Rating: ${data.Genre}</h6>
                        <h6>Awards: ${data.Awards}</h6>
                        <h6>DVD: ${data.DVD}</h6>
                        <h6>Director: ${data.Director}</h6>
                        <h6>Actors: ${data.Actors}</h6>
                    </div>
                   </div>
                    <div class="desc">
                        <p>${data.Plot}</p>
                        <button class="btn btn-primary hide">Hide Movie Details</button>
                        <a href="http://imdb.com/title/${id}" class="btn btn-primary" target="_blank">View IMDB</a>
                    </div>
        `
    })
   }
}

function hideDetails(e) {

    if(e.target.classList.contains('hide')){
        movieDetails.classList.remove('active');
        movieDetails.style.transition = '.5s'
    }
}