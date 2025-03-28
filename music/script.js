const recommendations = {
    "young-male": {
        book: "Harry Potter - J.K. Rowling",
        song: {
            title: "Shape of You",
            image: "https://via.placeholder.com/50",
            link: "https://www.youtube.com/watch?v=JGwWNGJdvx8"
        }
    },
    "young-female": {
        book: "Twilight - Stephenie Meyer",
        song: {
            title: "Love Story - Taylor Swift",
            image: "https://via.placeholder.com/50",
            link: "https://www.youtube.com/watch?v=8xg3vE8Ie_E"
        }
    },
    "adult-male": {
        book: "The Alchemist - Paulo Coelho",
        song: {
            title: "Hotel California",
            image: "https://via.placeholder.com/50",
            link: "https://www.youtube.com/watch?v=EqPtz5qN7HM"
        }
    },
    "adult-female": {
        book: "Becoming - Michelle Obama",
        song: {
            title: "Someone Like You",
            image: "https://via.placeholder.com/50",
            link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0"
        }
    },
    "senior-male": {
        book: "The Old Man and the Sea - Ernest Hemingway",
        song: {
            title: "Imagine - John Lennon",
            image: "https://via.placeholder.com/50",
            link: "https://www.youtube.com/watch?v=YkgkThdzX-8"
        }
    },
    "senior-female": {
        book: "Pride and Prejudice - Jane Austen",
        song: {
            title: "My Heart Will Go On",
            image: "images/aman.jpg", // Relative path to your image
            link: "https://www.youtube.com/watch?v=CX11yw6YL1w"
        }
    }
};

function showRecommendation() {
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    let category = "";

    if (age > 0 && age <= 20) {
        category = "young";
    } else if (age > 20 && age <= 45) {
        category = "adult";
    } else if (age > 45) {
        category = "senior";
    } else {
        alert("Please enter a valid age.");
        return;
    }

    const key = `${category}-${gender}`;
    const rec = recommendations[key];

    if (rec) {
        document.getElementById("recommendation").innerHTML = `
            <h3>Recommended Book:</h3>
            <p>${rec.book}</p>
            <h3>Recommended Song:</h3>
            <div class="song"></div>
        `;
        const imgElement = document.createElement("img");
        imgElement.src = rec.song.image;
        imgElement.alt = rec.song.title;

        const linkElement = document.createElement("a");
        linkElement.href = rec.song.link;
        linkElement.target = "_blank";
        linkElement.textContent = rec.song.title;

        const songDiv = document.querySelector(".song");
        songDiv.appendChild(imgElement);
        songDiv.appendChild(linkElement);
    } else {
        document.getElementById("recommendation").innerHTML = `<p>No recommendation available.</p>`;
    }
}