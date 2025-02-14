const themeToggleBtn = document.getElementById('bd-theme');
const themeOptions = document.querySelectorAll('[data-bs-theme-value]');
const themeIconActive = document.querySelector('.theme-icon-active use');
const themeText = document.getElementById('bd-theme-text');

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'auto';
  setTheme(savedTheme);
});

// Add event listeners to all theme options
themeOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const selectedTheme = option.getAttribute('data-bs-theme-value');
    setTheme(selectedTheme);
  });
});

// Function to set the theme
function setTheme(theme) {
  if (theme === 'auto') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
  updateUI(theme);
}

// Function to update the dropdown UI
function updateUI(theme) {
  themeOptions.forEach((option) => {
    const optionTheme = option.getAttribute('data-bs-theme-value');
    option.setAttribute('aria-pressed', optionTheme === theme);
    option.classList.toggle('active', optionTheme === theme);
  });

  // Update the icon and label
  const icons = {
    light: '#sun-fill',
    dark: '#moon-stars-fill',
    auto: '#circle-half',
  };
  themeIconActive.setAttribute('href', icons[theme]);
  themeText.innerText = `Toggle theme (${theme})`;
}
