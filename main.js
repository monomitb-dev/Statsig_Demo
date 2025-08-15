const CLIENT_SDK_KEY = 'client-RsgziTxIu9WpzGuWumInkafTLU1XIAcW5cM1GAiB4TK';
const GATE_NAME = 'show_new_banner';
const CONFIG_NAME = 'banner_config';

import { StatsigClient } from '@statsig/js-client'
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

const myStatsigClient = new StatsigClient(
  "client-RsgziTxIu9WpzGuWumInkafTLU1XIAcW5cM1GAiB4TK", 
  { userID: "user-id" },
  {
    plugins: [
      new StatsigSessionReplayPlugin(),
      new StatsigAutoCapturePlugin(),
    ],
  }
);

await myStatsigClient.initializeAsync();


/*function getOrCreateUserID() {
  let id = localStorage.getItem('statsig_demo_uid');
  if (!id) {
    id = 'test_user_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('statsig_demo_uid', id);
  }
  return id;
}

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} not found in DOM`);
  return el;
}

async function boot() {
  const { StatsigClient, runStatsigAutoCapture, runStatsigSessionReplay } = window.Statsig;

  // Create client
  const client = new StatsigClient(
    CLIENT_SDK_KEY,
    { userID: getOrCreateUserID(), custom: { plan: 'free', locale: 'en-SG' } }
  );

  // Optional: built-ins
  runStatsigSessionReplay(client);
  runStatsigAutoCapture(client);

  // Initialize
  await client.initializeAsync();

  // Gate
  const showNewBanner = client.checkGate(GATE_NAME);

  // Config
  const cfg = client.getConfig(CONFIG_NAME); // or getDynamicConfig(...)
  const bannerText = cfg.get('bannerText', 'Hello from default config');

  // UI
  const banner = $('banner');
  if (showNewBanner) {
    banner.style.display = 'block';
    banner.textContent = bannerText;
  } else {
    banner.style.display = 'none';
  }

  // Event
  $('cta-btn').addEventListener('click', () => {
    client.logEvent('button_clicked', 'signup', {
      page: 'home',
      gate_passed: showNewBanner,
    });
    alert('Logged event: button_clicked → signup');
  });

  // Debug
  console.log({
    userID: client.getCurrentUser()?.userID,
    gate: { name: GATE_NAME, value: showNewBanner },
    bannerText,
  });
}*/

boot().catch((e) => {
  console.error('Statsig bootstrap failed:', e);
  alert('Statsig init failed. Check console for details.');
});
