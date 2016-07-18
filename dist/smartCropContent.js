/*
 * jQuery plugin smartCropContent v 1.1.0
 * https://github.com/smart-jQuery/smartCropContent
 * _____________________________________________
 *
 * Author: Pavel Astashkin <jquery.smart@gmail.com>
 */

;(function($) {
	'use strict';

	/**
	 * Constructor
	 *
	 * @param {object} element
	 * @param {object} options
	 * @constructor
	 */
	var SmartCropContent = function(element, options) {
		this.options     = $.extend({}, SmartCropContent.DEFAULT_OPTIONS, options);
		this.$element    = $(element);
		this.moreContent = null;
		this.lessContent = null;
		this.tagsNotCrop = ['tr', 'li'];

		this.$template = $('<div class="container-crop"><div class="content-crop"></div></div>');
		this.$content  = $('.content-crop', this.$template);

		this.init();
	};

	SmartCropContent.DEFAULT_OPTIONS = {
		length:     200,
		more:       'Show more',
		less:       'Hide',
		ending:     '...',
		html:       true,
		hiddenTags: false
	};

	/**
	 * Initialization
	 */
	SmartCropContent.prototype.init = function() {
		this.$element.html(function(index, value) {
			return value
				.replace(/\t|\n/g, '')
				.replace(/\s{2,}/g, ' ');
		});

		if(this.options.html === false) {
			this.$element.text(this.$element.text());
		}

		this.moreContent = this.$element.html();

		if(this.options.length < this.$element.text().length) {
			this.cropHTML(this.$content[0], this.$element[0].childNodes);

			this.addEnding(this.$content[0]);

			this.lessContent = this.$content.html();

			this.addBtn();
		} else {
			this.$content.html(this.moreContent);
		}

		this.$element.html(this.$template);
	};

	/**
	 * Parse html
	 *
	 * @param {object} parentNode
	 * @param {object} nodes
	 */
	SmartCropContent.prototype.cropHTML = function(parentNode, nodes) {
		for(var n = 0; nodes.length > n; n++) {
			var node = nodes[n];

			if(this.options.length <= 0 && node.textContent.length) return;

			if(this.options.hiddenTags == false && $(node).is(':hidden')) continue;

			var childNode = parentNode.appendChild(node.cloneNode(false));

			if(node.textContent.length) {

				if(this.options.length <= node.textContent.length && $.inArray(node.nodeName.toLowerCase(), this.tagsNotCrop) != -1) {
					this.options.length = node.textContent.length;
					this.addEnding(this.$content[0]);
				}

				if(node.childNodes.length) {
					this.cropHTML(childNode, node.childNodes);
				} else {
					this.cropText(childNode);
				}
			}

		}
	};

	/**
	 * Crop text node
	 *
	 * @param {object} textNode
	 */
	SmartCropContent.prototype.cropText = function(textNode) {
		var isLastTextNode = this.options.length - textNode.textContent.length <= 0;

		if(isLastTextNode) {
			var indexSpace = textNode.textContent.indexOf(' ', this.options.length - 1);

			if(indexSpace != -1) {
				textNode.textContent = textNode.textContent.slice(0, indexSpace + 1);
			}
		}

		this.options.length -= textNode.textContent.length;

		if(isLastTextNode) {
			textNode.textContent = textNode.textContent.replace(/\s+$/, '');
			this.addEnding(textNode.parentNode);
		}
	};

	/**
	 * Add an ending to the cropped content
	 *
	 * @param node
	 */
	SmartCropContent.prototype.addEnding = function(node) {
		if(!this.options.ending) return;

		$('<span/>', {
			class: 'ending-crop',
			html:  this.options.ending
		}).appendTo($(node));

		this.options.ending = '';
	};

	/**
	 * Add button "show/hide"
	 */
	SmartCropContent.prototype.addBtn = function() {
		if(!this.options.more) return;

		var self = this;

		$('<a/>', {
			href:  '#',
			class: 'btn-crop',
			html:  self.options.more
		})
			.insertAfter(self.$content)
			.click(function() {
				var $this = $(this);

				if($this.html() == self.options.more) {
					$this.html(self.options.less);
					self.$content.html(self.moreContent);
					self.$template.removeClass('closed-crop').addClass('opened-crop');
				} else {
					$this.html(self.options.more);
					self.$content.html(self.lessContent);
					self.$template.removeClass('opened-crop').addClass('closed-crop');
				}

				return false;
			});

		self.$template.addClass('closed-crop');
	};

	/**
	 * jQuery plugin smartCropContent
	 */
	$.fn.smartCropContent = function(options) {
		return this.each(function() {
			if(!$(this).data('crop-length')) new SmartCropContent(this, options);
		})
	};

	/**
	 * DATA-API
	 */
	$(function() {
		$('[data-crop-length]').each(function() {
			//new SmartCropContent(this, $(this).data());
			var $this = $(this);
			new SmartCropContent(this, {
				length:     $this.data('crop-length'),
				more:       $this.data('crop-more'),
				less:       $this.data('crop-less'),
				ending:     $this.data('crop-ending'),
				html:       $this.data('crop-html'),
				hiddenTags: $this.data('crop-hidden-tags')
			});
		});
	});

})(jQuery);