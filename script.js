
// REGISTER

let registrationform = document.getElementById("registrationform");

if (registrationform) {

    registrationform.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("Confirmpassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let user = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful!");

        window.location.href = "login.html";
    });
}

// LOGIN

let loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
     e.preventDefault();
    let loginUsername = document.getElementById("loginUsername").value;
    let loginPassword = document.getElementById("loginPassword").value;
    let storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
        alert("Please Register first!");
         window.location.href = "Register.html";
        return;
        }
         if (
            loginUsername === storedUser.username &&
            loginPassword === storedUser.password
        ) {
         alert("Login Successful!");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "jokes.html";
 } else {
            alert("Invalid Username or Password!");
        }
    });
}

// JOKES PAGE

const getJokeBtn = document.getElementById("getJokeBtn");

const jokeText = document.getElementById("jokeText");

const favoriteBtn = document.getElementById("favoriteBtn");

const saveBtn = document.getElementById("saveBtn");

const shareBtn = document.getElementById("shareBtn");

async function getRandomJoke() {

    try {
        jokeText.textContent = "Loading joke... 😂";

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }
        const data = await response.json();

        jokeText.textContent = data.setup + " " + data.punchline;

    } catch (error) {

        jokeText.textContent = "Sorry! Unable to get a joke 😔";

        console.error(error);
    }
}


// Get Another Joke

if (getJokeBtn && jokeText) {

    getJokeBtn.addEventListener( "click",getRandomJoke);
    
    getRandomJoke();
}

// FAVORITE BUTTON

if (favoriteBtn && jokeText) {

    favoriteBtn.addEventListener("click", function () {

            let joke = jokeText.textContent;

            if (
                joke === "" ||
                joke === "Your funny joke will appear here! 😄" ||
                joke === "Loading joke... 😂"
            ) {

                alert("Please generate a joke first!");

                return;
            }

            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            if (favorites.includes(joke)) {
                alert(
                    "This joke is already in Favorites ❤️"
                );

                return;
            }

            favorites.push(joke);

            localStorage.setItem("favorites",JSON.stringify(favorites));

            alert( "Joke added to Favorites ❤️");
        }
    );
}

// SAVE BUTTON
    if (saveBtn && jokeText) {
        saveBtn.addEventListener("click",function () {
     let joke = jokeText.textContent;
    if (joke === "" || joke === "Your funny joke will appear here! 😄") {
     alert("Please generate a joke first!");
        return;
    }
    let savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
     if (savedJokes.includes(joke)) {
        alert("This joke is already saved! 💾");
        return;
         }
        savedJokes.push(joke);
        localStorage.setItem( "savedJokes",JSON.stringify(savedJokes) );
        alert("Joke saved successfully! 💾");
        }
    );
}
// SHARE BUTTON
if (shareBtn && jokeText) {

    shareBtn.addEventListener(
        "click",
        function () {

            if (navigator.share) {

                navigator.share({
                    title: "Random Joke",
                    text: jokeText.textContent
                });

            } else {

                alert(
                    "Sharing is not supported on this browser."
                );
            }
        }
    );
}

// my jokes PAGE

const favoritesList = document.getElementById("favoritesList");
if (favoritesList) {
     let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
     if (favorites.length === 0) {
         favoritesList.innerHTML =
            "<p>No favorite jokes yet ❤️</p>";
} else {
       favorites.forEach(function (joke) {
     let jokeCard = document.createElement("div");
            jokeCard.className = "myjoke-card";
        let jokeParagraph = document.createElement("p");
            jokeParagraph.textContent = joke;
        let removeButton = document.createElement("button");
         removeButton.textContent = "Remove ❤️";
        jokeCard.appendChild(jokeParagraph);
          jokeCard.appendChild(removeButton);
           favoritesList.appendChild(jokeCard);
            removeButton.addEventListener("click", function () {
            favorites = favorites.filter(function (item) {
                return item !== joke;
            });
                localStorage.setItem( "favorites", JSON.stringify(favorites) );
                 jokeCard.remove();
                if (favorites.length === 0) {
                    favoritesList.innerHTML ="<p>No favorite jokes yet ❤️</p>";
                }
            });
        });
    }
}

//    SAVED JOKES
const savedList = document.getElementById("savedList");
if (savedList) {
    let savedJokes =
        JSON.parse(localStorage.getItem("savedJokes")) || [];
     if (savedJokes.length === 0) {
        savedList.innerHTML =
            "<p>No saved jokes yet 💾</p>";
} else {
        savedJokes.forEach(function (joke) {
        let jokeCard = document.createElement("div");
            jokeCard.className = "myjoke-card";
        let jokeParagraph = document.createElement("p");
            jokeParagraph.textContent = joke;
        let removeButton = document.createElement("button");
            removeButton.textContent = "Remove 💾";
            jokeCard.appendChild(jokeParagraph);
            jokeCard.appendChild(removeButton);
        savedList.appendChild(jokeCard);
        removeButton.addEventListener("click", function () {
             savedJokes = savedJokes.filter(function (item) {
                    return item !== joke;
                });
                localStorage.setItem(
                    "savedJokes",
                    JSON.stringify(savedJokes)
                );
                 jokeCard.remove();
                 if (savedJokes.length === 0) {
                    savedList.innerHTML =
                        "<p>No saved jokes yet 💾</p>";
                }
            });
        });
    }
}