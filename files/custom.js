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
                <h2 class="mb-4">Welcome, Suhail Husain</h2>
                <h2 id="timeDisplay${index}" class="display-4"></h2>
                <p class="lead">${image.description}</p>
                <div id="team-container${index}" class="row justify-content-center"></div>
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
    const timeString = now.toLocaleTimeString([], options);
    data.forEach((image, index) => {
    document.getElementById('timeDisplay' + index).textContent = timeString;
    })
}


function getLinksDiv(container){
    links.forEach(member => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-2';
    
    colDiv.innerHTML = `
    <a href="${member.link}" target="_blank">
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

createCarousel(images);
updateTime(images);
setInterval(() => updateTime(images), 1000);

renderLinks(images);