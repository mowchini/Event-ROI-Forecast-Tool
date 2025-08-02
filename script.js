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
  const roi = ((revenue - cost) / cost) * 100;
  const roiRounded = roi.toFixed(2);
  const breakEvenDeals = Math.ceil(cost / dealSize);

  document.getElementById('leadsOut').textContent = leads;
  document.getElementById('dealsOut').textContent = deals;
  document.getElementById('revenueOut').textContent = revenue.toLocaleString();
  document.getElementById('roiOut').textContent = `${roiRounded}%`;
  document.getElementById('breakEvenOut').textContent = breakEvenDeals;

  // Update ROI progress bar
  const progress = Math.min(Math.max(roi, 0), 200); // cap at 200% visually
  const bar = document.getElementById('roiProgress');
  bar.style.width = progress + '%';
  bar.style.backgroundColor = roi > 100 ? '#4caf50' : roi > 0 ? '#ffc107' : '#f44336';

  // Confidence Level Logic
  let confidence = 0;
  if (attendees > 0) confidence++;
  if (leadRate > 0) confidence++;
  if (closeRate > 0) confidence++;
  if (dealSize > 0) confidence++;
  if (cost > 0) confidence++;

  const confidenceIcons = ['🔳', '🔲'];
  const display = Array(5).fill(confidenceIcons[1]).map((v, i) => i < confidence ? confidenceIcons[0] : v).join('');
  document.getElementById('confidenceLevel').textContent = display;

  document.getElementById('results').classList.remove('hidden');
});
