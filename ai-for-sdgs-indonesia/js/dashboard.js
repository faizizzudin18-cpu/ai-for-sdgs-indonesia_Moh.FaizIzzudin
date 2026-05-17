// dashboard.js — All Chart.js visualizations for the dashboard page
(function () {
  // Minimal chart defaults — no grid, clean typography
  function applyDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-bg').trim() || '#fff';
    Chart.defaults.plugins.tooltip.titleColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text').trim() || '#0F0F0F';
    Chart.defaults.plugins.tooltip.bodyColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text-muted').trim() || '#6B6B6B';
    Chart.defaults.plugins.tooltip.borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-border').trim() || '#E5E5E5';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 2;
  }

  function getAccentColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim() || '#1E3A8A';
  }

  function getTextMutedColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text-muted').trim() || '#6B6B6B';
  }

  function getBorderColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-border').trim() || '#E5E5E5';
  }

  // === CHART 1: SDG Progress Horizontal Bar ===
  function initSDGProgressChart(data) {
    const canvas = document.getElementById('chart-sdg-progress');
    if (!canvas) return;

    const accent = getAccentColor();
    const muted = getTextMutedColor();
    const border = getBorderColor();

    const colors = data.sdgProgress.map(function (item) {
      if (item.progress < 50) return '#DC2626'; // red — behind
      if (item.progress < 65) return '#D97706'; // amber — on track
      return accent; // blue — ahead
    });

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.sdgProgress.map(function (d) { return 'SDG ' + d.goal + ' — ' + d.name; }),
        datasets: [{
          data: data.sdgProgress.map(function (d) { return d.progress; }),
          backgroundColor: colors,
          borderRadius: 1,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const item = data.sdgProgress[ctx.dataIndex];
                return ' ' + ctx.raw + '% (Tren: ' + item.trend + '% per tahun)';
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: muted,
              callback: function (val) { return val + '%'; },
              maxTicksLimit: 6
            }
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: muted,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }

  // === CHART 2: AI Investment Line Chart ===
  function initInvestmentChart(data) {
    const canvas = document.getElementById('chart-investment');
    if (!canvas) return;

    const accent = getAccentColor();
    const muted = getTextMutedColor();

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.aiInvestment.map(function (d) { return d.year; }),
        datasets: [{
          data: data.aiInvestment.map(function (d) { return d.amount; }),
          borderColor: accent,
          borderWidth: 1.5,
          pointRadius: 3,
          pointBackgroundColor: accent,
          pointBorderWidth: 0,
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) { return ' US$ ' + ctx.raw + ' juta'; }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: muted }
          },
          y: {
            grid: {
              color: function () { return getBorderColor(); },
              lineWidth: 0.5
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: muted,
              callback: function (val) { return '$' + val + 'M'; }
            }
          }
        }
      }
    });
  }

  // === CHART 3: Pillar Donut Chart ===
  function initPillarChart(data) {
    const canvas = document.getElementById('chart-pillar');
    if (!canvas) return;

    const accent = getAccentColor();

    // Grayscale palette with one accent
    const COLORS = [accent, '#9CA3AF', '#6B7280', '#4B5563', '#374151'];

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: data.pillarDistribution.map(function (d) { return d.pillar; }),
        datasets: [{
          data: data.pillarDistribution.map(function (d) { return d.count; }),
          backgroundColor: COLORS,
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16,
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--color-text-muted').trim(),
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const total = ctx.dataset.data.reduce(function (a, b) { return a + b; }, 0);
                const pct = Math.round((ctx.raw / total) * 100);
                return ' ' + ctx.raw + ' proyek (' + pct + '%)';
              }
            }
          }
        }
      }
    });
  }

  // === FILTER LOGIC ===
  function initFilters(allProjects) {
    const sdgFilter = document.getElementById('filter-sdg');
    const pillarFilter = document.getElementById('filter-pillar');
    const countEl = document.getElementById('project-count');

    function applyFilters() {
      const sdgVal = sdgFilter ? sdgFilter.value : 'all';
      const pillarVal = pillarFilter ? pillarFilter.value : 'all';

      const filtered = allProjects.filter(function (p) {
        const matchSDG = sdgVal === 'all' || p.sdg.includes(parseInt(sdgVal));
        const matchPillar = pillarVal === 'all' || p.pillar === pillarVal;
        return matchSDG && matchPillar;
      });

      if (countEl) countEl.textContent = filtered.length;
    }

    if (sdgFilter) sdgFilter.addEventListener('change', applyFilters);
    if (pillarFilter) pillarFilter.addEventListener('change', applyFilters);
  }

  // === MAIN INIT ===
  function init() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded');
      return;
    }

    applyDefaults();

    // Fetch data
    fetch('data/sdg-data.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        initSDGProgressChart(data);
        initInvestmentChart(data);
        initPillarChart(data);
      })
      .catch(function (err) { console.error('Failed to load sdg-data.json', err); });

    fetch('data/projects.json')
      .then(function (res) { return res.json(); })
      .then(function (projects) { initFilters(projects); })
      .catch(function (err) { console.error('Failed to load projects.json', err); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
