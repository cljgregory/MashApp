let movieNameRef = document.getElementById("movie-search");
let searchBtn = document.getElementById("searchbutton");
let result = document.getElementById("result");


const getMovie = () => {
  const movieName = movieNameRef.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;


  // if input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    return;
  }

  // if input isn't empty
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // if movie exists in database
      if (data.Response == "True") {
        result.innerHTML = `
          <div class="info">
            <img src=${data.Poster} class="poster">
            <div class="details">
              <h2>${data.Title}</h2>
              <div class="rating">
                <h4>${data.imdbRating}</h4>
              </div>
              <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
              <div class="details-info">
                <div class="details-label">Rated:</div>
                <div class="details-value">${data.Rated}</div>
                <div class="details-label">Year:</div>
                <div class="details-value">${data.Year}</div>
              </div>
            </div>
          </div>
          <div class="plot">
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
          </div>
          <div class="cast">
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          </div>
        `;

        //Fetch the trailer from YouTube API
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieName} trailer&type=video&key=${youtubeApiKey}`;
        fetch(youtubeUrl)
          .then((resp) => resp.json())
          .then((data) => {
            const videoId = data.items[0].id.videoId;
            const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
            result.innerHTML += `
            <div class="trailer">
            <h3>Trailer:</h3>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe src="${youtubeEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.3em; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"></iframe>
            </div>
        </div>
            `;
          })
          .catch(() => {
            result.innerHTML += `<h3 class="msg">Error Occured</h3>`;
          });
      }

      // if movie doesn't exist in database
      else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    // if error occurs
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
    });
};

searchBtn.addEventListener("click", getMovie);




