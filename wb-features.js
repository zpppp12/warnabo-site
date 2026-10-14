(function () {
  var CSS = ""
    + ".wa-float{width:auto;left:22px;right:auto!important;padding:0 20px 0 16px;border-radius:999px;gap:9px;display:flex;align-items:center}"
    + ".wa-float .wa-label{color:#fff;font-weight:600;font-size:14px;white-space:nowrap}"
    + ".lang-pill{position:fixed;right:20px;top:84px;z-index:60;display:inline-flex;align-items:center;gap:8px;background:#0E2338;color:#fff;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;border:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif}"
    + ".lang-pill:hover{background:#16324F}.lang-pill .flag{font-size:15px;line-height:1}"
    + ".marquee-section{padding:48px 0;background:#F6F8FB;border-top:1px solid #E4E8EE;border-bottom:1px solid #E4E8EE}"
    + ".marquee{overflow:hidden;position:relative}"
    + ".marquee-track{display:flex;gap:22px;width:max-content;animation:wbmarquee 32s linear infinite}"
    + ".marquee-track:hover{animation-play-state:paused}"
    + ".marquee-item{width:170px;height:140px;border-radius:12px;overflow:hidden;background:#fff;border:1px solid #E4E8EE;flex-shrink:0}"
    + ".marquee-item img{width:100%;height:100%;object-fit:contain;padding:8px;box-sizing:border-box}"
    + "@keyframes wbmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"
    + "@media (prefers-reduced-motion:reduce){.marquee-track{animation:none}}";
  var st = document.createElement("style");
  st.textContent = CSS;
  document.head.appendChild(st);

  var DICT = {
    zh: { "nav.home":"首页","nav.products":"产品中心","nav.oem":"定制 OEM","nav.cert":"检测认证","nav.samples":"样品寄送","nav.blog":"博客文章","nav.about":"关于工厂","nav.contact":"联系我们","cta.quote":"获取报价",
      "hero.badge":"工厂直销 · OEM 与批发",
      "hero.title":"铝膜气球 <span>源头工厂直供</span> — 让你花更少、卖更多。",
      "hero.lead":"沃纳博气球专业生产数字字母气球、超级造型、波波球及定制 Logo 气球。MOQ 500 个公开透明，EN71 与 ASTM 报告齐全，12 小时内真人回复。",
      "hero.cta1":"获取报价","hero.cta2":"订购样品套装",
      "hero.note":"已服务全球 30+ 国家的派对用品批发商、活动策划公司与线上零售商。",
      "sec.products":"产品中心","sec.why":"为什么选择我们","sec.how":"合作流程","sec.markets":"销往全球市场","sec.blog":"采购知识，来自工厂端",
      "wa.label":"WhatsApp 联系我们" },
    en: { "nav.home":"Home","nav.products":"Products","nav.oem":"Custom OEM","nav.cert":"Certifications","nav.samples":"Samples","nav.blog":"Blog","nav.about":"About","nav.contact":"Contact","cta.quote":"Get a Quote",
      "hero.badge":"Factory Direct · OEM & Wholesale",
      "hero.title":'Foil balloons <span>straight from the factory</span> — so you spend less and sell more.',
      "hero.lead":"Warnabo Balloons manufactures number & letter balloons, super shapes, bobo balloons and custom logo OEM balloons. Transparent MOQ from 500 pcs, EN71 & ASTM reports available, and a real person replying within 12 hours.",
      "hero.cta1":"Get a Quote","hero.cta2":"Order a Sample Kit",
      "hero.note":"Trusted by party wholesalers, event planners and online retailers in 30+ countries.",
      "sec.products":"Our Products","sec.why":"Why Warnabo","sec.how":"How We Work","sec.markets":"Sold in international markets","sec.blog":"Sourcing knowledge, from the factory side",
      "wa.label":"WhatsApp us" }
  };

  function getLang() { var l = null; try { l = localStorage.getItem("wb-lang"); } catch (e) {} return l === "zh" ? "zh" : "en"; }

  function apply(lang) {
    var d = DICT[lang] || DICT.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (d[k] !== undefined) el.innerHTML = d[k];
    });
    var pill = document.getElementById("lang-pill");
    if (pill) pill.innerHTML = '<span class="flag">' + (lang === "zh" ? "\uD83C\uDDE8\uD83C\uDDF3" : "\uD83C\uDDFA\uD83C\uDDF8") + "</span><span>" + (lang === "zh" ? "中文" : "EN") + "</span>";
    try { localStorage.setItem("wb-lang", lang); } catch (e) {}
    document.querySelectorAll(".wa-float .wa-label").forEach(function (el) { el.textContent = d["wa.label"]; });
  }


  /* ===== Google 翻译组件（多语言兜底）===== */
  function mountGoogle() {
  var gtWrap = document.createElement("div");
  gtWrap.id = "wb-gt";
  gtWrap.style.cssText = "position:fixed;right:20px;top:128px;z-index:59;background:#fff;border:1px solid #E4E8EE;border-radius:999px;padding:4px 10px;box-shadow:0 2px 8px rgba(14,35,56,.10);font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif";
  gtWrap.innerHTML = '<span style="font-size:12px;color:#5C6B7A;margin-right:4px">More</span><span id="google_translate_element"></span>';
  document.body.appendChild(gtWrap);
  var gtStyle = document.createElement("style");
  gtStyle.textContent = "#google_translate_element{display:inline-block;vertical-align:middle}#google_translate_element select{font-size:12px;padding:3px 6px;border:1px solid #E4E8EE;border-radius:6px;color:#0E2338;background:#fff}.goog-te-gadget{font-size:0!important}.goog-te-gadget .goog-te-combo{margin:0!important}.goog-logo-link,.goog-te-banner-frame{display:none!important}body{top:0!important}.goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-te-menu-frame{display:none!important}";
  document.head.appendChild(gtStyle);
  window.googleTranslateElementInit = function () {
    try {
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,zh-CN,es,de,fr,pt,ar,ru,ja,ko",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, "google_translate_element");
    } catch (e) {}
  };
  var gs = document.createElement("script");
  gs.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  gs.async = true;
  document.head.appendChild(gs);
  }
  try { mountGoogle(); } catch (e) {}


  /* ===== 联系页：联系方式卡片（跟随后台 settings）===== */
  var CM = {
    zh: { wa: "WhatsApp", waTip: "最快回复，可直接发送照片", mail: "电子邮件", mailTip: "详细的简报和文件", hours: "工作时间", addr: "地址", quote: "最快报价应包含哪些内容" },
    en: { wa: "WhatsApp", waTip: "fastest reply, send photos here", mail: "Email", mailTip: "for detailed briefs and documents", hours: "Working hours", addr: "Address", quote: "What to include for the fastest quote" }
  };
  function renderContactMethods() {
    var box = document.getElementById("contact-methods");
    if (!box) return;
    fetch((window.location.pathname.indexOf("/blog/") > -1 ? "../" : "") + "data/site.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (s) {
        var d = CM[getLang()] || CM.en;
        var wa = "https://wa.me/" + (s.whatsapp || "") + "?text=" + encodeURIComponent(s.whatsappText || "");
        box.innerHTML =
          '<div class="card" style="padding:18px"><h3 style="font-size:16px">' + d.wa + '</h3><p style="font-size:14px"><a href="' + wa + '" target="_blank" rel="noopener">+' + (s.whatsapp || "") + '</a> — ' + d.waTip + '.</p></div>' +
          '<div class="card" style="padding:18px"><h3 style="font-size:16px">' + d.mail + '</h3><p style="font-size:14px"><a href="mailto:' + (s.email || "") + '">' + (s.email || "") + '</a> — ' + d.mailTip + '.</p></div>' +
          '<div class="card" style="padding:18px"><h3 style="font-size:16px">' + d.hours + '</h3><p style="font-size:14px">' + (s.hours || "") + '</p></div>' +
          '<div class="card" style="padding:18px"><h3 style="font-size:16px">' + d.addr + '</h3><p style="font-size:14px">' + (s.address || "") + '</p></div>';
      }).catch(function () {});
  }

  /* ===== 询盘表单：Netlify Forms 提交 ===== */
  function wireForm() {
    var form = document.getElementById("inquiry-form");
    if (!form || form.getAttribute("data-wired") === "1") return;
    var clone = form.cloneNode(true);
    clone.setAttribute("data-wired", "1");
    form.parentNode.replaceChild(clone, form);
    clone.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var btn = clone.querySelector("button[type=submit]");
      var data = new FormData(clone);
      var params = new URLSearchParams();
      data.forEach(function (v, k) { params.append(k, typeof v === "string" ? v : v.name); });
      btn.disabled = true;
      btn.textContent = getLang() === "zh" ? "发送中..." : "Sending...";
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      }).then(function () {
        clone.reset();
        if (status) {
          status.textContent = getLang() === "zh" ? "已收到你的询盘！我们会在 12 小时内回复。" : "Thank you! Your inquiry has been received. We reply within 12 hours.";
          status.style.color = "#1FA855";
        }
        btn.disabled = false;
        btn.textContent = getLang() === "zh" ? "发送询盘" : "Send Inquiry";
      }).catch(function () {
        if (status) {
          status.textContent = getLang() === "zh" ? "发送失败，请直接发邮件或加 WhatsApp。" : "Something went wrong. Please email us directly or contact us on WhatsApp.";
          status.style.color = "#C24329";
        }
        btn.disabled = false;
        btn.textContent = getLang() === "zh" ? "发送询盘" : "Send Inquiry";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var pill = document.createElement("button");
    pill.id = "lang-pill";
    pill.className = "lang-pill";
    pill.setAttribute("aria-label", "Switch language");
    pill.addEventListener("click", function () { apply(getLang() === "en" ? "zh" : "en"); });
    document.body.appendChild(pill);
    apply(getLang());
    renderContactMethods();
    wireForm();
  });
})();
