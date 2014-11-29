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
(function( $ ){
	$.fn.blurEffect = function(method, add, val) {
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
		//apply to each element
		return this.each(function() { 
			var $this = $(this);
			var elem = this;
			var bypass = false;
			var current = 0;
			var target = 0;
			var color;
			var bgcolor;
			var rect;
			var is_img = false;
			var shadow_support = false;
			var init = false;
			var supportSVG = function(){
				return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") &&
					document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Style", "1.1") &&
					document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#XlinkAttribute", "1.1");
			};
			var anim = function(){
				methods.set(current);
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
			var prepareImage = function(){
				rect = elem.getBoundingClientRect();
				rect.width = (typeof rect.width == "undefined") ? rect.right - rect.left : rect.width;
				rect.height = (typeof rect.height == "undefined") ? rect.bottom - rect.top : rect.height;
				var found = false;
				if(supportSVG())
				{
					var container = document.createElement("div");
					container.style.position = "absolute";
					container.style.top = (rect.top + $(window).scrollTop()) + "px";
					container.style.left = (rect.left + $(window).scrollLeft()) + "px";
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
					$this.data("filter", id);
					filter.setAttributeNS(null, "id", id);
					def.appendChild(filter);
					
					var gaus = svgDoc.createElementNS(svgns, "feGaussianBlur");
					filter.appendChild(gaus);
					gaus.setAttributeNS(null, "in", "SourceGraphic");
					gaus.setAttributeNS(null, "stdDeviation", "0");
					//if supports blur filter
					if(gaus.stdDeviationX && gaus.stdDeviationX)
					{
						$this.data("svg", true);
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
					$this.data("svg", false);
					is_img = false;
				}
			};
			var reImage = function(){
				rect = elem.getBoundingClientRect();
				rect.width = (typeof rect.width == "undefined") ? rect.right - rect.left : rect.width;
				rect.height = (typeof rect.height == "undefined") ? rect.bottom - rect.top : rect.height;
				if($this.data("svg"))
				{
					rect.filter = document.getElementById($this.data("filter"));
				}
				//if doesn't support blur filter (usually IE or Safari)
				else
				{
					is_img = false;
				}
			};
			var methods = {
			"init" : function(options){
				init = true;
				//copy settings
				if ( options ) { 
					$.extend( conf, options );
				}
				$this.data("conf", conf);
				//current = conf.blur;
				$this.data("blur", current);
				is_img = (elem.nodeName.toLowerCase() == "img") ? true : false;
				$this.data("is_img", is_img);
				$this.addClass("blur_effected");
				if(!is_img)
				{
					if(conf.text)
					{
						color = $this.css("color"); 
						$this.data("color", color);
						elem.style.textShadow = color + " 0px 0px 0px";
						//$this.css("text-shadow", color + " 0px 0px 0px");
						var tShadow = $this.css("text-shadow");
						//alert(typeof elem.style.textShadow + " " + elem.style.textShadow + " " + elem.style.textShadow.length);
						var parts = elem.style.textShadow.split(" ");
						if(typeof tShadow != "undefined" && (tShadow.length > 0 || parts[0].length == 0))
						{
							shadow_support = true;
							$this.data("shadow_support", true);
						}
						else
						{
							$this.data("shadow_support", false);
						}
					}
					if(conf.box)
					{
						bgcolor = $this.css("background-color");
						$this.data("bgcolor", bgcolor);
					}
					if(!bypass)
					{
						methods.set(conf.blur);
					}
				}
				else
				{
					if(!elem.complete)
					{
						$this.bind("load", function(){
							prepareImage();
							if(!bypass)
							{
								methods.set(conf.blur);
							}
						});
					}
					else
					{
						prepareImage();
						if(!bypass)
						{
							methods.set(conf.blur);
						}
					}
				}
			},
			"reinit" : function(options){
				init = true;
				conf = $this.data("conf");
				//copy settings
				if ( options ) { 
					$.extend( conf, options );
				}
				current = $this.data("blur");
				is_img = $this.data("is_img");
				if(!is_img)
				{
					if(conf.text)
					{
						color = $this.data("color");
						elem.style.textShadow = color + " 0px 0px 0px";
						shadow_support = $this.data("shadow_support");
					}
					if(conf.box)
					{
						bgcolor = $this.data("bgcolor");
					}
					//methods.set(conf.blur);
				}
				else
				{
					if(!elem.complete)
					{
						$this.bind("load", function(){
							reImage();
							//methods.set(conf.blur);
						});
					}
					else
					{
						reImage();
						//methods.set(conf.blur);
					}
				}
			},
			"set": function(blur){
				bypass = true;
				if(!$this.hasClass("blur_effected"))
				{
					methods.init({"blur": blur});
				}
				else if(!init)
				{
					methods.reinit({"blur": blur});
				}
				current = blur;
				$this.data("blur", current);
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
			},
			"animate": function(blur){
				bypass = true;
				if(!$this.hasClass("blur_effected"))
				{
					methods.init();
				}
				else if(!init)
				{
					methods.reinit();
				}
				target = blur;
				anim();
			},
			"toggle": function(animate, blur){
				bypass = true;
				if(!$this.hasClass("blur_effected"))
				{
					methods.init();
				}
				else if(!init)
				{
					methods.reinit();
				}
				if(blur)
				{
					blur = (current && current != 0) ? 0 : blur;
				}
				else
				{	
					blur = (current && current != 0) ? 0 : conf.blur;
				}
				if(animate)
				{
					methods.animate(blur)
				}
				else
				{
					methods.set(blur);
				}
			}
			};
			if (methods[method]) {
				methods[method](add, val);
			} else if ( typeof method === 'object' || ! method ) {
				methods.init(method);
			} else {
			$.error( 'Method ' +  method + ' does not exist' );
			}    
		});
	};
})( jQuery );