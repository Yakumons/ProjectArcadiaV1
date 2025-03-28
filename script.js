document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Login Modal Functionality
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    loginBtn.onclick = (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    }

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // This is a simple example - in a real app, you'd want to validate against a backend
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            modal.style.display = 'none';
            loginBtn.textContent = `Welcome, ${username}`;
        } else {
            alert('Invalid credentials!');
        }
    }
});
