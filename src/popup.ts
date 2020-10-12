import { NeWorkHotkeys } from './NeWorkHotkeys';

function info(val) {
  const status = document.getElementById('status')!;
  if (typeof(val) === 'object') {
    val = JSON.stringify(val);
  }
  status.textContent = val;
  setTimeout(function () {
    status.textContent = '';
  }, 1500);
}

function save_options() {
  // @ts-ignore
  const form = <HTMLFormElement> document.forms.mainForm;
  const settings = {
      soundEnabled: form.soundEnabled.checked,
  };
  chrome.storage.local.set({ [NeWorkHotkeys.KEY_SETTINGS]: settings }, () => info('Options saved.'));
}

function restore_options() {
  chrome.storage.local.get({
    [NeWorkHotkeys.KEY_SETTINGS]: {
      soundEnabled: true,
    }
  // @ts-ignore
  }, function (cache: StorageCache) {
    // @ts-ignore
    const form = <HTMLFormElement> document.forms.mainForm;
    if (cache.settings.soundEnabled) form.soundEnabled.checked = true;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save')!.addEventListener('click', save_options);
