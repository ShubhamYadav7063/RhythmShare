// let username = document.getElementById("user-name");
// let playlist = document.getElementById("playlist-link");
// let addPlaylist = document.getElementById("add-btn");
// const container = document.getElementById("playlists");
// let userID = document.getElementById("profile-link");
// // function clickButton(e) {
// //     e.preventDefault()
// //     playlist()
// // }
// // window.addEventListener("DOMContentLoaded", loadSavedPlaylists);

// addPlaylist.addEventListener("click", function () {
//     const card = document.createElement("div");
//     card.classList.add("playlist-added");
//     card.classList.add("card");
//     addUserProfile(username, userID, card);
//     embedPlaylist(playlist, container, card);
//     savePlaylistDetails(username, userID, playlist);
// });

// function addUserProfile(username, userID, card) {
//     const cardHeader = document.createElement("div");
//     if (username.value === "") {
//         alert("Enter your name");
//         return;
//     } else {
//         const name = document.createElement("p");
//         name.textContent = username.value;
//         name.classList.add("user-name");
//         cardHeader.appendChild(name);
//         // card.appendChild(name);
//     }
//     // console.log(profileLink);
//     if (userID.value !== "") {
//         const profileButton = document.createElement("button");
//         const profileLink = document.createElement("a");
//         profileLink.setAttribute("target", "_blank");
//         profileLink.href = userID.value;
//         profileLink.textContent = "Follow Now";
//         profileButton.classList.add("btn");
//         // profileButton.setAttribute("padding","2rem")
//         profileButton.appendChild(profileLink);
//         cardHeader.appendChild(profileButton);
//     }
//     cardHeader.classList.add("card-header");

//     card.appendChild(cardHeader);

//     // username.value=""
//     // userID.value=""
// }

// function embedPlaylist(playlist, container, card) {
//     if (playlist.value === "") {
//         alert("Enter playlist link");
//         return;
//     }
//     const spotifyPlaylistRegex =
//         /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;

//     if (!spotifyPlaylistRegex.test(playlist.value)) {
//         alert(
//             "Invalid Spotify playlist link. Please use a valid Spotify playlist URL."
//         );
//         return;
//     }
//     try {
//         const link = document.createElement("iframe");
//         link.style.borderRadius = "12px";
//         var newString = playlist.value.replace(
//             "https://open.spotify.com/playlist",
//             "https://open.spotify.com/embed/playlist"
//         );
//         link.src = newString;
//         link.setAttribute("width", "100%");
//         link.setAttribute("target", "_blank");
//         link.setAttribute("height", "380");
//         link.setAttribute("allowfullscreen", "");
//         link.setAttribute("frameborder", "0");
//         link.setAttribute(
//             "allow",
//             "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//         );
//         link.setAttribute("loading", "lazy");
//         card.appendChild(link);
//         container.appendChild(card);
//     } catch (error) {
//         console.error("Error embedding Spotify playlist:", error);
//         alert("Failed to embed playlist. Please check the link and try again.");
//     }
//     // playlist.value=""
// }

// function savePlaylistDetails(username, userID, playlistLink) {
//     const container = document.getElementById("playlists");
//     const cards = container.getElementsByClassName("card");
//     const playlists = [];

//     for (let card of cards) {
//         const playlistDetails = {
//             profileName: username.value,
//             profileId: userID.value,
//             playlistLink: playlistLink.value,
//         };
//         playlists.push(playlistDetails);
//     }

//     localStorage.setItem("spotifyPlaylistDetails", JSON.stringify(playlists));
// }

// function loadSavedPlaylists() {
//     const savedData = localStorage.getItem("spotifyPlaylistDetails");

//     if (savedData) {
//         const data = JSON.parse(savedData);
//         console.log(data);
//         const container = document.getElementById("playLists");

//         data.array.forEach((playlistDetails,index) => {
//             const card = document.createElement("div");
//             card.classList.add("playlist-added");
//             card.classList.add("card");
//             addUserProfile(playlistDetails.profileName, playlistDetails.profileId, card);
//             embedPlaylist(playlistDetails.playlistLink, container, card);
//         });

