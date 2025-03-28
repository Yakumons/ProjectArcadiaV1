document.addEventListener('DOMContentLoaded', () => {
    const avatarUpload = document.getElementById('avatarUpload');
    const profileAvatar = document.getElementById('profileAvatar');
    const userAvatar = document.getElementById('userAvatar');
    const saveButton = document.querySelector('.save-profile-btn');
    const displayNameInput = document.getElementById('displayName');
    const logoutBtn = document.getElementById('logoutBtn');

    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileAvatar.src = e.target.result;
                userAvatar.src = e.target.result;
                // Store in localStorage
                localStorage.setItem('userAvatar', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    saveButton.addEventListener('click', () => {
        const displayName = displayNameInput.value;
        localStorage.setItem('displayName', displayName);
        alert('Profile updated successfully!');
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('displayName');
        localStorage.removeItem('isLoggedIn');
        document.getElementById('profileDropdown').classList.add('hidden');
        document.getElementById('signInBtn').classList.remove('hidden');
        document.getElementById('profile').classList.add('hidden');
        window.location.hash = '#home';
    });

    // Load saved data
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedName = localStorage.getItem('displayName');
    if (savedAvatar) {
        profileAvatar.src = savedAvatar;
        userAvatar.src = savedAvatar;
    }
    if (savedName) {
        displayNameInput.value = savedName;
    }
});
