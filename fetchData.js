
let fetchedData = {}

// let apiURL = [
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>",
//     "https://api.nytimes.com/svc/topstories/v2/idk.json?api-key=<api-key>"
// ]

// * For Testing ONly
let apiURL = [
    './example-api-data.json',
    './arts.json',
    './sports.json',
    './world.json'
]

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
            artsPageData: dataArray[1],
            sportsPageData: dataArray[2],
            worldPageData: dataArray[3]
        }
        
        return fetchedData
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
            fetchedData = {
                homePageData: data
            }

            return fetchedData
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


const convertAPIDates = (apiDate) => {
    const date = new Date(apiDate)

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
   
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

const displayDateToday = (data) => {
    const convertedFormalDate = convertAPIDates(data.last_updated)
    
    const dateTodayElement = document.getElementById('todays-date')

    dateTodayElement.innerHTML = `<p> ${convertedFormalDate} <br> Today\'s Agenda <p>`;
}

const getAPIResult = (data) => {
    return data.results
}

const displayDateTodayHotTopics = (data) => {
    const dataResults = getAPIResult(data)

    // ! Temporary News For now
    const temporaryNewsPost = dataResults[0]

    const hotTopicPublisher = document.getElementById('hot-topic-publisher');
    hotTopicPublisher.innerHTML = ` <p id="publisher"> ${temporaryNewsPost.byline} </p> <hr> <p id="date-published">${convertAPIDates(temporaryNewsPost.published_date)}</p>`

    const hotTopicTitle = document.getElementById('hot-topic-title')
    hotTopicTitle.innerHTML = `<h1>${temporaryNewsPost.title}</h1>`

    const hotTopicAbstract = document.getElementById('hot-topic-abstract')
    hotTopicAbstract.innerHTML = `<p>${temporaryNewsPost.abstract}</p>`
}

const displayTopStories = (data, sectionName, startingAPIPostIndex, endingAPIPostIndex) => {
    const dataResults = getAPIResult(data)

    const mainContainer = document.getElementById(sectionName)

    mainContainer.innerHTML = ''

    for (let i = startingAPIPostIndex; i <= endingAPIPostIndex; i++) {

        const images = dataResults[i].multimedia;
        const imagePost = images[0].url || './assets/image/IMG-Header-Page-0001.jpg';

        mainContainer.innerHTML += `
        <a href="${dataResults[i].url}" target="_blank">
            <div class="top-stories-container">
                    <div class="information-container">
                        <div id="top-stories-publisher">
                            <p>${dataResults[i].byline}</p>
                            <hr>
                            <p>${convertAPIDates(dataResults[i].published_date)}</p>
                        </div>
                        <div id="top-stories-title">
                            <h1>${dataResults[i].title}</h1>
                        </div>
                        <div id="top-stories-abstract">
                            <p>${dataResults[i].abstract}</p>
                        </div>

                        <div class="top-stories-read-more-btn">
                            <button>Read More</button>
                        </div>
                    </div>
                    <img src="${imagePost}" alt="">
                </div>
        </a>
        `
    }
}

const displayOtherStories = (data, sectionName, startingAPIPostIndex, endingAPIPostIndex) => {
    const dataResults = getAPIResult(data)

    const mainContainer = document.getElementById(sectionName)

    mainContainer.innerHTML = ''

    for (let i = startingAPIPostIndex; i <= endingAPIPostIndex; i++) {
        const images = dataResults[i].multimedia;
        const imagePost = images[0].url || './assets/image/IMG-Header-Page-0001.jpg';

        mainContainer.innerHTML += `
            <a href="${dataResults[i].url}" target="_blank">
                <div class="other-sports-news-container">
                    <img src="${imagePost}" alt="">
                    <h1>${dataResults[i].title}</h1>
                    <p>${dataResults[i].abstract}</p>
                    <img id="read-more" src="./assets/navigation-icons/Arrow 3.png" alt="">
                </div>
            </a>`;
    }
}

const filePafh = './example-api-data.json';

// const filePafh = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL'

const main = async () => {
    const data = await fetchAllData()
    console.log(data)
    const homePageData = data.homePageData;
    const artsPageData = data.artsPageData;
    const sportsPageData = data.sportsPageData;
    
    displayDateToday(homePageData)
    displayDateTodayHotTopics(homePageData)
    displayTopStories(homePageData, 'top-stories1',4,7)
    enableSearchBarFunctionality()
    displayOtherStories(sportsPageData, 'sports-stories',0,2)
    displayOtherStories(artsPageData, 'art-stories', 0, 2)
}

main()

// * Run this with html to see on console