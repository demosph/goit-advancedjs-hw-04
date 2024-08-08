import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkup } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

let page = 1;
let per_page = 15;
let userValue = '';
let totalPages = 1;

export const refs = {
  formSearchEl: document.querySelector('.form-search'),
  galleryListEl: document.querySelector('.gallery-list'),
  loader: document.querySelector('.loader'),
  loadMoreBtnEl: document.querySelector('.btn-load-more'),
};

refs.formSearchEl.addEventListener('submit', onFormSearch);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);

async function onFormSearch(e) {
  e.preventDefault();

  userValue = refs.formSearchEl.elements.search.value.trim();

  if (!userValue) return;

  page = 1;
  refs.galleryListEl.innerHTML = '';
  toggleVisibility(refs.loadMoreBtnEl, false);

  try {
    toggleLoader(true);
    const data = await fetchImages(userValue, page, per_page);
    if (data.hits.length === 0) {
      showToast('error', 'Sorry, there are no images matching your search query. Please try again!');
    } else {
      totalPages = Math.ceil(data.totalHits / per_page);
      refs.galleryListEl.innerHTML = renderMarkup(data.hits);
      gallery.refresh();
      if (data.totalHits > per_page) toggleVisibility(refs.loadMoreBtnEl, true);
    }
  } catch (error) {
    showToast('error', `Error: ${error.message}`);
  }

  toggleLoader(false);
  refs.formSearchEl.elements.search.value = '';
}

async function onLoadMoreBtn() {
  page += 1;

  try {
    toggleLoader(true);
    if (page === totalPages) {
      showToast('info', "We're sorry, but you've reached the end of search results.");
      toggleVisibility(refs.loadMoreBtnEl, false);
    }
    const data = await fetchImages(userValue, page, per_page);
    const markup = renderMarkup(data.hits);
    refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
    scrollWindow();
  } catch (error) {
    showToast('error', `Error: ${error.message}`);
  }
  toggleLoader(false);
}

function showToast(type, message) {
  const config = {
    message: message,
    backgroundColor: type === 'error' ? '#ef4040' : '#0099FF',
    messageColor: '#fafafb',
    position: 'topRight',
    progressBarColor: '#fafafb',
  };

  iziToast[type](config);
}

function toggleLoader(isVisible) {
  refs.loader.classList.toggle('loader-hidden', !isVisible);
}

function toggleVisibility(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}

function scrollWindow() {
  const galleryItemEl = document.querySelector('.gallery-item');
  const galleryItemHeight = galleryItemEl.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}

const gallery = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});