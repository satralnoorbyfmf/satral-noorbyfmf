window.onload = function() {
    const mainContent = document.getElementById('main-content');
    
    // সাইটটি লোড হওয়ার সময় একটু সুন্দর এনিমেশন
    setTimeout(() => {
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateY(0)";
    }, 200);
};
