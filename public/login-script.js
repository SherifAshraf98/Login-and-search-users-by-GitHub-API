// Select the Login button
const signBtn = document.getElementById('btn');
// Select the access token input
const tokenInput = document.getElementById('accessTokenInput');
// Select the Login Token form
const tokenform = document.getElementById('tokenForm');

tokenform.addEventListener('submit', function(e) {
  // Prevent Form from automatic submitting
  e.preventDefault();

  const token = tokenInput.value.trim();
  // Call the user info API using the fetch browser library
  fetch('https://api.github.com/user', {
      headers: {
        // Include the token in the Authorization header
        Authorization: 'token ' + token
      }
    })
    // Parse the response as JSON
    .then(function(res) {
      if (res.status !== 200) {
        // If there is error
        tokenForm.action = '/unauthorized';
        tokenForm.submit();
      } else {
        tokenForm.submit();
      }
      res.json();
    })

});
