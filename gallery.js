const albumList = document.querySelector('#photo-albums');
const photoStatus = document.querySelector('#photo-status');

function renderPhoto(photo) {
  const figure = document.createElement('figure');
  const link = document.createElement('a');
  const image = document.createElement('img');

  link.href = photo.src;
  image.src = photo.src;
  image.alt = photo.alt || photo.caption || 'View full-size photo';
  image.loading = 'lazy';
  image.decoding = 'async';
  link.append(image);
  figure.append(link);

  if (photo.caption) {
    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption;
    figure.append(caption);
  }

  return figure;
}

function renderAlbum(album) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const grid = document.createElement('div');

  section.className = 'photo-album';
  title.textContent = album.title;
  section.append(title);

  if (album.description) {
    const description = document.createElement('p');
    description.className = 'photo-description';
    description.textContent = album.description;
    section.append(description);
  }

  grid.className = 'photo-grid';
  grid.append(...album.photos.map(renderPhoto));
  section.append(grid);
  return section;
}

async function loadAlbums() {
  photoStatus.textContent = 'Loading photo albums…';
  try {
    const response = await fetch('photos/albums.json');
    if (!response.ok) throw new Error('Could not load albums');
    const albums = await response.json();
    albumList.replaceChildren(...albums.map(renderAlbum));
    photoStatus.textContent = albums.length ? '' : 'No photo albums yet.';
  } catch (error) {
    photoStatus.textContent = 'The photo albums could not be loaded.';
    console.error(error);
  }
}

loadAlbums();
