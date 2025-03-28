document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');
    const signInBtn = document.getElementById('signInBtn');
    const closeBtn = document.querySelector('.close');
    const errorMessage = document.querySelector('.error-message');
    
    let isRegistering = false;

    function toggleForm(registering) {
        isRegistering = registering;
        const title = loginModal.querySelector('h2');
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const toggleLink = document.getElementById('registerLink');
        
        title.textContent = registering ? 'Sign Up' : 'Sign In';
        submitBtn.textContent = registering ? 'Sign Up' : 'Sign In';
        toggleLink.textContent = registering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up";
        errorMessage.textContent = '';
        loginForm.reset();
    }

    signInBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        toggleForm(false);
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm(!isRegistering);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            errorMessage.textContent = 'Please fill in all fields';
            return;
        }

        try {
            if (isRegistering) {
                // Handle Sign Up
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.some(user => user.username === username)) {
                    errorMessage.textContent = 'Username already exists';
                    return;
                }
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                errorMessage.style.color = '#00ff9d';
                errorMessage.textContent = 'Registration successful! Please sign in.';
                setTimeout(() => toggleForm(false), 1500);
            } else {
                // Handle Sign In
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    localStorage.setItem('currentUser', username);
                    loginModal.classList.remove('active');
                    signInBtn.textContent = username;
                } else {
                    errorMessage.textContent = 'Invalid username or password';
                }
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        signInBtn.textContent = currentUser;
    }

    function clearAllStoredData() {
        const keysToKeep = ['users', 'currentUser'];
        Object.keys(localStorage).forEach(key => {
            if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        });
    }

    clearAllStoredData();
});
