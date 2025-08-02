document.getElementById('roiForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const cost = parseFloat(document.getElementById('cost').value);
  const attendees = parseInt(document.getElementById('attendees').value);
  const leadRate = parseFloat(document.getElementById('leadRate').value) / 100;
  const closeRate = parseFloat(document.getElementById('closeRate').value) / 100;
  const dealSize = parseFloat(document.getElementById('dealSize').value);

  const leads = Math.round(attendees * leadRate);
  const deals = Math.round(leads * closeRate);
  const revenue = deals * dealSize;
  const roi = (((revenue - cost) / cost) * 100).toFixed(2);
  const breakEvenDeals = Math.ceil(cost / dealSize);

  document.getElementById('leadsOut').textContent = leads;
  document.getElementById('dealsOut').textContent = deals;
  document.getElementById('revenueOut').textContent = revenue.toLocaleString();
  document.getElementById('roiOut').textContent = `${roi}%`;
  document.getElementById('breakEvenOut').textContent = breakEvenDeals;

  document.getElementById('results').classList.remove('hidden');
});
