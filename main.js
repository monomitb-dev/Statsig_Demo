import Statsig from 'https://cdn.jsdelivr.net/npm/statsig-js/+esm';

await Statsig.initialize('client-<YOUR_SDK_KEY>', {
  userID: 'demo_user'
});

const config = await Statsig.getConfig('signup_form_config');
document.getElementById('headline').innerText = config.getValue('titleText', 'Join Now');

const showNewUI = await Statsig.checkGate('show_new_signup_ui');
if (showNewUI) {
  document.getElementById('headline').style.color = 'green';
}

document.getElementById('cta-btn').addEventListener('click', () => {
  Statsig.logEvent('signup_clicked', { source: 'landing_page' });
});
