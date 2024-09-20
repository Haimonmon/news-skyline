
let fetchedData = {}

// let apiURL = [
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>"
// ]


/**
 * ? Fetch all data at once for reuse , i come up for this to solve requesting again and again to their api
 * 
 * ? their api btw is 5 request per minute if i remember it right.
 * 
 * ? So on each page's of my site we will reuse and reuse the previous fetched files from the local ` fetchedData ` object
 * 
 * TODO: Dont Forget to Change this to original url once youre finished or in presentation day
 * * Original Link:
 * * const fetchedData = {} // The Local storage
 * * const apiUrl = []
 */
const fetchAllData = async () => {
    try {
        const response = await Promise.all(apiURL.map(url => fetch(url)))

        // Get api json :)
        const dataArray = await Promise.all(response.map(data => data.json()))
    
        fetchedData = {
            homePageData: dataArray[0],
            sportsPageData: dataArray[1],
            artsPageData: dataArray[2],
            worldPageData: dataArray[3]
        }
        
        console.log(fetchedData)
    } catch(error) {
        console.log(`Failed to fetch, Check your apiKey bro. ${error}`)
    }
}


/** 
 * ! For Temporarily 
 */
const fetchData = async (filePath) => {
    try {
        const response = await fetch(filePath);
        const data = await response.json();

        if (data.status === 'OK') {
            data.results.forEach(newsPosts => {
                const newsPostTitle = newsPosts.title;
                console.log(newsPostTitle);
            });
        } else {
            console.log('Response didnt meet ERROR');
        }
    } catch(error) {
        console.log(`Failed to fetch, Check your apiKey bro. ${error}`);
    }
}

/**
 * For Search Bar Functionality
 */
const enableSearchBarFunctionality = () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    searchButton.addEventListener('click', () => {
        const searchValue = searchInput.value;

        console.log(searchValue);
    })
}
const filePafh = './example-api-data.json';

fetchData(filePafh);
enableSearchBarFunctionality()

// * Run this with html to see on console