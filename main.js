// main.js
const CLIENT_SDK_KEY = 'client-RsgziTxIu9WpzGuWumInkafTLU1XIAcW5cM1GAiB4TK';

// main.js (ES module is fine; Statsig is on window from the <script> tag)

const GATE_NAME = 'show_new_banner';
const CONFIG_NAME = 'banner_config';

function getOrCreateUserID() {
 // let id = localStorage.getItem('statsig_demo_uid');
 // if (!id) {
    id = 'test_user_' + Math.random().toString(36).slice(2, 8);
  //  localStorage.setItem('statsig_demo_uid', id);
  }
  return id;
}

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} not found in DOM`);
  return el;
}

async function boot() {
  // 1) Initialize
  await statsig.initialize(CLIENT_SDK_KEY, {
    userID: getOrCreateUserID(),
    custom: { plan: 'free', locale: 'en-SG' }, // example attributes
  });

  // 2) Feature Gate (boolean)
  const showNewBanner = statsig.checkGate(GATE_NAME);

  // 3) Dynamic Config (key/value)
  const cfg = statsig.getConfig(CONFIG_NAME);
  const bannerText = cfg.get('bannerText', 'Hello from default config');

  // Apply UI
  const banner = $('banner'); // make sure <div id="banner"> exists
  if (showNewBanner) {
    banner.style.display = 'block';
    banner.textContent = bannerText;
  } else {
    banner.style.display = 'none';
  }

  // 4) Custom Event
  $('cta-btn').addEventListener('click', () => {
    statsig.logEvent('button_clicked', 'signup', {
      page: 'home',
      gate_passed: showNewBanner,
    });
    alert('Logged event: button_clicked → signup');
  });

  // (Optional) Debug to console so you can verify values quickly
  console.log({
    userID: statsig.getCurrentUser()?.userID,
    gate: { name: GATE_NAME, value: showNewBanner },
    bannerText,
  });
}

boot().catch((e) => {
  console.error('Statsig bootstrap failed:', e);
  alert('Statsig init failed. Check console for details.');
});
