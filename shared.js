const scriptUrl = document.currentScript.src;
const contentUrl = new URL('content.html', scriptUrl);
const siteUrl = new URL('.', scriptUrl);
fetch(contentUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    return response.text();
  })
  .then((pageContent) => {
    const mount = document.querySelector('#page-content');
    mount.innerHTML = pageContent;
    if (document.body.classList.contains('bird-mode')) {
      const profileLink = mount.querySelector('.profile-link');
      profileLink.href = 'index.html';
      profileLink.setAttribute('aria-label', 'Go to Page 1');
      profileLink.title = 'Home';
    }
    if (document.body.classList.contains('bird-mode')) addBirdKingdomArt();
    document.querySelectorAll('.pub').forEach((publication) => {
      publication.addEventListener('pointerenter', () => publication.classList.add('is-hovered'));
      publication.addEventListener('pointerleave', () => publication.classList.remove('is-hovered'));
    });
  })
  .catch((error) => {
    document.querySelector('#page-content').textContent = 'Page content could not be loaded. Open this site through a local web server or GitHub Pages.';
    console.error(error);
  });

function addBirdKingdomArt() {
  const container = document.querySelector('.container');
  const sections = container.querySelectorAll('section');
  const placements = [
    [-1, 18, 'cockatoo-flock.png', 'left'],
    [-1, 18, 'cockatiel-flock.png', 'right'],
    [-1, 200, 'toucan-mother-nest.png', 'right'],
    [0, .25, 'bowerbird-pair.png', 'left'],
    [0, .82, 'paradise-birds-alt.png', 'right'],
    [1, .04, 'toucans.png', 'left'],
    [1, .23, 'cockatoo-flock.png', 'right'],
    [1, .44, 'shoebill.png', 'left'],
    [1, .68, 'cockatiel-flock.png', 'right'],
    [1, .92, 'bowerbird-bower.png', 'left'],
    [2, .5, 'macaw-flock.png', 'right'],
    [3, .25, 'bowerbirds-garden.png', 'left'],
    [3, .78, 'toucans.png', 'right'],
    [4, .22, 'paradise-birds.png', 'left'],
    [4, .82, 'cockatiel-flock.png', 'right']
  ];
  placements.forEach(([sectionIndex, progress, file, side], index) => {
    const section = sectionIndex < 0 ? null : sections[sectionIndex];
    if (sectionIndex >= 0 && !section) return;
    const bird = document.createElement('img');
    const species = file.replace('.png', '');
    bird.className = `kingdom-bird kingdom-bird--${side} kingdom-bird--${species}`;
    bird.style.setProperty('--bird-delay', `${index * 42}ms`);
    bird.style.setProperty('--bird-tilt', `${index % 2 === 0 ? -2 : 2}deg`);
    bird.alt = '';
    bird.loading = 'lazy';
    bird.setAttribute('aria-hidden', 'true');
    bird.addEventListener('load', () => requestAnimationFrame(() => bird.classList.add('is-visible')), { once: true });
    bird.src = new URL(`assets/${file}`, siteUrl).href;
    bird.style.top = section ? `${section.offsetTop + section.offsetHeight * progress}px` : `${progress}px`;
    container.appendChild(bird);
  });
}
