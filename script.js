function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join(' ');

        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h4>${project.title} (${project.year})</h4>
            <p>${project.description}</p>
            <div class="tech-container">
                ${techTags}
            </div>
            ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ''}
        `;

        container.appendChild(projectElement);
    });
}

fetch('objects.json')
    .then(response => response.json())
    .then(data => {
        renderProjects(data.projects);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });


const textElement = document.querySelector('h1');
const text = textElement.innerText;

textElement.innerHTML = text.split('').map(letter => {
    if (letter === ' ') {
        return `<span>&nbsp;</span>`; 
    } else {
        return `<span>${letter}</span>`;
    }
}).join('');

const letters = textElement.querySelectorAll('span');

let mouseMoveTimeout;
let previousMouseX = 0; 

const textWidth = textElement.offsetWidth;
const viewportWidth = window.innerWidth;

const resetRotations = () => {
    letters.forEach(letter => {
        letter.style.transform = 'rotate(0deg)'; 
    });
};

window.addEventListener('mousemove', (e) => {
    let currentMouseX = e.clientX;

    let maxScrollDistance = textWidth - viewportWidth;
    let scrollAmount = (currentMouseX / viewportWidth) * maxScrollDistance;

    textElement.style.transform = `translateX(${-scrollAmount}px)`; 

    let mouseDirection = currentMouseX > previousMouseX ? 1 : -1;
    letters.forEach((letter) => {
        let rotation = mouseDirection * ((currentMouseX / viewportWidth) * 10 - 10); 

        letter.style.transform = `rotate(${rotation}deg)`;
    });

    previousMouseX = currentMouseX;

    clearTimeout(mouseMoveTimeout);

    mouseMoveTimeout = setTimeout(resetRotations, 100);
});