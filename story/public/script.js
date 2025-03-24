const storyInput = document.getElementById('storyInput');
const submitBtn = document.getElementById('submitBtn');
const storiesDiv = document.getElementById('stories');

async function fetchStories() {
    try {
        const response = await fetch('http://localhost:4000/stories');
        const stories = await response.json();
        renderStories(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
    }
}

function renderStories(stories) {
    storiesDiv.innerHTML = '<h2>Stories</h2>';
    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        storyItem.textContent = story.content;
        storiesDiv.appendChild(storyItem);
    });
}

submitBtn.addEventListener('click', async () => {
    const storyText = storyInput.value.trim();
    if (storyText) {
        try {
            await fetch('http://localhost:4000/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: storyText })
            });
            storyInput.value = '';
            fetchStories(); // Refresh stories after submission
        } catch (error) {
            console.error('Error submitting story:', error);
        }
    }
});

fetchStories(); // Initial fetch