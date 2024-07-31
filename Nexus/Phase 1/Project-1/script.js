// Get the elements by their IDs
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const socialContainer = document.querySelector('.social-container');
const inputs = document.querySelectorAll('input');
const signupPassword = document.getElementById('signup-password');
const toggleSignupPassword = document.getElementById('toggle-signup-password');
const signinPassword = document.getElementById('signin-password');
const toggleSigninPassword = document.getElementById('toggle-signin-password');
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');
const regex = /^[a-zA-Z]+$/;
const name1 = document.getElementById('name1');

// Define the colors
const activeColor = '#3a8f3c'; // Color for active state
const errorColor = '#f52c2c'; // Color for error state
const warningColor = '#e3cf2f'; // Color for warning state

// Keep track of the previously focused input
let previousInput = null;

// Function to apply styles to the focused input
function applyInputStyles(input) {
    input.style.borderRadius = '4px';
    input.style.borderColor = activeColor;
    input.style.border = `1px solid ${activeColor}`;
    input.style.color = activeColor;
    input.style.backgroundColor = 'white';
    input.style.setProperty('--placeholder-color', activeColor); // Change placeholder color
}

// Function to revert styles of an input
function revertInputStyles(input) {
    input.style.borderRadius = '4px'; // Default border-radius
    input.style.borderColor = '#ccc'; // Default border-color
    input.style.border = '1px solid #ccc'; // Default border
    input.style.color = activeColor; // Default text color when not focused
    input.style.backgroundColor = '#eee'; // Default background color
    input.style.setProperty('--placeholder-color', '#aaa'); // Default placeholder color
}

// Function to apply error styles to an input
function applyErrorStyles(input) {
    input.style.borderColor = errorColor;
    input.style.border = `1px solid ${errorColor}`;
    input.style.color = errorColor;
    input.style.backgroundColor = 'white';
    input.style.setProperty('--placeholder-color', errorColor); // Change placeholder color to error color
}

// Function to apply warning styles to an input
function applyWarningStyles(input) {
    input.style.borderColor = warningColor;
    input.style.border = `1px solid ${warningColor}`;
    input.style.color = warningColor;
    input.style.backgroundColor = 'white';
    input.style.setProperty('--placeholder-color', warningColor); // Change placeholder color to warning color
}

// Function to check if all inputs are filled
function areInputsFilled(form) {
    const formInputs = form.querySelectorAll('input');
    let allFilled = true;

    formInputs.forEach(input => {
        if (!input.value.trim()) {
            applyErrorStyles(input);
            allFilled = false;
        } else {
            revertInputStyles(input); // Revert error styles if the input is filled
        }
    });

    return allFilled;
}

// Add click event listener to show the signup form
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active"); // Switch to the sign-up form
    
        socialContainer.style.display = 'none'; // Hide the social container after a delay
     // Delay for 600 milliseconds (match this with your CSS transition duration)
    document.title = 'Sign Up'; // Change the document title to "Sign Up"
});

// Add click event listener to show the login form
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active"); // Switch to the sign-in form after a delay
    
        document.title = 'Login'; // Change the document title to "Login"
    setTimeout(() => {
        socialContainer.style.display = 'flex'; // Show the social container
        
    }, 1000); // Delay for 600 milliseconds (match this with your CSS transition duration)
});

// Add submit event listener to the signup form
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (areInputsFilled(signUpForm)) {
        let validationPassed = true;

        // Check if the name is valid
        if (!regex.test(name1.value)) {
            alert('Invalid Name');
            name1.style.borderColor = errorColor;
            validationPassed = false; // Set flag to false if validation fails
        }

        // Check if the password length is sufficient
        if (signupPassword.value.length < 6) {
            alert('Enter Password more than 6 Characters');
            signupPassword.style.borderColor = errorColor;
            validationPassed = false; // Set flag to false if validation fails
        }

        // Proceed if all validations passed
        if (validationPassed) {
            alert('Sign Up Successful');
            inputs.forEach(input => input.value = ""); // Clear all input fields
        }
    }
});

// Add submit event listener to the signin form
signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (areInputsFilled(signInForm)) {
        let validationPassed = true;

        // Check if the password length is sufficient
        if (signinPassword.value.length < 6) {
            alert('Enter Password more than 6 Characters');
            signinPassword.style.borderColor = errorColor;
            validationPassed = false; // Set flag to false if validation fails
        }

        // Proceed if all validations passed
        if (validationPassed) {
            alert('Sign In Successful');
            inputs.forEach(input => input.value = ""); // Clear all input fields
        }
    }
});

