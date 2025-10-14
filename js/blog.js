
const LS_ARTICLES = 'bizlearn_blog_articles';
const LS_COMMENTS = 'bizlearn_blog_comments';

function getArticles() {
  return JSON.parse(localStorage.getItem(LS_ARTICLES) || '[]');
}
function saveArticles(arr) {
  localStorage.setItem(LS_ARTICLES, JSON.stringify(arr));
}
function getComments() {
  return JSON.parse(localStorage.getItem(LS_COMMENTS) || '{}');
}
function saveComments(obj) {
  localStorage.setItem(LS_COMMENTS, JSON.stringify(obj));
}

function renderArticles(filter) {
  const container = document.getElementById('user-articles');
  container.innerHTML = '';
  const articles = getArticles();
  const q = String(filter || '').trim().toLowerCase();
  const filtered = q ? articles.filter(a => a.title.toLowerCase().includes(q)) : articles;
  if (!filtered.length) {
    container.innerHTML = '<p>Belum ada artikel yang cocok.</p>';
    return;
  }
  filtered.forEach((art, idx) => {
    const globalIndex = articles.indexOf(art); // map back to original index for comments
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = '24px';
    const titleHTML = q ? highlightText(escapeHTML(art.title), q) : escapeHTML(art.title);
    card.innerHTML = `
      <h3>${titleHTML}</h3>
      <p>${escapeHTML(art.desc)}</p>
      ${art.image ? `<img src="${escapeHTML(art.image)}" alt="Gambar artikel" style="max-width:100%;max-height:180px;margin-bottom:8px;border-radius:8px;" />` : ''}
      <div style="white-space:pre-line;margin-bottom:8px">${escapeHTML(art.content)}</div>
      <div style="text-align:right;margin-bottom:8px"><button class="btn small btn-delete-article" data-idx="${globalIndex}">Hapus Artikel</button></div>
      <div id="comments-${globalIndex}" class="comments-section"></div>
    `;
    container.appendChild(card);
    // attach delete handler
    const delBtn = card.querySelector('.btn-delete-article');
    if (delBtn) {
      delBtn.addEventListener('click', function () {
        if (!confirm('Hapus artikel ini beserta semua komentarnya?')) return;
        const articles = getArticles();
        const idxToRemove = Number(this.dataset.idx);
        // remove article
        if (idxToRemove >= 0 && idxToRemove < articles.length) {
          articles.splice(idxToRemove, 1);
          saveArticles(articles);
        }
        // remove associated comments (comments stored by article index) - rebuild comments map
        const comments = getComments();
        const newComments = {};
        // iterate through old comments keys and shift indexes > removed index down by 1
        Object.keys(comments).map(k => Number(k)).sort((a,b)=>a-b).forEach(oldIdx => {
          if (oldIdx === idxToRemove) return; // drop
          const newIdx = oldIdx > idxToRemove ? oldIdx - 1 : oldIdx;
          newComments[newIdx] = comments[oldIdx];
        });
        saveComments(newComments);
        renderArticles();
      });
    }
    renderComments(globalIndex);
  });
}

function highlightText(htmlStr, q) {
  if (!q) return htmlStr;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('(' + esc + ')', 'ig');
  return htmlStr.replace(re, '<mark>$1</mark>');
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'})[m];
  });
}

document.getElementById('form-article').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('input-title').value.trim();
  const desc = document.getElementById('input-desc').value.trim();
  const image = document.getElementById('input-image').value.trim();
  const content = document.getElementById('input-content').value.trim();
  if (!title || !desc || !content) return;
  const articles = getArticles();
  articles.unshift({ title, desc, image, content });
  saveArticles(articles);
  this.reset();
  renderArticles();
});

