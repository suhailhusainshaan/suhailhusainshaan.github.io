function createCarousel(data) {
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicators = document.getElementById('carousel-indicators');
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    data.forEach((image, index) => {
    const isActive = index === 0 ? 'active' : '';
    const carouselItem = `
        <div class="carousel-item ${isActive}" style="background-image: url('${image.url}')">
        <div class="carousel-caption d-none d-md-block">
            <section class="text-center my-5">
            <div class="container">
                <h2 class="mb-4 text-center font-weight-bold" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);">
                    Welcome, Suhail Husain
                </h2>
                <h2 id="timeDisplay${index}" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);" class="display-4"></h2>
                <p style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);" class="lead">${image.description}</p>
                <div style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);" id="team-container${index}" class="row justify-content-center"></div>
            </div>
            <div class="input-group col-md-8 offset-md-2 my-4">
                <input type="text" id="searchInput${index}" class="form-control transparent-input" placeholder="Search Google..." aria-label="Search Google">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="searchGoogle(${index})">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            </section>
        </div>
        </div>
    `;
    carouselInner.innerHTML += carouselItem;
    const indicator = `
        <li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${isActive}"></li>
    `;
    carouselIndicators.innerHTML += indicator;
    });
}
    

function updateTime(data) {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    let timeString = now.toLocaleTimeString([], options);
    timeString = timeString.replace(/\bpm\b/i, 'PM').replace(/\bam\b/i, 'AM');
    data.forEach((image, index) => {
    document.getElementById('timeDisplay' + index).textContent = timeString;
    })
}


function getLinksDiv(container){
    links.forEach(member => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-2';
    
    colDiv.innerHTML = `
    <a href="${member.link}" target="_blank" style="position: relative; overflow: hidden; text-decoration: none; color: white;">
    <div class="image-container">
    <img src="${member.image}" alt="${member.name}" class="img-fluid rounded-circle team-image">
    </div>
    <p class="mt-2">${member.name}</p>
    </a>
    `;
    container.appendChild(colDiv);
    });
}

function renderLinks(data) {
    data.forEach((image, index) => {
        let teamContainer = document.getElementById(`team-container${index}`);
        teamContainer.innerHTML = '';
        getLinksDiv(teamContainer);
    })
    
}

function searchGoogle(index) {
    const searchInput = document.getElementById(`searchInput${index}`);
    const query = searchInput.value.trim();
    if (query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank'); // Open in a new tab
    }
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.matches('input[type="text"]')) {
            const index = focusedElement.id.replace('searchInput', ''); // Extract index from ID
            searchGoogle(index);
        }
    }
});

createCarousel(images);
createCarousel(images);
$('#carouselExampleIndicators').carousel({
  interval: 60000,
  pause: "hover"
});
updateTime(images);
setInterval(() => updateTime(images), 1000);

renderLinks(images);

