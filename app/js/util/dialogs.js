// Using the application route is a workaround. But I think that modal dialogs should be separate from Ember.

export function showDialog(templateName, controller = undefined, backgroundClose = true) {
	closeDialog();

	const applicationRoute = App.__container__.lookup('route:application');

	applicationRoute.render(`dialogs/${templateName}`, {
		into: 'application',
		outlet: 'dialog',
		controller: controller
	});

	if (backgroundClose) {
		Em.run.scheduleOnce('afterRender', () => {
			$('.modal-background').click((e) => {
				const content = $('.modal-content');
				if (!content.is(e.target) && content.has(e.target).length <= 0) {
					closeDialog();
				}
			});

			$('.modal-background .close-button').click(() => {
				closeDialog();
			});
		});
	}
}

export function closeDialog() {
	const applicationRoute = App.__container__.lookup('route:application');
	applicationRoute.disconnectOutlet({ outlet: 'dialog', parentView: 'application' });
}