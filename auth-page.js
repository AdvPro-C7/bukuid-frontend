// header component
let header = `
<header>
    <div class="logo">Buku.ID</div>
</header>
`;

// popup component
let popup = `
<div id="popup">
    <div class="popup-content">
        <span class="close-btn">&times;</span>
        <h2>Message</h2>
        <p id="popup-message"></p>
    </div>
</div>
`;

// registration form component
let registrationForm = `
<div class="accordion-item">
    <div class="accordion-header">
        <h2>Register</h2>
        <button class="accordion-btn"><span class="icon"></span></button>
    </div>
    <div id="reg-content">
        <div class="form">
            <label for="reg-username">Name:</label>
            <input type="text" id="reg-username" name="reg-username" required>
            <label for="reg-email-address">Email Address:</label>
            <input type="text" id="reg-email-address" name="reg-email-address" required>
            <label for="reg-phone-number">Phone Number:</label>
            <input type="text" id="reg-phone-number" name="reg-phone-number" required>
            <label for="reg-password">Password:</label>
            <input type="password" id="reg-password" name="reg-password" required>
            <button type="button" id="reg-submit-btn">Submit</button>
        </div>
    </div>
</div>
`;

// login form component
let loginForm = `
<div class="accordion-item">
    <div class="accordion-header">
        <h2>Login</h2>
        <button class="accordion-btn"><span class="icon"></span></button>
    </div>
    <div id="login-content">
        <div class="form">
            <label for="login-id">Email Address/Phone Number:</label>
            <input type="text" id="login-id" name="login-id" required>
            <label for="login-password">Password:</label>
            <input type="password" id="login-password" name="login-password" required>
            <button type="button" id="login-submit-btn">Submit</button>
        </div>
    </div>
</div>
`;

// footer component
let footer = `
<footer>
    <p>&copy; Buku.ID, all rights reserved.</p>
</footer>
`;

// assemble all components together
let auth = `
${header}
<main>
    ${popup}
    <div id="auth-form" class="accordion">
        ${registrationForm}
        ${loginForm}
    </div>
</main>
${footer}
`;

export { auth };
