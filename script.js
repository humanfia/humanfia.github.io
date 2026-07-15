const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const label = button.querySelector('span');
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      label.textContent = 'Copied';
    } catch {
      label.textContent = 'Select';
    }
    window.setTimeout(() => {
      label.textContent = 'Copy';
    }, 1600);
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
