// Video data
const videos = [
    {
        id: 1,
        title: "Epic Gaming Montage",
        category: "gaming",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 2,
        title: "TikTok Viral Dance",
        category: "short-form",
        thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 3,
        title: "Football Highlights",
        category: "football",
        thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: 4,
        title: "Product Showcase Ad",
        category: "ecommerce",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: 5,
        title: "Brand Documentary",
        category: "documentary",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
        id: 6,
        title: "Cinematic Color Grade",
        category: "color-grading",
        thumbnail: "photo.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        id: 7,
        title: "Anime AMV",
        category: "anime",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
        id: 8,
        title: "Corporate Presentation",
        category: "long-form",
        thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    {
        id: 9,
        title: "Instagram Reel",
        category: "short-form",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
    },
    {
        id: 10,
        title: "Gaming Stream Highlights",
        category: "gaming",
        thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
    {
        id: 11,
        title: "Championship Final",
        category: "football",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    },
    {
        id: 12,
        title: "Fashion Brand Commercial",
        category: "ecommerce",
        thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
    }
];

// DOM elements
const categoryFilter = document.getElementById('categoryFilter');
const videoGrid = document.getElementById('videoGrid');
const emptyState = document.getElementById('emptyState');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxVideo = document.getElementById('lightboxVideo');
const demoReelBtn = document.getElementById('demoReelBtn');
const demoReelModal = document.getElementById('demoReelModal');
const demoReelClose = document.getElementById('demoReelClose');
const closeModalBtn = document.getElementById('closeModalBtn');
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const contactClose = document.getElementById('contactClose');
const contactForm = document.getElementById('contactForm');

// State
let currentCategory = 'all';
let filteredVideos = videos;

// Initialize the app
function init() {
    setupEventListeners();
    renderVideos();
    addScrollAnimations();
}

// Event listeners
function setupEventListeners() {
    // Category filter
    categoryFilter.addEventListener('click', handleCategoryFilter);
    
    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeDemoReelModal();
            closeContactModal();
        }
    });
    
    // Video grid clicks
    videoGrid.addEventListener('click', handleVideoClick);
    
    // Demo reel modal
    demoReelBtn.addEventListener('click', openDemoReelModal);
    demoReelClose.addEventListener('click', closeDemoReelModal);
    closeModalBtn.addEventListener('click', closeDemoReelModal);
    demoReelModal.addEventListener('click', (e) => {
        if (e.target === demoReelModal) {
            closeDemoReelModal();
        }
    });
    
    // Contact modal
    contactBtn.addEventListener('click', openContactModal);
    contactClose.addEventListener('click', closeContactModal);
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Handle category filtering
function handleCategoryFilter(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    
    const category = e.target.dataset.category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update current category
    currentCategory = category;
    
    // Filter and render videos
    filterVideos();
    renderVideos();
}

// Filter videos based on category
function filterVideos() {
    if (currentCategory === 'all') {
        filteredVideos = videos;
    } else {
        filteredVideos = videos.filter(video => video.category === currentCategory);
    }
}

// Render videos to the grid
function renderVideos() {
    // Clear grid
    videoGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Create video cards
    filteredVideos.forEach((video, index) => {
        const videoCard = createVideoCard(video, index);
        videoGrid.appendChild(videoCard);
    });
}

// Create a video card element
function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.videoId = video.id;
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-overlay">
                <button class="play-button">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-category">${formatCategory(video.category)}</p>
        </div>
    `;
    
    return card;
}

// Handle video card clicks
function handleVideoClick(e) {
    const videoCard = e.target.closest('.video-card');
    if (!videoCard) return;
    
    const videoId = parseInt(videoCard.dataset.videoId);
    const video = videos.find(v => v.id === videoId);
    
    if (video) {
        openLightbox(video);
    }
}

// Open lightbox with video
function openLightbox(video) {
    lightboxTitle.textContent = video.title;
    lightboxVideo.src = video.videoUrl;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Play video automatically
    lightboxVideo.play().catch(e => {
        console.log('Autoplay prevented:', e);
    });
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('show');
    lightboxVideo.pause();
    lightboxVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Format category for display
function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Demo reel modal functions
function openDemoReelModal() {
    demoReelModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDemoReelModal() {
    demoReelModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Contact modal functions
function openContactModal() {
    contactModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
    
    // Reset form and close modal
    contactForm.reset();
    closeContactModal();
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any layout-dependent features
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add some interactive features
function addInteractiveFeatures() {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/500x300/1a1a1a/666666?text=Video+Thumbnail';
        });
    });
}

// Call interactive features
addInteractiveFeatures();
addSmoothScrolling();