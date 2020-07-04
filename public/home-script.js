// Select the search form
const searchForm = document.getElementById('search-form');
// Select the search input
const usersName = document.getElementById('users-name');
// Select the search button
const btnUsers = document.getElementById('search-btn');
// Select the row of card decks
const cardDeck = document.getElementsByClassName('row')[0];

// Add Event listener for the search button
searchForm.addEventListener('submit', function(e){
  // Prevent Form from automatic submitting
  e.preventDefault();
  getUsers();
});


async function getUsers() {
  // Clear any previous shown cards
  cardDeck.innerHTML='';

  // Get name search value
  var searchValue = usersName.value.trim();

  // Get all Users that have such name
  const usersUrl = `https://api.github.com/search/users?q=${searchValue}`;

  // Make AJAX call to get users, then call callback function
  makeAjaxCall(usersUrl, "GET", showFetchedUsers);

}

function makeAjaxCall(url, methodType, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(methodType, url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("xhr done successfully");
        var resp = xhr.responseText;
        var respJson = JSON.parse(resp);
        // Get the response and call the callback function
        callback(respJson.items);
      } else {
        console.log("xhr failed");
      }
    } else {
      console.log("xhr processing going on");
    }
  }
  console.log("request sent succesfully");
}

/*
* This function shows the fetched users in our screen
* Card shape for each user
* param: fetchedUsers -> Users received from api through ajax call, to be shown
*/
function showFetchedUsers(fetchedUsers) {
  // Get only the first 10 users, or less
  let length = fetchedUsers.length > 9? 10:fetchedUsers.length;
  if (!fetchedUsers) {
    console.log("No search result");
  } else {
    for(let i=0 ; i<length ; i++) {
      // Create column element
      let columnCard = document.createElement('div');
      columnCard.className = 'col mb-4';

      // Create Card element
      let card = document.createElement('div');
      card.className = 'card h-100';

      // Create Card Image element, and assign it with user profile picture
      let image = document.createElement('img');
      image.className = 'card-img-top';
      image.src = fetchedUsers[i].avatar_url;

      // Create Card Body element
      let cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      // Create Unordered list element
      let list = document.createElement('ul');
      list.className = 'list-group list-group-flush';

      // Create List Item element, and assign to it user's username
      let listItem1 = document.createElement('li');
      listItem1.className = 'list-group-item card-font';
      listItem1.textContent = 'Username: ' + fetchedUsers[i].login;

      // Create List Item element, and assign to it user's profile link
      let listItem2 = document.createElement('li');
      listItem2.className = 'list-group-item card-font';
      listItem2.innerHTML = "Profile URL: <a href='"+ fetchedUsers[i].html_url +"'> CLick Here </a>";

      // Link each child with its parent
      list.appendChild(listItem1);
      list.appendChild(listItem2);

      cardBody.appendChild(list);
      card.appendChild(image);
      card.appendChild(cardBody);
      columnCard.appendChild(card);
      cardDeck.appendChild(columnCard);
  }
}
}
