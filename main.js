// main.js
const CLIENT_SDK_KEY = 'RsgziTxIu9WpzGuWumInkafTLU1XIAcW5cM1GAiB4TK';

function getOrCreateUserID() {
  let id = localStorage.getItem('statsig_demo_uid');
  if (!id) {
    id = 'test_user_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('statsig_demo_uid', id);
  }
  return id;
}

async function boot() {
  // 1) Initialize
  await statsig.initialize(CLIENT_SDK_KEY, {
    userID: getOrCreateUserID(),
    // Optional demo attrs you can target in gates/configs:
    custom: { plan: 'free', locale: 'en-SG' },
  });

  // 2) Feature Gate
  const showNewBanner = await statsig.checkGate('show_new_banner');
  if (showNewBanner) {
    document.getElementById('banner').style.display = 'block';
  }

  // 3) Dynamic Config
  const config = await statsig.getConfig('banner_config');
  const text = config.get('bannerText', 'Hello from default config');
  document.getElementById('banner').textContent = text;

  // 4) Custom Event
  document.getElementById('cta-btn').addEventListener('click', () => {
    statsig.logEvent('button_clicked', 'signup', { page: 'home' });
    alert('Logged: button_clicked → signup');
  });
}

boot().catch((e) => console.error('Statsig init failed', e));
