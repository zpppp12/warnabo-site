(function () {
  var BASE = window.location.pathname.indexOf("/blog/") > -1 ? "../" : "";

  function fetchJSON(path) {
    return fetch(BASE + path, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function applySettings(s) {
    if (!s) return;
    var wa = "https://wa.me/" + (s.whatsapp || "") + "?text=" + encodeURIComponent(s.whatsappText || "");
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      a.setAttribute("href", wa);
    });
    document.querySelectorAll('.site-footer a[href^="mailto:"]').forEach(function (a) {
      if (s.email) { a.setAttribute("href", "mailto:" + s.email); a.textContent = s.email; }
    });
    var cols = document.querySelectorAll(".site-footer .footer-grid > div");
    if (cols.length >= 4) {
      var lis = cols[3].querySelectorAll("li");
      lis.forEach(function (li) {
        var t = li.textContent || "";
        if (t.indexOf("Address:") === 0 && s.address) li.textContent = "Address: " + s.address;
        if (t.indexOf("Mon") === 0 && s.hours) li.textContent = s.hours;
      });
    }
  }

  function thumb(p) {
    return '<img class="thumb" src="' + esc(p.image) + '" alt="' + esc(p.alt || p.name) + '" loading="lazy">';
  }

  function homeCard(p) {
    return '<div class="card cat-card">' + thumb(p) +
      "<h3>" + esc(p.name) + "</h3><p>" + esc(p.blurb) + "</p>" +
      '<a class="btn btn-ghost btn-sm cat-actions" href="' + esc(p.ctaHref || "contact.html") + '">' + esc(p.ctaText || "Learn more") + "</a></div>";
  }

  function productSection(p, i) {
    var soft = i % 2 === 1 ? " section-soft" : "";
    var imgCol = '<div class="cat-card">' + thumb(p) + "</div>";
    var badge = p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "";
    var specs = (p.specs || []).map(function (s) {
      return "<li><span>" + esc(s.label) + "</span><b>" + esc(s.value) + "</b></li>";
    }).join("");
    var textCol = "<div>" + badge +
      '<h2 class="mt-1">' + esc(p.name) + "</h2>" +
      "<p>" + esc(p.blurb) + "</p>" +
      '<ul class="spec-list mt-2">' + specs + "</ul>" +
      '<p class="mt-3"><a class="btn btn-primary" href="' + esc(p.ctaHref || "contact.html") + '">' + esc(p.ctaText || "Get a Quote") + "</a></p></div>";
    var inner = i % 2 === 0 ? textCol + imgCol : imgCol + textCol;
    return '<section class="section' + soft + '" id="' + esc(p.slug) + '">' +
      '<div class="container grid grid-2" style="align-items:center; gap:40px">' + inner + "</div></section>";
  }

  fetchJSON("data/site.json").then(applySettings).catch(function () {});

  fetchJSON("data/products.json").then(function (data) {
    var all = (data.products || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    var homeGrid = document.getElementById("home-products-grid");
    if (homeGrid) {
      homeGrid.innerHTML = all.filter(function (p) { return p.showOnHome; }).map(homeCard).join("");
    }
    var sections = document.getElementById("product-sections");
    if (sections) {
      var list = all.filter(function (p) { return p.showOnProducts; });
      sections.innerHTML = list.map(productSection).join("");
    }
  }).catch(function () {});
})();
