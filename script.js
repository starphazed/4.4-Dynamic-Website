// Function to render projects
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h4>${project.title} (${project.year})</h4>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ''}
        `;

        container.appendChild(projectElement);
    });
}

// Fetch the JSON file and render the projects
fetch('objects.json')
    .then(response => response.json())
    .then(data => {
        renderProjects(data.projects);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// Get the text element (h1) and split the text into span elements
const textElement = document.querySelector('h1');
const text = textElement.innerText;

textElement.innerHTML = text.split('').map(letter => {
    if (letter === ' ') {
        return `<span>&nbsp;</span>`; // Add a non-breaking space for actual spaces
    } else {
        return `<span>${letter}</span>`;
    }
}).join('');

// Get all span elements (each letter)
const letters = textElement.querySelectorAll('span');

// Variable to track the mouse timeout
let mouseMoveTimeout;
let previousMouseX = 0; // To track the previous mouse X position

const textWidth = textElement.offsetWidth;
const viewportWidth = window.innerWidth;

// Function to reset letter rotations
const resetRotations = () => {
    letters.forEach(letter => {
        letter.style.transform = 'rotate(0deg)'; // Reset to normal
    });
};

// Listen for mouse move event
window.addEventListener('mousemove', (e) => {
    // Get the current mouse's X position (horizontal position)
    let currentMouseX = e.clientX;

    // Move the entire h1 text horizontally based on mouseX position
    // Ensure the text moves fully across the viewport by adjusting the multiplier
    let maxScrollDistance = textWidth - viewportWidth;
    let scrollAmount = (currentMouseX / viewportWidth) * maxScrollDistance;

    textElement.style.transform = `translateX(${-scrollAmount}px)`; // Move the text horizontally

    // Calculate a tilt value for each letter, based on mouse position and direction
    let mouseDirection = currentMouseX > previousMouseX ? 1 : -1; // Determine direction of movement
    letters.forEach((letter) => {
        // Calculate rotation angle based on direction of movement
        let rotation = mouseDirection * ((currentMouseX / viewportWidth) * 10 - 10); // Range [-10, 10] degrees

        // Apply the rotation to each individual letter (span)
        letter.style.transform = `rotate(${rotation}deg)`;
    });

    // Update previous mouse X position
    previousMouseX = currentMouseX;

    // Clear the previous timeout
    clearTimeout(mouseMoveTimeout);

    // Set a new timeout to reset the rotations after 500ms of no mouse movement
    mouseMoveTimeout = setTimeout(resetRotations, 100);
});