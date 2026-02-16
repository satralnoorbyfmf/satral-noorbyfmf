const DB_URL = "https://satr-al-noor-by-fmf-default-rtdb.firebaseio.com/products.json";

async function fetchData(category = "All") {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "<p>Loading...</p>";
    
    try {
        const response = await fetch(DB_URL);
        const data = await response.json();
        
        grid.innerHTML = "";
        let items = [];
        for(let id in data) { items.push(data[id]); }
        items.reverse(); // নতুন পোস্টগুলো আগে দেখাবে

        items.forEach(p => {
            if (category !== "All" && p.cat !== category) return;

            grid.innerHTML += `
                <div class="product-card">
                    <div class="badge ${p.stock === 'in' ? 'in-stock' : 'out-stock'}">${p.stock === 'in' ? 'In Stock' : 'Out Stock'}</div>
                    <img src="${p.image}" alt="dress">
                    <h4 style="margin:5px 0">${p.name}</h4>
                    <p class="price">৳ ${p.price}</p>
                    <div class="sizes">
                        ${['S','M','L','XL'].map(s => `<button class="size-btn ${p.sizes && p.sizes.includes(s) ? 'active' : ''}">${s}</button>`).join('')}
                    </div>
                    <button class="buy-btn" onclick="openOrder('${p.name}', '${p.price}')" ${p.stock === 'out' ? 'disabled' : ''}>Order Now</button>
                </div>
            `;
        });
    } catch (e) { grid.innerHTML = "Error loading products."; }
}

function openOrder(name, price) {
    const modal = document.getElementById('orderModal');
    document.getElementById('order-form').innerHTML = `
        <h3>Order: ${name}</h3>
        <input type="text" id="uName" placeholder="Your Name" style="width:100%; padding:8px; margin:5px 0;">
        <input type="text" id="uAddr" placeholder="Full Address" style="width:100%; padding:8px; margin:5px 0;">
        <button class="buy-btn" onclick="confirmOrder('${name}', '${price}')">Confirm Order</button>
    `;
    modal.style.display = "block";
}

async function confirmOrder(name, price) {
    const uName = document.getElementById('uName').value;
    const uAddr = document.getElementById('uAddr').value;
    if(!uName || !uAddr) { alert("Please fill all info"); return; }

    const message = `Satr Al-Noor Order:\nProduct: ${name}\nPrice: ${price}\nCustomer: ${uName}\nAddress: ${uAddr}`;
    
    // অটোমেটিক হোয়াটসঅ্যাপে পাঠানো এবং সাকসেস মেসেজ দেখানো
    window.open(`https://wa.me/8801973797003?text=${encodeURIComponent(message)}`, '_blank');
    
    document.getElementById('orderModal').style.display = "none";
    document.getElementById('successModal').style.display = "block";
}

function closeSuccess() { document.getElementById('successModal').style.display = "none"; }
function closeModal() { document.getElementById('orderModal').style.display = "none"; }

function openAdmin() {
    if(prompt("Enter Password:") === "satralnoorbyfmf") {
        window.location.href = "admin.html";
    } else { alert("Wrong Password!"); }
}

window.onload = () => fetchData('All');
