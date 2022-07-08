var myPortfolio = {};
(function () {
    this.showFixedNavOnTop = function () {
        const nav = document.getElementById('nav');
        if (window.scrollY > 0.5 * window.innerHeight) {
            nav.classList.add('u-fixed');
        } else {
            nav.classList.remove('u-fixed');
        }
    }

    this.updateActiveNavLink = function () {
        var currentSectionId = '';
        const sections = document.querySelectorAll('section:not(.intro)');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const mainScrollTop = window.scrollY;
            if (mainScrollTop + 150 >= sectionTop) {
                currentSectionId = section.id;                  
                temp = section.id;      
            }
        });
      
        const navLinks = document.querySelectorAll('#nav-links > li > a');
        navLinks.forEach(navLink => {
            navLink.setAttribute('aria-current', 'false');
            navLink.classList.remove('active-nav-link');
            
            if (navLink.getAttribute('href') === `#${currentSectionId}`) {
                navLink.setAttribute('aria-current', 'true');
                navLink.classList.add('active-nav-link');
            }
        });    
    }
    
    this.toggleVisibility = function () {
        var windowHeight = window.innerHeight;
        var elementVisible = 160;
        this.forEach(el => {
            let elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('visible-content');
            }
        });
    }
    
    this.flipPhotoCard = function () {
        const photoCard = document.getElementById('photo-card');
        if (photoCard.classList.contains('flip')) {
            photoCard.classList.remove('flip');
        } else {
            photoCard.classList.add('flip');
        }
    }
    
    this.infoBtnTransition = function () {
        if (this.classList.contains('o-cross-btn')) {
            this.classList.remove('o-cross-btn');
        } else {
            this.classList.add('o-cross-btn');
        }
    }
    
    this.setTheme = function (theme) {
        document.getElementsByTagName('body')[0].className = theme;
        localStorage.setItem('theme', theme);
    
        const faviconEl = document.querySelector('link[rel="icon"]');
        switch (theme) {
            case 'theme-light':
                faviconEl.setAttribute('href', '/favicons/favicon-light.ico');
                break;
            case 'theme-dark':
                faviconEl.setAttribute('href', '/favicons/favicon-dark.ico');
                break;
            default:
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    faviconEl.setAttribute('href', '/favicons/favicon-dark.ico')
                } else {
                    faviconEl.setAttribute('href', '/favicons/favicon-light.ico')
                }
        }
    }
    
    this.getTheme = function () {
        const themeDropdown = document.getElementById('dropdown-theme-picker');
        const theme = localStorage.getItem('theme') || 'theme-os-default';
        const themeIndex = [...themeDropdown.options].filter(el => el.value === theme)[0].index;
        
        myPortfolio.setTheme(theme);          
        themeDropdown.selectedIndex = themeIndex;
    }
}).apply(myPortfolio);

/** ON SCROLL */
window.addEventListener('scroll', () => {
    myPortfolio.showFixedNavOnTop();
    myPortfolio.updateActiveNavLink();

    myPortfolio.toggleVisibility.apply(document.querySelectorAll('section > header, .section-header'));
    myPortfolio.toggleVisibility.apply(document.querySelectorAll('section:not(.intro) > article, section > .article'));
});

/** ON LOAD */
window.addEventListener('load', function() {
    document.getElementById('photo-card-btn').addEventListener('click', (e) => {
        myPortfolio.infoBtnTransition.apply(e.target);
        myPortfolio.flipPhotoCard();
    });

    [...document.getElementsByClassName('js-proj-info-btn')].forEach(btn => {
        btn.addEventListener('click', function(){
            myPortfolio.infoBtnTransition.apply(btn);
            const projDetails = this.parentElement.getElementsByClassName('js-proj-details')[0];
            if (projDetails.classList.contains('u-transparent')) {
                projDetails.classList.remove('u-transparent');
            } else {
                projDetails.classList.add('u-transparent');
            }
        });
    });

    /** THEME PICKER */     
    myPortfolio.getTheme();
    document.getElementById('dropdown-theme-picker').addEventListener('change', function() {
        myPortfolio.setTheme(this.value);
    });
});