// const username = document.getElementById("user-name");
// const playlist = document.getElementById("playlist-link");
// const userID = document.getElementById("profile-link");

// username.value = data.profileName || " ";
// userID.value = data.profileId | "";
// playlist.value = data.playlistLink || " ";
//     }
// }
let username = document.getElementById("user-name");
let playlist = document.getElementById("playlist-link");
let addPlaylist = document.getElementById("add-btn");
const container = document.getElementById("playlists");
let userID = document.getElementById("profile-link");
const accountNameContainer = document.querySelector(".account-details");
const logoutBtn = document.getElementById("logout-btn");
// function clickButton(e) {
//     e.preventDefault()
//     playlist()
// }
// window.addEventListener("DOMContentLoaded", loadSavedPlaylists);

addPlaylist.addEventListener("click", function () {
    const card = document.createElement("div");
    card.classList.add("playlist-added");
    card.classList.add("card");
    addUserProfile(username, userID, card);
    embedPlaylist(playlist, container, card);
    savePlaylistsToLocalStorage();
});
window.addEventListener("DOMContentLoaded", loadPlaylistsFromLocalStorage);

function addUserProfile(username, userID, card, isLoading = false) {
    const cardHeader = document.createElement("div");
    const deletebutton = document.createElement("button");
    if (!isLoading && username.value === "") {
        alert("Enter your name");
        return;
    } else {
        const name = document.createElement("p");
        name.textContent = username.value;
        name.classList.add("user-name");
        cardHeader.appendChild(name);
        // card.appendChild(name);
    }
    // console.log(profileLink);
    if (userID.value !== "") {
        const profileButton = document.createElement("button");
        const profileLink = document.createElement("a");
        profileLink.setAttribute("target", "_blank");
        profileLink.href = userID.value;
        profileLink.textContent = "Follow Now";
        profileButton.classList.add("btn");
        profileButton.classList.add("user-follow");
        profileButton.appendChild(profileLink);
        cardHeader.appendChild(profileButton);
    }
    deletebutton.classList.add("close-btn");
    deletebutton.classList.add("btn");
    deletebutton.textContent = "X";
    cardHeader.appendChild(deletebutton);

    deletebutton.addEventListener("click", function () {
        removePlaylist(card);
    });

    cardHeader.classList.add("card-header");

    card.appendChild(cardHeader);

    // username.value=""
    // userID.value=""
}

