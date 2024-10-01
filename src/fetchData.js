
let fetchedData = {}

let apiURL = [
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL",
    "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL",
    "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL",
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL"
]

// * For Testing ONly
// let apiURL = [
//     './example-api-data.json',
//     './arts.json',
//     './sports.json',
//     './world.json'
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

const displayDateTodayHeaderIMG = (data) => {
    const headerIMG = document.getElementById('header-img');
   

    if (data.section === 'home') {
         headerIMG.innerHTML = `
            <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1727614501/k8nmhgab02qcy5ts07fu.jpg" alt="">
            <h1 id="page-name">News</h1>
            <h1 id="skyline">Skyline</h1>`
    } else if (data.section === 'Arts') {
        headerIMG.innerHTML = `
            <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1727614500/mxvt2aquhhk5s99g4npn.jpg" alt="">
            <h1 id="page-name">Arts</h1>
            <h1 id="skyline">Skyline</h1>`
    } else if (data.section === 'Sports') {
        headerIMG.innerHTML = `
            <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1727614501/k8nmhgab02qcy5ts07fu.jpg" alt="">
            <h1 id="page-name">Sports</h1>
            <h1 id="skyline">Skyline</h1>`
    } else if (data.section === 'World News') {
        headerIMG.innerHTML = `
            <img src="https://res.cloudinary.com/dhisbk3b2/image/upload/v1727614501/k8nmhgab02qcy5ts07fu.jpg" alt="">
            <h1 id="page-name">World</h1>
            <h1 id="skyline">Skyline</h1>`
    }

}

const displayDateTodayHotTopics = (data) => {
    const dataResults = getAPIResult(data)

    let currentIndex = 0

    displayDateTodayHeaderIMG(data)

    const circles = document.querySelectorAll('.circle')

    // * Function to update the active circle color
    const updateActiveCircle = (index) => {
        circles.forEach((circle, i) => {
            if (i === index) {
                circle.classList.add('active')
            } else {
                circle.classList.remove('active')
            }
        })
    }

    const updateHotTopicContent = (index) => {
        const selectedNewsPost = dataResults[index]

        const hotTopicPublisher = document.getElementById('hot-topic-publisher')
        hotTopicPublisher.classList.remove('summon-text')
        // * Reference Solution: https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
        hotTopicPublisher.offsetWidth; // * Solution for Animation restart
        hotTopicPublisher.classList.add('summon-text')
        
        hotTopicPublisher.innerHTML = ` <p id="publisher"> ${selectedNewsPost.byline} </p> <hr> <p id="date-published">${convertAPIDates(selectedNewsPost.published_date)}</p>`;
        
        const hotTopicTitle = document.getElementById('hot-topic-title')
        hotTopicTitle.classList.remove('summon-text')
        hotTopicTitle.offsetWidth; // * Solution for Animation restart
        hotTopicTitle.classList.add('summon-text')

        hotTopicTitle.innerHTML = `<h1>${selectedNewsPost.title}</h1>`
        
        const hotTopicAbstract = document.getElementById('hot-topic-abstract')
        hotTopicAbstract.innerHTML = `<p>${selectedNewsPost.abstract}</p>`
        hotTopicAbstract.classList.remove('summon-text')
        hotTopicAbstract.offsetWidth; // * Solution for Animation restart
        hotTopicAbstract.classList.add('summon-text')

        const hotReadMore = document.getElementById('read-more-top-news')
        hotReadMore.innerHTML = `<a href="${selectedNewsPost.url}" target="_blank"><button>Read More</button></a>`;

        updateActiveCircle(index)
    }

    updateHotTopicContent(currentIndex)

    document.getElementById('cnav-btn1').addEventListener('click', () => {
        currentIndex = 0;
        updateHotTopicContent(currentIndex)
    })

    document.getElementById('cnav-btn2').addEventListener('click', () => {
        currentIndex = 1;
        updateHotTopicContent(currentIndex)
    })

    document.getElementById('cnav-btn3').addEventListener('click', () => {
        currentIndex = 2;
        updateHotTopicContent(currentIndex)
    })

    document.getElementById('cnav-btn4').addEventListener('click', () => {
        currentIndex = 3;
        updateHotTopicContent(currentIndex)
    })

    // * Infinite Loop but will only have 4 indexes
    document.getElementById('previous-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + 4) % 4
        updateHotTopicContent(currentIndex)
    })

    document.getElementById('forward-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % 4
        updateHotTopicContent(currentIndex)
    })
}

