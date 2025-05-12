document.addEventListener('DOMContentLoaded', function() {
    // Menú lateral
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Carrusel
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });
    
    // Auto-avance del carrusel
    let carouselInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000);
    
    // Pausar al interactuar
    carouselInner.addEventListener('mouseenter', function() {
        clearInterval(carouselInterval);
    });
    
    carouselInner.addEventListener('mouseleave', function() {
        carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    });
    
    // Añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-black, .btn-red');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Crear notificación
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Producto añadido al carrito';
            document.body.appendChild(notification);
            
            // Mostrar notificación
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });
});

// Estilos para notificación
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
}

.notification.show {
    opacity: 1;
}
`;
document.head.appendChild(style);