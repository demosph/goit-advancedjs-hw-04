import{A as L,i as b,S as E}from"./assets/vendor-7d0e739e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))f(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&f(u)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();function h(t){return t.map(e=>`
           <li class="gallery-item">
          <a href="${e.largeImageURL}">
          <div class="image-container">
            <img src="${e.webformatURL}" alt="${e.tags}" width="360" height="200"> </div>
            <ul class="photo-dsc">
               <li >
                <p class="photo-dsc-title">Likes</p>
                <p class="photo-dsc-text">${e.likes}</p>
              </li>
               <li >
                <p class="photo-dsc-title">Views</p>
                <p class="photo-dsc-text">${e.views}</p>
              </li>
               <li >
                <p class="photo-dsc-title">Comments</p>
                <p class="photo-dsc-text">${e.comments}</p>
              </li>
               <li >
                <p class="photo-dsc-title">Downloads</p>
                <p class="photo-dsc-text">${e.downloads}</p>
              </li>
            </ul>
          </a>
        </li>
      `).join("")}const w=L.create({baseURL:"https://pixabay.com/api/"});async function g(t,e,a){return(await w.get("",{params:{key:"44962724-2fcdbdaf7fb299db2b6841432",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:a}})).data}let l=1,i=15,n="",m=1;const s={formSearchEl:document.querySelector(".form-search"),galleryListEl:document.querySelector(".gallery-list"),loader:document.querySelector(".loader"),loadMoreBtnEl:document.querySelector(".btn-load-more")};s.formSearchEl.addEventListener("submit",S);s.loadMoreBtnEl.addEventListener("click",v);async function S(t){if(t.preventDefault(),n=s.formSearchEl.elements.search.value.trim(),!!n){l=1,s.galleryListEl.innerHTML="",p(s.loadMoreBtnEl,!1);try{d(!0);const e=await g(n,l,i);e.hits.length===0?c("error","Sorry, there are no images matching your search query. Please try again!"):(m=Math.ceil(e.totalHits/i),s.galleryListEl.innerHTML=h(e.hits),y.refresh(),e.totalHits>i&&p(s.loadMoreBtnEl,!0))}catch(e){c("error",`Error: ${e.message}`)}d(!1),s.formSearchEl.elements.search.value=""}}async function v(){l+=1;try{d(!0),l===m&&(c("info","We're sorry, but you've reached the end of search results."),p(s.loadMoreBtnEl,!1));const t=await g(n,l,i),e=h(t.hits);s.galleryListEl.insertAdjacentHTML("beforeend",e),y.refresh(),M()}catch(t){c("error",`Error: ${t.message}`)}d(!1)}function c(t,e){const a={message:e,backgroundColor:t==="error"?"#ef4040":"#0099FF",messageColor:"#fafafb",position:"topRight",progressBarColor:"#fafafb"};b[t](a)}function d(t){s.loader.classList.toggle("loader-hidden",!t)}function p(t,e){t.classList.toggle("hidden",!e)}function M(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}const y=new E(".gallery-list a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