const displayTopStories = (data, sectionName, startingAPIPostIndex, endingAPIPostIndex) => {
    const dataResults = getAPIResult(data)

    const mainContainer = document.getElementById(sectionName)

    mainContainer.innerHTML = ''

    for (let i = startingAPIPostIndex; i <= endingAPIPostIndex; i++) {

        const images = dataResults[i].multimedia || ['./assets/image/IMG-Header-Page-0001.jpg'];
        const imagePost = (images && images.length > 0) ? images[0].url : './assets/image/IMG-Header-Page-0001.jpg';

        mainContainer.innerHTML += `
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
                    <a href="${dataResults[i].url}" target="_blank">
                        <div class="top-stories-read-more-btn">
                            <button>Read More</button>
                        </div>
                    </a>
                </div>
                <a href="${dataResults[i].url}" target="_blank">
                    <img src="${imagePost}" alt="">
                </a>
            </div>

        `
    }
}

const displayOtherStories = (data, sectionName, signageName, startingAPIPostIndex, endingAPIPostIndex) => {
    const dataResults = getAPIResult(data)

    const mainContainer = document.getElementById(sectionName)

    mainContainer.innerHTML = ''

    const signage = document.getElementById(signageName);

    signage.innerText = data.section

    for (let i = startingAPIPostIndex; i <= endingAPIPostIndex; i++) {
        const images = dataResults[i].multimedia || ['./assets/image/IMG-Header-Page-0001.jpg'];
        const imagePost = (images && images.length > 0) ? images[0].url : './assets/image/IMG-Header-Page-0001.jpg';

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

// * For Changing Contents for just One Html! :D
const navigationButtons = (data) => {
    const homePageData = data.homePageData;
    const artsPageData = data.artsPageData;
    const sportsPageData = data.sportsPageData;
    const worldPageData = data.worldPageData;

    const homeButton = document.getElementById('home-button')
    const artsButton = document.getElementById('arts-button')
    const sportsButton = document.getElementById('sports-button')
    const worldButton = document.getElementById('world-button')

    // TODO: Planning a system that will know the exact length of a results to avoid extra index errors

    const showHomePage = () => {
        displayDateTodayHotTopics(homePageData)

        displayTopStories(homePageData, 'top-stories1',4,7)
        
        displayOtherStories(sportsPageData, 'sports-stories','signage1',0,2)
        
        displayOtherStories(artsPageData, 'art-stories','signage2', 0, 2)
        
        displayTopStories(homePageData, 'top-stories2', 8,11)
    }

    const showArtsPage = () => {
        displayDateTodayHotTopics(artsPageData)

        displayTopStories(artsPageData, 'top-stories1',4,7)
        
        displayOtherStories(homePageData, 'sports-stories','signage1',0,2)
        
        displayOtherStories(worldPageData, 'art-stories','signage2', 0, 2)
        
        displayTopStories(artsPageData, 'top-stories2', 8,11)
    }

    const showSportsPage = () => {
        displayDateTodayHotTopics(sportsPageData)

        displayTopStories(sportsPageData, 'top-stories1',4,7)
        
        displayOtherStories(artsPageData, 'sports-stories', 'signage1',0,2)
        
        displayOtherStories(homePageData, 'art-stories', 'signage2', 0, 2)
        
        displayTopStories(sportsPageData, 'top-stories2', 8,9)
    }

    const showWorldPage = () => {
        displayDateTodayHotTopics(worldPageData)

        displayTopStories(worldPageData, 'top-stories1',4,7)
        
        displayOtherStories(sportsPageData, 'sports-stories', 'signage1',0,2)
        
        displayOtherStories(homePageData, 'art-stories', 'signage2', 0, 2)
        
        displayTopStories(worldPageData, 'top-stories2', 8,11)
    }

    homeButton.addEventListener('click', showHomePage);
    artsButton.addEventListener('click', showArtsPage);
    sportsButton.addEventListener('click', showSportsPage);
    worldButton.addEventListener('click', showWorldPage);
}

const filePafh = './example-api-data.json';

// const filePafh = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=I3SCMGvGeTN6bzgOgpbFyDOaAcDIlOzL'

const main = async () => {
    const data = await fetchAllData()
    console.log(data)
    const homePageData = data.homePageData;
    const artsPageData = data.artsPageData;
    const sportsPageData = data.sportsPageData;

    // * ADD HTML STRUCTURES * //
    displayDateToday(homePageData)
    
    displayDateTodayHotTopics(homePageData)
    
    displayTopStories(homePageData, 'top-stories1',4,7)
    
    enableSearchBarFunctionality()
    
    displayOtherStories(sportsPageData, 'sports-stories', 'signage1',0,2)
    
    displayOtherStories(artsPageData, 'art-stories', 'signage2', 0, 2)
    
    displayTopStories(homePageData, 'top-stories2', 8,11)

    navigationButtons(data)
    // * ADD HTML STRUCTURES * //
}

main()

// * Run this with html to see on console