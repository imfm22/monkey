// ==UserScript==
// @name        brilliant.org
// @namespace   Violentmonkey Scripts
// @author      fm22
// @match       https://brilliant.org/*
// @grant       GM_setClipboard
// @grant       GM_notification
// @grant       GM_setValue
// @version     1.0.9
// @author      fm22
// @description 2019/12/24 下午4:09:44
// ==/UserScript==

(function () {
    'use strict'

    // 替换 Gift Premium 按钮
    let premium = document.querySelector('#header > div > a')

    let premiumContainer = premium.parentElement;
    premiumContainer.removeChild(premium);
    
    let mdBtn = document.createElement("input");
    mdBtn.type = "Button";
    mdBtn.value = "Markdown";
    for (let className of "btn btn-green hdr-premium-btn ax-click".split(" ")) {
        mdBtn.classList.add(className);
    }
    mdBtn.onclick = function() {
        alert("现在开始下载 markdown 文件");
    }
    premiumContainer.appendChild(mdBtn);
    
    let latexs = document.querySelectorAll('span.katex')

    for (let latex of latexs) {
        // 获取数学公式的 latex 表达式
        let math_content = latex.querySelector('annotation').textContent;
        latex.onclick = function () {
            GM_setClipboard(math_content);
            GM_setValue('lastLatex', math_content);
            GM_notification(math_content, "Latex 公式已复制到剪贴板");
        }
    }

    // 暂未起作用
    let prac_markers = document.querySelectorAll('a.prac-marker');
    for (let marker of prac_markers) {
        marker.onclick = function () {
            let latexs = document.querySelectorAll('span.katex')

            for (let latex of latexs) {
                let math_content = latex.querySelector('annotation').textContent;
                latex.onclick = function () {
                    alert(math_content);
                }
            }
        }
    }
})();