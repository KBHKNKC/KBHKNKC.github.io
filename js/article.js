/**
 * KBH 博客 - 文章详情页脚本
 */

(function () {
    'use strict';

    var siteData = null;

    document.addEventListener('DOMContentLoaded', function () {
        loadData().then(function () {
            initTheme();
            initMobileMenu();
            renderArticle();
        });
    });

    function loadData() {
        return fetch('data/articles.json')
            .then(function (res) { return res.json(); })
            .then(function (data) { siteData = data; })
            .catch(function () { siteData = { articles: [] }; });
    }

    function initTheme() {
        var toggle = document.getElementById('themeToggle');
        var saved = localStorage.getItem('blog-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.textContent = '☀️';
        }
        toggle.addEventListener('click', function () {
            var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
            toggle.textContent = isDark ? '🌙' : '☀️';
            localStorage.setItem('blog-theme', isDark ? 'light' : 'dark');
        });
    }

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
    }

    function renderArticle() {
        var params = new URLSearchParams(window.location.search);
        var id = parseInt(params.get('id'), 10);
        var container = document.getElementById('articleDetail');
        if (!container) return;

        if (!siteData || !siteData.articles) {
            container.innerHTML = '<p>加载失败</p>';
            return;
        }

        var article = siteData.articles.find(function (a) { return a.id === id; });
        if (!article) {
            container.innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-muted);">文章不存在</p>';
            return;
        }

        document.title = escapeHtml(article.title) + ' - KBH';

        var tagsHtml = '';
        if (article.tags && article.tags.length) {
            tagsHtml = '<div class="article-tags">' +
                article.tags.map(function (t) { return '<a href="index.html">' + escapeHtml(t) + '</a>'; }).join('') +
            '</div>';
        }

        container.innerHTML =
            '<div class="article-header">' +
                '<a href="category.html?cat=' + article.category + '" class="category-tag">' + escapeHtml(article.categoryName || article.category) + '</a>' +
                '<h1>' + escapeHtml(article.title) + '</h1>' +
                '<div class="meta">' +
                    '<div class="author-info">' +
                        '<img src="img/hero.png" alt="' + escapeHtml(article.author) + '" />' +
                        '<span>' + escapeHtml(article.author) + '</span>' +
                    '</div>' +
                    '<span>📅 ' + article.date + '</span>' +
                    '<span>👁 ' + article.views + ' 阅读</span>' +
                '</div>' +
            '</div>' +
            (article.cover ? '<div class="article-cover"><img src="' + article.cover + '" alt="' + escapeHtml(article.title) + '" /></div>' : '') +
            '<div class="article-body">' + article.content + '</div>' +
            tagsHtml +
            '<div style="margin-top:30px;padding-top:20px;border-top:1px solid var(--border-color);text-align:center;">' +
                '<a href="index.html" style="color:var(--primary-color);font-weight:600;">&larr; 返回首页</a>' +
            '</div>';
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
