'use strict';

/*
  NOTE: normally I'd minify/uglify/ all resources, but since this is partly a code
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

/* setup page info toggle */
document.querySelector('.page-info').addEventListener('click', (e) => {
  if (
    e.target.classList.contains('ion-md-help') ||
    e.target.classList.contains('page-info')
  ) {
    document.querySelector('.page-info').classList.toggle('show');
  }
});

document.body.addEventListener('click', (e) => {
  /* remove the show class from page settings/info whenever clicking anywhere other than
     the page settings/info button or inside the page settings/info container
  */

  // FIXME: there must be a better way to do this
  if (
    !e.target.classList.contains('ion-md-settings') &&
    !e.target.classList.contains('page-settings') &&
    !e.target.classList.contains('ion-md-help') &&
    !e.target.classList.contains('page-info') &&
    !e.target.classList.contains('panel') &&
    (!e.target.parentElement ||
      (e.target.parentElement &&
        !e.target.parentElement.classList.contains('panel'))) &&
    (!e.target.parentElement.parentElement ||
      (e.target.parentElement.parentElement &&
        !e.target.parentElement.parentElement.classList.contains('panel')))
  ) {
    // FIXME: I'm not kidding with the above comment, I'm sure there is a better
    //        way to do this. I'll probably refactor this in the future.
    document.querySelector('.page-settings').classList.remove('show');
    document.querySelector('.page-info').classList.remove('show');
  }
});

/*
  setup the skills chart

  using chartjs is probably overkill for such a simple chart

  especially since I implemented a pure css version for use in print

  to be fair the chartjs one is a bit nicer, but it would all be doable in css only if desired
*/

const ctx = document.getElementById('skillsChart').getContext('2d');

const skillsList = [
  'Accessibility',
  'Angular',
  'AngularJS',
  'AWS',
  'Azure',
  'Continuous Deployment',
  'Continuous Integration',
  'CSS',
  'Data Driven Design',
  'Docker',
  'GCP',
  'gRPC',
  'Go',
  'HTML',
  'i18n',
  'Javascript',
  'jQuery',
  'Kubernetes',
  'l10n',
  'LLMs',
  'MongoDB',
  'Next.js',
  'Node',
  'NoSQL',
  'o11y',
  'Observability',
  'Perl',
  'Polymer',
  'Python',
  'React',
  'Responsive Design',
  'REST APIs',
  'Security',
  'SQL',
  'Terraform',
  'TypeScript',
  'Version Control',
];

const chartSkillCount = 11;

// randomly select skills from the skills list
const chartLabels = [...skillsList]
  .sort(() => 0.5 - Math.random())
  .slice(0, chartSkillCount)
  .sort((a, b) => a.localeCompare(b));

// generate random values
const chartData = Array.from(
  { length: chartLabels.length },
  () => Math.floor(Math.random() * 10) + 1,
);

const skillColours = [
  {
    background: 'rgba(141,211,199, 0.6)',
    border: 'rgb(141,211,199)',
  },
  {
    background: 'rgba(116, 241, 215, 0.6)',
    border: 'rgba(116, 241, 215, 1)',
  },
  {
    background: 'rgba(255,255,179, 0.6)',
    border: 'rgb(255,255,179)',
  },
  {
    background: 'rgba(190,186,218, 0.6)',
    border: 'rgb(190,186,218)',
  },
  {
    background: 'rgba(251,128,114, 0.6)',
    border: 'rgb(251,128,114)',
  },
  {
    background: 'rgba(128,177,211, 0.6)',
    border: 'rgb(128,177,211)',
  },
  {
    background: 'rgba(253,180,98, 0.6)',
    border: 'rgb(253,180,98)',
  },
  {
    background: 'rgba(179,222,105, 0.6)',
    border: 'rgb(179,222,105)',
  },
  {
    background: 'rgba(252,205,229, 0.6)',
    border: 'rgb(252,205,229)',
  },
  {
    background: 'rgba(204,235,197, 0.6)',
    border: 'rgb(204,235,197)',
  },
  {
    background: 'rgba(188,128,189, 0.6)',
    border: 'rgb(188,128,189)',
  },
  {
    background: 'rgba(255,237,111, 0.6)',
    border: 'rgb(255,237,111)',
  },
];

const randomizedColours = [...skillColours].sort(() => 0.5 - Math.random());

const myChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: randomizedColours.map((colour) => colour.background),
        borderColor: randomizedColours.map((colour) => colour.border),
        borderWidth: 1,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          labels: ['Weak', 'Intermediate', 'Strong'],
          ticks: {
            callback: function (label) {
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
            min: 0,
          },
        },
      ],
    },
    title: {
      display: true,
      text: [
        'This list, including the values, are randomly generated and',
        'do not necessarily have relevance to my actual skill set.',
        'I think skills charts like these are failry silly on resumes.',
        'Refreshing the page will generate a new list.',
        'I should really just remove this section, but my layout works',
        'better with something filling this space.'
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataValue =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] ||
            0;

          if (dataValue === 10) {
            return '   Yeah right, no one is really a 10.';
          }

          if (dataValue <= 3) {
            return '   Weak';
          }

          if (dataValue >= 4 && dataValue <= 7) {
            return '   Intermediate';
          }

          return '   Strong';
        },
      },
    },
  },
});

/**
 * populate the print version of the skills chart

 * NOTE: although this script is loaded after all the html
 *       it's probably fine to populate the print version at
 *       this point since it's unlikely a user would print
 *       the page before the javascript had finished loading
 *
 * FIXME: this of course doesn't work since the JS won't run
 *        in the print dialogs
 *        need to figure out a different way of dynamically
 *        generating the chart for print
 */

// const printSkillChart = document.getElementById('printSkillChart')

// chartLabels.forEach((skill, i) => {
//   const row = document.createElement('tr')

//   const skillCell = document.createElement('td')
//   skillCell.innerHTML = skill

//   const barCell = document.createElement('td')
//   barCell.colSpan = 3

//   const bar = document.createElement('div')
//   bar.style.backgroundColor = randomizedColours[i].background
//   bar.style.border = `1 px solid ${randomizedColours[i].border}`
//   bar.style.width = `${chartData[i] * 10}%`
//   bar.innerHTML = '&nbsp;'

//   barCell.appendChild(bar)
//   row.appendChild(skillCell)
//   row.appendChild(barCell)

//   printSkillChart.appendChild(row)
// })
