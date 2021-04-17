module.exports = {
	plugins: ['stylelint-order'],
	rules: {
		'at-rule-no-unknown': null,
		'declaration-no-important': true,
		'no-descending-specificity': [true, { severity: 'warning' }],
		'order/properties-alphabetical-order': true,
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
	},
}
