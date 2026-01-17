// Small script to toggle the mobile nav and handle back-to-top buttons
window.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('menuToggle') || document.querySelector('.icon');
    const nav = document.getElementById('mainNav') || document.querySelector('.nav-list');

    if(!btn || !nav){
        console.debug('nav toggle: button or nav not found', {btn, nav});
    } else {
        console.debug('nav toggle: initialized', {btn, nav});

        btn.addEventListener('click', (e)=>{
            e.stopPropagation(); // prevent immediate document click close
            const isOpen = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(isOpen));
            console.debug('nav toggle: button clicked, open=', isOpen);
        });

        // Close nav when clicking outside (mobile)
        document.addEventListener('click', (e)=>{
            if(!nav.classList.contains('open')) return;
            const path = (e.composedPath && e.composedPath()) || (e.path || []);
            if(path.includes(btn) || path.includes(nav)) return;
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded','false');
            console.debug('nav toggle: closed by outside click');
        });

        // Close nav with Escape key
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'Escape' && nav.classList.contains('open')){
                nav.classList.remove('open');
                btn.setAttribute('aria-expanded','false');
                btn.focus();
                console.debug('nav toggle: closed by Escape');
            }
        });

        // Prevent clicks inside the nav from bubbling up to the document click handler
        nav.addEventListener('click', (e)=>{ e.stopPropagation(); });

        // Close nav after clicking a link inside it (mobile friendly)
        nav.addEventListener('click', (e)=>{
            const link = e.target.closest && e.target.closest('a');
            if(link){
                nav.classList.remove('open');
                btn.setAttribute('aria-expanded','false');
                console.debug('nav toggle: closed after link click', link.href);
            }
        });
    }

    // Back to top buttons: support multiple instances
    const btts = Array.from(document.querySelectorAll('.back-to-top'));
    if(btts.length === 0){
        console.debug('back-to-top: none found');
    } else {
        const toggleAll = ()=>{
            const show = window.scrollY > 300;
            btts.forEach(btt=> btt.style.display = show ? 'inline-block' : 'none');
        };
        toggleAll();
        window.addEventListener('scroll', toggleAll);
        btts.forEach(btt=> btt.addEventListener('click', ()=>{ window.scrollTo({top:0, behavior:'smooth'}); btt.blur(); }));
        console.debug('back-to-top: initialized', {count: btts.length});
    }
});

// Back to top button
(function(){
    const btt = document.getElementById('backToTop');
    if(!btt) return;

    // Show/hide button based on scroll
    const toggle = ()=>{
        if(window.scrollY > 300) btt.style.display = 'inline-block';
        else btt.style.display = 'none';
    };
    toggle();
    window.addEventListener('scroll', toggle);

    btt.addEventListener('click', ()=>{
        window.scrollTo({top:0, behavior:'smooth'});
        btt.blur();
    });
})();