// Add focus and blur event listeners to all inputs
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        if (previousInput && previousInput !== input) {
            revertInputStyles(previousInput); // Revert styles of the previously focused input
        }
        applyInputStyles(input); // Apply styles to the currently focused input
        previousInput = input; // Update the reference to the currently focused input
    });

    input.addEventListener('blur', () => {
        revertInputStyles(input); // Revert styles of the input when it loses focus
        if (previousInput === input) {
            previousInput = null; // Reset the previously focused input reference
        }
    });
});

// Function to toggle password visibility
function togglePasswordVisibility(passwordInput, toggleIcon) {
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    toggleIcon.classList.toggle('fa-eye-slash', !isPasswordVisible);
    toggleIcon.classList.toggle('fa-eye', isPasswordVisible);
}

// Add event listeners to toggle password visibility
toggleSignupPassword.addEventListener('click', () => {
    togglePasswordVisibility(signupPassword, toggleSignupPassword);
});

toggleSigninPassword.addEventListener('click', () => {
    togglePasswordVisibility(signinPassword, toggleSigninPassword);
});

// Add input event listener to password fields for length validation
[signupPassword, signinPassword].forEach(passwordInput => {
    passwordInput.addEventListener('input', () => {
        const length = passwordInput.value.length;

        if (length < 4) {
            applyErrorStyles(passwordInput);
        } else if (length <= 6) {
            applyWarningStyles(passwordInput);
        } else {
            applyInputStyles(passwordInput);
        }
    });
});

// CSS to change the placeholder color
const style = document.createElement('style');
style.innerHTML = `
    input::placeholder {
        color: var(--placeholder-color, #aaa); /* Default placeholder color */
    }
`;
document.head.appendChild(style);

// Social button alert functions
function fb() {
    alert('Use your Facebook Account');
    console.log('fb');
}

function g() {
    alert('Use your Google Account');
    console.log('g');
}

function ln() {
    alert('Use your Linkedin Account');
    console.log('ln');
}
// Function to handle visibility of containers
function toggleContainers(showSignUp) {
    const signUpContainer = document.querySelector('.form-container.sign-up-container');
    const signInContainer = document.querySelector('.form-container.sign-in-container');

    if (signUpContainer) {
        signUpContainer.style.opacity = showSignUp ? '1' : '0';
        signUpContainer.style.display = showSignUp ? 'block' : 'none';
    }
    if (signInContainer) {
        signInContainer.style.opacity = showSignUp ? '0' : '1';
        signInContainer.style.display = showSignUp ? 'none' : 'block';
    }
}

// Event handlers using toggleContainers
function handleButtonClick1() {
    toggleContainers(true);
}

function handleButtonClick2() {
    toggleContainers(false);
}

// Create and append button
function createButton(id, text, handler, parentForm) {
    const existingButton = document.getElementById(id);
    if (!existingButton) {
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = text;
        button.id = id;
        button.className = id;

        button.addEventListener('click', handler);
        parentForm?.appendChild(button);
    }
}

// Remove button
function removeButton(id, parentForm) {
    const button = document.getElementById(id);
    if (button) {
        parentForm?.removeChild(button);
    }
}

// Function to check screen width and manage button visibility
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const form1 = document.querySelector('.form-container.sign-in-container form');
    const form2 = document.querySelector('.form-container.sign-up-container form');

    if (screenWidth < 450) {
        createButton('my-button1', 'Sign Up', handleButtonClick1, form1);
        createButton('my-button2', 'Sign In', handleButtonClick2, form2);
    } else {
        removeButton('my-button1', form1);
        removeButton('my-button2', form2);
    }
}

// Call the function initially to set the button state
checkScreenWidth();

// Add an event listener to call the function on window resize
window.addEventListener('resize', checkScreenWidth);
// Get the buttons by their IDs
const button1 = document.getElementById('my-button1');
const button2 = document.getElementById('my-button2');


// Add click event listeners
button1.addEventListener('click', () => {
    inputs.forEach(input => {
        input.style.backgroundColor = '#eee';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #ccc';
        input.style.color = '#333';
        input.style.setProperty('--placeholder-color', '#ccc');
    });
});

button2.addEventListener('click', () => {
    inputs.forEach(input => {
        input.style.backgroundColor = '#eee';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #ccc';
        input.style.color = '#333';
        input.style.setProperty('--placeholder-color', '#ccc');
    });
});
