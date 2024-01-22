// News API key and initialize the keyword with the last search term from localStorage or an empty string
const apiKey = "1BKwuA8RAsCAYeeHCHUSDnV2SOhrOL48";
let keyword = localStorage.getItem("searchKeyword") || "";
const pageSize = 6;

// Get HTML elements using their IDs
const searchInput = document.getElementById("artistInput");
const searchButton = document.getElementById("searchButton");
const articlesContainer = document.getElementById("articlesContainer");

// Function to fetch news based on the current search
const fetchArticles = () => {
  // API URL with the keyword and API key
  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${apiKey}`;

  // Fetch data from the API
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Display the fetched articles
      displayArticles(data.response.docs);
      // Save the current keyword to localStorage
      localStorage.setItem("searchKeyword", keyword);
    });
};

// Function to display articles in the HTML
const displayArticles = (articles) => {
  if (articles && articles.length > 0) {
    // Clear the articles container
    articlesContainer.innerHTML = "";
  }
  // Use pageSize variable to control the number of articles displayed
  const articlesToDisplay = articles.slice(0, pageSize);

  // Iterate through articles, creating Bootstrap cards and organizing them into rows
  for (let i = 0; i < articlesToDisplay.length; i += 2) {
    const row = document.createElement("div");
    row.classList.add("row", "mb-4");

    const col1 = document.createElement("div");
    col1.classList.add("col-md-6");

    const card1 = createCard(articlesToDisplay[i]);
    col1.appendChild(card1);

    const col2 = document.createElement("div");
    col2.classList.add("col-md-6");

    const card2 = createCard(articlesToDisplay[i + 1]);
    col2.appendChild(card2);

    row.appendChild(col1);
    row.appendChild(col2);

    articlesContainer.appendChild(row);
  }
};

// Function to create a Bootstrap card for an article

const createCard = (article) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const date = new Date(article.pub_date);

  card.innerHTML = `
  <div class="card-body">
  <h4 class="card-title">${article.headline.main}</h4>
  <p class="card-text">${date.toDateString()}</p>
  <a href="${article.web_url}" target="_blank" class="btn btn-primary">Read Full Article</a>
</div>
`;
  return card;
};

// function for search button click

const handleSearch = () => {
  const keyword = searchInput.value.trim();

  if (keyword == !"") {
    fetchArticles();
  } else {
    console.log("Please enter a keyword before searching.");
  }
};

// Event listener for the search button click
searchButton.addEventListener("click", handleSearch);

// Initial fetch when the page loads
// Initial fetch when the page loads
fetchArticles();
