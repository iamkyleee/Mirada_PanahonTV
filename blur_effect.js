/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Blur effect class provides a blur effect on HTML elements. 
 * It is possible to blur text, surrounding box or both. 
 * It is also possible to blur images using SVG filters. 
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Blur-effect
**************************************************************/
var blur = function(id, config){
	//some vars
	var elem = (typeof id == "string") ? document.getElementById(id) : id;
	//some configuration
	var current = 0;
	var target = 0;
	var color;
	var bgcolor;
	var ob = this;
	var rect;
	var is_img = false;
	var shadow_support = false;
	var scroll;
	var conf = {
		//how much blur do you want
		blur: 3,
		//speed of animation
		interval: 10,
		//blur text
		text: true,
		//blur surrounding box (element itself)
		box: false
	};

	this.construct = function(){
		//copying configuration
		for(var opt in config){
			conf[opt]= config[opt];
		}
		current = conf.blur;
		is_img = (elem.nodeName.toLowerCase() == "img") ? true : false;
		if(!is_img)
		{
			if(conf.text)
			{
				color = getStyle("color"); 
				elem.style.textShadow = color + " 0px 0px 0px";
				var tShadow = getStyle("text-shadow");
				if(typeof tShadow != "undefined")
				{
					shadow_support = true;
				}
			}
			if(conf.box)
			{
				bgcolor = getStyle("background-color");
			}
			this.set(conf.blur);
		}
		else
		{
			if(!elem.complete)
			{
				add_event(elem, "load", function(){
					prepareImage();
					ob.set(conf.blur);
				});
			}
			else
			{
				prepareImage();
				this.set(conf.blur);
			}
		}
	};

	//animate blur effect
	this.animate = function(blur){
		target = blur;
		anim();
	};
	
	//toggle blur
	this.toggle = function(animate, blur){
		if(blur)
		{
			blur = (current == 0) ? blur : 0;
		}
		else
		{	
			blur = (current == 0) ? conf.blur : 0;
		}
		if(animate)
		{
			this.animate(blur)
		}
		else
		{
			this.set(blur);
		}
	};
	
	var anim = function(){
		ob.set(current);
		if(target > current)
		{
			current++;
			setTimeout(anim, conf.interval);
		}
		else if(target < current)
		{
			current--;
			setTimeout(anim, conf.interval);
		}
	};
	
	//set blur effect
	this.set = function(blur){
		current = blur;
		if(is_img)
		{
			rect.filter.firstChild.setAttributeNS(null, "stdDeviation", blur);
		}
		else
		{
			if(conf.text)
			{
				elem.style.textShadow = color + " 0px 0px " + blur + "px";
				if(shadow_support)
				{
					//supports text shadow
					//opera bug fix, don't make it transparent
					elem.style.color = "rgba(0,0,0,0.01)";
				}
				else
				{
					//IE style
					elem.style.filter = "progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + blur + "')";
					elem.style.MsFilter = "progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + blur + "')";
				}
			}
			if(conf.box)
			{
				var spread = Math.round(blur/2);
				elem.style.boxShadow = "0px 0px " + blur + "px " + spread + "px " + bgcolor;
				elem.style.WebkitBoxShadow = "0px 0px " + blur + "px " + spread + "px " + bgcolor;
				elem.style.MozBoxShadow = "0px 0px " + blur + "px " + spread + "px " + bgcolor;
				if(!conf.text)
				{
					//IE style
					elem.style.filter = "progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + blur + "')";
					elem.style.MsFilter = "progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + blur + "')";
				}
			}
		}
	};
	
	// scroll position
	var get_scroll = function(){
		var x = 0, y = 0;
		if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
			y = window.pageYOffset;
			x = window.pageXOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			y = document.body.scrollTop;
			x = document.body.scrollLeft;
		} else if( document.documentElement && 
		( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 standards compliant mode
			y = document.documentElement.scrollTop;
			x = document.documentElement.scrollLeft;
		}
		var obj = new Object();
		obj.x = x;
		obj.y = y;
		return obj;
	};
	
	
	//add event
	var add_event = function(element, type, listener){
		if(element.addEventListener)
		{
			element.addEventListener(type, listener, false);
		}
		else
		{
			element.attachEvent('on' +  type, listener);
		}
	};
	
	var prepareImage = function(){
		rect = elem.getBoundingClientRect();
		rect.width = (typeof rect.width == "undefined") ? rect.right - rect.left : rect.width;
		rect.height = (typeof rect.height == "undefined") ? rect.bottom - rect.top : rect.height;
		var found = false;
		if(supportSVG())
		{
			var container = document.createElement("div");
			container.style.position = "absolute";
			scroll = get_scroll();
			container.style.top = (rect.top + scroll.y) + "px";
			container.style.left = (rect.left + scroll.x) + "px";
			container.style.width = parseInt(elem.width) + "px";
			container.style.height = parseInt(elem.height) + "px";
			
			var svgns = "http://www.w3.org/2000/svg";
			var xlinkns = "http://www.w3.org/1999/xlink";
			var svgDoc = (window.svgDocument) ? window.svgDocument : document;

			var svg = svgDoc.createElementNS(svgns, "svg");
			svg.setAttributeNS(null, "width", elem.width);
			svg.setAttributeNS(null, "height", elem.height);
			var def = svgDoc.createElementNS(svgns, "defs");
			svg.appendChild(def);
			var filter = svgDoc.createElementNS(svgns, "filter");
			var id = "gaussian_" + new Date().getTime();
			filter.setAttributeNS(null, "id", id);
			def.appendChild(filter);
			
			var gaus = svgDoc.createElementNS(svgns, "feGaussianBlur");
			filter.appendChild(gaus);
			gaus.setAttributeNS(null, "in", "SourceGraphic");
			gaus.setAttributeNS(null, "stdDeviation", "0");
			//if supports blur filter
			if(gaus.stdDeviationX && gaus.stdDeviationX)
			{
				rect.filter = filter;
				found = true;
				elem.style.visibility = "hidden";
				var img = svgDoc.createElementNS(svgns, "image");
				img.setAttributeNS(xlinkns, "href", elem.src);
				img.setAttributeNS(null, "width", elem.width);
				img.setAttributeNS(null, "height", elem.height);
				img.setAttributeNS(null, "style", "filter:url(#" + id + ")");
				svg.appendChild(img);
				container.appendChild(svg);
				document.body.appendChild(container);
			}
		}
		//if doesn't support blur filter (usually IE or Safari)
		if(!found)
		{
			is_img = false;
		}
	};
	
	var supportSVG = function(){
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") &&
			document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Style", "1.1") &&
			document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#XlinkAttribute", "1.1");
	};
	//get computed style
	var getStyle = function(css){
		var ret;
		if(elem.currentStyle)
		{
			ret = elem.currentStyle[toCamel(css)];
		}
		else if(window.getComputedStyle)
		{
			ret = document.defaultView.getComputedStyle(elem,null).getPropertyValue(css);
		}
		return ret;
	};
	
	//convert css to camelCase
	var toCamel = function(str){
		return str.toString().replace(/-([a-z])/gi, function(s, group1){
			return group1.toUpperCase();
		});
	};
	
	this.construct();
}