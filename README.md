# TreeManager

> TreeManager is a component built in Backbone.Marionette that generates a UI-tree(a nested list) based on a nested json/object input

## Dependencies

As it is a Backbone application it has the dependencies of a Backbone application:

> jQuery
> Underscore
> Backbone
> Marionette
> jQuery-UI
> jQuery-nestedSortable

The last two being used for drag and drop in the nested list

### Usage

> If your application is one already based on Backbone-Marionette(which I think is the only case when you should use TreeManager), then TreeManager
is just another module you need to attach to your basic application and you can start using it by including these:

```html
<!--Script includes for the tree manager-->
    <script src="./assets/js/app.js"></script>
    <script src="./assets/js/modules/entities/treenode.js"></script>
    <script src="./assets/js/modules/treeApp/list/listView.js"></script>
    <script src="./assets/js/modules/treeApp/list/listController.js"></script>
```
You can also combine these scripts into one, but for best practice I have already modularised TreeManager by creating separate modules/sub-modules
for the model, view and controller, thus giving it a MVC like skeleton 

> app.js:-

    It simply initializes the TreeManager application and also defines the region where the output will be rendered like this:
    regions: {
        main: "#main-region"
    }"# BasicMarrioteUITree" 
