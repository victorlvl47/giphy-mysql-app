
var form = document.querySelector("form");
var search = document.querySelector(".search");
var typeSelect = document.querySelector("#type");
var weirdnessSelect = document.querySelector("#weirdness");
var giphy = document.querySelector(".giphy img");
var giphyLink = document.querySelector(".giphy a");
var guardarButton = document.createElement("button");
guardarButton.setAttribute("id", "guardar-info"); 
guardarButton.innerHTML = "Guardar Informaci&#243;n";
var consultarButton = document.getElementById("consultar-db");
var dbButtons = document.querySelector(".db-buttons");

var searchInfo = {};

// guardarButton.disabled = true;
// consultarButton.disabled = true;

guardarButton.addEventListener('click', () => {
  window.comunicacion.saveGiphyMedia([searchInfo]);

  guardarButton.remove();
});

window.comunicacion.giphyMediaSaved(function(event, args) {
  alert("Se guardo la informacion.");
});

consultarButton.addEventListener('click', () => {

  if (guardarButton !== null) {
    guardarButton.remove();
  }

  var searchText = search.value;
  var type = typeSelect.value;
  var weirdness = weirdnessSelect.value;
  var consultaInfo = {
    search: searchText, 
    type: type, 
    weirdness: weirdness
  };

  window.comunicacion.consultGiphyMediaDB([consultaInfo]);
});

window.comunicacion.showGiphyResultDB(function(event, args) {

  var imgSrc;

  if (args != null) {
    imgSrc = args.media_link;
  }
  else {
    imgSrc = "https://media.giphy.com/media/l2JehGxiNf82wzutW/giphy.gif";
  }

  // fadeout
  giphy.style.opacity = 0;
  giphy.style.transition = "opacity 1s ease-out";

  setTimeout(function() {

    giphy.setAttribute("src", imgSrc);
    giphyLink.setAttribute("href", imgSrc);
    giphyLink.style.visibility = "visible";

    setTimeout(function() {
      giphy.classList.add("gif");
            
      // fade in
      giphy.style.opacity = 0;
      giphy.style.transition = "opacity 1000ms ease-in-out";
      setTimeout(function() {
        giphy.style.opacity = 1;
      }, 100);

    }, 800);

  }, 800);
});



// consultarButton.addEventListener('click', () => {
//   alert("consultar en db button clicked!");
// });


// Attach an event listener to the form's submit event
form.addEventListener("submit", function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    goGiphy();
});

function goGiphy() {

    if (guardarButton !== null) {
      guardarButton.remove();
    }

    var input = search.value;
    var typeValue = typeSelect.value;
    var weirdness = weirdnessSelect.value;
    var url = `https://api.giphy.com/v1/${typeValue}/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=${input}&weirdness=${weirdness}`
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var imgSrc = data.data.images.original.url;
  
        // fadeout
        giphy.style.opacity = 0;
        giphy.style.transition = "opacity 1s ease-out";

        setTimeout(function() {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          searchInfo = {
            imgLink: imgSrc, 
            searchDate: formattedDate, 
            searchText: input, 
            type: typeValue, 
            weirdnessLevel: weirdness 
          };

          dbButtons.appendChild(guardarButton);

          giphy.setAttribute("src", imgSrc);
          giphyLink.setAttribute("href", imgSrc);
          giphyLink.style.visibility = "visible";
          setTimeout(function() {
            giphy.classList.add("gif");
            
            // fade in
            giphy.style.opacity = 0;
            giphy.style.transition = "opacity 1000ms ease-in-out";
            setTimeout(function() {
              giphy.style.opacity = 1;
            }, 100);

          }, 800);
        }, 800);
      })
      .catch(error => console.error(error));
}
