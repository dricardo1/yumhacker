ListsEditListingView = Backbone.View.extend({
    events: {
        'click .biz_name': 'navigate'
    },

    initialize: function () {
        this.render();

        this.categories_view = new EstablishmentsIndexEstablishmentCategoriesView({ 
            el: this.$('.categories_container'),
            collection: this.model.categories 
        });  

        console.log(this.model)
        this.comment_view = new ListsEditListingCommentView({
            el: this.$('.listing_comment_container'),
            model: new Comment(this.model.get('comment')),
            listing: this.model
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_listing', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }   
});