function renderComments(articleIdx) {
  const commentsObj = getComments();
  const comments = commentsObj[articleIdx] || [];
  const section = document.getElementById(`comments-${articleIdx}`);
  section.innerHTML = '<h4>Diskusi & Balasan</h4>';
  const form = document.createElement('form');
  form.className = 'comment-form';
  form.innerHTML = `
    <input type="text" name="name" required placeholder="Nama" style="margin-right:8px;width:120px" />
    <input type="text" name="text" required placeholder="Tulis komentar..." style="width:40%" />
    <button type="submit" class="btn">Kirim</button>
  `;
  form.onsubmit = function(ev) {
    ev.preventDefault();
    const name = form.name.value.trim();
    const text = form.text.value.trim();
    if (!name || !text) return;
    const commentsObj2 = getComments();
    if (!commentsObj2[articleIdx]) commentsObj2[articleIdx] = [];
    commentsObj2[articleIdx].push({ name, text, replies: [] });
    saveComments(commentsObj2);
    form.reset();
    renderComments(articleIdx);
  };
  section.appendChild(form);
  if (!comments.length) {
    section.innerHTML += '<p>Belum ada komentar.</p>';
    section.appendChild(form);
    return;
  }
  const ul = document.createElement('ul');
  ul.className = 'comments-list';
  comments.forEach((cmt, cidx) => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${escapeHTML(cmt.name)}</b>: ${escapeHTML(cmt.text)}`;
    const replyList = document.createElement('ul');
    replyList.className = 'replies-list';
    (cmt.replies || []).forEach(rep => {
      const rli = document.createElement('li');
      rli.innerHTML = `<span style="color:#888">↳</span> <b>${escapeHTML(rep.name)}</b>: ${escapeHTML(rep.text)}`;
      replyList.appendChild(rli);
    });
    li.appendChild(replyList);
    const replyForm = document.createElement('form');
    replyForm.className = 'reply-form';
    replyForm.innerHTML = `
      <input type="text" name="name" required placeholder="Nama" style="margin-right:8px;width:100px" />
      <input type="text" name="text" required placeholder="Balas..." style="width:35%" />
      <button type="submit" class="btn small">Balas</button>
    `;
    replyForm.onsubmit = function(ev) {
      ev.preventDefault();
      const rname = replyForm.name.value.trim();
      const rtext = replyForm.text.value.trim();
      if (!rname || !rtext) return;
      const commentsObj3 = getComments();
      commentsObj3[articleIdx][cidx].replies.push({ name: rname, text: rtext });
      saveComments(commentsObj3);
      replyForm.reset();
      renderComments(articleIdx);
    };
    li.appendChild(replyForm);
    ul.appendChild(li);
  });
  section.appendChild(ul);
  section.appendChild(form);
}

let searchTimer = null;
const searchInput = document.getElementById('search-articles');
const clearBtn = document.getElementById('clear-search');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimer);
    const q = this.value;
    searchTimer = setTimeout(() => {
      renderArticles(q);
      clearBtn.style.display = q ? 'inline-block' : 'none';
    }, 220);
  });
}
if (clearBtn) {
  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    this.style.display = 'none';
    renderArticles();
    searchInput.focus();
  });
}

document.addEventListener('DOMContentLoaded', function() { renderArticles(); });

// --- render current logged-in user in blog header ---
const SESSION_KEY = 'bizlearn_session_v1';
function loadSession(){ try{ const raw = localStorage.getItem(SESSION_KEY); return raw?JSON.parse(raw):null }catch(e){return null} }
function clearSession(){ localStorage.removeItem(SESSION_KEY); }
function renderBlogUserArea(){
  const root = document.getElementById('user-area');
  if(!root) return;
  const sess = loadSession();
  root.innerHTML = '';
  if(!sess){
    const a = document.createElement('a');
    a.href = 'index.html';
    a.className = 'btn ghost';
    a.textContent = 'Masuk';
    root.appendChild(a);
    return;
  }
  const wrap = document.createElement('div'); wrap.style.display='flex'; wrap.style.alignItems='center'; wrap.style.gap='8px';
  const name = document.createElement('div'); name.style.color='#fff'; name.style.fontWeight='700'; name.textContent = sess.username;
  const btn = document.createElement('button'); btn.className='btn small'; btn.textContent='Keluar'; btn.addEventListener('click', ()=>{ if(!confirm('Keluar dari sesi?')) return; clearSession(); renderBlogUserArea(); });
  wrap.appendChild(name); wrap.appendChild(btn); root.appendChild(wrap);
}
renderBlogUserArea();

// update UI when session changed in another tab/window
window.addEventListener('storage', (e)=>{ if(e.key === SESSION_KEY){ renderBlogUserArea(); } });
