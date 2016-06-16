/*
 * jQuery plugin smartCropText v 1.0.0
 * https://github.com/smart-jQuery/smartCropText
 * _____________________________________________
 *
 * Author: Pavel Astashkin <smart-jquery@mail.ru>
 */

(function($) {
	'use strict';

	/**
	 * Конструктор SmartCropText
	 *
	 * @param {object} element
	 * @param {object} options
	 * @constructor
	 */
	var SmartCropText = function(element, options) {
		this.options     = $.extend({}, SmartCropText.DEFAULT_OPTIONS, options);
		this.$element    = $(element);
		this.moreContent = '';
		this.lessContent = '';

		this.$template         = $('<div class="container-sct"><div class="content-sct"></div></div>');
		this.$smartCropContent = $('.content-sct', this.$template);

		this.init();
	};

	SmartCropText.DEFAULT_OPTIONS = {
		length: 200,
		more:   'Показать еще',
		less:   'Скрыть',
		ending: '...',
		html:   true
	};

	/**
	 * Инициализация работы плагина
	 */
	SmartCropText.prototype.init = function() {
		if(this.options.html === true) {
			this.cropHTML(this.$smartCropContent[0], this.$element[0].childNodes);
			this.moreContent = this.$element.html().trim();
			this.lessContent = this.$smartCropContent.html().trim();
		} else {
			this.cropText(this.$smartCropContent[0]);
			this.moreContent = this.$element.text().trim();
			this.lessContent = this.$smartCropContent.text().trim();
		}

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
	SmartCropText.prototype.cropHTML = function(parentNode, nodes) {
		for(var n = 0; nodes.length > n; n++) {
			if(this.options.length <= 0) return;

			var node      = nodes[n];
			var childNode = parentNode.appendChild(node.cloneNode(false));

			if(node.childNodes.length) {
				this.cropHTML(childNode, node.childNodes);
			} else {
				childNode.textContent = childNode.textContent.replace(/\n|\t/g, '');
				if( childNode.textContent.length !== 0) {
					this.fixTrail(childNode);
					this.options.length -= childNode.textContent.length;
				}
			}
		}
	};

	/**
	 * Обрезаем контент(без HTML)
	 *
	 * @param {object} childNode
	 */
	SmartCropText.prototype.cropText = function(childNode) {
		childNode.innerHTML = this.moreContent;
		this.fixTrail(childNode);
		this.options.length -= childNode.textContent.length;
	};

	/**
	 * Исправляем/добавляем окончание обрезанному тексту
	 *
	 * @param {object} textNode
	 */
	SmartCropText.prototype.fixTrail = function(textNode) {
		var textContent = textNode.textContent;

		if(this.options.length - textContent.length < 0) {
			var indexSpace = textContent.indexOf(' ', this.options.length);

			if(indexSpace != -1) {
				textNode.textContent = textContent.slice(0, indexSpace);
			}
		}
	};

	/**
	 * Создаем кнопку "показать/скрыть"
	 */
	SmartCropText.prototype.drawBtn = function() {
		var self = this;

		$('<a/>', {
			href:  '#',
			class: 'btn-sct',
			html:  this.options.more
		})
			.insertAfter(this.$smartCropContent)
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
	 * jQuery plugin smartCropText
	 */
	$.fn.smartCropText = function(options) {
		return this.each(function() {
			if($(this).data('plugin') != 'sct') new SmartCropText(this, options);
		})
	};

	/**
	 * USE DATA-API
	 */
	$(function() {
		$('[data-plugin = "sct"]').each(function() {
			new SmartCropText(this, $(this).data());
		});
	});

})(jQuery);