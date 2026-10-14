document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  var form = document.querySelector("#inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var out = document.querySelector("#form-status");
      var action = form.getAttribute("action") || "";
      if (action.indexOf("your-form-id") > -1) {
        if (out) {
          out.textContent = "Demo mode: form is not connected yet. See README to connect Formspree, or use the WhatsApp button.";
          out.style.color = "#0C6E6B";
        }
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Sending...";
      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          if (out) {
            out.textContent = "Thank you! Your inquiry has been received. We reply within 12 hours.";
            out.style.color = "#1FA855";
          }
        } else {
          if (out) {
            out.textContent = "Something went wrong. Please email us directly or contact us on WhatsApp.";
            out.style.color = "#0C6E6B";
          }
        }
        btn.disabled = false;
        btn.textContent = "Send Inquiry";
      }).catch(function () {
        if (out) {
          out.textContent = "Something went wrong. Please email us directly or contact us on WhatsApp.";
          out.style.color = "#0C6E6B";
        }
        btn.disabled = false;
        btn.textContent = "Send Inquiry";
      });
    });
  }
});

(function () {
  var nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  function animate(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var dur = 1200, start = null;
    function fmt(n) { return prefix + Math.round(n).toLocaleString("en-US") + suffix; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  } else { nums.forEach(animate); }
})();

(function () {
  var params = new URLSearchParams(window.location.search);
  var product = params.get("product");
  if (!product) return;
  var labels = {
    "number-letter": "Number & Letter balloons",
    "super-shapes": "Super Shape foil balloons",
    "bobo-bubble": "BoBo / Bubble balloons",
    "seasonal": "Seasonal & occasion balloons",
    "air-filled": "Air-filled & basic shape balloons",
    "bulk-resellers": "Bulk / reseller program",
    "custom-oem": "Custom logo balloons (OEM)",
    "new-design": "New Designs collection",
    "sample-starter": "Starter sample kit",
    "sample-full": "Full catalog sample kit"
  };
  var label = labels[product];
  if (!label) return;
  var checkValues = { "sample-starter": "sample", "sample-full": "sample" };
  var cbValue = checkValues[product] || product;
  var cb = document.querySelector('input[name="interest"][value="' + cbValue + '"]');
  if (cb) cb.checked = true;
  var msg = document.querySelector("#f-message");
  if (msg && !msg.value) {
    msg.value = "Hi, I am interested in " + label + ". Please send me your catalog, MOQ and best pricing. My destination port is: ";
  }
})();
