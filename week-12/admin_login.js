const login = [
    {
        email: [
            "admin123@gmail.com",
            "rabdulqadeer96@gmail.com"
        ],
        password: [
            "admin",
            "pakistan"
        ]
    }
];

var admin_password = document.querySelector('#admin_password');
var admin_email = document.querySelector('#admin_email');

function user_login(event) {
    event.preventDefault();  // Prevents the form from reloading the page

    for (let i = 0; i < login[0].email.length; i++) {
        if (login[0].email[i] === admin_email.value && login[0].password[i] === admin_password.value) {
            alert('Welcome! You have signed in as admin.');

            // Enable the tabs
            document.querySelector('a[href="#teachers"]').classList.remove('disabled');
            document.querySelector('a[href="#Students"]').classList.remove('disabled');
            document.querySelector('a[href="#courses"]').classList.remove('disabled');

            // Hide the login form
            document.querySelector('.form').style.display = 'none';

            return; // Exit function after successful login
        }
    }

    // Handle invalid login attempt
    alert('Invalid email or password!');
}

// Attach the user_login function to the form submit event
document.querySelector('form').addEventListener('submit', user_login);
