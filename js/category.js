/**
 * KBH 博客 - 分类页脚本
 */

(function () {
    'use strict';

    var siteData = null;

    document.addEventListener('DOMContentLoaded', function () {
        loadData().then(function () {
            initTheme();
            initMobileMenu();
            renderCategory();
        });
    });

    function loadData() {
        return fetch('data/articles.json')
            .then(function (res) { return res.json(); })
            .then(function (data) { siteData = data; })
            .catch(function () { siteData = { categories: [], articles: [] }; });
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

    function renderCategory() {
        var params = new URLSearchParams(window.location.search);
        var catId = params.get('cat');
        var titleEl = document.getElementById('categoryTitle');
        var descEl = document.getElementById('categoryDesc');
        var container = document.getElementById('categoryArticles');

        if (!siteData || !siteData.categories) {
            if (titleEl) titleEl.textContent = '分类';
            if (descEl) descEl.textContent = '加载失败';
            return;
        }

        var category = siteData.categories.find(function (c) { return c.id === catId; });
        if (!category) {
            if (titleEl) titleEl.textContent = '未知分类';
            if (descEl) descEl.textContent = '该分类不存在';
            if (container) container.innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-muted);">该分类暂无文章</p>';
            return;
        }

        if (titleEl) titleEl.textContent = category.name;
        if (descEl) descEl.textContent = '共 ' + (category.count || 0) + ' 篇文章';

        var articles = (siteData.articles || []).filter(function (a) { return a.category === catId; });

        if (!container) return;

        if (articles.length === 0) {
            container.innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-muted);">该分类暂无文章</p>';
            return;
        }

        container.innerHTML = articles.map(function (article) {
            return '<article class="article-card">' +
                '<a href="article.html?id=' + article.id + '" class="card-cover">' +
                    '<img src="' + (article.cover || 'img/news/img01.jpg') + '" alt="' + escapeHtml(article.title) + '" loading="lazy" />' +
                '</a>' +
                '<div class="card-content">' +
                    '<div>' +
                        '<span class="card-category">' + escapeHtml(article.categoryName || article.category) + '</span>' +
                        '<a href="article.html?id=' + article.id + '" class="card-title">' + escapeHtml(article.title) + '</a>' +
                        '<p class="card-excerpt">' + escapeHtml(article.excerpt) + '</p>' +
                    '</div>' +
                    '<div class="card-meta">' +
                        '<span class="author"><img src="img/hero.png" alt="' + escapeHtml(article.author) + '" />' + escapeHtml(article.author) + '</span>' +
                        '<span>📅 ' + article.date + '</span>' +
                        '<span>👁 ' + article.views + '</span>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
