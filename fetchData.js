

/** 
 *  TODO: Dont Forget to Change this to original url once youre finished or in presentation day
 *  * Original Link: 
 *  * const apiKey = '<api-key>' 
 *  * const url = `<api-link>`
 */


// ? This data function is needed for the real api uses
// * ====================================================
// const fetchData = async (url) => {
//     const response = await fetch(url)
//     const data = await response.json()
//     console.log(data)
// }

// fetchData(url)
// * ====================================================


const fs = require('fs').promises;
const path = require('path');

const fetchData = async (filePath) => {
    try {
        const notPermanentData = await fs.readFile(path.join(__dirname, filePath), 'utf-8');
        const data = JSON.parse(notPermanentData)
    
        if (data.status === 'OK') {
            data.results.forEach(newsPosts => {
                const newsPostTitle = newsPosts.title;
                console.log(newsPostTitle)
            });
        } else {
            console.log('Response didnt meet ERROR')
        }
    } catch(error) {
        console.log(`Failed to fetch, Check your apiKey bro. ${error}`)
    }
}

const filePafh = 'example-api-data.json';

fetchData(filePafh)