// News API key and initialize the keyword with the last search term from localStorage or an empty string
const apiKey = "085d2d1e6a574d00a18f6f08121c2773";
let keyword = localStorage.getItem("searchKeyword") || "";
const pageSize = 6;

// Get HTML elements using their IDs
const searchInput = document.getElementById("artistInput");
const searchButton = document.getElementById("searchButton");
const articlesContainer = document.getElementById("articlesContainer");

// Function to fetch news based on the current search
const fetchNews = () => {
  // API URL with the keyword and API key
  const apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Display the fetched articles
      displayArticles(data);
      // Save the current keyword to localStorage
      localStorage.setItem("searchKeyword", keyword);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
};

// Function to display articles in the HTML
const displayArticles = (data) => {
  if (data && data.articles) {
    // Clear the articles container
    articlesContainer.innerHTML = "";

    // Use pageSize variable to control the number of articles displayed
    const articlesToDisplay = data.articles.slice(0, pageSize);

    // Iterate through articles, creating Bootstrap cards and organizing them into rows
    for (let i = 0; i < articlesToDisplay.length; i += 2) {
      const row = document.createElement("div");
      row.classList.add("row", "mb-4");

      const col1 = document.createElement("div");
      col1.classList.add("col-md-6");

      // Create a card for the first article
      const card1 = createCard(articlesToDisplay[i]);
      col1.appendChild(card1);

      const col2 = document.createElement("div");
      col2.classList.add("col-md-6");

      // Create a card for the second article
      const card2 = createCard(articlesToDisplay[i + 1]);
      col2.appendChild(card2);

      // Add columns to the row
      row.appendChild(col1);
      row.appendChild(col2);

      // Add the row to the articles container
      articlesContainer.appendChild(row);
    }
  }
};

// Function to create a Bootstrap card for an article
const createCard = (article) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-body">
      <h4 class="card-title">${article.title}</h4>
      <p class="card-text">${article.publishedAt}</p>
      <a href="${article.url}" target="_blank" class="btn btn-primary">View Full Article</a>
    </div>
  `;

  return card;
};

// Unified search function for both button click and Enter key press
const handleSearch = () => {
  keyword = searchInput.value.trim();

  if (keyword !== "") {
    fetchNews();
  } else {
    console.log("Please enter a keyword before searching.");
  }
};

// Event listener for the search button click
searchButton.addEventListener("click", handleSearch);

// Initial fetch when the page loads
fetchNews();
