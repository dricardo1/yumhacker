EstablishmentsSearchEstablishmentView = Backbone.View.extend({
	events: {
		'click .create_btn': 'create'
	},

	initialize: function () {
		this.render();
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function () {
		this.$el.html(render('establishments/search_establishment', this.model));

		if (this.model.get('id')) {
			this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
	            el: this.$('.endorse_btn_container'),
	            establishment: this.model 
	        });				
		}
	},

	create: function () {
		if (CurrentUser.logged_in()) {
			this.model.save();
		} else  {
			CurrentUser.authenticate();
		}
	}
});
