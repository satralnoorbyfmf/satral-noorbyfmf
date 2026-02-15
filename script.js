// সাইটটি সুন্দরভাবে ভেসে ওঠার জন্য
window.onload = function() {
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateY(0)";
    }, 200);
};
