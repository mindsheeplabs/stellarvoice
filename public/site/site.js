/* Trades pages: booking buttons open the calendar, the two forms send to the team. */
(function () {
  var CAL = 'https://calendly.com/garysarco1/30min';
  var CSS = 'https://assets.calendly.com/assets/external/widget.css';
  var JS = 'https://assets.calendly.com/assets/external/widget.js';
  var loading = null;
  function track(name, data) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, data || {})); } catch (e) {} }
  function loadCal() {
    if (loading) return loading;
    loading = new Promise(function (resolve) {
      if (window.Calendly) return resolve();
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = CSS; document.head.appendChild(l);
      var s = document.createElement('script'); s.src = JS; s.async = true;
      s.onload = resolve; s.onerror = resolve; document.body.appendChild(s);
    });
    return loading;
  }
  function book(source) {
    track('book_demo_clicked', { source: source, calendly_url: CAL });
    loadCal().then(function () {
      if (window.Calendly) window.Calendly.initPopupWidget({ url: CAL });
      else window.open(CAL, '_blank', 'noopener');
    });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-book]');
    if (!a) return;
    e.preventDefault();
    var d = a.closest('dialog'); if (d) d.close();
    book(a.getAttribute('data-book') || 'trades');
  });

  Array.prototype.forEach.call(document.querySelectorAll('form[data-lead]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]'), msg = form.querySelector('.form-err');
      var data = { source: form.getAttribute('data-lead'), page: location.pathname };
      Array.prototype.forEach.call(form.elements, function (el) { if (el.name) data[el.name] = el.value; });
      btn.disabled = true; btn.textContent = 'Sending...'; if (msg) msg.textContent = '';
      fetch('/api/lead/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().then(function (j) { return r.ok && j.ok; }); })
        .then(function (ok) {
          if (!ok) throw new Error('failed');
          track('lead_submitted', { source: data.source });
          form.innerHTML = form.getAttribute('data-thanks');
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = form.getAttribute('data-button');
          if (msg) msg.textContent = 'Sorry, that did not send. Please try again, or book a call instead.';
        });
    });
  });
})();
