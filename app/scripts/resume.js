'use strict';

/*
  NOTE: normally I'd minify/uglify all resources, but since this is partly a code
        exercise, I've left it all as is for easy reading
*/

/*
  setup expand/collapse toggle

  add a single event listener and only trigger the toggle
  if the target is one of the toggle buttons
*/

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

/* setup page settings toggle */
document.querySelector('.page-settings').addEventListener('click', (e) => {
  if (
    e.target.classList.contains('ion-md-settings') ||
    e.target.classList.contains('page-settings')
  ) {
    document.querySelector('.page-settings').classList.toggle('show');
  }
});

document.body.addEventListener('click', (e) => {
  /* remove the show class from page settings whenever clicking anywhere other than
     the page settings button or inside the page settings container
  */

  // FIXME: there must be a better way to do this
  if (
    !e.target.classList.contains('ion-md-settings') &&
    !e.target.classList.contains('page-settings') &&
    !e.target.classList.contains('panel') &&
    (
      !e.target.parentElement ||
      (e.target.parentElement &&
      !e.target.parentElement.classList.contains('panel'))
    ) &&
    (
      !e.target.parentElement.parentElement ||
      (e.target.parentElement.parentElement &&
      !e.target.parentElement.parentElement.classList.contains('panel'))
    )
  ) {
    document.querySelector('.page-settings').classList.remove('show');
  }
});

/*
  setup the skills chart

  using chartjs is probably overkill for such a simple chart

  especially since I implemenmted a pure css version for use in print

  to be fair the chartjs one is a bit nicer, but it would all be doable in css only if desired
*/

let ctx = document.getElementById("skillsChart").getContext('2d');

let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [
          'AngularJS',
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
            data: [7, 3, 8, 8, 8, 8, 7, 6, 8, 1, 5],
            backgroundColor: [
              'rgba(141,211,199, 0.6)',
              'rgba(116, 241, 215, 0.6)',
              'rgba(255,255,179, 0.6)',
              'rgba(190,186,218, 0.6)',
              'rgba(251,128,114, 0.6)',
              'rgba(128,177,211, 0.6)',
              'rgba(253,180,98, 0.6)',
              'rgba(179,222,105, 0.6)',
              'rgba(252,205,229, 0.6)',
              'rgba(204,235,197, 0.6)',
              'rgba(188,128,189, 0.6)',
              'rgba(255,237,111, 0.6)'
            ],
            borderColor: [
              'rgb(141,211,199)',
              'rgba(116, 241, 215, 1)',
              'rgb(255,255,179)',
              'rgb(190,186,218)',
              'rgb(251,128,114)',
              'rgb(128,177,211)',
              'rgb(253,180,98)',
              'rgb(179,222,105)',
              'rgb(252,205,229)',
              'rgb(204,235,197)',
              'rgb(188,128,189)',
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
