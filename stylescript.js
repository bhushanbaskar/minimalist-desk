document.addEventListener('DOMContentLoaded', function () {
    //for night mode button
    const darkBtn = document.getElementById('night-mode-btn');
    const lightBtn = document.getElementById('light-mode-btn');
    const savedTheme = localStorage.getItem('theme') || 'dark'; //default to dark mode if not set
    document.documentElement.setAttribute('data-theme', savedTheme);

    //experiment
    function forActiveClass(e){
    if (e === 'light') {
       lightBtn.classList.add('active');
        darkBtn.classList.remove('active');

    }
    else if (e === 'dark') {
       darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
    }
    }
    forActiveClass(savedTheme)
    //experiment

    //for NIGHT MODE button
    darkBtn.addEventListener('click', function () {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        forActiveClass('dark')
    })


    //for LIGHT MODE button
    lightBtn.addEventListener('click', function () {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        forActiveClass('light')
    })

})






