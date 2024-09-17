

/** 
 *  TODO: Dont Forget to Change this to original url once youre finished or in presentation day
 *  * Original Link: 
 *  * const apiKey = '<api-key>' 
 *  * const url = `<api-link>`
 */

const fetchData = async (filePath) => {
    try {
        const notPermanentData = await fetch(filePath);
        const data = await notPermanentData.json()

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

const filePafh = './example-api-data.json';

fetchData(filePafh)

// * Run this with html to see on console