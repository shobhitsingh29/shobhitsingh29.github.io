// Creating our app
var TreeManager = new Marionette.Application();

// defining a layoutView for the app
TreeManager.on("before:start", function () {
    var RegionContainer = Marionette.LayoutView.extend({
        el: "#app-container",

        regions: {
            main: "#main-region"
        }
    });
    TreeManager.regions = new RegionContainer();
});
TreeManager.on("start", function () {
    TreeManager.TreeApp.List.Controller.listNodes();
});
