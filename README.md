Independent template data context setter
========================================

Inspired by the `data` property in 
[iron:router](http://iron-meteor.github.io/iron-router/#rendering-templates-with-data), this
Meteor package provides a method to set the data context for each instance of a Blaze template 
on its creation.  

This way, multiple data-driven templates can co-exist independently of any particular route, 
providing their own data sources.

```
<template name="hello">
  {{welcome}}
</template>

Template.hello.dataContext(function(){
  return { welcome: 'Hello world' }
})
```

The data context function is run before onCreated, however it supports reactivity, therefore 
a database subscription can be made when the template is created and data provided to that 
with a cursor.

```
<template name="hello">
  {{#each this}}
    {{name}}
  {{/each}}
</template>

Template.hello.dataContext(function(){
  return People.find({}, {sort: {name: 1}});
});

Template.hello.onCreated(function(){
  this.subscribe('people');
});
```

Access to data set with `dataContext` can be made through the Template.currentData() function,
as it can when set by renderWithData or iron:router data.

```
<template name="hello">
  <button>{{message}}</button>
</template>

Template.hello.dataContext(function(){
  return new Blaze.ReactiveVar('Waiting...')
})

Template.hello.events({
  'click button': function(){
    Template.currentData().set('Hello!')
  }
})

Template.hello.helpers({
  message: function(){
    return Template.currentData().get();
  }
})
```