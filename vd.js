const githubAPIURL = "https://api.github.com/users/";

const userProfile = document.getElementById('userProfile');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch and display user data
async function getUser(user) {
  try {
    const response = await fetch(githubAPIURL + user);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const userData = await response.json();
    displayUserInfo(userData);
  } catch (error) {
    userProfile.innerHTML = `<p>${error.message}</p>`;
  }
}

// Display user information
function displayUserInfo(user) {
  const userBox = `
    <div class="user-box">
      <div>
        <a href="${user.html_url}" target="_blank">
          <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </a>
      </div>
      <div class="user-info">
        <h2>${user.name || user.login}</h2>
        <div class="user-bio">
          <p>${user.bio || 'No bio available.'}</p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        </div>
        <ul class="meta-data">
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
      </div>
    </div>
  `;
  userProfile.innerHTML = userBox;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value.trim();
  if (user) {
    getUser(user);
    search.value = '';
  }
});
