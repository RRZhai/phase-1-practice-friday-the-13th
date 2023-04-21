// global variable
const nav = document.getElementById("movie-list")
const movieTitle = document.getElementById('title')
const movieYear = document.getElementById('year-released')
const movieDes = document.getElementById('description')
const watchedbtn = document.getElementById('watched')
const detailImg = document.getElementById('detail-image')
const bloodForm = document.getElementById('blood-form')
const bloodAmount = document.querySelector('#amount')
// challenge 1: add movie image to nav#movie-list
// create get image callback function
const createMovieList = (movie) => {
    const img = document.createElement('img')
    img.src = movie['image']
    nav.appendChild(img)
    img.addEventListener('click', () => renderMovie(movie))
}

const renderMovie = (movie) => {
    movieTitle.innerText = movie['title']
    movieYear.innerText = movie['release_year']
    movieDes.innerText = movie['description']
    detailImg.src = movie['image']
    watchBtn(movie)
}

const watchBtn = (movie) => {
    watchedbtn.innerText = movie['watched'] ? 'WATCHED' : 'UNWATCHED'
    watchedOrNOT(movie)
}

const watchedOrNOT = (movie) => {
    watchedbtn.addEventListener('click', () =>{
        movie.watched = !movie.watched
        if (movie["watched"]){
            watchedbtn.innerText = "WATCHED"
        } else {
            watchedbtn.innerText = 'UNWATCHED'
        }
    })
}

const submitForm = (e) => {
    e.preventDefault();
    const inputBlood = e.target['blood-amount'].value
    const total = Number(inputBlood) + Number(bloodAmount.textContent)
    bloodAmount.innerText = total
    bloodForm.reset()
}

// fetch the movie data
const fetchData = () => {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    // .then(movieList => {debugger})
    .then(movieList => {
        movieList.forEach(movies => createMovieList(movies))
        renderMovie(movieList[0])
        bloodForm.addEventListener('submit', submitForm)
    })
    .catch(irr => alert(irr))
}
fetchData()