const accountName = document.querySelector(".accountDetails");
// console.log(accountName);
const signUpform = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
let userData = JSON.parse(localStorage.getItem("userData")) || [];

if (signUpform) {
    signUpform.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = signUpform.name.value;
        const userName = signUpform.username.value;
        const password = signUpform.password.value;

        if (userData.find((user) => user.username == userName)) {
            alert("username already exists");
            return;
        }

        userData.push({
            name,
            userName,
            password,
        });

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", userName);

        alert("Account created!!");

        document.getElementById("signupForm").reset();
        window.location.href = "index.html";
    });
}
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userName = loginForm.username.value;
        const password = loginForm.password.value;

        const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

        const user = storedUsers.find(
            (u) => u.userName === userName && u.password === password
        );

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user.userName));
            alert("Login Successful");
            document.getElementById("loginForm").reset();
            window.location.href = "index.html";
        } else {
            alert("Invalid Credentials");
        }
    });

    // function login(username, password) {
    //     let users = JSON.parse(localStorage.getItem("users")) || [];
    //     let user = users.find(
    //         (u) => u.username == username && u.password == password
    //     );

    //     if (user) {
    //         localStorage.setItem("currentUser", JSON.stringify(user));
    //         alert("Login Successful");
    //     } else {
    //         alert("Invalid Credentials");
    //     }
    // }
}
