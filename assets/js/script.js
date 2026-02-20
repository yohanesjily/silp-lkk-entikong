document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DARK MODE & LOTTIE LOGIC
    // ==========================================
    const body = document.body;
    const lottieContainer = document.getElementById('lottie-theme-toggle');
    const overlay = document.getElementById('page-transition-overlay');

    if (lottieContainer) {
        const LIGHT_MODE_FRAME = 0; 
        const DARK_MODE_FRAME = 250; 
        const ANIMATION_SPEED = 5; 

        const anim = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false, 
            path: 'assets/img/theme_toggle.json'
        });
        anim.setSpeed(ANIMATION_SPEED);

        function playToDark() {
            if (anim.currentFrame < DARK_MODE_FRAME) { 
                setTimeout(() => anim.playSegments([anim.currentFrame, DARK_MODE_FRAME], true), 10);
            }
        }
        function playToLight() {
            if (anim.currentFrame > LIGHT_MODE_FRAME) {
                setTimeout(() => anim.playSegments([anim.currentFrame, LIGHT_MODE_FRAME], true), 10);
            }
        }
        function setTheme(mode) {
            if (mode === 'dark') {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                playToDark(); 
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                playToLight();
            }
        }

        anim.addEventListener('DOMLoaded', function() {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark') {
                anim.goToAndStop(DARK_MODE_FRAME, true); 
                body.classList.add('dark-mode');
            } else {
                anim.goToAndStop(LIGHT_MODE_FRAME, true);
                body.classList.remove('dark-mode');
            }
            
            if (overlay) {
                overlay.classList.add('is-active');
                setTimeout(() => {
                    overlay.classList.remove('is-active');
                    setTimeout(() => { overlay.style.visibility = 'hidden'; }, 500);
                }, 100);
            }
        });

        lottieContainer.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // ==========================================
    // 2. PAGE TRANSITIONS
    // ==========================================
    const internalLinks = document.querySelectorAll('a[href^="./"], a[href$=".html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');
            if (targetUrl && !targetUrl.startsWith('#') && !this.hasAttribute('target') && overlay) {
                e.preventDefault(); 
                overlay.style.visibility = 'visible'; 
                setTimeout(() => {
                    overlay.classList.add('is-active');
                    setTimeout(() => { window.location.href = targetUrl; }, 400); 
                }, 5); 
            }
        });
    });

    // ==========================================
    // 3. AREA CARD HOVER
    // ==========================================
    const areaCards = document.querySelectorAll('.area-card');
    areaCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
    });

    // ==========================================
    // 4. IMAGE SLIDER (WITH SAFETY CHECK)
    // ==========================================
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');

    if (sliderWrapper && slides.length > 0) {
        let slideIndex = 0;

        function showSlide(n) {
            if (n >= slides.length) slideIndex = 0;
            else if (n < 0) slideIndex = slides.length - 1;
            else slideIndex = n;
            
            sliderWrapper.style.transform = `translateX(${-slideIndex * 100}%)`;
            
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active-dot', i === slideIndex);
            });
        }

        // Generate Dots
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.addEventListener('click', () => showSlide(index)); 
                dotsContainer.appendChild(dot);
            });
        }

        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        if (prevBtn) prevBtn.onclick = () => showSlide(slideIndex - 1);
        if (nextBtn) nextBtn.onclick = () => showSlide(slideIndex + 1);

        setInterval(() => showSlide(slideIndex + 1), 5000);
        showSlide(0);
    }

    // ... (Bagian chatbot akan dioptimalkan dengan JSON di bawah)

// ==========================================
// 5. CHATBOT AI LOGIC (OPTIMIZED WITH JSON)
// ==========================================
const chatToggle = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatBody = document.getElementById('chat-body');

// Variabel penampung data dari JSON
let dataAI = {};

// Fungsi untuk mengambil data dari file JSON luar
async function loadChatData() {
    try {
        const response = await fetch('data_ai.json');
        dataAI = await response.json();
        console.log("Database Chatbot berhasil dimuat secara eksternal.");
    } catch (error) {
        console.error("Gagal memuat database chatbot:", error);
        // Fallback jika file JSON gagal dimuat
        dataAI = { "halo": "Halo! Ada yang bisa saya bantu?" };
    }
}

if (chatToggle && chatWindow) {
    // Jalankan fungsi load data saat halaman siap
    loadChatData();

    chatToggle.onclick = () => chatWindow.classList.toggle('hidden');
    if (closeChat) closeChat.onclick = () => chatWindow.classList.add('hidden');

    function appendMessage(msg, className) {
        if (!chatBody) return;
        const div = document.createElement('div');
        div.className = className;
        div.innerText = msg;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendMessage() {
    const text = chatInput.value.trim().toLowerCase();
    if (text === "") return;

    // 1. Tampilkan pesan user
    appendMessage(chatInput.value, 'user-msg');
    chatInput.value = "";

    // 2. Buat elemen "Sedang mengetik..."
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-msg typing-indicator';
    typingDiv.innerText = "Sedang mengetik...";
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. Beri delay seolah-olah sedang berpikir (1.5 detik)
    setTimeout(() => {
        // Hapus indikator mengetik
        chatBody.removeChild(typingDiv);

        let response = dataAI["default"] || "Untuk informasi lebih lanjut, silakan hubungi kami via WA di 0816-1931-702.";
        
        // Mencocokkan input user dengan keyword di JSON
        for (let key in dataAI) {
            if (text.includes(key.toLowerCase())) {
                response = dataAI[key];
                break;
            }
        }

        // 4. Tampilkan jawaban asli
        appendMessage(response, 'bot-msg');
    }, 1500); // 1500ms = 1.5 detik
}

    if (sendChat) sendChat.onclick = sendMessage;
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}
});