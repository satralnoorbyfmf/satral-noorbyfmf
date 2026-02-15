// ওয়েবসাইট লোড হলে এনিমেশন শুরু হবে
window.onload = function() {
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateY(0)";
    }, 100);
};
