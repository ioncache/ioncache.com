'use strict';

/* setup expand/collapse toggle */

document.querySelector('.main-area').addEventListener('click', (e) => {
  let parentSection;

  if (
    e.target.classList.contains('ion-md-contract') ||
    e.target.classList.contains('ion-md-expand')
  ) {
    parentSection = e.target.parentNode.parentNode;
  } else if (e.target.classList.contains('toggle-fill-grid')) {
    parentSection = e.target.parentNode;
  }

  if (parentSection) {
    parentSection.classList.toggle('fill-grid');
    document.querySelector('.contact').classList.toggle('fill-grid');
  }
});

/* setup the skills chart */

let ctx = document.getElementById("skillsChart").getContext('2d');

let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [
          'Angular',
          'CSS',
          'HTML',
          'Javascript',
          'jQuery',
          'Node',
          'Perl',
          'Polymer',
          'React',
          'SQL',
        ],
        datasets: [{
            data: [7, 8, 8, 8, 8, 8, 6, 7, 1, 5],
            backgroundColor: [
              'rgba(141,211,199, 0.6)',
              'rgba(255,255,179, 0.6)',
              'rgba(190,186,218, 0.6)',
              'rgba(251,128,114, 0.6)',
              'rgba(128,177,211, 0.6)',
              'rgba(253,180,98, 0.6)',
              'rgba(179,222,105, 0.6)',
              'rgba(252,205,229, 0.6)',
              'rgba(217,217,217, 0.6)',
              'rgba(188,128,189, 0.6)',
              'rgba(204,235,197, 0.6)',
              'rgba(255,237,111, 0.6)'
            ],
            borderColor: [
              'rgb(141,211,199)',
              'rgb(255,255,179)',
              'rgb(190,186,218)',
              'rgb(251,128,114)',
              'rgb(128,177,211)',
              'rgb(253,180,98)',
              'rgb(179,222,105)',
              'rgb(252,205,229)',
              'rgb(217,217,217)',
              'rgb(188,128,189)',
              'rgb(204,235,197)',
              'rgb(255,237,111)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          labels: ['Weak', 'Intermediate', 'Strong'],
          ticks: {
            callback: function(label) {
              switch (label) {
                case 0:
                  return 'Weak';
                case 5:
                  return 'Intermediate';
                case 10:
                  return 'Strong';
              }
            },
            max: 10,
            maxTicksLimit: 3,
            min: 0
          }
        }]
      },
      tooltips: {
        callbacks:{
          label: function(tooltipItem, data) {
            var dataValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 0;

            return `: ${dataValue <=3 ? 'Weak' :dataValue >= 4 && dataValue <= 7 ? 'Intermediate' : 'Strong'}` ;
          }
        }
      }
    }
});
