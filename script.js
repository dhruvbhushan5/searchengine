document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const historyList = document.getElementById('historyList');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    
    // Fetch search history from local storage (or search_history.json if needed)
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Function to display only the latest search
    function displayLatestSearch() {
        historyList.innerHTML = ''; // Clear previous history
        if (searchHistory.length > 0) {
            const latestSearch = searchHistory[searchHistory.length - 1]; // Get the latest search
            const li = document.createElement('li');
            li.textContent = latestSearch;
            historyList.appendChild(li);
        }
    }

    // Load the latest search on page load (if any exists)
    displayLatestSearch();

    // Add search term to history and localStorage
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchHistory.push(searchTerm);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            displayLatestSearch(); // Only display the latest search
            searchInput.value = ''; // Clear input field after search
        }
    });

    // Clear history
    clearHistoryButton.addEventListener('click', () => {
        localStorage.removeItem('searchHistory');
        searchHistory.length = 0; // Clear the array
        historyList.innerHTML = ''; // Update the UI to remove the latest search
    });
});
