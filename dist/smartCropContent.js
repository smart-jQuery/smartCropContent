/*
 * jQuery plugin smartCropContent v 1.0.0
 * https://github.com/smart-jQuery/smartCropContent
 * _____________________________________________
 *
 * Author: Pavel Astashkin <jquery.smart@gmail.com>
 */

(function($) {
	'use strict';

	/**
	 * Конструктор SmartCropContent
	 *
	 * @param {object} element
	 * @param {object} options
	 * @constructor
	 */
	var SmartCropContent = function(element, options) {
		this.options     = $.extend({}, SmartCropContent.DEFAULT_OPTIONS, options);
		this.$element    = $(element);
		this.moreContent = '';
		this.lessContent = '';

		this.$template         = $('<div class="container-scc"><div class="content-scc"></div></div>');
		this.$smartCropContent = $('.content-scc', this.$template);

		this.init();
	};

	SmartCropContent.DEFAULT_OPTIONS = {
		length: 200,
		more:   'Показать еще',
		less:   'Скрыть',
		ending: '...',
		html:   true
	};

	/**
	 * Инициализация работы плагина
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
		this.cropHTML(this.$smartCropContent[0], this.$element[0].childNodes);
		this.lessContent = this.$smartCropContent.html();


		if(this.moreContent.length > this.lessContent.length) {
			this.lessContent += this.options.ending;
			this.$smartCropContent.html(this.lessContent);
			this.drawBtn();
		}

		this.$element.html(this.$template);
	};

	/**
	 * Обрезаем контент(HTML) путем перебора узлов
	 *
	 * @param {object} parentNode
	 * @param {object} nodes
	 */
	SmartCropContent.prototype.cropHTML = function(parentNode, nodes) {
		for(var n = 0; nodes.length > n; n++) {
			if(this.options.length <= 0) return;

			var node      = nodes[n];
			var childNode = parentNode.appendChild(node.cloneNode(false));

			if(node.childNodes.length) {
				this.cropHTML(childNode, node.childNodes);
			} else {
				this.cropText(childNode);
			}
		}
	};

	/**
	 * Обрезаем текстовый узел, если он является концом
	 *
	 * @param {object} textNode
	 */
	SmartCropContent.prototype.cropText = function(textNode) {
		var indexSpace = textNode.textContent.indexOf(' ', this.options.length - 1);

		if(indexSpace != 0 && indexSpace != -1) {
			textNode.textContent = textNode.textContent.slice(0, indexSpace);
		}

		this.options.length -= textNode.textContent.length;

		if(this.options.length <= 0) {
			textNode.textContent = textNode.textContent.replace(/\s+$/, '');
		}
	};

	/**
	 * Создаем кнопку "показать/скрыть"
	 */
	SmartCropContent.prototype.drawBtn = function() {
		var self = this;

		$('<a/>', {
			href:  '#',
			class: 'btn-scc',
			html:  self.options.more
		})
			.insertAfter(self.$smartCropContent)
			.click(function() {
				var $this = $(this);

				if($this.html() == self.options.more) {
					$this.html(self.options.less);
					self.$smartCropContent.html(self.moreContent);
				} else {
					$this.html(self.options.more);
					self.$smartCropContent.html(self.lessContent);
				}

				return false;
			});
	};

	/**
	 * jQuery plugin smartCropContent
	 */
	$.fn.smartCropContent = function(options) {
		return this.each(function() {
			if(!$(this).data('length')) new SmartCropContent(this, options);
		})
	};

	/**
	 * USE DATA-API
	 */
	$(function() {
		$('[data-length]').each(function() {
			new SmartCropContent(this, $(this).data());
		});
	});

})(jQuery);