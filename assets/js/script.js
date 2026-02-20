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

    // ==========================================
    // 5. CHATBOT AI LOGIC
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatBody = document.getElementById('chat-body');

    if (chatToggle && chatWindow) {
        const dataAI = {
            "profil": "LKK Entikong adalah Unit Pelaksana Teknis Kemenkes yang bertugas melaksanakan cegah tangkal penyakit di perbatasan.",
            "alamat": "Kantor kami memiliki 5 wilayah kerja... (dst)",
            "vaksin": "Pelayanan vaksinasi internasional (ICV) tersedia untuk haji, umroh, dll...",
            "kepala kantor": "Kepala LKK Entikong saat ini dijabat oleh dr Martyanti Sunindio, MHSM.",
            "terimakasih": "Sama-sama! Ada lagi yang bisa saya bantu?",
            "yohanes jily": "Yohanes Jily Rakitadewa adalah Katimker 3 LKK Entikong.",
            "raka":"raka atau biasa disebut Yohanes Jily Rakitadewa adalah Katimker 3 LKK Entikong.",
            "layanan": "LKK Entikong menyediakan layanan vaksinasi internasional, pemeriksaan kesehatan, dll.",
            "jam operasional": "Jam operasional kami adalah Senin-Jumat, 08.00-16.00 WIB.",
            "kontak": "Anda dapat menghubungi kami di nomor WA 0816-1931-702.",
            "lokasi": "LKK Entikong berlokasi di Jl. Raya Entikong No.KM. 3, Entikong, Kec. Entikong, Kab. Sanggau, Kalimantan Barat 78584.",
            "dokter": "Dokter di LKK Entikong antara lain dr Martyanti Sunindio, dr Gilda ditya asmara, dan dokter Syukri",
            "layanan kesehatan":" Layanan kesehatan kami meliputi pemeriksaan kesehatan, vaksinasi, dan konsultasi medis.",
            "biaya vaksin":" Biaya vaksin bervariasi tergantung jenis vaksin yang diberikan. Silakan hubungi kami untuk informasi lebih lanjut.",
            "jadwal vaksin":" Jadwal vaksinasi tersedia setiap hari kerja dari pukul 08.00 hingga 16.00 WIB.",
            "persyaratan vaksin":" Persyaratan vaksinasi meliputi membawa identitas diri, kartu vaksin sebelumnya (jika ada), dan mengikuti protokol kesehatan.",
            "fasilitas":" Fasilitas kami meliputi ruang tunggu yang nyaman, area konsultasi privat, dan layanan vaksinasi lengkap.",
            "prosedur vaksin":" Prosedur vaksinasi meliputi pendaftaran, pemeriksaan kesehatan, pemberian vaksin, dan observasi pasca-vaksinasi.",
            "jenis vaksin":" Kami menyediakan berbagai jenis vaksin termasuk vaksin Menginitis, influenza, Polio, dan lainnya.",
            "jadwal praktek dokter":" Jadwal praktek dokter dapat berubah-ubah. Silakan hubungi kami untuk informasi jadwal terkini.",
            "cara membuat janji":" Anda dapat membuat janji dengan menghubungi nomor WA 0816-1931-702 atau datang langsung ke kantor kami.",
            "layanan darurat":" Untuk layanan darurat, silakan hubungi nomor WA 0816-1931-702 untuk mendapatkan bantuan segera.",
            "protokol kesehatan":" Kami menerapkan protokol kesehatan ketat termasuk penggunaan masker, pemeriksaan suhu, dan penyediaan hand sanitizer.",
            "testimoni":" Testimoni dari pelanggan kami sangat positif, banyak yang merasa puas dengan layanan kami.",
            "pengalaman":" LKK Entikong memiliki pengalaman bertahun-tahun dalam memberikan layanan kesehatan di perbatasan.",
            "halo":" Halo! Ada yang bisa saya bantu?",
            "terima kasih":" Terima kasih kembali! Senang bisa membantu Anda.",
            "siapa kamu":" Saya adalah chatbot AI LKK Entikong, siap membantu menjawab pertanyaan Anda seputar layanan kami.",
            "apa itu lkk entikong":" LKK Entikong adalah Loka Kesehatan Pelabuhan yang berlokasi di Entikong, Kalimantan Barat, Indonesia.",
            "bagaimana cara menghubungi lkk entikong":" Anda dapat menghubungi LKK Entikong melalui nomor WA 0816-1931-702.",
            "jam operasional lkk entikong":" Jam operasional LKK Entikong adalah Senin hingga Jumat, pukul 08.00 hingga 16.00 WIB.",
            "layanan yang disediakan lkk entikong":" LKK Entikong menyediakan layanan vaksinasi internasional, pemeriksaan kesehatan, dan konsultasi medis.",
            "alamat lkk entikong":" Alamat LKK Entikong adalah Jl. Raya Entikong No.KM. 3, Entikong, Kec. Entikong, Kab. Sanggau, Kalimantan Barat 78584.",
            "dokter di lkk entikong":" Beberapa dokter di LKK Entikong antara lain dr Martyanti Sunindio, dr Gilda ditya asmara, dan dr Syukri.",
            "vaksin yang tersedia di lkk entikong":" Vaksin yang tersedia di LKK Entikong meliputi vaksin Menginitis, influenza, Polio, dan lainnya.",
            "biaya layanan di lkk entikong":" Biaya layanan di LKK Entikong bervariasi tergantung jenis layanan yang diberikan. Silakan hubungi kami untuk informasi lebih lanjut.",
            "jadwal praktek dokter di lkk entikong":" Jadwal praktek dokter di LKK Entikong dapat berubah-ubah. Silakan hubungi kami untuk informasi jadwal terkini.",
            "cara membuat janji di lkk entikong":" Anda dapat membuat janji di LKK Entikong dengan menghubungi nomor WA 0816-1931-702 atau datang langsung ke kantor kami.",
            "timker 3 lkk entikong":" Timker 3 LKK Entikong dipimpin oleh Yohanes Jily Rakitadewa.",
            "terima kasih banyak":" Sama-sama! Senang bisa membantu Anda.",
            "siapa kepala lkk entikong":" Kepala LKK Entikong saat ini adalah dr Martyanti Sunindio, MHSM.",
            "apa saja fasilitas di lkk entikong":" Fasilitas di LKK Entikong meliputi ruang tunggu yang nyaman, area konsultasi privat, dan layanan vaksinasi lengkap.",
            "bagaimana prosedur vaksin di lkk entikong":" Prosedur vaksin di LKK Entikong meliputi pendaftaran, pemeriksaan kesehatan, pemberian vaksin, dan observasi pasca-vaksinasi.",
            "timker 1 lkk entikong":" Timker 2 LKK Entikong dipimpin oleh dr Gilda ditya asmara.",
            "timker 3 lkk entikong":" Timker 1 LKK Entikong dipimpin oleh Farid Ayumi.",
            "pembuat":" Website dan AI chatbot ini dibuat oleh Tim IT LKK Entikong (Yohanes Jily Rd).",
            "keren": " Terima kasih! Senang Anda menyukainya.",
            "siapa kamu":" Saya adalah chatbot AI LKK Entikong, siap membantu menjawab pertanyaan Anda seputar layanan kami.",
            "wow":" Terima kasih! Ada lagi yang bisa saya bantu?",
            "bagus":"Terima kasih",
            "paling tampan":" Terima kasih! Anda juga tampan/cantik.",
            "hebat":" Terima kasih! Senang bisa membantu.",
            "hai":" Halo! Ada yang bisa saya bantu?",
            "hello":" Halo! Ada yang bisa saya bantu?",
            "hi":" Halo! Ada yang bisa saya bantu?",
            "haii":" Halo! Ada yang bisa saya bantu?",
            "helloo":" Halo! Ada yang bisa saya bantu?",
            "hii":" Halo! Ada yang bisa saya bantu?",
            "thanks": " Sama-sama! Senang bisa membantu Anda.",
            "trims": " Sama-sama! Senang bisa membantu Anda.",
            "makasih": " Sama-sama! Senang bisa membantu Anda.",
            "terima kasih banyak":" Sama-sama! Senang bisa membantu Anda.",
            "layanan":" LKK Entikong menyediakan layanan vaksinasi internasional, pemeriksaan kesehatan, dan konsultasi medis.",
            "vaksinasi":" Kami menyediakan berbagai jenis vaksin termasuk vaksin Menginitis, influenza, Polio, dan lainnya.",
            "pelayanan darat":" LKK Entikong melayani pelayanan kesehatan di perbatasan darat Indonesia-Malaysia.",
            "pelayanan udara":" LKK Entikong tidak melayani pelayanan kesehatan di bandara karena bukan merupakan lokasi bandara.",
            "pelayanan laut":" LKK Entikong tidak melayani pelayanan kesehatan di pelabuhan laut karena bukan merupakan lokasi pelabuhan laut.",
            "luar biasa":" Terima kasih",
            "syukri":" Dokter Syukri adalah salah satu dokter di LKK Entikong yang berpengalaman dalam pelayanan kesehatan di perbatasan.",
            "gilda":" dr Gilda Ditya Asmara, M.Kes adalah Katimker 2 LKK Entikong.",
            "yanti":" dr Martyanti Sunindio, MHSM adalah Kepala LKK Entikong.",
            "farid ayumi":" Farid Ayumi, SKM, M.Kes adalah Katimker 1 LKK Entikong.",
            "dokter":" Beberapa dokter di LKK Entikong antara lain dr Martyanti Sunindio, dr Gilda ditya asmara, dan dr Syukri.",
            "terima kasih atas bantuannya":" Sama-sama! Senang bisa membantu Anda.",
            "ig":" Anda dapat mengikuti Instagram kami di @lkk_entikong untuk informasi terbaru.",
            "facebook":" Anda dapat mengikuti Facebook kami di LKK Entikong untuk informasi terbaru.",
            "twitter":" Anda dapat mengikuti Twitter kami di @LKK_Entikong untuk informasi terbaru.",
            "youtube":" Anda dapat mengikuti YouTube kami di LKK Entikong untuk video terkait layanan kami.", 
            "gundam":" Wah, Anda penggemar Gundam juga? Saya juga suka Gundam!",
            "anime":" Saya juga suka anime! Apa anime favorit Anda?",
            "manga":" Manga memang seru untuk dibaca! Apa manga favorit Anda?",
            "game":" Game memang menyenangkan! Apa game favorit Anda?",
            "programming":" Programming adalah keterampilan yang hebat! Apa bahasa pemrograman favorit Anda?",
            "coding":" Coding memang menyenangkan! Apa bahasa pemrograman favorit Anda?",
            "evangelion":" Evangelion adalah anime yang ikonik! Siapa karakter favorit Anda?",
            "naruto":" Naruto adalah anime yang populer! Siapa karakter favorit Anda?",
            "one piece":" One Piece adalah manga yang luar biasa! Siapa karakter favorit Anda?",
            "bleach":" Bleach adalah anime yang seru! Siapa karakter favorit Anda?",
            "sasuke":" Sasuke adalah karakter yang kompleks! Apa pendapat Anda tentang dia?",
            "luffy":" Luffy adalah karakter yang penuh semangat! Apa pendapat Anda tentang dia?",
            "ichigo":" Ichigo adalah karakter yang kuat! Apa pendapat Anda tentang dia?",
            "goku":" Goku adalah karakter yang ikonik! Apa pendapat Anda tentang dia?",
            "vegeta":" Vegeta adalah karakter yang menarik! Apa pendapat Anda tentang dia?",
            "attack on titan":" Attack on Titan adalah anime yang mendebarkan! Siapa karakter favorit Anda?",
            "eren":" Eren adalah karakter yang kompleks! Apa pendapat Anda tentang dia?",
            "mikasa":" Mikasa adalah karakter yang kuat! Apa pendapat Anda tentang dia?",
            "armin":" Armin adalah karakter yang cerdas! Apa pendapat Anda tentang dia?",
            "death note":" Death Note adalah anime yang penuh intrik! Siapa karakter favorit Anda?",
            "light yagami":" Light Yagami adalah karakter yang kompleks! Apa pendapat Anda tentang dia?",
            "l lawliet":" L Lawliet adalah karakter yang cerdas! Apa pendapat Anda tentang dia?",
            "rei ayanami":" Rei Ayanami adalah karakter yang misterius! Apa pendapat Anda tentang dia?",
            "asuka":" Asuka Langley adalah karakter yang bersemangat! Apa pendapat Anda tentang dia?",
            "shinji":" Shinji Ikari adalah karakter yang kompleks! Apa pendapat Anda tentang dia?",
            "mobile suit gundam":" Mobile Suit Gundam adalah seri yang ikonik! Apa seri favorit Anda?",
            "char aznable":" Char Aznable adalah karakter yang karismatik! Apa pendapat Anda tentang dia?",
            "amuro ray":" Amuro Ray adalah karakter yang berkembang pesat! Apa pendapat Anda tentang dia?",
            "zaku":" Zaku adalah mobile suit yang ikonik! Apa pendapat Anda tentang dia?",
            "gundam wing":" Gundam Wing adalah seri yang populer! Apa mobile suit favorit Anda?",
            "gundam seed":" Gundam SEED adalah seri yang menarik! Apa mobile suit favorit Anda?",
            "gundam 00":" Gundam 00 adalah seri yang inovatif! Apa mobile suit favorit Anda?",
            "gundam iron-blooded orphans":" Gundam Iron-Blooded Orphans adalah seri yang emosional! Apa mobile suit favorit Anda?",
            "eva":" EVA adalah unit yang ikonik! Apa pendapat Anda tentang dia?",
            "eva unit-01":" EVA Unit-01 adalah unit yang kuat! Apa pendapat Anda tentang dia?",
            "eva unit-02":" EVA Unit-02 adalah unit yang agresif! Apa pendapat Anda tentang dia?",
            "eva unit-00":" EVA Unit-00 adalah unit yang unik! Apa pendapat Anda tentang dia?",
            "favorit":" Wah, itu pilihan yang bagus!",
            "suka":" Saya juga suka itu!",
            "tidak suka":" Oh, mengapa tidak?",
            "bagaimana kabarmu":" Saya baik-baik saja, terima kasih! Bagaimana dengan Anda?",
            "apa kabar":" Saya baik-baik saja, terima kasih! Bagaimana dengan Anda?",
            "apa yang bisa kamu lakukan":" Saya dapat membantu menjawab pertanyaan Anda seputar layanan LKK Entikong.",
            "siapa pembuatmu":" Saya dibuat oleh Tim IT LKK Entikong.",
            // ... masukkan semua dataAI Anda di sini ...
        };

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

            appendMessage(chatInput.value, 'user-msg');
            chatInput.value = "";

            setTimeout(() => {
                let response = "Untuk informasi lebih lanjut, silakan hubungi kami via WA di 0816-1931-702.";
                for (let key in dataAI) {
                    if (text.includes(key.toLowerCase())) {
                        response = dataAI[key];
                        break;
                    }
                }
                appendMessage(response, 'bot-msg');
            }, 600);
        }

        if (sendChat) sendChat.onclick = sendMessage;
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }
});