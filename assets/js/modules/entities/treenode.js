TreeManager.module("Entities", function (Entities, TreeManager, Backbone, Marionette, $, _) {

    // model and collection definitions follow
    Entities.TreeModel = Backbone.Model.extend({
        initialize: function () {
            var nodes = this.get("nodes");
            // Covert nodes to a NodeCollection
            this.set("nodes", new Entities.TreeCollection(nodes));
        },

        toJSON: function () {
            // Call parent"s toJSON method
            var data = Backbone.Model.prototype.toJSON.call(this);
            if (data.nodes && data.nodes.toJSON) {
                // If nodes is a collection, convert it to JSON
                data.nodes = data.nodes.toJSON();
            }
            return data;
        }
    });

    Entities.TreeCollection = Backbone.Collection.extend({
        model: Entities.TreeModel,
        comparator: 'nodeName'
    });

    var treeNodes;

    var initializeTreeNodes = function () {
        treeNodes = new Entities.TreeCollection([
            {
                nodeName: "1",
                nodes: [
                    {
                        nodeName: "1.1",
                        nodes: [
                            { nodeName: "1.1.1" },
                            { nodeName: "1.1.2" },
                            { nodeName: "1.1.3" }
                        ]
                    },
                    {
                        nodeName: "1.2",
                        nodes: [
                            { nodeName: "1.2.1" },
                            {
                                nodeName: "1.2.2",
                                nodes: [
                                    { nodeName: "1.2.2.1" },
                                    { nodeName: "1.2.2.2" },
                                    { nodeName: "1.2.2.3" }
                                ]
                            },
                            { nodeName: "1.2.3" }
                        ]
                    }
                ]
            },
            {
                nodeName: "2",
                nodes: [
                    {
                        nodeName: "2.1",
                        nodes: [
                            { nodeName: "2.1.1" },
                            { nodeName: "2.1.2" },
                            { nodeName: "2.1.3" }
                        ]
                    },
                    {
                        nodeName: "2.2",
                        nodes: [
                            { nodeName: "2.2.1" },
                            { nodeName: "2.2.2" },
                            { nodeName: "2.2.3" }
                        ]
                    }
                ]
            }
        ]
        );
    };
    // following api object is also private as we want the rest of the app to 'get' it by request
    var API = {
        getTreeNodeEntities: function () {
            if (treeNodes === undefined) {
                initializeTreeNodes();
            }
            return treeNodes;
        }
    };

    // regestering a request handler to call when the 'treenode:entities' request is received
    TreeManager.reqres.setHandler('treenode:entities', function () {
        return API.getTreeNodeEntities();
    });

});