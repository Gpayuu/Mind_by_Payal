const data = {
    "Depression": {
        "Symptoms": "Persistent sadness, loss of interest, fatigue, difficulty concentrating.",
        "Precautions": "Regular exercise, therapy, social support, healthy sleep habits.",
        "Food": "Omega-3 rich foods, leafy greens, nuts, and dark chocolate.",
        "Meditation": "Mindfulness meditation, deep breathing exercises, yoga."
    },
    "Anxiety": {
        "Symptoms": "Excessive worry, restlessness, rapid heart rate, trouble sleeping.",
        "Precautions": "Cognitive behavioral therapy, relaxation techniques, reducing caffeine intake.",
        "Food": "Herbal tea, whole grains, probiotic-rich foods, bananas.",
        "Meditation": "Guided meditation, grounding exercises, progressive muscle relaxation."
    }
};

function searchCondition() {
    const searchBox = document.getElementById("searchBox").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (searchBox in data) {
        const condition = data[searchBox];
        resultDiv.innerHTML = `
            <div class="result-box">
                <h2>${searchBox}</h2>
                <p><strong>Symptoms:</strong> ${condition.Symptoms}</p>
                <p><strong>Precautions:</strong> ${condition.Precautions}</p>
                <p><strong>Food:</strong> ${condition.Food}</p>
                <p><strong>Meditation:</strong> ${condition.Meditation}</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = "<p style='color: red;'>Condition not found. Try another search.</p>";
    }
}