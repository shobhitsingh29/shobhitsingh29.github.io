TreeManager.module("TreeApp.List", function (List, TreeManager, Backbone, Marionette, $, _) {
    var nodes = TreeManager.request("treenode:entities");
    var listItems = new List.ListItems({
        collection: nodes
    });
    List.Controller = {
        listNodes: function () {
            TreeManager.regions.main.show(listItems);
        }
    };
    List.currentJSON = function() {
        return listItems.collection.toJSON();
    }
});
