const DB_URL = "https://satr-al-noor-by-fmf-default-rtdb.firebaseio.com/products.json";

async function fetchData(category = "All") {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "<p>Loading products...</p>";
    
    try {
        const response = await fetch(DB_URL);
        const data = await response.json();
        
        grid.innerHTML = "";
        if(!data) { grid.innerHTML = "<p>No products available yet. Add some from Admin Panel!</p>"; return; }

        for (let id in data) {
            const p = data[id];
            if (category !== "All" && p.cat !== category) continue;

            grid.innerHTML += `
                <div class="product-card">
                    <div class="badge ${p.stock === 'in' ? 'in-stock' : 'out-stock'}">${p.stock === 'in' ? 'In Stock' : 'Out of Stock'}</div>
                    <img src="${p.image}" alt="dress">
                    <h3>${p.name}</h3>
                    <p>${p.desc || ''}</p>
                    <p class="price">৳ ${p.price}</p>
                    <div class="size-list">
                        ${['S','M','L','XL'].map(s => `
                            <button class="sz-btn ${p.sizes && p.sizes.includes(s) ? 'active' : 'off'}">${s}</button>
                        `).join('')}
                    </div>
                    <button class="buy-btn" onclick="openOrder('${p.name}', '${p.price}')" ${p.stock === 'out' ? 'disabled' : ''}>Order Now</button>
                </div>
            `;
        }
    } catch (e) {
        grid.innerHTML = "<p>Connection error. Please check your internet or Firebase Rules.</p>";
    }
}

function openOrder(name, price) {
    const modal = document.getElementById('orderModal');
    document.getElementById('order-form-container').innerHTML = `
        <h3 style="color: #003a2b; margin-top:0;">Complete Order</h3>
        <p><b>Product:</b> ${name}<br><b>Price:</b> ${price} TK</p>
        <input type="text" id="custName" placeholder="আপনার নাম" required>
        <input type="tel" id="custPhone" placeholder="মোবাইল নম্বর" required>
        <textarea id="custAddr" placeholder="ফুল ঠিকানা (ডেলিভারি এলাকা)" rows="3" required></textarea>
        <p style="font-size:12px; color:red;">* বিকাশ বা ক্যাশ অন ডেলিভারি প্রযোজ্য</p>
        <button class="confirm-btn" onclick="sendWhatsApp('${name}', '${price}')">Confirm via WhatsApp</button>
    `;
    modal.style.display = "block";
}

function sendWhatsApp(name, price) {
    const uName = document.getElementById('custName').value;
    const uPhone = document.getElementById('custPhone').value;
    const uAddr = document.getElementById('custAddr').value;
    
    if(!uName || !uPhone || !uAddr) { alert("সব তথ্য পূরণ করুন!"); return; }

    const message = `*নতুন অর্ডার (Satr Al-Noor)*\n\nপ্রোডাক্ট: ${name}\nদাম: ${price} TK\nনাম: ${uName}\nফোন: ${uPhone}\nঠিকানা: ${uAddr}`;
    window.open(`https://wa.me/8801973797003?text=${encodeURIComponent(message)}`);
    closeModal();
}

function closeModal() { document.getElementById('orderModal').style.display = "none"; }

function searchProduct() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

function checkAdmin() {
    let pass = prompt("Admin Password:");
    if(pass === "1234") window.location.href = "admin.html";
    else alert("Wrong Password!");
}

window.onclick = function(event) {
    if (event.target == document.getElementById('orderModal')) closeModal();
}

window.onload = () => fetchData('All');
