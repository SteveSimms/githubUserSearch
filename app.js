console.log('Hello multiverse!');
let theForm = document.getElementById('myForm');
let ulContainer = document.getElementById('searchResults');

theForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('You clicked the button');
    // get value from search input
    let theSearch = document.getElementById('mySearch').value;
    console.log(theSearch);
    // Clear search feild on submit
    (formReset = () => {
        document.getElementById('myForm').reset();
        console.log('You just reset the form!');
    })();

    // store theSearch in a variable called userName
    let userName = theSearch.split(' ').join('');//eliminates the space between first Name and last Name allowing us to search by full name or first name
    // console.log(userName);
    /**
     * line 17 explination
     * split() turns string to an array 
     * The join() method creates and returns a new string by concatenating 
     * all of the elements in an array (or an array-like object),
     *  separated by commas or a specified separator string.
     * 
     * 
     */

    //Ajax call logic 
    fetch('https://api.github.com/search/users?q=' + userName)//https://api.github.com/search/users?q={query}{&page,per_page,sort,order}//returning single userhttps://api.github.com/users/
        .then((response) => {
            if (response.ok) {
                return response.json()// turns json to readable stream
            } else {
                return Promise.reject(response)
            }
        }).then((data) => {// returns our response if ok from line 34
            for (let user in data.items) {//loops through items in JSON(data.items)
                let li = document.createElement('li');// creates new element for every item in data
                li.innerHTML = data.items[user].login;//populates created item with data
                ulContainer.appendChild(li);//appends(adds) an li for each user in data.items to ul #searchResults stored in var named ulContainer 
                console.log(data.items[user].login);//logging users to console
                //TODO: FIgure out how to clear data after every search
            }
        }).catch((err) => {//returns warning  error 
            console.warn('Something went wrong', err);
        });
});