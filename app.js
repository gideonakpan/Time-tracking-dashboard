const dailybtn = document.getElementById('daily');
const weeklybtn = document.getElementById('weekly');
const monthlybtn = document.getElementById('monthly');
const cards = document.getElementById('cards');

// A function to remove the active class from all buttons
const removeActiveClass = () => {
    dailybtn.classList.remove('active');
    weeklybtn.classList.remove('active');
    monthlybtn.classList.remove('active');
};

// Function to fetch and render data
const fetchDataAndRender = (timeframe) => {
    const fetchdata = fetch("data.json");

    fetchdata.then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        cards.innerHTML = ""; // clear the previous cards
        data.forEach((item) => {
            cards.innerHTML += `
                <div class="card" id="${item.title}">
                    <div class="card_img">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="card_text">
                        <div class="card_title">
                            <h3>${item.title}</h3>
                            <img src="images/icon-ellipsis.svg" alt="">
                        </div>
                        <h2>${item.timeframes[timeframe].current}hrs</h2>
                        <span> ${timeframe === 'daily' ? 'Yesterday' : timeframe === 'weekly' ? 'Last Week' : 'Last Month'} - ${item.timeframes[timeframe].previous}hrs</span>
                    </div>
                </div>`;
        });
    });
};

// Add event listener to the document when it loads
document.addEventListener("DOMContentLoaded", () => {
    removeActiveClass(); // Remove any active class when the page loads
    weeklybtn.classList.add('active'); // Optionally, set the 'weekly' button as active by default
    fetchDataAndRender('weekly'); // Load weekly data by default on page load
});

// Daily Button Clicked
dailybtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveClass(); // Remove 'active' class from all buttons
    dailybtn.classList.add('active'); // Add 'active' class to the daily button
    fetchDataAndRender('daily'); // Fetch and display daily data
});

// Weekly Button Clicked
weeklybtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveClass(); // Remove 'active' class from all buttons
    weeklybtn.classList.add('active'); // Add 'active' class to the weekly button
    fetchDataAndRender('weekly'); // Fetch and display weekly data
});

// Monthly Button Clicked
monthlybtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveClass(); // Remove 'active' class from all buttons
    monthlybtn.classList.add('active'); // Add 'active' class to the monthly button
    fetchDataAndRender('monthly'); // Fetch and display monthly data
});
