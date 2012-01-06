YUI.add("app-base",function(g){var c=g.Lang,e=g.PjaxBase,a=g.Router,f=g.View,h=g.Object,d=g.config.win,b;b=g.Base.create("app",g.Base,[f,a,e],{views:{},initializer:function(j){j||(j={});var i={};function k(l,m){i[m]=g.merge(i[m],l);}h.each(this.views,k);h.each(j.views,k);this.views=i;this._viewInfoMap={};this.after("activeViewChange",this._afterActiveViewChange);if(!this.get("serverRouting")){this._pjaxBindUI();}},create:function(){var i=f.prototype.create.apply(this,arguments);return i&&i.addClass(b.CSS_CLASS);},createView:function(l,k){var j=this.getViewInfo(l),m=(j&&j.type)||f,n=c.isString(m)?g[m]:m,i;i=new n(k);this._viewInfoMap[g.stamp(i,true)]=j;return i;},createViewContainer:function(i){i=g.one(i);return i&&i.addClass(b.VIEWS_CSS_CLASS);},getViewInfo:function(i){if(i instanceof f){return this._viewInfoMap[g.stamp(i,true)];}return this.views[i];},render:function(){var j=this.get("container"),i=this.get("viewContainer"),k=this.get("activeView"),l=j.compareTo(i);if(k&&i){i.setContent(k.get("container"));}if(j&&!j.contains(i)&&!l){j.appendChild(i);}return this;},showView:function(i,l,k,m){var j;if(c.isString(i)){j=this.getViewInfo(i);if(j&&j.preserve&&j.instance){i=j.instance;this._viewInfoMap[g.stamp(i,true)]=j;}else{i=this.createView(i,l);i.render();}}k||(k={});if(m){k.callback=m;}else{if(c.isFunction(k)){k={callback:k};}}return this._set("activeView",i,k);},_attachView:function(j,k){if(!j){return;}var l=this.getViewInfo(j),i=this.get("viewContainer");j.addTarget(this);l&&(l.instance=j);i[k?"prepend":"append"](j.get("container"));},_destroyContainer:function(){var j=this.get("container"),i=this.get("viewContainer"),k=j.compareTo(i);if(g.one("body").compareTo(j)){this.detachEvents();j&&j.removeClass(b.CSS_CLASS);if(k){j&&j.removeClass(b.VIEWS_CSS_CLASS);}else{i&&i.remove(true);}return;}i&&i.remove(true);!k&&j&&j.remove(true);},_detachView:function(i){if(!i){return;}var j=this.getViewInfo(i)||{};if(j.preserve){i.remove();}else{i.destroy();delete this._viewInfoMap[g.stamp(i,true)];if(i===j.instance){delete j.instance;}}i.removeTarget(this);},_initHtml5:function(){if(this.get("serverRouting")===false){return false;}else{return a.html5;}},_isChildView:function(i,l){var k=this.getViewInfo(i),j=this.getViewInfo(l);if(k&&j){return this.getViewInfo(k.parent)===j;}return false;},_isParentView:function(i,l){var j=this.getViewInfo(i),k=this.getViewInfo(l);if(j&&k){return this.getViewInfo(k.parent)===j;}return false;},_navigate:function(j,i){j=this._upgradeURL(j);i||(i={});if(!this.get("serverRouting")){c.isValue(i.force)||(i.force=true);if(!c.isValue(i.replace)){i.replace=j===this._upgradeURL(this._getURL());}}return e.prototype._navigate.call(this,j,i);},_save:function(i,j){if(this.get("serverRouting")&&!this.get("html5")){if(!this._hasSameOrigin(i)){g.error("Security error: The new URL must be of the same origin as the current URL.");return this;}i=this._joinURL(i||"");if(j){d&&d.location.replace(i);}else{d&&(d.location=i);}return this;}return a.prototype._save.apply(this,arguments);},_upgradeURL:function(j){if(!this._hasSameOrigin(j)){return j;}var k=(j.match(/#(.*)$/)||[])[1]||"",i=g.HistoryHash.hashPrefix;if(i&&k.indexOf(i)===0){k=k.replace(i,"");}if(k&&k.charAt(0)==="/"){j=this._resolveURL(this._joinURL(k));}return j;},_afterActiveViewChange:function(m){var o=m.newVal,l=m.prevVal,n=m.callback,i=this._isChildView(o,l),k=!i&&this._isParentView(o,l),j=!!m.prepend||k;if(o===l){return n&&n.call(this,o);}this._attachView(o,j);this._detachView(l);n&&n.call(this,o);}},{ATTRS:{activeView:{value:null,readOnly:true},container:{valueFn:function(){return g.one("body");}},html5:{valueFn:"_initHtml5"},linkSelector:{value:"a"},serverRouting:{value:undefined,writeOnce:"initOnly"},viewContainer:{valueFn:function(){return g.Node.create("<div/>");},setter:"createViewContainer",writeOnce:"initOnly"}},CSS_CLASS:g.ClassNameManager.getClassName("app"),VIEWS_CSS_CLASS:g.ClassNameManager.getClassName("app","views")});g.namespace("App").Base=b;g.App=g.mix(g.Base.create("app",g.App.Base,[]),g.App,true);},"@VERSION@",{requires:["classnamemanager","pjax-base","router","view"]});