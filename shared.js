const contentUrl = new URL('content.html', document.currentScript.src);
fetch(contentUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    return response.text();
  })
  .then((pageContent) => {
    const mount = document.querySelector('#page-content');
    mount.innerHTML = pageContent;
    document.querySelectorAll('.pub').forEach((publication) => {
      publication.addEventListener('pointerenter', () => publication.classList.add('is-hovered'));
      publication.addEventListener('pointerleave', () => publication.classList.remove('is-hovered'));
    });
  })
  .catch((error) => {
    document.querySelector('#page-content').textContent = 'Page content could not be loaded. Open this site through a local web server or GitHub Pages.';
    console.error(error);
  });
