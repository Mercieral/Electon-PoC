this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["/about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("about");
  }

  data.buffer.push("<h2> Ember/Electron PoC</h2>\n<p> This Proof of concept will be used to determine how well electron will be able to wrap the GreenLight.Guru Web application into a packaged desktop application. It is using ember 1.10, grunt, and node 4.4.0 as its dependencies to match the web application.</p>\n<p> Written by Aaron Mercier</p>\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "link-to", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["/docs"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1> Here are some fake documents to examine REST API</h1>\n<div id=\"data\"> </div>\n");
  
});

this["Ember"]["TEMPLATES"]["/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push(" about ");
  }

  data.buffer.push("<!DOCTYPE html>\n<html>\n<head>\n    <title>Electron-Ember PoC</title>\n\n    <meta charset=\"utf-8\">\n    <meta content=\"IE=edge,chrome=1\" http-equiv=\"X-UA-Compatible\">\n\n    <link rel=\"shortcut icon\" href=\"/favicon.ico\">\n\n</head>\n<body>\n    <div id=\"app\"></div>\n\n    <h1> Ember/Electon PoC</h1>\n    <p> Testing proper build without ember handles</p>\n\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "link-to", "about", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <script src=\"tmp/templates.js\"></script>\n    <script src=\"../app.js\"></script>\n</body>\n</html>");
  return buffer;
  
});