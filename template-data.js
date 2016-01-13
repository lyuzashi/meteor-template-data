Template.prototype.dataContext = function(dataFunction){
  Object.defineProperty(this, '_dataContext', {
    enumerable: false,
    configurable: false,
    value: dataFunction
  });
};

Meteor.startup(function(){
  Object.keys(Template).forEach(function(name){
    var template = Template[name];
    if(template instanceof Template && template._dataContext && !template._dataWrapped){
      Object.defineProperty(this, '_dataWrapped', { value: true });
      Template[name] = new Template(template.viewName, (function(){
        var view = this;
        var instance = this.templateInstance();
        return Blaze._TemplateWith(
          function() { return Spacebars.call(template._dataContext.bind(view)); },
          function() { return Spacebars.include(template); }
        )
      }));
    }
  });
})
