TreeManager.module("TreeApp.List", function(List, TreeManager, Backbone, Marionette, $, _) {
    // The composite view which results in the recursive tree view
    List.ListItem = Marionette.CompositeView.extend({

        template: "#node-template",

        tagName: "li",

        className: "list-item",

        // specifies a selector for the element we want the
        // child elements placed into
        childViewContainer: "ul",

        events: {
            'click .fa-times': 'deleteNode',
            'click .fa-plus': 'addNode',
            'drop': 'onDragEnd',
            'drag': 'onDragStart',
            'updateModel': 'updateModel'
        },

        deleteNode: function(e) {
            // console.log(this);
            // this.trigger('awesomeButton:clicked', this);
            if (this.model.collection.length === 1) {
                // if this is the last node in the collection then we would remove the toggle icon from parent
                $(e.target.parentNode).parent().parent().parent().find(".toggle").remove();
            }
            this.model.collection.remove(this.model);
        },

        addNode: function(e) {
            // the follwing code is executed multiple times hence adding stoppropagation
            e.stopPropagation();
            var newNodeName = prompt("Enter the new Node name: ", "Node name here");
            var newModelInstance = new TreeManager.Entities.TreeModel({ "nodeName": newNodeName });

            if (this.collection.length === 0) {
                /* if its a leaf node first we add an empty ul to the parent li 
                 * which will be the container for the child nodes
                 */
                $(e.target).parent().parent().append("<ul></ul>");
                // adding a minus icon to show that it is expanded and adding click event on that icon
                var toggleIconContainer = $(e.target.parentNode).prepend("<i class='fa fa-minus-square-o toggle' aria-hidden='true'></i>");
                // finally adding a new model instance into the view's empty collection
                this.collection.add(newModelInstance);
            } else {
                this.collection.add(newModelInstance);
            }
        },

        onDragEnd: function(event, index) {
            var draggedNode,
                self = this;
            event.stopPropagation();
            draggedNode = $('.list').find('[data-previndex]');
            $(draggedNode).removeData('data-previndex');
            draggedNode.closest('ul').trigger('updateModel', [index, draggedNode, self, event])
        },

        updateModel: function(event, index, draggedNode, childThis, childEvent) {
            event.stopPropagation();
            // if the dragged node was the last one in its collection then remove plus/minus-icon from parent
            if (childThis.model.collection.length === 1) {
                if (childThis.parentToggleIcon) {
                    $(childThis.parentToggleIcon).remove();
                }
            }
            childThis.model.collection.remove(childThis.model);
            this.collection.add(childThis.model, { at: index });
            // adding a plus/minus icon incase the collection was empty before
            if (this.collection.length === 1) {
                $(this.$el.find('.tree-node-content')[0]).prepend("<i class='fa fa-minus-square-o toggle' aria-hidden='true'></i>");
            }
        },

        onDragStart: function(event, parentToggleIcon) {
            event.stopPropagation();
            this.parentToggleIcon = parentToggleIcon;
        },

        initialize: function() {
            // grab the child collection from the parent model
            // so that we can render the collection as children
            // of this parent node
            this.collection = this.model.get("nodes");
        }

    });

    // The collection view simply consisting of the root nodes' compositeview
    List.ListItems = Marionette.CollectionView.extend({
        tagName: "ul",
        className: "tree-node",
        childView: List.ListItem
    });
});