function embedPlaylist(playlist, container, card, isLoading = false) {
    if (!isLoading && playlist.value === "") {
        alert("Enter playlist link");
        return;
    }
    const spotifyPlaylistRegex =
        /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;

    if (!isLoading && !spotifyPlaylistRegex.test(playlist.value)) {
        alert(
            "Invalid Spotify playlist link. Please use a valid Spotify playlist URL."
        );
        return;
    }
    try {
        const link = document.createElement("iframe");
        link.style.borderRadius = "12px";
        var newString = playlist.value.replace(
            "https://open.spotify.com/playlist",
            "https://open.spotify.com/embed/playlist"
        );
        link.src = newString;
        link.setAttribute("width", "100%");
        link.setAttribute("target", "_blank");
        link.setAttribute("height", "380");
        link.setAttribute("allowfullscreen", "");
        link.setAttribute("frameborder", "0");
        link.setAttribute(
            "allow",
            "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        );
        link.setAttribute("loading", "lazy");
        card.appendChild(link);
        container.appendChild(card);
    } catch (error) {
        console.error("Error embedding Spotify playlist:", error);
        alert("Failed to embed playlist. Please check the link and try again.");
    }
    // playlist.value=""
}

function savePlaylistsToLocalStorage() {
    const container = document.getElementById("playlists");
    const cards = container.getElementsByClassName("card");
    const playlists = [];

    for (let card of cards) {
        const profileNameElement = card.querySelector(".user-name");
        const profileButtonElement = card.querySelector(".card-header a");
        const playlistIframeElement = card.querySelector("iframe");

        if (!profileNameElement || !playlistIframeElement) {
            continue; // Skip empty or incomplete cards
        }

        const playlistDetails = {
            profileName: profileNameElement
                ? profileNameElement.textContent
                : "",
            profileId: profileButtonElement ? profileButtonElement.href : "",
            playlistLink: playlistIframeElement
                ? playlistIframeElement.src.replace(
                      "https://open.spotify.com/embed/playlist",
                      "https://open.spotify.com/playlist"
                  )
                : "",
        };
        playlists.push(playlistDetails);
    }

    localStorage.setItem("spotifyPlaylistDetails", JSON.stringify(playlists));
}

// New function to load playlists from localStorage
function loadPlaylistsFromLocalStorage() {
    const savedData = localStorage.getItem("spotifyPlaylistDetails");

    if (savedData) {
        const playlists = JSON.parse(savedData);
        const container = document.getElementById("playlists");

        playlists.forEach((playlistDetails) => {
            const card = document.createElement("div");
            card.classList.add("playlist-added", "card");

            addUserProfile(
                { value: playlistDetails.profileName },
                { value: playlistDetails.profileId },
                card,
                true
            );
            embedPlaylist(
                { value: playlistDetails.playlistLink },
                container,
                card,
                true
            );
        });
    }
}

function removePlaylist(card) {
    card.remove();

    const container = document.getElementById("playlists");
    const remainingCards = container.getElementsByClassName("card");
    const updatedPlaylists = [];
    for (let remainingCard of remainingCards) {
        const profileNameElement = remainingCard.querySelector(".user-name");
        const profileButtonElement =
            remainingCard.querySelector(".card-header a");
        const playlistIframeElement = remainingCard.querySelector("iframe");

        if (!profileNameElement || !playlistIframeElement) {
            continue; // Skip incomplete cards
        }

        const playlistDetails = {
            profileName: profileNameElement.textContent,
            profileId: profileButtonElement ? profileButtonElement.href : "",
            playlistLink: playlistIframeElement.src.replace(
                "https://open.spotify.com/embed/playlist",
                "https://open.spotify.com/playlist"
            ),
        };
        updatedPlaylists.push(playlistDetails);
    }

    localStorage.setItem(
        "spotifyPlaylistDetails",
        JSON.stringify(updatedPlaylists)
    );
}

// document.addEventListener("DOMContentLoaded", function () {
//     // Retrieve the current user from localStorage
//     const currentUser = localStorage.getItem("currentUser");

//     if (currentUser) {
//         // Display welcome message with the username
//         accountNameContainer.innerHTML = `<span>Welcome, ${currentUser}!!</span>`;
//         const logout = document.createElement("button");
//         logout.classList.add("btn");
//         logout.textContent = "Logout";
//         logout.setAttribute("id", "logout-Btn");
//         accountNameContainer.appendChild(logout);
//     }
// });

// logoutBtn.addEventListener("click", function () {
//     localStorage.removeItem("currentUser");
//     accountNameContainer.innerHTML = `<button class="btn" onclick="window.location.href='login.html'"> Login </button>
//     <button class="btn" onclick="window.location.href='signup.html'"> SignUp </button>`;
//     alert("You have been logged out!");

//     window.location.href = "index.html";
// });

const navState = {
    updateNavbar(isLoggedIn, username = localStorage.getItem("currentUser")) {
        if (isLoggedIn) {
            accountNameContainer.innerHTML = `
                <span><img src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" class="user-icon" alt="user icon">${username.replaceAll(
                    '"',
                    ""
                )}!!
                <button class="btn" id="logout-btn">Logout</button></span>
            `;
            document
                .getElementById("logout-btn")
                .addEventListener("click", this.handleLogout);
        } else {
            accountNameContainer.innerHTML = `
                <button class="btn" onclick="window.location.href='/form/login.html'">Login</button>
                <button class="btn" onclick="window.location.href='/form/signup.html'">SignUp</button>
            `;
        }
    },

    handleLogout() {
        localStorage.removeItem("currentUser");
        navState.updateNavbar(false);
        alert("You have been logged out!");
        window.location.href = "index.html";
    },
};

// Initial check on page load
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        navState.updateNavbar(true, currentUser);
    } else {
        navState.updateNavbar(false);
    }
});
