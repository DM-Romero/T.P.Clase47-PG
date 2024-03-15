window.onload = async () => {
    let query = new URLSearchParams(location.search)

    if (!query.has('id')) {
        alert('Necesito un ID')
        location.href = "http://127.0.0.1:5500/frontend/home.html"
    }




    try {

        const id = query.get('id')

        const response = await fetch('http://localhost:3031/api/movies/' + id)
        const result = await response.json()
        const {data, meta} = result;

        const inputTitle = document.getElementById('title')
        inputTitle.setAttribute('value',data.title)

        const inputRating = document.getElementById('rating')
        inputRating.setAttribute('value',data.rating)

        const inputAwards = document.getElementById('awards')
        inputAwards.setAttribute('value',data.awards)

        const inputReleaseDate = document.getElementById('release_date')
        inputReleaseDate.setAttribute('value',data.release_date.split('T')[0])

        const inputLength = document.getElementById('length')
        inputLength.setAttribute('value',data.length)

        const selectGenre = document.getElementById('genre')
        const responseGenres = await fetch('http://localhost:3031/api/genres/')
        const resultGenres = await responseGenres.json()

        resultGenres.data.forEach(genre => {
            const option = document.createElement('option')
            option.textContent = genre.name
            option.setAttribute('value', genre.id)
            
                if (genre.id == data.genre_id) {
                option.setAttribute('selected', true)
            }
            
            selectGenre.appendChild(option)
        });





    } catch (error) {
        console.log(error);
    }


    const form = document.querySelector('form')
    const btnAgregar = document.querySelector('#btn-agregar')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
    })

    btnAgregar.addEventListener('click', () => {
        alert('agregar nueva pelicula!!!')
    })
}