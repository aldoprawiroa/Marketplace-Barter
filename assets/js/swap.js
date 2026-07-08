const swapState = {
  status: 'Awaiting proposal',
  agreement: false
};

function initializeSwap() {
  bindSwapEvents();
  renderSwapState();
}

function bindSwapEvents() {
  document.getElementById('agreement-checkbox').addEventListener('change', (event) => {
    swapState.agreement = event.target.checked;
    renderSwapState();
  });

  document.getElementById('cancel-swap').addEventListener('click', () => {
    swapState.status = 'Cancelled';
    swapState.agreement = false;
    document.getElementById('agreement-checkbox').checked = false;
    renderSwapState();
  });

  document.getElementById('send-proposal').addEventListener('click', () => {
    if (!swapState.agreement) {
      showAgreementWarning();
      return;
    }
    swapState.status = 'Proposal sent';
    renderSwapState();
  });

  document.getElementById('accept-swap').addEventListener('click', () => {
    if (!swapState.agreement) {
      showAgreementWarning();
      return;
    }
    swapState.status = 'Swap accepted';
    renderSwapState();
  });

  document.getElementById('reject-swap').addEventListener('click', () => {
    if (!swapState.agreement) {
      showAgreementWarning();
      return;
    }
    swapState.status = 'Swap rejected';
    renderSwapState();
  });
}

function renderSwapState() {
  const statusPill = document.getElementById('swap-status-pill');
  const summaryStatus = document.getElementById('summary-status');
  const summaryRecommendation = document.getElementById('summary-recommendation');
  const agreementHelper = document.getElementById('agreement-helper');

  statusPill.textContent = swapState.status;
  summaryStatus.textContent = swapState.status;
  agreementHelper.textContent = swapState.agreement
    ? 'Terms accepted. You can continue with the exchange.'
    : 'Please confirm the terms to continue.';
  agreementHelper.classList.toggle('warning', !swapState.agreement);

  if (swapState.status === 'Swap accepted') {
    summaryRecommendation.textContent = 'The trade is ready to close with a confident handoff.';
  } else if (swapState.status === 'Swap rejected') {
    summaryRecommendation.textContent = 'The negotiation has been paused and can be reopened later.';
  } else if (swapState.status === 'Proposal sent') {
    summaryRecommendation.textContent = 'A friendly proposal is now in motion with the partner.';
  } else if (swapState.status === 'Cancelled') {
    summaryRecommendation.textContent = 'The swap was cancelled. You can restart when ready.';
  } else {
    summaryRecommendation.textContent = 'Strong match for a balanced exchange.';
  }
}

function showAgreementWarning() {
  const helper = document.getElementById('agreement-helper');
  helper.textContent = 'Please check the agreement box before continuing.';
  helper.classList.add('warning');
  setTimeout(() => {
    helper.textContent = swapState.agreement
      ? 'Terms accepted. You can continue with the exchange.'
      : 'Please confirm the terms to continue.';
    helper.classList.remove('warning');
  }, 1600);
}

document.addEventListener('DOMContentLoaded', initializeSwap);
