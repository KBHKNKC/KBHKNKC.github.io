/**
 * KBH 博客 - 主脚本
 */

(function () {
    'use strict';

    // ===== Data Store =====
    let siteData = null;

    // ===== Initialize =====
    document.addEventListener('DOMContentLoaded', function () {
        loadData().then(function () {
            initTheme();
            initMobileMenu();
            initSearch();
            renderHomepage();
        });
    });

    // ===== Load Data =====
    function loadData() {
        return fetch('data/articles.json')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                siteData = data;
            })
            .catch(function (err) {
                console.error('Failed to load data:', err);
                siteData = { site: {}, categories: [], tags: [], articles: [] };
            });
    }

    // ===== Theme Toggle =====
    function initTheme() {
        var toggle = document.getElementById('themeToggle');
        var saved = localStorage.getItem('blog-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.textContent = '☀️';
        }
        toggle.addEventListener('click', function () {
            var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                toggle.textContent = '🌙';
                localStorage.setItem('blog-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                toggle.textContent = '☀️';
                localStorage.setItem('blog-theme', 'dark');
            }
        });
    }

    // ===== Mobile Menu =====
    function initMobileMenu() {
        var toggle = document.getElementById('menuToggle');
        var nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            var spans = toggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Mobile dropdown toggle
        var dropdowns = document.querySelectorAll('.nav-item.has-dropdown');
        dropdowns.forEach(function (item) {
            item.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        });
    }

    // ===== Search =====
    function initSearch() {
        var btn = document.getElementById('searchBtn');
        var modal = document.getElementById('searchModal');
        var input = document.getElementById('searchInput');
        if (!btn || !modal || !input) return;

        btn.addEventListener('click', function () {
            modal.classList.add('active');
            setTimeout(function () { input.focus(); }, 100);
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }
        });

        input.addEventListener('input', function () {
            var query = input.value.trim().toLowerCase();
            if (!query) return;
            var results = siteData.articles.filter(function (a) {
                return a.title.toLowerCase().indexOf(query) !== -1 ||
                    a.excerpt.toLowerCase().indexOf(query) !== -1;
            });
            // Could display results inline - simplified for now
            console.log('Search results:', results);
        });
    }

    // ===== Render Homepage =====
    function renderHomepage() {
        if (!siteData) return;

        renderSiteInfo();
        renderArticleList(siteData.articles);
        renderCategoryList();
        renderHotList();
        renderTagCloud();
    }

    function renderSiteInfo() {
        var site = siteData.site;
        document.title = (site.name || 'KBH') + ' - ' + (site.slogan || '记录技术，分享思考。');

        var authorEl = document.getElementById('authorName');
        var bioEl = document.getElementById('authorBio');
        if (authorEl) authorEl.textContent = site.author || 'KBH';
        if (bioEl) bioEl.textContent = site.bio || '';

        if (site.stats) {
            var ac = document.getElementById('articleCount');
            var cc = document.getElementById('categoryCount');
            var tc = document.getElementById('tagCount');
            if (ac) ac.textContent = site.stats.articles || 0;
            if (cc) cc.textContent = site.stats.categories || 0;
            if (tc) tc.textContent = site.stats.tags || 0;
        }
    }

    function renderArticleList(articles) {
        var container = document.getElementById('articleList');
        if (!container) return;

        if (!articles || articles.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:60px 0;">暂无文章</p>';
            return;
        }

        container.innerHTML = articles.map(function (article) {
            return '<article class="article-card">' +
                '<a href="article.html?id=' + article.id + '" class="card-cover">' +
                    '<img src="' + (article.cover || 'img/news/img01.jpg') + '" alt="' + escapeHtml(article.title) + '" loading="lazy" />' +
                '</a>' +
                '<div class="card-content">' +
                    '<div>' +
                        '<a href="category.html?cat=' + article.category + '" class="card-category">' + escapeHtml(article.categoryName || article.category) + '</a>' +
                        '<a href="article.html?id=' + article.id + '" class="card-title">' + escapeHtml(article.title) + '</a>' +
                        '<p class="card-excerpt">' + escapeHtml(article.excerpt) + '</p>' +
                    '</div>' +
                    '<div class="card-meta">' +
                        '<span class="author">' +
                            '<img src="img/tx1.png" alt="' + escapeHtml(article.author) + '" />' +
                            escapeHtml(article.author) +
                        '</span>' +
                        '<span>📅 ' + article.date + '</span>' +
                        '<span>👁 ' + article.views + '</span>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    function renderCategoryList() {
        var container = document.getElementById('categoryList');
        if (!container || !siteData.categories) return;

        container.innerHTML = siteData.categories.map(function (cat) {
            return '<li>' +
                '<a href="category.html?cat=' + cat.id + '">' +
                    '<span>📁</span> ' + escapeHtml(cat.name) +
                '</a>' +
                '<span class="count">' + cat.count + '</span>' +
            '</li>';
        }).join('');
    }

    function renderHotList() {
        var container = document.getElementById('hotList');
        if (!container) return;

        var sorted = (siteData.articles || []).slice().sort(function (a, b) {
            return (b.views || 0) - (a.views || 0);
        }).slice(0, 5);

        container.innerHTML = sorted.map(function (article) {
            return '<li>' +
                '<a href="article.html?id=' + article.id + '">' + escapeHtml(article.title) + '</a>' +
            '</li>';
        }).join('');
    }

    function renderTagCloud() {
        var container = document.getElementById('tagCloud');
        if (!container || !siteData.tags) return;

        container.innerHTML = siteData.tags.map(function (tag) {
            return '<a href="index.html#tag-' + tag + '">' + escapeHtml(tag) + '</a>';
        }).join('');
    }

    // ===== Utility =====
    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
