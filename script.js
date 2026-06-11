/* 松戸総建 — interactions */
(function () {
  'use strict';

  // ---------- Mobile menu ----------
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        nav.classList.remove('is-open');
      })
    );
  }

  // ---------- Sticky header tint on scroll ----------
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 30) header.style.background = 'rgba(8,8,10,0.88)';
    else header.style.background = 'rgba(11,11,12,0.72)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      ans.style.maxHeight = isOpen ? ans.scrollHeight + 'px' : '0';
    });
  });

  // ---------- Checkbox tiles (services in form) ----------
  document.querySelectorAll('.check-tile').forEach((tile) => {
    const input = tile.querySelector('input');
    tile.addEventListener('click', (e) => {
      if (e.target !== input) input.checked = !input.checked;
      tile.classList.toggle('is-checked', input.checked);
    });
  });

  // ---------- File picker ----------
  const fileDrop = document.querySelector('.file-drop');
  const fileInput = document.querySelector('#file-input');
  if (fileDrop && fileInput) {
    fileDrop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        fileDrop.innerHTML =
          '<div class="ic">✓</div>' +
          fileInput.files.length +
          ' ファイル選択済み';
        fileDrop.style.color = 'var(--pink)';
        fileDrop.style.borderColor = 'var(--pink)';
      }
    });
    ['dragover', 'dragenter'].forEach((ev) =>
      fileDrop.addEventListener(ev, (e) => {
        e.preventDefault();
        fileDrop.style.borderColor = 'var(--pink)';
        fileDrop.style.background = 'rgba(255,46,116,0.06)';
      })
    );
    ['dragleave', 'drop'].forEach((ev) =>
      fileDrop.addEventListener(ev, (e) => {
        e.preventDefault();
        fileDrop.style.background = '';
      })
    );
    fileDrop.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  // ---------- Form submission ----------
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('[name="name"]');
      const tel = form.querySelector('[name="tel"]');
      const location = form.querySelector('[name="location"]');
      const services = form.querySelectorAll('[name="service"]:checked');
      let err = '';
      if (!name.value.trim()) err = 'お名前を入力してください。';
      else if (!tel.value.trim()) err = '電話番号を入力してください。';
      else if (!location.value.trim()) err = '施工場所を入力してください。';
      else if (services.length === 0) err = 'ご希望の工事内容を選択してください。';
      if (err) {
        e.preventDefault();
        alert(err);
        return;
      }
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.textContent = '送信中…';
      submitBtn.disabled = true;
    });
  }

  // ---------- Works "もっと見る" ----------
  const worksMoreBtn = document.querySelector('#works-more-btn');
  if (worksMoreBtn) {
    worksMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.work.is-hidden').forEach((w) => w.classList.remove('is-hidden'));
      worksMoreBtn.closest('.works-more').style.display = 'none';
    });
  }

  // ---------- Scroll reveal ----------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
