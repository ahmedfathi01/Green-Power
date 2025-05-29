/**
 * ملف JavaScript لتحسين تجاوبية الموقع
 */

document.addEventListener('DOMContentLoaded', function() {
    // تحسين تحميل الصور بـ lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // المتصفح يدعم lazy-loading
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // تحميل مكتبة lazysizes للمتصفحات القديمة
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
        
        document.querySelectorAll('img').forEach(img => {
            img.classList.add('lazyload');
            img.setAttribute('data-src', img.getAttribute('src'));
            img.removeAttribute('src');
        });
    }

    // تعديل تأثير Navbar عند التمرير
    const navbar = document.querySelector('.navbar-modern');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // تحديد حجم العناصر للشاشات المختلفة
    function adjustElementsByScreenSize() {
        const width = window.innerWidth;
        
        // للشاشات الصغيرة جداً
        if (width <= 320) {
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.padding = '1rem';
            });
            
            document.querySelectorAll('.section-title').forEach(title => {
                title.style.fontSize = '1.5rem';
            });
        }
        
        // للشاشات الصغيرة
        if (width <= 576) {
            // تبسيط الرسوم المتحركة للأداء
            document.querySelectorAll('.floating-shape, .blur-circle').forEach(element => {
                element.style.display = 'none';
            });
        }
        
        // للشاشات المتوسطة
        if (width <= 768) {
            // تعديل العناصر للمساحة المتوفرة
            document.querySelectorAll('.hero-image-container, .about-img-wrapper').forEach(container => {
                container.style.maxWidth = '90%';
                container.style.margin = '0 auto';
            });
        }
    }
    
    // تشغيل الوظيفة عند تحميل الصفحة وعند تغيير حجم النافذة
    adjustElementsByScreenSize();
    window.addEventListener('resize', adjustElementsByScreenSize);

    // تسريع تفاعل القائمة على الأجهزة المحمولة
    const menuToggler = document.querySelector('.navbar-toggler');
    if (menuToggler) {
        menuToggler.addEventListener('click', function() {
            // إضافة تأخير لتحسين التحميل
            setTimeout(() => {
                const collapse = document.querySelector('.navbar-collapse');
                if (collapse.classList.contains('show') && window.innerWidth < 992) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }, 10);
        });
    }

    // تحسين إمكانية الوصول للشاشات الصغيرة
    document.querySelectorAll('a, button').forEach(el => {
        if (window.innerWidth < 576) {
            if (parseInt(window.getComputedStyle(el).height) < 44) {
                el.style.minHeight = '44px';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
            }
        }
    });

    // إضافة وظيفة العودة إلى الأعلى
    const createBackToTop = () => {
        // إنشاء زر العودة للأعلى إذا لم يكن موجوداً
        if (!document.querySelector('.back-to-top')) {
            const backToTopButton = document.createElement('a');
            backToTopButton.className = 'back-to-top';
            backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(backToTopButton);
            
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // إظهار وإخفاء الزر
        const toggleBackToTopButton = () => {
            const backToTopButton = document.querySelector('.back-to-top');
            if (!backToTopButton) return;
            
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        
        window.addEventListener('scroll', toggleBackToTopButton);
    };
    
    createBackToTop();
    
    // تحسين تجربة المستخدم للشاشات التي تعمل باللمس
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // تحسين الأداء عن طريق Intersection Observer
    if ('IntersectionObserver' in window) {
        // تطبيق تحميل كسول للعناصر باستخدام Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('animated');
                    }
                    
                    // تحميل الصور الخلفية عند الحاجة
                    if (entry.target.dataset.background) {
                        entry.target.style.backgroundImage = `url(${entry.target.dataset.background})`;
                        observer.unobserve(entry.target);
                    }
                }
            });
        };
        
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        
        // مراقبة العناصر القابلة للتحريك
        document.querySelectorAll('.animate-on-scroll, [data-background]').forEach(el => {
            observer.observe(el);
        });
    }
    
    // تبسيط الرسوم المتحركة للأجهزة ذات الأداء المنخفض
    const simplifyAnimations = () => {
        // تفعيل هذه الوظيفة للأجهزة ذات الأداء المنخفض
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.floating-shape, .blur-circle, .shape-1, .shape-2, .shape-3').forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
            
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
                el.removeAttribute('data-aos-duration');
            });
        }
    };
    
    simplifyAnimations();
    
    // إصلاح عرض قسم وسائل التواصل الاجتماعي
    const ensureSocialSectionDisplay = () => {
        const socialSection = document.querySelector('.social-section');
        const socialLinks = document.querySelector('.social-links');
        
        if (socialSection) {
            socialSection.style.display = 'block';
            socialSection.style.visibility = 'visible';
            socialSection.style.opacity = '1';
            
            // إلغاء خصائص AOS من هذا القسم
            socialSection.removeAttribute('data-aos');
            socialSection.removeAttribute('data-aos-delay');
            
            // تطبيق على كل العناصر داخل القسم
            socialSection.querySelectorAll('*').forEach(el => {
                el.style.visibility = 'visible';
                el.style.opacity = '1';
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
            });
        }
        
        if (socialLinks) {
            socialLinks.style.display = 'flex';
            socialLinks.style.visibility = 'visible';
            socialLinks.style.opacity = '1';
            
            // تغيير التنسيق حسب حجم الشاشة
            if (window.innerWidth <= 767) {
                socialLinks.style.flexDirection = 'column';
            } else {
                socialLinks.style.flexDirection = 'row';
            }
        }
    };
    
    // تطبيق الوظيفة عند التحميل وعند تغيير حجم الشاشة
    ensureSocialSectionDisplay();
    window.addEventListener('resize', ensureSocialSectionDisplay);

    // تحسين عرض قسم hero على الموبايل
    const adjustHeroSection = () => {
        const heroSections = document.querySelectorAll('.hero-section, .about-hero, .contact-hero, .services-hero');
        const width = window.innerWidth;
        
        heroSections.forEach(section => {
            // في الشاشات الصغيرة
            if (width <= 767) {
                section.style.paddingTop = '130px';
                section.style.paddingBottom = '130px';
                
                // التأكد من ضبط المساحات للصفوف والأعمدة
                const rows = section.querySelectorAll('.row');
                rows.forEach(row => {
                    row.style.minHeight = 'auto';
                });
                
                // ضبط مساحة الأعمدة
                const columns = section.querySelectorAll('.col-lg-6');
                columns.forEach(col => {
                    col.style.marginBottom = '50px';
                });
                
                // ضبط صورة الهيرو
                const heroImages = section.querySelectorAll('.hero-image, .hero-media');
                heroImages.forEach(img => {
                    img.style.marginTop = '30px';
                    img.style.marginBottom = '50px';
                });
            }
        });
    };
    
    // تطبيق التعديلات عند التحميل وتغيير الحجم
    adjustHeroSection();
    window.addEventListener('resize', adjustHeroSection);

    // تحسين عرض العناصر في وضع الموبايل
    const optimizeMobileDisplay = () => {
        // التحقق مما إذا كان الجهاز موبايل
        if (window.innerWidth <= 767) {
            // العثور على جميع أقسام hero
            document.querySelectorAll('.hero-section, .about-hero, .contact-hero, .services-hero').forEach(section => {
                // تغيير ترتيب عناصر الصف
                const rows = section.querySelectorAll('.row');
                rows.forEach(row => {
                    row.style.flexDirection = 'column-reverse';
                });
                
                // إضافة نمط مخصص للنصوص
                const headings = section.querySelectorAll('h1, .hero-title');
                headings.forEach(heading => {
                    heading.style.textAlign = 'center';
                    heading.style.fontSize = '2.2rem';
                    heading.style.marginBottom = '1rem';
                });
                
                const paragraphs = section.querySelectorAll('p.lead, .hero-description');
                paragraphs.forEach(para => {
                    para.style.textAlign = 'center';
                    para.style.maxWidth = '100%';
                    para.style.margin = '0 auto 1.5rem';
                });
                
                // تنسيق الأزرار
                const ctaButtons = section.querySelectorAll('.hero-cta, .cta-group');
                ctaButtons.forEach(cta => {
                    cta.style.flexDirection = 'column';
                    cta.style.alignItems = 'center';
                    
                    const buttons = cta.querySelectorAll('.btn');
                    buttons.forEach(btn => {
                        btn.style.width = '100%';
                        btn.style.margin = '5px 0';
                        btn.style.justifyContent = 'center';
                    });
                });
                
                // تحسين المسافات للصور
                const heroImages = section.querySelectorAll('.hero-image, .hero-media');
                heroImages.forEach(img => {
                    img.style.margin = '0 auto 30px';
                    img.style.maxWidth = '85%';
                    
                    const actualImage = img.querySelector('img');
                    if (actualImage) {
                        actualImage.style.borderRadius = '15px';
                        actualImage.style.boxShadow = '0 15px 30px rgba(46, 204, 113, 0.2)';
                    }
                });
            });
            
            // تحسين بطاقات المنتج
            document.querySelectorAll('.product-item').forEach(item => {
                item.style.marginBottom = '25px';
            });
            
            // تحسين بطاقات المزايا
            document.querySelectorAll('.benefit-card').forEach(card => {
                card.style.height = 'auto';
                card.style.padding = '20px';
            });
        }
    };
    
    // تنفيذ التحسين عند تحميل الصفحة وتغيير الحجم
    optimizeMobileDisplay();
    window.addEventListener('resize', optimizeMobileDisplay);
}); 