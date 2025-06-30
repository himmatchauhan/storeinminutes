if (typeof jQuery === 'undefined') {throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function ($) {'use strict';var version = $.fn.jquery.split(' ')[0].split('.')
if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')}}(jQuery);+function ($) {'use strict';function transitionEnd() {var el = document.createElement('bootstrap')
var transEndEventNames = {WebkitTransition : 'webkitTransitionEnd',MozTransition    : 'transitionend',OTransition      : 'oTransitionEnd otransitionend',transition       : 'transitionend'}
for (var name in transEndEventNames) {if (el.style[name] !== undefined) {return { end: transEndEventNames[name] }}}
return false // explicit for ie8 (  ._.)
}
$.fn.emulateTransitionEnd = function (duration) {var called = false
var $el = this
$(this).one('bsTransitionEnd', function () { called = true })
var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
setTimeout(callback, duration)
return this}
$(function () {$.support.transition = transitionEnd()
if (!$.support.transition) return
$.event.special.bsTransitionEnd = {bindType: $.support.transition.end,delegateType: $.support.transition.end,handle: function (e) {if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)}}})}(jQuery);+function ($) {'use strict';var dismiss = '[data-dismiss="alert"]'
var Alert   = function (el) {$(el).on('click', dismiss, this.close)}
Alert.VERSION = '3.3.5'
Alert.TRANSITION_DURATION = 150
Alert.prototype.close = function (e) {var $this    = $(this)
var selector = $this.attr('data-target')
if (!selector) {selector = $this.attr('href')
selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
}
var $parent = $(selector)
if (e) e.preventDefault()
if (!$parent.length) {$parent = $this.closest('.alert')}
$parent.trigger(e = $.Event('close.bs.alert'))
if (e.isDefaultPrevented()) return
$parent.removeClass('in')
function removeElement() {$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition && $parent.hasClass('fade') ?$parent
.one('bsTransitionEnd', removeElement)
.emulateTransitionEnd(Alert.TRANSITION_DURATION) :removeElement()}
function Plugin(option) {return this.each(function () {var $this = $(this)
var data  = $this.data('bs.alert')
if (!data) $this.data('bs.alert', (data = new Alert(this)))
if (typeof option == 'string') data[option].call($this)})}
var old = $.fn.alert
$.fn.alert             = Plugin
$.fn.alert.Constructor = Alert
$.fn.alert.noConflict = function () {$.fn.alert = old
return this}
$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)}(jQuery);+function ($) {'use strict';var Button = function (element, options) {this.$element  = $(element)
this.options   = $.extend({}, Button.DEFAULTS, options)
this.isLoading = false}
Button.VERSION  = '3.3.5'
Button.DEFAULTS = {loadingText: 'loading...'}
Button.prototype.setState = function (state) {var d    = 'disabled'
var $el  = this.$element
var val  = $el.is('input') ? 'val' : 'html'
var data = $el.data()
state += 'Text'
if (data.resetText == null) $el.data('resetText', $el[val]())
setTimeout($.proxy(function () {$el[val](data[state] == null ? this.options[state] : data[state])
if (state == 'loadingText') {this.isLoading = true
$el.addClass(d).attr(d, d)} else if (this.isLoading) {this.isLoading = false
$el.removeClass(d).removeAttr(d)}}, this), 0)}
Button.prototype.toggle = function () {var changed = true
var $parent = this.$element.closest('[data-toggle="buttons"]')
if ($parent.length) {var $input = this.$element.find('input')
if ($input.prop('type') == 'radio') {if ($input.prop('checked')) changed = false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')} else if ($input.prop('type') == 'checkbox') {if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
this.$element.toggleClass('active')}
$input.prop('checked', this.$element.hasClass('active'))
if (changed) $input.trigger('change')} else {this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.button')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.button', (data = new Button(this, options)))
if (option == 'toggle') data.toggle()
else if (option) data.setState(option)})}
var old = $.fn.button
$.fn.button             = Plugin
$.fn.button.Constructor = Button
$.fn.button.noConflict = function () {$.fn.button = old
return this}
$(document)
.on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {var $btn = $(e.target)
if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
Plugin.call($btn, 'toggle')
if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()})
.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {$(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))})}(jQuery);+function ($) {'use strict';var Carousel = function (element, options) {this.$element    = $(element)
this.$indicators = this.$element.find('.carousel-indicators')
this.options     = options
this.paused      = null
this.sliding     = null
this.interval    = null
this.$active     = null
this.$items      = null
this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
.on('mouseenter.bs.carousel', $.proxy(this.pause, this))
.on('mouseleave.bs.carousel', $.proxy(this.cycle, this))}
Carousel.VERSION  = '3.3.5'
Carousel.TRANSITION_DURATION = 600
Carousel.DEFAULTS = {interval: 5000,pause: 'hover',wrap: true,keyboard: true}
Carousel.prototype.keydown = function (e) {if (/input|textarea/i.test(e.target.tagName)) return
switch (e.which) {case 37: this.prev(); break
case 39: this.next(); break
default: return}
e.preventDefault()}
Carousel.prototype.cycle = function (e) {e || (this.paused = false)
this.interval && clearInterval(this.interval)
this.options.interval
&& !this.paused
&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
return this}
Carousel.prototype.getItemIndex = function (item) {this.$items = item.parent().children('.item')
return this.$items.index(item || this.$active)}
Carousel.prototype.getItemForDirection = function (direction, active) {var activeIndex = this.getItemIndex(active)
var willWrap = (direction == 'prev' && activeIndex === 0)
|| (direction == 'next' && activeIndex == (this.$items.length - 1))
if (willWrap && !this.options.wrap) return active
var delta = direction == 'prev' ? -1 : 1
var itemIndex = (activeIndex + delta) % this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to = function (pos) {var that        = this
var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
if (pos > (this.$items.length - 1) || pos < 0) return
if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
if (activeIndex == pos) return this.pause().cycle()
return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))}
Carousel.prototype.pause = function (e) {e || (this.paused = true)
if (this.$element.find('.next, .prev').length && $.support.transition) {this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval = clearInterval(this.interval)
return this}
Carousel.prototype.next = function () {if (this.sliding) return
return this.slide('next')}
Carousel.prototype.prev = function () {if (this.sliding) return
return this.slide('prev')}
Carousel.prototype.slide = function (type, next) {var $active   = this.$element.find('.item.active')
var $next     = next || this.getItemForDirection(type, $active)
var isCycling = this.interval
var direction = type == 'next' ? 'left' : 'right'
var that      = this
if ($next.hasClass('active')) return (this.sliding = false)
var relatedTarget = $next[0]
var slideEvent = $.Event('slide.bs.carousel', {relatedTarget: relatedTarget,direction: direction})
this.$element.trigger(slideEvent)
if (slideEvent.isDefaultPrevented()) return
this.sliding = true
isCycling && this.pause()
if (this.$indicators.length) {this.$indicators.find('.active').removeClass('active')
var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator && $nextIndicator.addClass('active')}
var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
if ($.support.transition && this.$element.hasClass('slide')) {$next.addClass(type)
$next[0].offsetWidth // force reflow
$active.addClass(direction)
$next.addClass(direction)
$active
.one('bsTransitionEnd', function () {$next.removeClass([type, direction].join(' ')).addClass('active')
$active.removeClass(['active', direction].join(' '))
that.sliding = false
setTimeout(function () {that.$element.trigger(slidEvent)}, 0)})
.emulateTransitionEnd(Carousel.TRANSITION_DURATION)} else {$active.removeClass('active')
$next.addClass('active')
this.sliding = false
this.$element.trigger(slidEvent)}
isCycling && this.cycle()
return this}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.carousel')
var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
var action  = typeof option == 'string' ? option : options.slide
if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
if (typeof option == 'number') data.to(option)
else if (action) data[action]()
else if (options.interval) data.pause().cycle()})}
var old = $.fn.carousel
$.fn.carousel             = Plugin
$.fn.carousel.Constructor = Carousel
$.fn.carousel.noConflict = function () {$.fn.carousel = old
return this}
var clickHandler = function (e) {var href
var $this   = $(this)
var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
if (!$target.hasClass('carousel')) return
var options = $.extend({}, $target.data(), $this.data())
var slideIndex = $this.attr('data-slide-to')
if (slideIndex) options.interval = false
Plugin.call($target, options)
if (slideIndex) {$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document)
.on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
.on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
$(window).on('load', function () {$('[data-ride="carousel"]').each(function () {var $carousel = $(this)
Plugin.call($carousel, $carousel.data())})})}(jQuery);+function ($) {'use strict';var Collapse = function (element, options) {this.$element      = $(element)
this.options       = $.extend({}, Collapse.DEFAULTS, options)
this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +'[data-toggle="collapse"][data-target="#' + element.id + '"]')
this.transitioning = null
if (this.options.parent) {this.$parent = this.getParent()} else {this.addAriaAndCollapsedClass(this.$element, this.$trigger)}
if (this.options.toggle) this.toggle()}
Collapse.VERSION  = '3.3.5'
Collapse.TRANSITION_DURATION = 350
Collapse.DEFAULTS = {toggle: true}
Collapse.prototype.dimension = function () {var hasWidth = this.$element.hasClass('width')
return hasWidth ? 'width' : 'height'}
Collapse.prototype.show = function () {if (this.transitioning || this.$element.hasClass('in')) return
var activesData
var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')
if (actives && actives.length) {activesData = actives.data('bs.collapse')
if (activesData && activesData.transitioning) return}
var startEvent = $.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if (startEvent.isDefaultPrevented()) return
if (actives && actives.length) {Plugin.call(actives, 'hide')
activesData || actives.data('bs.collapse', null)}
var dimension = this.dimension()
this.$element
.removeClass('collapse')
.addClass('collapsing')[dimension](0)
.attr('aria-expanded', true)
this.$trigger
.removeClass('collapsed')
.attr('aria-expanded', true)
this.transitioning = 1
var complete = function () {this.$element
.removeClass('collapsing')
.addClass('collapse in')[dimension]('')
this.transitioning = 0
this.$element
.trigger('shown.bs.collapse')}
if (!$.support.transition) return complete.call(this)
var scrollSize = $.camelCase(['scroll', dimension].join('-'))
this.$element
.one('bsTransitionEnd', $.proxy(complete, this))
.emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide = function () {if (this.transitioning || !this.$element.hasClass('in')) return
var startEvent = $.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if (startEvent.isDefaultPrevented()) return
var dimension = this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element
.addClass('collapsing')
.removeClass('collapse in')
.attr('aria-expanded', false)
this.$trigger
.addClass('collapsed')
.attr('aria-expanded', false)
this.transitioning = 1
var complete = function () {this.transitioning = 0
this.$element
.removeClass('collapsing')
.addClass('collapse')
.trigger('hidden.bs.collapse')}
if (!$.support.transition) return complete.call(this)
this.$element
[dimension](0)
.one('bsTransitionEnd', $.proxy(complete, this))
.emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle = function () {this[this.$element.hasClass('in') ? 'hide' : 'show']()}
Collapse.prototype.getParent = function () {return $(this.options.parent)
.find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
.each($.proxy(function (i, element) {var $element = $(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)}, this))
.end()}
Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {var isOpen = $element.hasClass('in')
$element.attr('aria-expanded', isOpen)
$trigger
.toggleClass('collapsed', !isOpen)
.attr('aria-expanded', isOpen)}
function getTargetFromTrigger($trigger) {var href
var target = $trigger.attr('data-target')
|| (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
return $(target)}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.collapse')
var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.collapse
$.fn.collapse             = Plugin
$.fn.collapse.Constructor = Collapse
$.fn.collapse.noConflict = function () {$.fn.collapse = old
return this}
$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {var $this   = $(this)
if (!$this.attr('data-target')) e.preventDefault()
var $target = getTargetFromTrigger($this)
var data    = $target.data('bs.collapse')
var option  = data ? 'toggle' : $this.data()
Plugin.call($target, option)})}(jQuery);+function ($) {'use strict';var backdrop = '.dropdown-backdrop'
var toggle   = '[data-toggle="dropdown"]'
var Dropdown = function (element) {$(element).on('click.bs.dropdown', this.toggle)}
Dropdown.VERSION = '3.3.5'
function getParent($this) {var selector = $this.attr('data-target')
if (!selector) {selector = $this.attr('href')
selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
}
var $parent = selector && $(selector)
return $parent && $parent.length ? $parent : $this.parent()}
function clearMenus(e) {if (e && e.which === 3) return
$(backdrop).remove()
$(toggle).each(function () {var $this         = $(this)
var $parent       = getParent($this)
var relatedTarget = { relatedTarget: this }
if (!$parent.hasClass('open')) return
if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return
$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
if (e.isDefaultPrevented()) return
$this.attr('aria-expanded', 'false')
$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)})}
Dropdown.prototype.toggle = function (e) {var $this = $(this)
if ($this.is('.disabled, :disabled')) return
var $parent  = getParent($this)
var isActive = $parent.hasClass('open')
clearMenus()
if (!isActive) {if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {$(document.createElement('div'))
.addClass('dropdown-backdrop')
.insertAfter($(this))
.on('click', clearMenus)}
var relatedTarget = { relatedTarget: this }
$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
if (e.isDefaultPrevented()) return
$this
.trigger('focus')
.attr('aria-expanded', 'true')
$parent
.toggleClass('open')
.trigger('shown.bs.dropdown', relatedTarget)}
return false}
Dropdown.prototype.keydown = function (e) {if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
var $this = $(this)
e.preventDefault()
e.stopPropagation()
if ($this.is('.disabled, :disabled')) return
var $parent  = getParent($this)
var isActive = $parent.hasClass('open')
if (!isActive && e.which != 27 || isActive && e.which == 27) {if (e.which == 27) $parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc = ' li:not(.disabled):visible a'
var $items = $parent.find('.dropdown-menu' + desc)
if (!$items.length) return
var index = $items.index(e.target)
if (e.which == 38 && index > 0)                 index--         // up
if (e.which == 40 && index < $items.length - 1) index++         // down
if (!~index)                                    index = 0
$items.eq(index).trigger('focus')}
function Plugin(option) {return this.each(function () {var $this = $(this)
var data  = $this.data('bs.dropdown')
if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
if (typeof option == 'string') data[option].call($this)})}
var old = $.fn.dropdown
$.fn.dropdown             = Plugin
$.fn.dropdown.Constructor = Dropdown
$.fn.dropdown.noConflict = function () {$.fn.dropdown = old
return this}
$(document)
.on('click.bs.dropdown.data-api', clearMenus)
.on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
.on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
.on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)}(jQuery);+function ($) {'use strict';var Modal = function (element, options) {this.options             = options
this.$body               = $(document.body)
this.$element            = $(element)
this.$dialog             = this.$element.find('.modal-dialog')
this.$backdrop           = null
this.isShown             = null
this.originalBodyPad     = null
this.scrollbarWidth      = 0
this.ignoreBackdropClick = false
if ( !this.$element.hasClass('system-modal') ) {console.warn('Boot.modal - '+this.$element.attr('id')+' - Upgrade to new system modal'); //Noam: Old Modal (upgrade to Gabi)
}
if (this.options.remote) {this.$element
.find('.modal-content')
.load(this.options.remote, $.proxy(function () {this.$element.trigger('loaded.bs.modal')}, this))}}
Modal.VERSION  = '3.3.5'
Modal.TRANSITION_DURATION = 300
Modal.BACKDROP_TRANSITION_DURATION = 150
Modal.DEFAULTS = {backdrop: true,keyboard: true,show: true}
Modal.prototype.toggle = function (_relatedTarget) {return this.isShown ? this.hide() : this.show(_relatedTarget)}
Modal.prototype.show = function (_relatedTarget) {var that = this
var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
this.$element.trigger(e)
if (this.isShown || e.isDefaultPrevented()) return
this.isShown = true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
this.$dialog.on('mousedown.dismiss.bs.modal', function () {that.$element.one('mouseup.dismiss.bs.modal', function (e) {if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true})})
this.backdrop(function () {var transition = $.support.transition && that.$element.hasClass('fade')
if (!that.$element.parent().length) {that.$element.appendTo(that.$body) // don't move modals dom position
}
that.$element
.show()
.scrollTop(0)
that.adjustDialog()
if (transition) {that.$element[0].offsetWidth // force reflow
}
that.$element.addClass('in')
that.enforceFocus()
var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
transition ?that.$dialog // wait for modal to slide in
.one('bsTransitionEnd', function () {that.$element.trigger('focus').trigger(e)})
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide = function (e) {if (e) e.preventDefault()
e = $.Event('hide.bs.modal')
this.$element.trigger(e)
if (!this.isShown || e.isDefaultPrevented()) return
this.isShown = false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element
.removeClass('in')
.off('click.dismiss.bs.modal')
.off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition && this.$element.hasClass('fade') ?this.$element
.one('bsTransitionEnd', $.proxy(this.hideModal, this))
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :this.hideModal()}
Modal.prototype.enforceFocus = function () {$(document)
.off('focusin.bs.modal') // guard against infinite focus loop
.on('focusin.bs.modal', $.proxy(function (e) {if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {this.$element.trigger('focus')}}, this))}
Modal.prototype.escape = function () {if (this.isShown && this.options.keyboard) {this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {e.which == 27 && this.hide()}, this))} else if (!this.isShown) {this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize = function () {if (this.isShown) {$(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))} else {$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal = function () {var that = this
this.$element.hide()
this.backdrop(function () {that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop = function () {this.$backdrop && this.$backdrop.remove()
this.$backdrop = null}
Modal.prototype.backdrop = function (callback) {var that = this
var animate = this.$element.hasClass('fade') ? 'fade' : ''
if (this.isShown && this.options.backdrop) {var doAnimate = $.support.transition && animate
this.$backdrop = $(document.createElement('div'))
.addClass('modal-backdrop ' + animate)
.appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {if (this.ignoreBackdropClick) {this.ignoreBackdropClick = false
return}
if (e.target !== e.currentTarget) return
this.options.backdrop == 'static'
? this.$element[0].focus()
: this.hide()}, this))
if (doAnimate) this.$backdrop[0].offsetWidth // force reflow
this.$backdrop.addClass('in')
if (!callback) return
doAnimate ?this.$backdrop
.one('bsTransitionEnd', callback)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :callback()} else if (!this.isShown && this.$backdrop) {this.$backdrop.removeClass('in')
var callbackRemove = function () {that.removeBackdrop()
callback && callback()}
$.support.transition && this.$element.hasClass('fade') ?this.$backdrop
.one('bsTransitionEnd', callbackRemove)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :callbackRemove()} else if (callback) {callback()}}
Modal.prototype.handleUpdate = function () {this.adjustDialog()}
Modal.prototype.adjustDialog = function () {var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight
this.$element.css({paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''})}
Modal.prototype.resetAdjustments = function () {this.$element.css({paddingLeft: '',paddingRight: ''})}
Modal.prototype.checkScrollbar = function () {var fullWindowWidth = window.innerWidth
if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
var documentElementRect = document.documentElement.getBoundingClientRect()
fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)}
this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
this.scrollbarWidth = this.measureScrollbar()}
Modal.prototype.setScrollbar = function () {var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
this.originalBodyPad = document.body.style.paddingRight || ''
if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)}
Modal.prototype.resetScrollbar = function () {this.$body.css('padding-right', this.originalBodyPad)}
Modal.prototype.measureScrollbar = function () { // thx walsh
var scrollDiv = document.createElement('div')
scrollDiv.className = 'modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option, _relatedTarget) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.modal')
var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
if (typeof option == 'string') data[option](_relatedTarget)
else if (options.show) data.show(_relatedTarget)})}
var old = $.fn.modal
$.fn.modal             = Plugin
$.fn.modal.Constructor = Modal
$.fn.modal.noConflict = function () {$.fn.modal = old
return this}
$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {var $this   = $(this)
var href    = $this.attr('href')
var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
if ($this.is('a')) e.preventDefault()
$target.one('show.bs.modal', function (showEvent) {if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
$target.one('hidden.bs.modal', function () {$this.is(':visible') && $this.trigger('focus')})})
Plugin.call($target, option, this)})}(jQuery);+function ($) {'use strict';var Tooltip = function (element, options) {this.type       = null
this.options    = null
this.enabled    = null
this.timeout    = null
this.hoverState = null
this.$element   = null
this.inState    = null
this.init('tooltip', element, options)}
Tooltip.VERSION  = '3.3.5'
Tooltip.TRANSITION_DURATION = 150
Tooltip.DEFAULTS = {animation: true,placement: 'top',selector: false,template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger: 'hover focus',title: '',delay: 0,html: false,container: false,viewport: {selector: 'body',padding: 0}}
Tooltip.prototype.init = function (type, element, options) {this.enabled   = true
this.type      = type
this.$element  = $(element)
this.options   = this.getOptions(options)
this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
this.inState   = { click: false, hover: false, focus: false }
if (this.$element[0] instanceof document.constructor && !this.options.selector) {throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')}
var triggers = this.options.trigger.split(' ')
for (var i = triggers.length; i--;) {var trigger = triggers[i]
if (trigger == 'click') {this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))} else if (trigger != 'manual') {var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))}}
this.options.selector ?(this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :this.fixTitle()}
Tooltip.prototype.getDefaults = function () {return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions = function (options) {options = $.extend({}, this.getDefaults(), this.$element.data(), options)
if (options.delay && typeof options.delay == 'number') {options.delay = {show: options.delay,hide: options.delay}}
return options}
Tooltip.prototype.getDelegateOptions = function () {var options  = {}
var defaults = this.getDefaults()
this._options && $.each(this._options, function (key, value) {if (defaults[key] != value) options[key] = value})
return options}
Tooltip.prototype.enter = function (obj) {var self = obj instanceof this.constructor ?obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)}
if (obj instanceof $.Event) {self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true}
if (self.tip().hasClass('in') || self.hoverState == 'in') {self.hoverState = 'in'
return}
clearTimeout(self.timeout)
self.hoverState = 'in'
if (!self.options.delay || !self.options.delay.show) return self.show()
self.timeout = setTimeout(function () {if (self.hoverState == 'in') self.show()}, self.options.delay.show)}
Tooltip.prototype.isInStateTrue = function () {for (var key in this.inState) {if (this.inState[key]) return true}
return false}
Tooltip.prototype.leave = function (obj) {var self = obj instanceof this.constructor ?obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)}
if (obj instanceof $.Event) {self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false}
if (self.isInStateTrue()) return
clearTimeout(self.timeout)
self.hoverState = 'out'
if (!self.options.delay || !self.options.delay.hide) return self.hide()
self.timeout = setTimeout(function () {if (self.hoverState == 'out') self.hide()}, self.options.delay.hide)}
Tooltip.prototype.show = function () {var e = $.Event('show.bs.' + this.type)
if (this.hasContent() && this.enabled) {this.$element.trigger(e)
var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
if (e.isDefaultPrevented() || !inDom) return
var that = this
var $tip = this.tip()
var tipId = this.getUID(this.type)
this.setContent()
$tip.attr('id', tipId)
this.$element.attr('aria-describedby', tipId)
if (this.options.animation) $tip.addClass('fade')
var placement = typeof this.options.placement == 'function' ?this.options.placement.call(this, $tip[0], this.$element[0]) :this.options.placement
var autoToken = /\s?auto?\s?/i
var autoPlace = autoToken.test(placement)
if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
$tip
.detach()
.css({ top: 0, left: 0, display: 'block' })
.addClass(placement)
.data('bs.' + this.type, this)
this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.' + this.type)
var pos          = this.getPosition()
var actualWidth  = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (autoPlace) {var orgPlacement = placement
var viewportDim = this.getPosition(this.$viewport)
placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :placement
$tip
.removeClass(orgPlacement)
.addClass(placement)}
var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
this.applyPlacement(calculatedOffset, placement)
var complete = function () {var prevHoverState = that.hoverState
that.$element.trigger('shown.bs.' + that.type)
that.hoverState = null
if (prevHoverState == 'out') that.leave(that)}
$.support.transition && this.$tip.hasClass('fade') ?$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :complete()}}
Tooltip.prototype.applyPlacement = function (offset, placement) {var $tip   = this.tip()
var width  = $tip[0].offsetWidth
var height = $tip[0].offsetHeight
var marginTop = parseInt($tip.css('margin-top'), 10)
var marginLeft = parseInt($tip.css('margin-left'), 10)
if (isNaN(marginTop))  marginTop  = 0
if (isNaN(marginLeft)) marginLeft = 0
offset.top  += marginTop
offset.left += marginLeft
$.offset.setOffset($tip[0], $.extend({using: function (props) {$tip.css({top: Math.round(props.top),left: Math.round(props.left)})}}, offset), 0)
$tip.addClass('in')
var actualWidth  = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (placement == 'top' && actualHeight != height) {offset.top = offset.top + height - actualHeight}
var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
if (delta.left) offset.left += delta.left
else offset.top += delta.top
var isVertical          = /top|bottom/.test(placement)
var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)}
Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {this.arrow()
.css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
.css(isVertical ? 'top' : 'left', '')}
Tooltip.prototype.setContent = function () {var $tip  = this.tip()
var title = this.getTitle()
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide = function (callback) {var that = this
var $tip = $(this.$tip)
var e    = $.Event('hide.bs.' + this.type)
function complete() {if (that.hoverState != 'in') $tip.detach()
that.$element
.removeAttr('aria-describedby')
.trigger('hidden.bs.' + that.type)
callback && callback()}
this.$element.trigger(e)
if (e.isDefaultPrevented()) return
$tip.removeClass('in')
$.support.transition && $tip.hasClass('fade') ?$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :complete()
this.hoverState = null
return this}
Tooltip.prototype.fixTitle = function () {var $e = this.$element
if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {$e.attr('data-original-title', $e.attr('title') || '').attr('title', '')}}
Tooltip.prototype.hasContent = function () {return this.getTitle()}
Tooltip.prototype.getPosition = function ($element) {$element   = $element || this.$element
var el     = $element[0]
var isBody = el.tagName == 'BODY'
var elRect    = el.getBoundingClientRect()
if (elRect.width == null) {elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })}
var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null
return $.extend({}, elRect, scroll, outerDims, elOffset)}
Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }}
Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {var delta = { top: 0, left: 0 }
if (!this.$viewport) return delta
var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
var viewportDimensions = this.getPosition(this.$viewport)
if (/right|left/.test(placement)) {var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
if (topEdgeOffset < viewportDimensions.top) { // top overflow
delta.top = viewportDimensions.top - topEdgeOffset} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset}} else {var leftEdgeOffset  = pos.left - viewportPadding
var rightEdgeOffset = pos.left + viewportPadding + actualWidth
if (leftEdgeOffset < viewportDimensions.left) { // left overflow
delta.left = viewportDimensions.left - leftEdgeOffset} else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle = function () {var title
var $e = this.$element
var o  = this.options
title = $e.attr('data-original-title')
|| (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)
return title}
Tooltip.prototype.getUID = function (prefix) {do prefix += ~~(Math.random() * 1000000)
while (document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip = function () {if (!this.$tip) {this.$tip = $(this.options.template)
if (this.$tip.length != 1) {throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow = function () {return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable = function () {this.enabled = true}
Tooltip.prototype.disable = function () {this.enabled = false}
Tooltip.prototype.toggleEnabled = function () {this.enabled = !this.enabled}
Tooltip.prototype.toggle = function (e) {var self = this
if (e) {self = $(e.currentTarget).data('bs.' + this.type)
if (!self) {self = new this.constructor(e.currentTarget, this.getDelegateOptions())
$(e.currentTarget).data('bs.' + this.type, self)}}
if (e) {self.inState.click = !self.inState.click
if (self.isInStateTrue()) self.enter(self)
else self.leave(self)} else {self.tip().hasClass('in') ? self.leave(self) : self.enter(self)}}
Tooltip.prototype.destroy = function () {var that = this
clearTimeout(this.timeout)
this.hide(function () {that.$element.off('.' + that.type).removeData('bs.' + that.type)
if (that.$tip) {that.$tip.detach()}
that.$tip = null
that.$arrow = null
that.$viewport = null})}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.tooltip')
var options = typeof option == 'object' && option
if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.tooltip
$.fn.tooltip             = Plugin
$.fn.tooltip.Constructor = Tooltip
$.fn.tooltip.noConflict = function () {$.fn.tooltip = old
return this}}(jQuery);+function ($) {'use strict';var Popover = function (element, options) {this.init('popover', element, options)}
if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')
Popover.VERSION  = '3.3.5'
Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {placement: 'right',trigger: 'click',content: '',template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor = Popover
Popover.prototype.getDefaults = function () {return Popover.DEFAULTS}
Popover.prototype.setContent = function () {var $tip    = this.tip()
var title   = this.getTitle()
var content = this.getContent()
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
$tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content)
$tip.removeClass('fade top bottom left right in')
if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()}
Popover.prototype.hasContent = function () {return this.getTitle() || this.getContent()}
Popover.prototype.getContent = function () {var $e = this.$element
var o  = this.options
return $e.attr('data-content')
|| (typeof o.content == 'function' ?o.content.call($e[0]) :o.content)}
Popover.prototype.arrow = function () {return (this.$arrow = this.$arrow || this.tip().find('.arrow'))}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.popover')
var options = typeof option == 'object' && option
if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.popover
$.fn.popover             = Plugin
$.fn.popover.Constructor = Popover
$.fn.popover.noConflict = function () {$.fn.popover = old
return this}}(jQuery);+function ($) {'use strict';function ScrollSpy(element, options) {this.$body          = $(document.body)
this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
this.selector       = (this.options.target || '') + ' .nav li > a'
this.offsets        = []
this.targets        = []
this.activeTarget   = null
this.scrollHeight   = 0
this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
this.refresh()
this.process()}
ScrollSpy.VERSION  = '3.3.5'
ScrollSpy.DEFAULTS = {offset: 10}
ScrollSpy.prototype.getScrollHeight = function () {return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh = function () {var that          = this
var offsetMethod  = 'offset'
var offsetBase    = 0
this.offsets      = []
this.targets      = []
this.scrollHeight = this.getScrollHeight()
if (!$.isWindow(this.$scrollElement[0])) {offsetMethod = 'position'
offsetBase   = this.$scrollElement.scrollTop()}
this.$body
.find(this.selector)
.map(function () {var $el   = $(this)
var href  = $el.data('target') || $el.attr('href')
var $href = /^#./.test(href) && $(href)
return ($href
&& $href.length
&& $href.is(':visible')
&& [[$href[offsetMethod]().top + offsetBase, href]]) || null})
.sort(function (a, b) { return a[0] - b[0] })
.each(function () {that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process = function () {var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
var scrollHeight = this.getScrollHeight()
var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
var offsets      = this.offsets
var targets      = this.targets
var activeTarget = this.activeTarget
var i
if (this.scrollHeight != scrollHeight) {this.refresh()}
if (scrollTop >= maxScroll) {return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)}
if (activeTarget && scrollTop < offsets[0]) {this.activeTarget = null
return this.clear()}
for (i = offsets.length; i--;) {activeTarget != targets[i]
&& scrollTop >= offsets[i]
&& (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
&& this.activate(targets[i])}}
ScrollSpy.prototype.activate = function (target) {this.activeTarget = target
this.clear()
var selector = this.selector +'[data-target="' + target + '"],' +this.selector + '[href="' + target + '"]'
var active = $(selector)
.parents('li')
.addClass('active')
if (active.parent('.dropdown-menu').length) {active = active
.closest('li.dropdown')
.addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear = function () {$(this.selector)
.parentsUntil(this.options.target, '.active')
.removeClass('active')}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.scrollspy')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.scrollspy
$.fn.scrollspy             = Plugin
$.fn.scrollspy.Constructor = ScrollSpy
$.fn.scrollspy.noConflict = function () {$.fn.scrollspy = old
return this}
$(window).on('load.bs.scrollspy.data-api', function () {$('[data-spy="scroll"]').each(function () {var $spy = $(this)
Plugin.call($spy, $spy.data())})})}(jQuery);+function ($) {'use strict';var Tab = function (element) {this.element = $(element)}
Tab.VERSION = '3.3.5'
Tab.TRANSITION_DURATION = 150
Tab.prototype.show = function () {var $this    = this.element
var $ul      = $this.closest('ul:not(.dropdown-menu)')
var selector = $this.data('target')
if (!selector) {selector = $this.attr('href')
selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
}
if ($this.parent('li').hasClass('active')) return
var $previous = $ul.find('.active:last a')
var hideEvent = $.Event('hide.bs.tab', {relatedTarget: $this[0]})
var showEvent = $.Event('show.bs.tab', {relatedTarget: $previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return
var $target = $(selector)
this.activate($this.closest('li'), $ul)
this.activate($target, $target.parent(), function () {$previous.trigger({type: 'hidden.bs.tab',relatedTarget: $this[0]})
$this.trigger({type: 'shown.bs.tab',relatedTarget: $previous[0]})})}
Tab.prototype.activate = function (element, container, callback) {var $active    = container.find('> .active')
var transition = callback
&& $.support.transition
&& ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)
function next() {$active
.removeClass('active')
.find('> .dropdown-menu > .active')
.removeClass('active')
.end()
.find('[data-toggle="tab"]')
.attr('aria-expanded', false)
element
.addClass('active')
.find('[data-toggle="tab"]')
.attr('aria-expanded', true)
if (transition) {element[0].offsetWidth // reflow for transition
element.addClass('in')} else {element.removeClass('fade')}
if (element.parent('.dropdown-menu').length) {element
.closest('li.dropdown')
.addClass('active')
.end()
.find('[data-toggle="tab"]')
.attr('aria-expanded', true)}
callback && callback()}
$active.length && transition ?$active
.one('bsTransitionEnd', next)
.emulateTransitionEnd(Tab.TRANSITION_DURATION) :next()
$active.removeClass('in')}
function Plugin(option) {return this.each(function () {var $this = $(this)
var data  = $this.data('bs.tab')
if (!data) $this.data('bs.tab', (data = new Tab(this)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.tab
$.fn.tab             = Plugin
$.fn.tab.Constructor = Tab
$.fn.tab.noConflict = function () {$.fn.tab = old
return this}
var clickHandler = function (e) {e.preventDefault()
Plugin.call($(this), 'show')}
$(document)
.on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
.on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)}(jQuery);+function ($) {'use strict';var Affix = function (element, options) {this.options = $.extend({}, Affix.DEFAULTS, options)
this.$target = $(this.options.target)
.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
.on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))
this.$element     = $(element)
this.affixed      = null
this.unpin        = null
this.pinnedOffset = null
this.checkPosition()}
Affix.VERSION  = '3.3.5'
Affix.RESET    = 'affix affix-top affix-bottom'
Affix.DEFAULTS = {offset: 0,target: window}
Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {var scrollTop    = this.$target.scrollTop()
var position     = this.$element.offset()
var targetHeight = this.$target.height()
if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false
if (this.affixed == 'bottom') {if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'}
var initializing   = this.affixed == null
var colliderTop    = initializing ? scrollTop : position.top
var colliderHeight = initializing ? targetHeight : height
if (offsetTop != null && scrollTop <= offsetTop) return 'top'
if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'
return false}
Affix.prototype.getPinnedOffset = function () {if (this.pinnedOffset) return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop = this.$target.scrollTop()
var position  = this.$element.offset()
return (this.pinnedOffset = position.top - scrollTop)}
Affix.prototype.checkPositionWithEventLoop = function () {setTimeout($.proxy(this.checkPosition, this), 1)}
Affix.prototype.checkPosition = function () {if (!this.$element.is(':visible')) return
var height       = this.$element.height()
var offset       = this.options.offset
var offsetTop    = offset.top
var offsetBottom = offset.bottom
var scrollHeight = Math.max($(document).height(), $(document.body).height())
if (typeof offset != 'object')         offsetBottom = offsetTop = offset
if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)
var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)
if (this.affixed != affix) {if (this.unpin != null) this.$element.css('top', '')
var affixType = 'affix' + (affix ? '-' + affix : '')
var e         = $.Event(affixType + '.bs.affix')
this.$element.trigger(e)
if (e.isDefaultPrevented()) return
this.affixed = affix
this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null
this.$element
.removeClass(Affix.RESET)
.addClass(affixType)
.trigger(affixType.replace('affix', 'affixed') + '.bs.affix')}
if (affix == 'bottom') {this.$element.offset({top: scrollHeight - height - offsetBottom})}}
function Plugin(option) {return this.each(function () {var $this   = $(this)
var data    = $this.data('bs.affix')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
if (typeof option == 'string') data[option]()})}
var old = $.fn.affix
$.fn.affix             = Plugin
$.fn.affix.Constructor = Affix
$.fn.affix.noConflict = function () {$.fn.affix = old
return this}
$(window).on('load', function () {$('[data-spy="affix"]').each(function () {var $spy = $(this)
var data = $spy.data()
data.offset = data.offset || {}
if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
if (data.offsetTop    != null) data.offset.top    = data.offsetTop
Plugin.call($spy, data)})})}(jQuery);
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.GPickr=e():t.GPickr=e()}(window,(function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="dist",o(o.s=2)}([function(t,e,o){
/*! Pickr 1.4.5 MIT | https://github.com/Simonwep/pickr */
window,t.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t){t.exports=JSON.parse('{"a":"1.4.5"}')},function(t,e,o){"use strict";o.r(e);var n={};function i(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function r(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?i(o,!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):i(o).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.r(n),o.d(n,"on",(function(){return c})),o.d(n,"off",(function(){return a})),o.d(n,"createElementFromString",(function(){return p})),o.d(n,"removeAttribute",(function(){return u})),o.d(n,"createFromTemplate",(function(){return h})),o.d(n,"eventPath",(function(){return d})),o.d(n,"resolveElement",(function(){return f})),o.d(n,"adjustableInputNumbers",(function(){return m}));const c=l.bind(null,"addEventListener"),a=l.bind(null,"removeEventListener");function l(t,e,o,n,i={}){e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);for(const s of e)for(const e of o)s[t](e,n,r({capture:!1},i));return Array.prototype.slice.call(arguments,1)}function p(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function u(t,e){const o=t.getAttribute(e);return t.removeAttribute(e),o}function h(t){return function t(e,o={}){const n=u(e,":obj"),i=u(e,":ref"),r=n?o[n]={}:o;i&&(o[i]=e);for(const o of Array.from(e.children)){const e=u(o,":arr"),n=t(o,e?{}:r);e&&(r[e]||(r[e]=[])).push(Object.keys(n).length?n:o)}return o}(p(t))}function d(t){let e=t.path||t.composedPath&&t.composedPath();if(e)return e;let o=t.target.parentElement;for(e=[t.target,o];o=o.parentElement;)e.push(o);return e.push(document,window),e}function f(t){return t instanceof Element?t:"string"==typeof t?t.split(/>>/g).reduce((t,e,o,n)=>(t=t.querySelector(e),o<n.length-1?t.shadowRoot:t),document):null}function m(t,e=(t=>t)){function o(o){const n=[.001,.01,.1][Number(o.shiftKey||2*o.ctrlKey)]*(o.deltaY<0?1:-1);let i=0,r=t.selectionStart;t.value=t.value.replace(/[\d.]+/g,(t,o)=>o<=r&&o+t.length>=r?(r=o,e(Number(t),n,i)):(i++,t)),t.focus(),t.setSelectionRange(r,r),o.preventDefault(),t.dispatchEvent(new Event("input"))}c(t,"focus",()=>c(window,"wheel",o,{passive:!1})),c(t,"blur",()=>a(window,"wheel",o))}var g=o(0);const{min:v,max:b,floor:_,round:y}=Math;function w(t,e,o){e/=100,o/=100;const n=_(t=t/360*6),i=t-n,r=o*(1-e),s=o*(1-i*e),c=o*(1-(1-i)*e),a=n%6;return[255*[o,s,r,r,c,o][a],255*[c,o,o,s,r,r][a],255*[r,r,c,o,o,s][a]]}function S(t,e,o){const n=(2-(e/=100))*(o/=100)/2;return 0!==n&&(e=1===n?0:n<.5?e*o/(2*n):e*o/(2-2*n)),[t,100*e,100*n]}function C(t,e,o){let n,i,r;const s=v(t/=255,e/=255,o/=255),c=b(t,e,o),a=c-s;if(0===a)n=i=0;else{i=a/c;const r=((c-t)/6+a/2)/a,s=((c-e)/6+a/2)/a,l=((c-o)/6+a/2)/a;t===c?n=l-s:e===c?n=1/3+r-l:o===c&&(n=2/3+s-r),n<0?n+=1:n>1&&(n-=1)}return[360*n,100*i,100*(r=c)]}function k(t,e,o,n){return e/=100,o/=100,[...C(255*(1-v(1,(t/=100)*(1-(n/=100))+n)),255*(1-v(1,e*(1-n)+n)),255*(1-v(1,o*(1-n)+n)))]}function A(t,e,o){return e/=100,[t,2*(e*=(o/=100)<.5?o:1-o)/(o+e)*100,100*(o+e)]}function O(t){return C(...t.match(/.{2}/g).map(t=>parseInt(t,16)))}function j(t=0,e=0,o=0,n=1){const i=(t,e)=>(o=-1)=>e(~o?t.map(t=>Number(t.toFixed(o))):t),r={h:t,s:e,v:o,a:n,toHSVA(){const t=[r.h,r.s,r.v,r.a];return t.toString=i(t,t=>"hsva(".concat(t[0],", ").concat(t[1],"%, ").concat(t[2],"%, ").concat(r.a,")")),t},toHSLA(){const t=[...S(r.h,r.s,r.v),r.a];return t.toString=i(t,t=>"hsla(".concat(t[0],", ").concat(t[1],"%, ").concat(t[2],"%, ").concat(r.a,")")),t},toRGBA(){const t=[...w(r.h,r.s,r.v),r.a];return t.toString=i(t,t=>"rgba(".concat(t[0],", ").concat(t[1],", ").concat(t[2],", ").concat(r.a,")")),t},toCMYK(){const t=function(t,e,o){const n=w(t,e,o),i=n[0]/255,r=n[1]/255,s=n[2]/255;let c,a,l,p;return[100*(a=1===(c=v(1-i,1-r,1-s))?0:(1-i-c)/(1-c)),100*(l=1===c?0:(1-r-c)/(1-c)),100*(p=1===c?0:(1-s-c)/(1-c)),100*c]}(r.h,r.s,r.v);return t.toString=i(t,t=>"cmyk(".concat(t[0],"%, ").concat(t[1],"%, ").concat(t[2],"%, ").concat(t[3],"%)")),t},toHEXA(){const t=function(t,e,o){return w(t,e,o).map(t=>y(t).toString(16).padStart(2,"0"))}(r.h,r.s,r.v),e=r.a>=1?"":Number((255*r.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return e&&t.push(e),t.toString=()=>"#".concat(t.join("").toUpperCase()),t},clone:()=>j(r.h,r.s,r.v,r.a)};return r}const x=t=>Math.max(Math.min(t,1),0);function P(t){const e={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},t),_keyboard(t){const{type:n,key:i}=t;if(document.activeElement===o.wrapper){const{lock:o}=e.options,r="ArrowUp"===i,s="ArrowRight"===i,c="ArrowDown"===i,a="ArrowLeft"===i;if("keydown"===n&&(r||s||c||a)){let t=0,n=0;"v"===o?t=r||s?1:-1:"h"===o?t=r||s?-1:1:(n=r?-1:c?1:0,t=a?-1:s?1:0),e.update(x(e.cache.x+.01*t),x(e.cache.y+.01*n))}else i.startsWith("Arrow")&&(e.options.onstop(),t.preventDefault())}},_tapstart(t){c(document,["mouseup","touchend","touchcancel"],e._tapstop),c(document,["mousemove","touchmove"],e._tapmove),t.preventDefault(),e._tapmove(t)},_tapmove(t){const{options:{lock:n},cache:i}=e,{element:r,wrapper:s}=o,c=s.getBoundingClientRect();let a=0,l=0;if(t){const e=t&&t.touches&&t.touches[0];a=t?(e||t).clientX:0,l=t?(e||t).clientY:0,a<c.left?a=c.left:a>c.left+c.width&&(a=c.left+c.width),l<c.top?l=c.top:l>c.top+c.height&&(l=c.top+c.height),a-=c.left,l-=c.top}else i&&(a=i.x*c.width,l=i.y*c.height);"h"!==n&&(r.style.left="calc(".concat(a/c.width*100,"% - ").concat(r.offsetWidth/2,"px)")),"v"!==n&&(r.style.top="calc(".concat(l/c.height*100,"% - ").concat(r.offsetHeight/2,"px)")),e.cache={x:a/c.width,y:l/c.height};const p=x(a/s.offsetWidth),u=x(l/s.offsetHeight);switch(n){case"v":return o.onchange(p);case"h":return o.onchange(u);default:return o.onchange(p,u)}},_tapstop(){e.options.onstop(),a(document,["mouseup","touchend","touchcancel"],e._tapstop),a(document,["mousemove","touchmove"],e._tapmove)},trigger(){e._tapmove()},update(t=0,o=0){const{left:n,top:i,width:r,height:s}=e.options.wrapper.getBoundingClientRect();"h"===e.options.lock&&(o=t),e._tapmove({clientX:n+r*t,clientY:i+s*o})},destroy(){const{options:t,_tapstart:o}=e;a([t.wrapper,t.element],"mousedown",o),a([t.wrapper,t.element],"touchstart",o,{passive:!1})}},{options:o,_tapstart:n,_keyboard:i}=e;return c([o.wrapper,o.element],"mousedown",n),c([o.wrapper,o.element],"touchstart",n,{passive:!1}),c(document,["keydown","keyup"],i),e}function L(t={}){t=Object.assign({onchange:()=>0,className:"",elements:[]},t);const e=c(t.elements,"click",e=>{t.elements.forEach(o=>o.classList[e.target===o?"add":"remove"](t.className)),t.onchange(e)});return{destroy:()=>a(...e)}}function E({el:t,reference:e,padding:o=8}){const n={start:"sme",middle:"mse",end:"ems"},i={top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},r=((t={})=>(e,o=t[e])=>{if(o)return o;const[n,i="middle"]=e.split("-"),r="top"===n||"bottom"===n;return t[e]={position:n,variant:i,isVertical:r}})();return{update(s){const{position:c,variant:a,isVertical:l}=r(s),p=e.getBoundingClientRect(),u=t.getBoundingClientRect(),h=t=>t?{t:p.top-u.height-o,b:p.bottom+o}:{r:p.right+o,l:p.left-u.width-o},d=t=>t?{s:p.left+p.width-u.width,m:-u.width/2+(p.left+p.width/2),e:p.left}:{s:p.bottom-u.height,m:p.bottom-p.height/2-u.height/2,e:p.bottom-p.height},f={};function m(e,o,n){const i="top"===n,r=i?u.height:u.width,s=window[i?"innerHeight":"innerWidth"];for(const i of e){const e=o[i],c=f[n]="".concat(e,"px");if(e>0&&e+r<s)return t.style[n]=c,!0}return!1}for(const t of[l,!l]){const e=m(i[c],h(t),t?"top":"left"),o=m(n[a],d(t),t?"left":"top");if(e&&o)return}t.style.left=f.left,t.style.top=f.top}}}var R=({components:t,strings:e,useAsButton:o,inline:n,appClass:i,theme:r,lockOpacity:s})=>{const c=t=>t?"":'style="display:none" hidden',a=h('\n      <div :ref="root" class="pickr">\n\n        '.concat(o?"":'<button type="button" :ref="button" class="pcr-button"></button>','\n\n        <div :ref="app" class="pcr-app ').concat(i||"",'" data-theme="').concat(r,'" ').concat(n?'style="position: unset"':"",' aria-label="color picker dialog" role="window">\n          <div class="pcr-selection" ').concat(c(t.palette),'>\n            <div :obj="preview" class="pcr-color-preview" ').concat(c(t.preview),'>\n              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="use previous color"></button>\n              <div :ref="currentColor" class="pcr-current-color"></div>\n            </div>\n\n            <div :obj="palette" class="pcr-color-palette">\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="color selection area" role="widget"></div>\n            </div>\n\n            <div :obj="hue" class="pcr-color-chooser" ').concat(c(t.hue),'>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="hue selection slider" role="widget"></div>\n            </div>\n\n            <div :obj="opacity" class="pcr-color-opacity" ').concat(c(t.opacity),'>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="opacity selection slider" role="widget"></div>\n            </div>\n          </div>\n\n          <div class="pcr-swatches ').concat(t.palette?"":"pcr-last",'" :ref="swatches"></div> \n\n          <div :obj="interaction" class="pcr-interaction" ').concat(c(Object.keys(t.interaction).length),'>\n            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ').concat(c(t.interaction.input),'>\n\n            <input :arr="options" class="pcr-type" data-type="HEXA" value="').concat(s?"HEX":"HEXA",'" type="button" ').concat(c(t.interaction.hex),'>\n            <input :arr="options" class="pcr-type" data-type="RGBA" value="').concat(s?"RGB":"RGBA",'" type="button" ').concat(c(t.interaction.rgba),'>\n            <input :arr="options" class="pcr-type" data-type="HSLA" value="').concat(s?"HSL":"HSLA",'" type="button" ').concat(c(t.interaction.hsla),'>\n            <input :arr="options" class="pcr-type" data-type="HSVA" value="').concat(s?"HSV":"HSVA",'" type="button" ').concat(c(t.interaction.hsva),'>\n            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ').concat(c(t.interaction.cmyk),'>\n\n            <input :ref="save" class="pcr-save" value="').concat(e.save||"Save",'" type="button" ').concat(c(t.interaction.save),' aria-label="save and exit">\n            <input :ref="cancel" class="pcr-cancel" value="').concat(e.cancel||"Cancel",'" type="button" ').concat(c(t.interaction.cancel),' aria-label="cancel and exit">\n            <input :ref="clear" class="pcr-clear" value="').concat(e.clear||"Clear",'" type="button" ').concat(c(t.interaction.clear),' aria-label="clear and exit">\n          </div>\n        </div>\n      </div>\n    ')),l=a.interaction;return l.options.find(t=>!t.hidden&&!t.classList.add("active")),l.type=()=>l.options.find(t=>t.classList.contains("active")),a};function B(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}class D{constructor(t){B(this,"_initializingActive",!0),B(this,"_recalc",!0),B(this,"_color",j()),B(this,"_lastColor",j()),B(this,"_swatchColors",[]),B(this,"_eventListener",{init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]}),this.options=t=Object.assign({appClass:null,theme:"classic",useAsButton:!1,padding:8,disabled:!1,comparison:!0,closeOnScroll:!1,outputPrecision:0,lockOpacity:!1,autoReposition:!0,container:"body",components:{interaction:{}},strings:{},swatches:null,inline:!1,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:!0,showAlways:!1,closeWithKey:"Escape"},t);const{swatches:e,components:o,theme:n,sliders:i,lockOpacity:r,padding:s}=t;["nano","monolith"].includes(n)&&!i&&(t.sliders="h"),o.interaction||(o.interaction={});const{preview:c,opacity:a,hue:l,palette:p}=o;o.opacity=!r&&a,o.palette=p||c||a||l,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),e&&e.length&&e.forEach(t=>this.addSwatch(t));const{button:u,app:h}=this._root;this._nanopop=E({reference:u,padding:s,el:h}),u.setAttribute("role","button"),u.setAttribute("aria-label","toggle color picker dialog");const d=this;requestAnimationFrame((function e(){if(!h.offsetWidth&&h.parentElement!==t.container)return requestAnimationFrame(e);d.setColor(t.default),d._rePositioningPicker(),t.defaultRepresentation&&(d._representation=t.defaultRepresentation,d.setColorRepresentation(d._representation)),t.showAlways&&d.show(),d._initializingActive=!1,d._emit("init")}))}_preBuild(){const t=this.options;for(const e of["el","container"])t[e]=f(t[e]);this._root=R(t),t.useAsButton&&(this._root.button=t.el),t.container.appendChild(this._root.root)}_finalBuild(){const t=this.options,e=this._root;if(t.container.removeChild(e.root),t.inline){const o=t.el.parentElement;t.el.nextSibling?o.insertBefore(e.app,t.el.nextSibling):o.appendChild(e.app)}else t.container.appendChild(e.app);t.useAsButton?t.inline&&t.el.remove():t.el.parentNode.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),this.hide()}_buildComponents(){const t=this,e=this.options.components,o=(t.options.sliders||"v").repeat(2),[n,i]=o.match(/^[vh]+$/g)?o:[],r=()=>this._color||(this._color=this._lastColor.clone()),s={palette:P({element:t._root.palette.picker,wrapper:t._root.palette.palette,onstop:()=>t._emit("changestop",t),onchange(o,n){if(!e.palette)return;const i=r(),{_root:s,options:c}=t;t._recalc&&(i.s=100*o,i.v=100-100*n,i.v<0&&(i.v=0),t._updateOutput());const a=i.toRGBA().toString(0);this.element.style.background=a,this.wrapper.style.background="\n                        linear-gradient(to top, rgba(0, 0, 0, ".concat(i.a,"), transparent),\n                        linear-gradient(to left, hsla(").concat(i.h,", 100%, 50%, ").concat(i.a,"), rgba(255, 255, 255, ").concat(i.a,"))\n                    "),c.comparison?c.useAsButton||t._lastColor||(s.preview.lastColor.style.color=a):s.button.style.color=a;const l=i.toHEXA().toString();for(const e of t._swatchColors){const{el:t,color:o}=e;t.classList[l===o.toHEXA().toString()?"add":"remove"]("pcr-active")}s.preview.currentColor.style.color=a,t.options.comparison||s.button.classList.remove("clear")}}),hue:P({lock:"v"===i?"h":"v",element:t._root.hue.picker,wrapper:t._root.hue.slider,onstop:()=>t._emit("changestop",t),onchange(o){if(!e.hue||!e.palette)return;const n=r();t._recalc&&(n.h=360*o),this.element.style.backgroundColor="hsl(".concat(n.h,", 100%, 50%)"),s.palette.trigger()}}),opacity:P({lock:"v"===n?"h":"v",element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onstop:()=>t._emit("changestop",t),onchange(o){if(!e.opacity||!e.palette)return;const n=r();t._recalc&&(n.a=Math.round(100*o)/100),this.element.style.background="rgba(0, 0, 0, ".concat(n.a,")"),s.palette.trigger()}}),selectable:L({elements:t._root.interaction.options,className:"active",onchange(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._recalc&&t._updateOutput()}})};this._components=s}_bindEvents(){const{_root:t,options:e}=this,o=[c(t.interaction.clear,"click",()=>this._clearColor()),c([t.interaction.cancel,t.preview.lastColor],"click",()=>{this._emit("cancel",this),this.setHSVA(...(this._lastColor||this._color).toHSVA(),!0)}),c(t.interaction.save,"click",()=>{!this.applyColor()&&!e.showAlways&&this.hide()}),c(t.interaction.result,["keyup","input"],t=>{this.setColor(t.target.value,!0)&&!this._initializingActive&&this._emit("change",this._color),t.stopImmediatePropagation()}),c(t.interaction.result,["focus","blur"],t=>{this._recalc="blur"===t.type,this._recalc&&this._updateOutput()}),c([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],()=>this._recalc=!0)];if(!e.showAlways){const n=e.closeWithKey;o.push(c(t.button,"click",()=>this.isOpen()?this.hide():this.show()),c(document,"keyup",t=>this.isOpen()&&(t.key===n||t.code===n)&&this.hide()),c(document,["touchstart","mousedown"],e=>{this.isOpen()&&!d(e).some(e=>e===t.app||e===t.button)&&this.hide()},{capture:!0}))}if(e.adjustableNumbers){const e={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};m(t.interaction.result,(t,o,n)=>{const i=e[this.getColorRepresentation().toLowerCase()];if(i){const e=i[n],r=t+(e>=100?1e3*o:o);return r<=0?0:Number((r<e?r:e).toPrecision(3))}return t})}if(e.autoReposition&&!e.inline){let t=null;const n=this;o.push(c(window,["scroll","resize"],()=>{n.isOpen()&&(e.closeOnScroll&&n.hide(),null===t?(t=setTimeout(()=>t=null,100),requestAnimationFrame((function e(){n._rePositioningPicker(),null!==t&&requestAnimationFrame(e)}))):(clearTimeout(t),t=setTimeout(()=>t=null,100)))},{capture:!0}))}this._eventBindings=o}_rePositioningPicker(){const{options:t}=this;if(!t.inline){const{app:e}=this._root;matchMedia("(max-width: 576px)").matches?Object.assign(e.style,{margin:"auto",height:"".concat(e.getBoundingClientRect().height,"px"),top:0,bottom:0,left:0,right:0}):(Object.assign(e.style,{margin:null,right:null,top:null,bottom:null,left:null,height:null}),this._nanopop.update(t.position))}}_updateOutput(){const{_root:t,_color:e,options:o}=this;if(t.interaction.type()){const n="to".concat(t.interaction.type().getAttribute("data-type"));t.interaction.result.value="function"==typeof e[n]?e[n]().toString(o.outputPrecision):""}!this._initializingActive&&this._recalc&&this._emit("change",e)}_clearColor(t=!1){const{_root:e,options:o}=this;o.useAsButton||(e.button.style.color="rgba(0, 0, 0, 0.15)"),e.button.classList.add("clear"),o.showAlways||this.hide(),this._lastColor=null,this._initializingActive||t||(this._emit("save",null),this._emit("clear",this))}_parseLocalColor(t){const{values:e,type:o,a:n}=function(t){t=t.match(/^[a-zA-Z]+$/)?function(t){if("black"===t.toLowerCase())return"#000";const e=document.createElement("canvas").getContext("2d");return e.fillStyle=t,"#000"===e.fillStyle?null:e.fillStyle}(t):t;const e={cmyk:/^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,rgba:/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsla:/^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsva:/^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},o=t=>t.map(t=>/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0);let n;t:for(const i in e){if(!(n=e[i].exec(t)))continue;const r=t=>!!n[2]==("number"==typeof t);switch(i){case"cmyk":{const[,t,e,r,s]=o(n);if(t>100||e>100||r>100||s>100)break t;return{values:k(t,e,r,s),type:i}}case"rgba":{const[,,,t,e,s,c]=o(n);if(t>255||e>255||s>255||c<0||c>1||!r(c))break t;return{values:[...C(t,e,s),c],a:c,type:i}}case"hexa":{let[,t]=n;4!==t.length&&3!==t.length||(t=t.split("").map(t=>t+t).join(""));const e=t.substring(0,6);let o=t.substring(6);return o=o?parseInt(o,16)/255:void 0,{values:[...O(e),o],a:o,type:i}}case"hsla":{const[,,,t,e,s,c]=o(n);if(t>360||e>100||s>100||c<0||c>1||!r(c))break t;return{values:[...A(t,e,s),c],a:c,type:i}}case"hsva":{const[,,,t,e,s,c]=o(n);if(t>360||e>100||s>100||c<0||c>1||!r(c))break t;return{values:[t,e,s,c],a:c,type:i}}}}return{values:null,type:null}}(t),{lockOpacity:i}=this.options,r=void 0!==n&&1!==n;return e&&3===e.length&&(e[3]=void 0),{values:!e||i&&r?null:e,type:o}}_emit(t,...e){this._eventListener[t].forEach(t=>t(...e,this))}on(t,e){return"function"==typeof e&&"string"==typeof t&&t in this._eventListener&&this._eventListener[t].push(e),this}off(t,e){const o=this._eventListener[t];if(o){const t=o.indexOf(e);~t&&o.splice(t,1)}return this}addSwatch(t){const{values:e}=this._parseLocalColor(t);if(e){const{_swatchColors:t,_root:o}=this,n=j(...e),i=p('<button type="button" style="color: '.concat(n.toRGBA().toString(0),'" aria-label="color swatch"/>'));return o.swatches.appendChild(i),t.push({el:i,color:n}),this._eventBindings.push(c(i,"click",()=>{this.setHSVA(...n.toHSVA(),!0),this._emit("swatchselect",n),this._emit("change",n)})),!0}return!1}removeSwatch(t){const e=this._swatchColors[t];if(e){const{el:o}=e;return this._root.swatches.removeChild(o),this._swatchColors.splice(t,1),!0}return!1}applyColor(t=!1){const{preview:e,button:o}=this._root,n=this._color.toRGBA().toString(0);return e.lastColor.style.color=n,this.options.useAsButton||(o.style.color=n),o.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this._emit("save",this._color),this}destroy(){this._eventBindings.forEach(t=>a(...t)),Object.keys(this._components).forEach(t=>this._components[t].destroy())}destroyAndRemove(){this.destroy();const{root:t,app:e}=this._root;t.parentElement&&t.parentElement.removeChild(t),e.parentElement.removeChild(e),Object.keys(this).forEach(t=>this[t]=null)}hide(){return this._root.app.classList.remove("visible"),this._emit("hide",this),this}show(){return this.options.disabled||(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this)),this}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(t=360,e=0,o=0,n=1,i=!1){const r=this._recalc;if(this._recalc=!1,t<0||t>360||e<0||e>100||o<0||o>100||n<0||n>1)return!1;this._color=j(t,e,o,n);const{hue:s,opacity:c,palette:a}=this._components;return s.update(t/360),c.update(n),a.update(e/100,1-o/100),i||this.applyColor(),r&&this._updateOutput(),this._recalc=r,!0}setColor(t,e=!1){if(null===t)return this._clearColor(e),!0;const{values:o,type:n}=this._parseLocalColor(t);if(o){const t=n.toUpperCase(),{options:i}=this._root.interaction,r=i.find(e=>e.getAttribute("data-type")===t);if(r&&!r.hidden)for(const t of i)t.classList[t===r?"add":"remove"]("active");return this.setColorRepresentation(t),this.setHSVA(...o,e)}return!1}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find(e=>e.getAttribute("data-type").startsWith(t)&&!e.click())}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}D.utils=n,D.libs={HSVaColor:j,Moveable:P,Nanopop:E,Selectable:L},D.create=t=>new D(t),D.version=g.a,e.default=D}]).default},function(t,e,o){},function(t,e,o){"use strict";o.r(e);o(1);var n=o(0),i=o.n(n),r=()=>n.utils.createFromTemplate(`\n<div class="gpickr" :ref="root">\n\n    <div :ref="pickr"></div>\n    <div :obj="gradient" class="gpcr-interaction">\n    <div :ref="result" class="gpcr-result">\n        \n         <div :ref="mode" data-mode="linear" class="gpcr-mode"></div>\n\n            <div :ref="angle" class="gpcr-angle">\n                <div :ref="arrow"></div>\n            </div>\n\n            <div :ref="pos" class="gpcr-pos">\n                ${["tl","tm","tr","l","m","r","bl","bm","br"].map(t=>`<div data-pos="${t}"></div>`).join("")}\n            </div>\n        </div>\n\n        <div :obj="stops" class="gpcr-stops">\n            <div :ref="preview" class="gpcr-stop-preview"></div>\n            <div :ref="markers" class="gpcr-stop-marker"></div>\n        </div>\n       \n    </div>\n\n</div>\n`),s=t=>{const e=t.touches&&t.touches[0]||t;return{tap:e,x:e.clientX,y:e.clientY,target:e.target}};let c=document.createElement("p");function*a(t,e,o=-1){for(let n;n=e.exec(t);)yield~o?n[o].trim():n.map(t=>t.trim())}function l(t,e,o=-1){const n=t.match(e);return n?~o?n[o]:n:null}function p(t){const e="rgba(0, 0, 0, 0)";if(c.style.color=e,t===e)return t;c.style.color=t;const o=getComputedStyle(c).color;return o===e?null:o}function u(t){if(!(t=function(t){return c.style.backgroundImage=t,getComputedStyle(c).backgroundImage}(t)))return null;const[,e,o]=t.match(/^(\w+)-gradient\((.*)\)$/i)||[];if(!e||!o)return null;const n=[...a(o,/(rgba?\(.*?\)|#?\w+)(.*?)(?=,|$)/gi)],i=[];let r=null,s=null;for(let t=0;t<n.length;t++){const[e,o,c]=n[t],a=p(o),u=c.split(/\s+/g).map(t=>l(t,/^-?(\d*(\.\d+)?)%$/,1)).filter(Boolean).map(Number);if(!u.length&&a)i.push({loc:null,color:a});else if(u.length)for(const t of u)i.push({loc:t,color:a||s});else r||(r=e);s=a||s}i[i.length-1].loc||(i[i.length-1].loc=100);for(let t=0;t<i.length;t++){const e=i[t];if(!e.loc)if(t){let o=2,n=t+1;for(;n<i.length&&!i[n].loc;n++)o++;e.loc=i[t-1].loc+(i[n].loc-i[t-1].loc)/o}else e.loc=0}return{str:t,type:e,modifier:r,stops:i}}var h=t=>{document.body.appendChild(c);const e=u(t);return document.body.removeChild(c),e},d={angleToDegrees(t){const e=t.trim().toLowerCase().match(/^(-?\d*(\.\d+)?)(deg|rad|grad|turn)$/i);if(!e)return null;const o=Number(e[1]);switch(e[3]){case"deg":return o;case"rad":return 180/Math.PI*o;case"grad":return o/400*360;case"turn":return 360*o}return null}};function f(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}const{utils:m}=i.a,{on:g,off:v}=m;class b{constructor(t){f(this,"_stops",[]),f(this,"_angle",0),f(this,"_angles",[{angle:0,name:"to top"},{angle:90,name:"to right"},{angle:180,name:"to bottom"},{angle:270,name:"to left"}]),f(this,"_direction","circle at center"),f(this,"_directions",[{pos:"tl",css:"circle at left top"},{pos:"tm",css:"circle at center top"},{pos:"tr",css:"circle at right top"},{pos:"r",css:"circle at right"},{pos:"m",css:"circle at center"},{pos:"l",css:"circle at left"},{pos:"br",css:"circle at right bottom"},{pos:"bm",css:"circle at center bottom"},{pos:"bl",css:"circle at left bottom"}]),f(this,"_focusedStop",null),f(this,"_mode","linear"),f(this,"_modes",["linear","radial"]),f(this,"_root",null),f(this,"_eventListener",{init:[],change:[]}),t=Object.assign({stops:[["#42445a",0],["#20b6dd",1]]},t),this._root=r(t),CSS.supports("background-image","conic-gradient(#fff, #fff)")&&this._modes.push("conic"),t.el=t.el.split(/>>/g).reduce((t,e,o,n)=>(t=t.querySelector(e),o<n.length-1?t.shadowRoot:t),document),t.el.parentElement.replaceChild(this._root.root,t.el),this._pickr=i.a.create({el:this._root.pickr,theme:"nano",inline:!0,useAsButton:!0,showAlways:!0,defaultRepresentation:"HEXA",components:{palette:!0,preview:!0,opacity:!0,hue:!0,interaction:{input:!0}}}).on("change",t=>{this._focusedStop&&(this._focusedStop.color=t.toRGBA().toString(0),this._render())}).on("init",()=>{for(const[e,o]of t.stops)this.addStop(e,o,!0);this._bindEvents(),this._emit("init",this)})}_bindEvents(){const{gradient:t}=this._root;g(t.mode,["mousedown","touchstart"],t=>{const e=this._modes.indexOf(this._mode)+1;this._mode=this._modes[e===this._modes.length?0:e],this._render(!0),t.stopPropagation()}),g(t.stops.preview,"click",t=>{this.addStop(this._pickr.getColor().toRGBA().toString(),this._resolveColorStopPosition(t.pageX))}),g(t.result,["mousedown","touchstart"],e=>{if(e.preventDefault(),"linear"!==this._mode)return;t.angle.classList.add("gpcr-active");const o=g(window,["mousemove","touchmove"],e=>{const{x:o,y:n}=s(e),i=t.angle.getBoundingClientRect(),r=i.left+i.width/2,c=i.top+i.height/2,a=Math.atan2(o-r,n-c)-Math.PI,l=Math.abs(180*a/Math.PI),p=[1,2,4][Number(e.shiftKey||2*e.ctrlKey)];this.setLinearAngle(l-l%(45/p))}),n=g(window,["mouseup","touchend","touchcancel"],()=>{t.angle.classList.remove("gpcr-active"),v(...o),v(...n)})}),g(t.pos,["mousedown","touchstart"],t=>{const e=t.target.getAttribute("data-pos"),o=this._directions.find(t=>t.pos===e);this.setRadialPosition(o&&o.css||this._direction)})}_render(t=!1){const{stops:{preview:e},result:o,arrow:n,angle:i,pos:r,mode:s}=this._root.gradient,{_stops:c,_mode:a,_angle:l}=this;c.sort((t,e)=>t.loc-e.loc);for(const{color:t,el:e,loc:o}of c)Object.assign(e.style,{left:`${100*o}%`,color:t});n.style.transform=`rotate(${l-90}deg)`,e.style.background=`linear-gradient(to right, ${this.getStops().toString("linear")})`,o.style.background=this.getGradient().toString(),r.style.opacity="radial"===a?"":"0",r.style.visibility="radial"===a?"":"hidden",i.style.opacity="linear"===a?"":"0",i.style.visibility="linear"===a?"":"hidden",s.setAttribute("data-mode",a),!t&&this._emit("change",this)}_resolveColorStopPosition(t){const{markers:e}=this._root.gradient.stops,o=e.getBoundingClientRect();let n=(t-o.left)/o.width;return n<0&&(n=0),n>1&&(n=1),n}addStop(t,e=.5,o=!1){const{markers:n}=this._root.gradient.stops,i=m.createElementFromString('<div class="gpcr-marker"></div>');n.appendChild(i),this._pickr.setColor(t),t=this._pickr.getColor().toRGBA().toString(0);const r={el:i,loc:e,color:t,listener:g(i,["mousedown","touchstart"],t=>{t.preventDefault();const e=n.getBoundingClientRect();this._pickr.setColor(r.color),this._focusedStop=r;let o=!1;const c=g(window,["mousemove","touchmove"],t=>{const{x:n,y:c}=s(t),a=Math.abs(c-e.y);o=a>50&&this._stops.length>2,i.style.opacity=o?"0":"1",o||(r.loc=this._resolveColorStopPosition(n),this._render())}),a=g(window,["mouseup","touchend","touchcancel"],()=>{v(...c),v(...a),o&&(this.removeStop(r),this._render(!0))})})};return this._focusedStop=r,this._stops.push(r),this._render(o),this}removeStop(t){const{_stops:e}=this,o=(()=>"number"==typeof t?e.find(t12=>t12.loc===t):"string"==typeof t?e.find(t=>t.color===t):"object"==typeof t?t:void 0)();e.splice(e.indexOf(o),1),o.el.remove(),v(...o.listener),this._focusedStop===o&&(this._focusedStop=e[0]),this._render()}setGradient(t){const e=h(t);if(!e||e.stops.length<2)return!1;const{type:o,stops:n,modifier:i}=e,r=[...this._stops];if(this._modes.includes(o)){this._mode=o;for(const t of n)this.addStop(t.color,t.loc/100);for(const t of r)this.removeStop(t);return"linear"===o?(this._angle=180,i&&this.setLinearAngle(i)):"radial"===o&&(this._direction="circle at center",i&&this.setRadialPosition(i)),!0}return!1}getGradient(t=this._mode){const e=this.getStops().toString(t);switch(t){case"linear":return`linear-gradient(${this._angle}deg, ${e})`;case"radial":return`radial-gradient(${this._direction}, ${e})`;case"conic":return`conic-gradient(${e})`}}getStops(){const t=this._stops.map(t=>({color:t.color,location:t.loc})),e=this._mode;return t.toString=function(t=e){switch(t){case"linear":case"radial":return this.map(t=>`${t.color} ${100*t.location}%`).join(",");case"conic":return this.map(t=>`${t.color} ${360*t.location}deg`).join(",")}},t}getLinearAngle(){return"linear"===this._mode?this._angle:-1}setLinearAngle(t){return"number"==typeof(t="number"==typeof t?t:d.angleToDegrees(t)||(this._angles.find(e=>e.name===t)||{}).angle)&&(this._angle=t,this._render(),!0)}setRadialPosition(t){const e=this._directions.find(e=>e.css===t);if(!e)return!1;this._direction=e.css;for(const t of Array.from(this._root.gradient.pos.children))t.classList[t.getAttribute("data-pos")===e.pos?"add":"remove"]("gpcr-active");return this._render(),!0}getRadialPosition(){return"radial"===this._mode?this._direction:null}_emit(t,...e){this._eventListener[t].forEach(t=>t(...e,this))}on(t,e){return"function"==typeof e&&"string"==typeof t&&t in this._eventListener&&this._eventListener[t].push(e),this}off(t,e){const o=this._eventListener[t];if(o){const t=o.indexOf(e);~t&&o.splice(t,1)}return this}}b.Pickr=i.a;e.default=b}]).default}));
(function ($, document, window) {var
defaults = {html: false,photo: false,iframe: false,inline: false,transition: "elastic",speed: 300,fadeOut: 300,width: false,initialWidth: "600",innerWidth: false,maxWidth: false,height: false,initialHeight: "450",innerHeight: false,maxHeight: false,scalePhotos: true,scrolling: true,opacity: 0.9,preloading: true,className: false,overlayClose: true,escKey: true,arrowKey: true,top: false,bottom: false,left: false,right: false,fixed: false,data: undefined,closeButton: true,fastIframe: true,open: false,reposition: true,loop: true,slideshow: false,slideshowAuto: true,slideshowSpeed: 2500,slideshowStart: "start slideshow",slideshowStop: "stop slideshow",photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage: false,retinaUrl: false,retinaSuffix: '@2x.$1',current: "image {current} of {total}",previous: "previous",next: "next",close: "close",xhrError: "This content failed to load.",imgError: "This image failed to load.",returnFocus: true,trapFocus: true,onOpen: false,onLoad: false,onComplete: false,onCleanup: false,onClosed: false,rel: function() {return this.rel;},href: function() {return $(this).attr('href');},title: function() {return this.title;},createImg: function() {var img = new Image();var attrs = $(this).data('cbox-img-attrs');if (typeof attrs === 'object') {$.each(attrs, function(key, val){img[key] = val;});}
return img;},createIframe: function() {var iframe = document.createElement('iframe');var attrs = $(this).data('cbox-iframe-attrs');if (typeof attrs === 'object') {$.each(attrs, function(key, val){iframe[key] = val;});}
if ('frameBorder' in iframe) {iframe.frameBorder = 0;}
if ('allowTransparency' in iframe) {iframe.allowTransparency = "true";}
iframe.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
iframe.allowFullscreen = true;return iframe;}},colorbox = 'colorbox',prefix = 'cbox',boxElement = prefix + 'Element',event_open = prefix + '_open',event_load = prefix + '_load',event_complete = prefix + '_complete',event_cleanup = prefix + '_cleanup',event_closed = prefix + '_closed',event_purge = prefix + '_purge',$overlay,$box,$wrap,$content,$topBorder,$leftBorder,$rightBorder,$bottomBorder,$related,$window,$loaded,$loadingBay,$loadingOverlay,$title,$current,$slideshow,$next,$prev,$close,$groupControls,$events = $('<a/>'), // $({}) would be prefered, but there is an issue with jQuery 1.4.2
settings,interfaceHeight,interfaceWidth,loadedHeight,loadedWidth,index,photo,open,active,closing,loadingTimer,publicMethod,div = "div",requests = 0,previousCSS = {},init;function $tag(tag, id, css) {var element = document.createElement(tag);if (id) {element.id = prefix + id;}
if (css) {element.style.cssText = css;}
return $(element);}
function winheight() {return window.innerHeight ? window.innerHeight : $(window).height();}
function Settings(element, options) {if (options !== Object(options)) {options = {};}
this.cache = {};this.el = element;this.value = function(key) {var dataAttr;if (this.cache[key] === undefined) {dataAttr = $(this.el).attr('data-cbox-'+key);if (dataAttr !== undefined) {this.cache[key] = dataAttr;} else if (options[key] !== undefined) {this.cache[key] = options[key];} else if (defaults[key] !== undefined) {this.cache[key] = defaults[key];}}
return this.cache[key];};this.get = function(key) {var value = this.value(key);return $.isFunction(value) ? value.call(this.el, this) : value;};}
function getIndex(increment) {var
max = $related.length,newIndex = (index + increment) % max;return (newIndex < 0) ? max + newIndex : newIndex;}
function setSize(size, dimension) {return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));}
function isImage(settings, url) {return settings.get('photo') || settings.get('photoRegex').test(url);}
function retinaUrl(settings, url) {return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;}
function trapFocus(e) {if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {e.stopPropagation();$box.focus();}}
function setClass(str) {if (setClass.str !== str) {$box.add($overlay).removeClass(setClass.str).addClass(str);setClass.str = str;}}
function getRelated(rel) {index = 0;if (rel && rel !== false && rel !== 'nofollow') {$related = $('.' + boxElement).filter(function () {var options = $.data(this, colorbox);var settings = new Settings(this, options);return (settings.get('rel') === rel);});index = $related.index(settings.el);if (index === -1) {$related = $related.add(settings.el);index = $related.length - 1;}} else {$related = $(settings.el);}}
function trigger(event) {$(document).trigger(event);$events.triggerHandler(event);}
var slideshow = (function(){var active,className = prefix + "Slideshow_",click = "click." + prefix,timeOut;function clear () {clearTimeout(timeOut);}
function set() {if (settings.get('loop') || $related[index + 1]) {clear();timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));}}
function start() {$slideshow
.html(settings.get('slideshowStop'))
.unbind(click)
.one(click, stop);$events
.bind(event_complete, set)
.bind(event_load, clear);$box.removeClass(className + "off").addClass(className + "on");}
function stop() {clear();$events
.unbind(event_complete, set)
.unbind(event_load, clear);$slideshow
.html(settings.get('slideshowStart'))
.unbind(click)
.one(click, function () {publicMethod.next();start();});$box.removeClass(className + "on").addClass(className + "off");}
function reset() {active = false;$slideshow.hide();clear();$events
.unbind(event_complete, set)
.unbind(event_load, clear);$box.removeClass(className + "off " + className + "on");}
return function(){if (active) {if (!settings.get('slideshow')) {$events.unbind(event_cleanup, reset);reset();}} else {if (settings.get('slideshow') && $related[1]) {active = true;$events.one(event_cleanup, reset);if (settings.get('slideshowAuto')) {start();} else {stop();}
$slideshow.show();}}};}());function launch(element) {var options;if (!closing) {options = $(element).data(colorbox);settings = new Settings(element, options);getRelated(settings.get('rel'));if (!open) {open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
setClass(settings.get('className'));$box.css({visibility:'hidden', display:'block', opacity:''});$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');$content.css({width:'', height:''}).append($loaded);interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();loadedHeight = $loaded.outerHeight(true);loadedWidth = $loaded.outerWidth(true);var initialWidth = setSize(settings.get('initialWidth'), 'x');var initialHeight = setSize(settings.get('initialHeight'), 'y');var maxWidth = settings.get('maxWidth');var maxHeight = settings.get('maxHeight');settings.w = Math.max((maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth, 0);settings.h = Math.max((maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight, 0);$loaded.css({width:'', height:settings.h});publicMethod.position();trigger(event_open);settings.get('onOpen');$groupControls.add($title).hide();$box.focus();if (settings.get('trapFocus')) {if (document.addEventListener) {document.addEventListener('focus', trapFocus, true);$events.one(event_closed, function () {document.removeEventListener('focus', trapFocus, true);});}}
if (settings.get('returnFocus')) {$events.one(event_closed, function () {$(settings.el).focus();});}}
var opacity = parseFloat(settings.get('opacity'));$overlay.css({opacity: opacity === opacity ? opacity : '',cursor: settings.get('overlayClose') ? 'pointer' : '',visibility: 'visible'}).show();if (settings.get('closeButton')) {$close.html(settings.get('close')).appendTo($content);} else {$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
}
load();}}
function appendHTML() {if (!$box) {init = false;$window = $(window);$box = $tag(div).attr({id: colorbox,'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
role: 'dialog',tabindex: '-1'}).hide();$overlay = $tag(div, "Overlay").hide();$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);$wrap = $tag(div, "Wrapper");$content = $tag(div, "Content").append($title = $tag(div, "Title"),$current = $tag(div, "Current"),$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),$next = $('<button type="button"/>').attr({id:prefix+'Next'}),$slideshow = $tag('button', "Slideshow"),$loadingOverlay);$close = $('<button type="button"/>').attr({id:prefix+'Close'});$wrap.append( // The 3x3 Grid that makes up Colorbox
$tag(div).append($tag(div, "TopLeft"),$topBorder = $tag(div, "TopCenter"),$tag(div, "TopRight")),$tag(div, false, 'clear:left').append($leftBorder = $tag(div, "MiddleLeft"),$content,$rightBorder = $tag(div, "MiddleRight")),$tag(div, false, 'clear:left').append($tag(div, "BottomLeft"),$bottomBorder = $tag(div, "BottomCenter"),$tag(div, "BottomRight"))).find('div div').css({'float': 'left'});$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');$groupControls = $next.add($prev).add($current).add($slideshow);}
if (document.body && !$box.parent().length) {$(document.body).append($overlay, $box.append($wrap, $loadingBay));}}
function addBindings() {function clickHandler(e) {if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {e.preventDefault();launch(this);}}
if ($box) {if (!init) {init = true;$next.click(function () {publicMethod.next();});$prev.click(function () {publicMethod.prev();});$close.click(function () {publicMethod.close();});$overlay.click(function () {if (settings.get('overlayClose')) {publicMethod.close();}});$(document).bind('keydown.' + prefix, function (e) {var key = e.keyCode;if (open && settings.get('escKey') && key === 27) {e.preventDefault();publicMethod.close();}
if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {if (key === 37) {e.preventDefault();$prev.click();} else if (key === 39) {e.preventDefault();$next.click();}}});if ($.isFunction($.fn.on)) {$(document).on('click.'+prefix, '.'+boxElement, clickHandler);} else {$('.'+boxElement).live('click.'+prefix, clickHandler);}}
return true;}
return false;}
if ($[colorbox]) {return;}
$(appendHTML);publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {var settings;var $obj = this;options = options || {};if ($.isFunction($obj)) { // assume a call to $.colorbox
$obj = $('<a/>');options.open = true;}
if (!$obj[0]) { // colorbox being applied to empty collection
return $obj;}
appendHTML();if (addBindings()) {if (callback) {options.onComplete = callback;}
$obj.each(function () {var old = $.data(this, colorbox) || {};$.data(this, colorbox, $.extend(old, options));}).addClass(boxElement);settings = new Settings($obj[0], options);if (settings.get('open')) {launch($obj[0]);}}
return $obj;};publicMethod.position = function (speed, loadedCallback) {var
css,top = 0,left = 0,offset = $box.offset(),scrollTop,scrollLeft;$window.unbind('resize.' + prefix);$box.css({top: -9e4, left: -9e4});scrollTop = $window.scrollTop();scrollLeft = $window.scrollLeft();if (settings.get('fixed')) {offset.top -= scrollTop;offset.left -= scrollLeft;$box.css({position: 'fixed'});} else {top = scrollTop;left = scrollLeft;$box.css({position: 'absolute'});}
if (settings.get('right') !== false) {left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);} else if (settings.get('left') !== false) {left += setSize(settings.get('left'), 'x');} else {left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);}
if (settings.get('bottom') !== false) {top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);} else if (settings.get('top') !== false) {top += setSize(settings.get('top'), 'y');} else {top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);}
$box.css({top: offset.top, left: offset.left, visibility:'visible'});$wrap[0].style.width = $wrap[0].style.height = "9999px";function modalDimensions() {$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';}
css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};if (speed) {var tempSpeed = 0;$.each(css, function(i){if (css[i] !== previousCSS[i]) {tempSpeed = speed;return;}});speed = tempSpeed;}
previousCSS = css;if (!speed) {$box.css(css);}
$box.dequeue().animate(css, {duration: speed || 0,complete: function () {modalDimensions();active = false;$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";if (settings.get('reposition')) {setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
$window.bind('resize.' + prefix, publicMethod.position);}, 1);}
if ($.isFunction(loadedCallback)) {loadedCallback();}},step: modalDimensions});};publicMethod.resize = function (options) {var scrolltop;if (open) {options = options || {};if (options.width) {settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;}
if (options.innerWidth) {settings.w = setSize(options.innerWidth, 'x');}
$loaded.css({width: settings.w});if (options.height) {settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;}
if (options.innerHeight) {settings.h = setSize(options.innerHeight, 'y');}
if (!options.innerHeight && !options.height) {scrolltop = $loaded.scrollTop();$loaded.css({height: "auto"});settings.h = $loaded.height();}
$loaded.css({height: settings.h});if(scrolltop) {$loaded.scrollTop(scrolltop);}
publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));}};publicMethod.prep = function (object) {if (!open) {return;}
var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');$loaded.remove();$loaded = $tag(div, 'LoadedContent').append(object);function getWidth() {settings.w = settings.w || $loaded.width();settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;return settings.w;}
function getHeight() {settings.h = settings.h || $loaded.height();settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;return settings.h;}
$loaded.hide()
.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
.prependTo($content);$loadingBay.hide();$(photo).css({'float': 'none'});setClass(settings.get('className'));callback = function () {var total = $related.length,iframe,complete;if (!open) {return;}
function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
if ($.support.opacity === false) {$box[0].style.removeAttribute('filter');}}
complete = function () {clearTimeout(loadingTimer);$loadingOverlay.hide();trigger(event_complete);settings.get('onComplete');};$title.html(settings.get('title')).show();$loaded.show();if (total > 1) { // handle grouping
if (typeof settings.get('current') === "string") {$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();}
$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));slideshow();if (settings.get('preloading')) {$.each([getIndex(-1), getIndex(1)], function(){var img,i = $related[this],settings = new Settings(i, $.data(i, colorbox)),src = settings.get('href');if (src && isImage(settings, src)) {src = retinaUrl(settings, src);img = document.createElement('img');img.src = src;}});}} else {$groupControls.hide();}
if (settings.get('iframe')) {iframe = settings.get('createIframe');if (!settings.get('scrolling')) {iframe.scrolling = "no";}
$(iframe)
.attr({src: settings.get('href'),'class': prefix + 'Iframe'})
.one('load', complete)
.appendTo($loaded);$events.one(event_purge, function () {iframe.src = "//about:blank";});if (settings.get('fastIframe')) {$(iframe).trigger('load');}} else {complete();}
if (settings.get('transition') === 'fade') {$box.fadeTo(speed, 1, removeFilter);} else {removeFilter();}};if (settings.get('transition') === 'fade') {$box.fadeTo(speed, 0, function () {publicMethod.position(0, callback);});} else {publicMethod.position(speed, callback);}};function load () {var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;active = true;photo = false;trigger(event_purge);trigger(event_load);settings.get('onLoad');settings.h = settings.get('height') ?setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');settings.w = settings.get('width') ?setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');settings.mw = settings.w;settings.mh = settings.h;if (settings.get('maxWidth')) {settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;}
if (settings.get('maxHeight')) {settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;}
href = settings.get('href');loadingTimer = setTimeout(function () {$loadingOverlay.show();}, 100);if (settings.get('inline')) {var $target = $(href);$inline = $('<div>').hide().insertBefore($target);$events.one(event_purge, function () {$inline.replaceWith($target);});prep($target);} else if (settings.get('iframe')) {prep(" ");} else if (settings.get('html')) {prep(settings.get('html'));} else if (isImage(settings, href)) {href = retinaUrl(settings, href);photo = settings.get('createImg');$(photo)
.addClass(prefix + 'Photo')
.bind('error.'+prefix,function () {prep($tag(div, 'Error').html(settings.get('imgError')));})
.one('load', function () {if (request !== requests) {return;}
setTimeout(function(){var percent;if (settings.get('retinaImage') && window.devicePixelRatio > 1) {photo.height = photo.height / window.devicePixelRatio;photo.width = photo.width / window.devicePixelRatio;}
if (settings.get('scalePhotos')) {setResize = function () {photo.height -= photo.height * percent;photo.width -= photo.width * percent;};if (settings.mw && photo.width > settings.mw) {percent = (photo.width - settings.mw) / photo.width;setResize();}
if (settings.mh && photo.height > settings.mh) {percent = (photo.height - settings.mh) / photo.height;setResize();}}
if (settings.h) {photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';}
if ($related[1] && (settings.get('loop') || $related[index + 1])) {photo.style.cursor = 'pointer';$(photo).bind('click.'+prefix, function () {publicMethod.next();});}
photo.style.width = photo.width + 'px';photo.style.height = photo.height + 'px';prep(photo);}, 1);});photo.src = href;} else if (href) {$loadingBay.load(href, settings.get('data'), function (data, status) {if (request === requests) {prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());}});}}
publicMethod.next = function () {if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {index = getIndex(1);launch($related[index]);}};publicMethod.prev = function () {if (!active && $related[1] && (settings.get('loop') || index)) {index = getIndex(-1);launch($related[index]);}};publicMethod.close = function () {if (open && !closing) {closing = true;open = false;trigger(event_cleanup);settings.get('onCleanup');$window.unbind('.' + prefix);$overlay.fadeTo(settings.get('fadeOut') || 0, 0);$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {$box.hide();$overlay.hide();trigger(event_purge);$loaded.remove();setTimeout(function () {closing = false;trigger(event_closed);settings.get('onClosed');}, 1);});}};publicMethod.remove = function () {if (!$box) { return; }
$box.stop();$[colorbox].close();$box.stop(false, true).remove();$overlay.remove();closing = false;$box = null;$('.' + boxElement)
.removeData(colorbox)
.removeClass(boxElement);$(document).unbind('click.'+prefix).unbind('keydown.'+prefix);};publicMethod.element = function () {return $(settings.el);};publicMethod.settings = defaults;}(jQuery, document, window));
/**
 * bootbox.js 5.4.0
 *
 * http://bootboxjs.com/license.txt
 */
!function(t,e){'use strict';'function'==typeof define&&define.amd?define(['jquery'],e):'object'==typeof exports?module.exports=e(require('jquery')):t.bootbox=e(t.jQuery)}(this,function e(p,u){'use strict';var r,n,i,l;Object.keys||(Object.keys=(r=Object.prototype.hasOwnProperty,n=!{toString:null}.propertyIsEnumerable('toString'),l=(i=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor']).length,function(t){if('function'!=typeof t&&('object'!=typeof t||null===t))throw new TypeError('Object.keys called on non-object');var e,o,a=[];for(e in t)r.call(t,e)&&a.push(e);if(n)for(o=0;o<l;o++)r.call(t,i[o])&&a.push(i[o]);return a}));var d={};d.VERSION='5.0.0';var b={en:{OK:'OK',CANCEL:'Cancel',CONFIRM:'OK'}},f={dialog:"<div class=\"bootbox modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-body\"><div class=\"bootbox-body\"></div></div></div></div></div>",header:"<div class=\"modal-header\"><h5 class=\"modal-title\"></h5></div>",footer:'<div class="modal-footer"></div>',closeButton:'<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',form:'<form class="bootbox-form"></form>',button:'<button type="button" class="btn"></button>',option:'<option></option>',promptMessage:'<div class="bootbox-prompt-message"></div>',inputs:{text:'<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',textarea:'<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',email:'<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',select:'<select class="bootbox-input bootbox-input-select form-control"></select>',checkbox:'<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',radio:'<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',date:'<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',time:'<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',number:'<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',password:'<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',range:'<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'}},m={locale:'en',backdrop:'static',animate:!0,className:null,closeButton:!0,show:!0,container:'body',value:'',inputType:'text',swapButtonOrder:!1,centerVertical:!1,multiple:!1,scrollable:!1};function c(t,e,o){return p.extend(!0,{},t,function(t,e){var o=t.length,a={};if(o<1||2<o)throw new Error('Invalid argument length');return 2===o||'string'==typeof t[0]?(a[e[0]]=t[0],a[e[1]]=t[1]):a=t[0],a}(e,o))}function h(t,e,o,a){var r;a&&a[0]&&(r=a[0].locale||m.locale,(a[0].swapButtonOrder||m.swapButtonOrder)&&(e=e.reverse()));var n,i,l,s={className:'bootbox-'+t,buttons:function(t,e){for(var o={},a=0,r=t.length;a<r;a++){var n=t[a],i=n.toLowerCase(),l=n.toUpperCase();o[i]={label:(s=l,c=e,p=b[c],p?p[s]:b.en[s])}}var s,c,p;return o}(e,r)};return n=c(s,a,o),l={},v(i=e,function(t,e){l[e]=!0}),v(n.buttons,function(t){if(l[t]===u)throw new Error('button key "'+t+'" is not allowed (options are '+i.join(' ')+')')}),n}function w(t){return Object.keys(t).length}function v(t,o){var a=0;p.each(t,function(t,e){o(t,e,a++)})}function g(t){t.data.dialog.find('.bootbox-accept').first().trigger('focus')}function y(t){t.target===t.data.dialog[0]&&t.data.dialog.remove()}function x(t){t.target===t.data.dialog[0]&&(t.data.dialog.off('escape.close.bb'),t.data.dialog.off('click'))}function k(t,e,o){t.stopPropagation(),t.preventDefault(),p.isFunction(o)&&!1===o.call(e,t)||e.modal('hide')}function E(t){return/([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(t)}function O(t){return/(\d{4})-(\d{2})-(\d{2})/.test(t)}return d.locales=function(t){return t?b[t]:b},d.addLocale=function(t,o){return p.each(['OK','CANCEL','CONFIRM'],function(t,e){if(!o[e])throw new Error('Please supply a translation for "'+e+'"')}),b[t]={OK:o.OK,CANCEL:o.CANCEL,CONFIRM:o.CONFIRM},d},d.removeLocale=function(t){if('en'===t)throw new Error('"en" is used as the default and fallback locale and cannot be removed.');return delete b[t],d},d.setLocale=function(t){return d.setDefaults('locale',t)},d.setDefaults=function(){var t={};return 2===arguments.length?t[arguments[0]]=arguments[1]:t=arguments[0],p.extend(m,t),d},d.hideAll=function(){return p('.bootbox').modal('hide'),d},d.init=function(t){return e(t||p)},d.dialog=function(t){if(p.fn.modal===u)throw new Error("\"$.fn.modal\" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/4.4/getting-started/javascript/ for more details.");if(t=function(r){var n,i;if('object'!=typeof r)throw new Error('Please supply an object of options');if(!r.message)throw new Error('"message" option must not be null or an empty string.');(r=p.extend({},m,r)).buttons||(r.buttons={});return n=r.buttons,i=w(n),v(n,function(t,e,o){if(p.isFunction(e)&&(e=n[t]={callback:e}),'object'!==p.type(e))throw new Error('button with key "'+t+'" must be an object');if(e.label||(e.label=t),!e.className){var a=!1;a=r.swapButtonOrder?0===o:o===i-1,e.className=i<=2&&a?'btn-primary':'btn-secondary btn-default'}}),r}(t),p.fn.modal.Constructor.VERSION){t.fullBootstrapVersion=p.fn.modal.Constructor.VERSION;var e=t.fullBootstrapVersion.indexOf('.');t.bootstrap=t.fullBootstrapVersion.substring(0,e)}else t.bootstrap='2',t.fullBootstrapVersion='2.3.2',console.warn('Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible.');var o=p(f.dialog),a=o.find('.modal-dialog'),r=o.find('.modal-body'),n=p(f.header),i=p(f.footer),l=t.buttons,s={onEscape:t.onEscape};if(r.find('.bootbox-body').html(t.message),0<w(t.buttons)&&(v(l,function(t,e){var o=p(f.button);switch(o.data('bb-handler',t),o.addClass(e.className),t){case'ok':case'confirm':o.addClass('bootbox-accept');break;case'cancel':o.addClass('bootbox-cancel')}o.html(e.label),i.append(o),s[t]=e.callback}),r.after(i)),!0===t.animate&&o.addClass('fade'),t.className&&o.addClass(t.className),t.size)switch(t.fullBootstrapVersion.substring(0,3)<'3.1'&&console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using '+t.fullBootstrapVersion+'. Please upgrade to use this option.'),t.size){case'small':case'sm':a.addClass('modal-sm');break;case'large':case'lg':a.addClass('modal-lg');break;case'extra-large':case'xl':a.addClass('modal-xl'),t.fullBootstrapVersion.substring(0,3)<'4.2'&&console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using '+t.fullBootstrapVersion+'. Please upgrade to use this option.')}if(t.scrollable&&(a.addClass('modal-dialog-scrollable'),t.fullBootstrapVersion.substring(0,3)<'4.3'&&console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using '+t.fullBootstrapVersion+'. Please upgrade to use this option.')),t.title&&(r.before(n),o.find('.modal-title').html(t.title)),t.closeButton){var c=p(f.closeButton);t.title?3<t.bootstrap?o.find('.modal-header').append(c):o.find('.modal-header').prepend(c):c.prependTo(r)}if(t.centerVertical&&(a.addClass('modal-dialog-centered'),t.fullBootstrapVersion<'4.0.0'&&console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using '+t.fullBootstrapVersion+'. Please upgrade to use this option.')),o.one('hide.bs.modal',{dialog:o},x),t.onHide){if(!p.isFunction(t.onHide))throw new Error('Argument supplied to "onHide" must be a function');o.on('hide.bs.modal',t.onHide)}if(o.one('hidden.bs.modal',{dialog:o},y),t.onHidden){if(!p.isFunction(t.onHidden))throw new Error('Argument supplied to "onHidden" must be a function');o.on('hidden.bs.modal',t.onHidden)}if(t.onShow){if(!p.isFunction(t.onShow))throw new Error('Argument supplied to "onShow" must be a function');o.on('show.bs.modal',t.onShow)}if(o.one('shown.bs.modal',{dialog:o},g),t.onShown){if(!p.isFunction(t.onShown))throw new Error('Argument supplied to "onShown" must be a function');o.on('shown.bs.modal',t.onShown)}return'static'!==t.backdrop&&o.on('click.dismiss.bs.modal',function(t){o.children('.modal-backdrop').length&&(t.currentTarget=o.children('.modal-backdrop').get(0)),t.target===t.currentTarget&&o.trigger('escape.close.bb')}),o.on('escape.close.bb',function(t){s.onEscape&&k(t,o,s.onEscape)}),o.on('click','.modal-footer button:not(.disabled)',function(t){var e=p(this).data('bb-handler');e!==u&&k(t,o,s[e])}),o.on('click','.bootbox-close-button',function(t){k(t,o,s.onEscape)}),o.on('keyup',function(t){27===t.which&&o.trigger('escape.close.bb')}),p(t.container).append(o),o.modal({backdrop:!!t.backdrop&&'static',keyboard:!1,show:!1}),t.show&&o.modal('show'),o},d.alert=function(){var t;if((t=h('alert',['ok'],['message','callback'],arguments)).callback&&!p.isFunction(t.callback))throw new Error('alert requires the "callback" property to be a function when provided');return t.buttons.ok.callback=t.onEscape=function(){return!p.isFunction(t.callback)||t.callback.call(this)},d.dialog(t)},d.confirm=function(){var t;if(t=h('confirm',['cancel','confirm'],['message','callback'],arguments),!p.isFunction(t.callback))throw new Error('confirm requires a callback');return t.buttons.cancel.callback=t.onEscape=function(){return t.callback.call(this,!1)},t.buttons.confirm.callback=function(){return t.callback.call(this,!0)},d.dialog(t)},d.prompt=function(){var r,e,t,n,o,a;if(t=p(f.form),(r=h('prompt',['cancel','confirm'],['title','callback'],arguments)).value||(r.value=m.value),r.inputType||(r.inputType=m.inputType),o=r.show===u?m.show:r.show,r.show=!1,r.buttons.cancel.callback=r.onEscape=function(){return r.callback.call(this,null)},r.buttons.confirm.callback=function(){var t;if('checkbox'===r.inputType)t=n.find('input:checked').map(function(){return p(this).val()}).get();else if('radio'===r.inputType)t=n.find('input:checked').val();else{if(n[0].checkValidity&&!n[0].checkValidity())return!1;t='select'===r.inputType&&!0===r.multiple?n.find('option:selected').map(function(){return p(this).val()}).get():n.val()}return r.callback.call(this,t)},!r.title)throw new Error('prompt requires a title');if(!p.isFunction(r.callback))throw new Error('prompt requires a callback');if(!f.inputs[r.inputType])throw new Error('Invalid prompt type');switch(n=p(f.inputs[r.inputType]),r.inputType){case'text':case'textarea':case'email':case'password':n.val(r.value),r.placeholder&&n.attr('placeholder',r.placeholder),r.pattern&&n.attr('pattern',r.pattern),r.maxlength&&n.attr('maxlength',r.maxlength),r.required&&n.prop({required:!0}),r.rows&&!isNaN(parseInt(r.rows))&&'textarea'===r.inputType&&n.attr({rows:r.rows});break;case'date':case'time':case'number':case'range':if(n.val(r.value),r.placeholder&&n.attr('placeholder',r.placeholder),r.pattern&&n.attr('pattern',r.pattern),r.required&&n.prop({required:!0}),'date'!==r.inputType&&r.step){if(!('any'===r.step||!isNaN(r.step)&&0<parseFloat(r.step)))throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');n.attr('step',r.step)}!function(t,e,o){var a=!1,r=!0,n=!0;if('date'===t)e===u||(r=O(e))?o===u||(n=O(o))||console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.'):console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');else if('time'===t){if(e!==u&&!(r=E(e)))throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');if(o!==u&&!(n=E(o)))throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.')}else{if(e!==u&&isNaN(e))throw r=!1,new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');if(o!==u&&isNaN(o))throw n=!1,new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.')}if(r&&n){if(o<=e)throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');a=!0}return a}(r.inputType,r.min,r.max)||(r.min!==u&&n.attr('min',r.min),r.max!==u&&n.attr('max',r.max));break;case'select':var i={};if(a=r.inputOptions||[],!p.isArray(a))throw new Error('Please pass an array of input options');if(!a.length)throw new Error('prompt with "inputType" set to "select" requires at least one option');r.placeholder&&n.attr('placeholder',r.placeholder),r.required&&n.prop({required:!0}),r.multiple&&n.prop({multiple:!0}),v(a,function(t,e){var o=n;if(e.value===u||e.text===u)throw new Error('each option needs a "value" property and a "text" property');e.group&&(i[e.group]||(i[e.group]=p('<optgroup />').attr('label',e.group)),o=i[e.group]);var a=p(f.option);a.attr('value',e.value).text(e.text),o.append(a)}),v(i,function(t,e){n.append(e)}),n.val(r.value);break;case'checkbox':var l=p.isArray(r.value)?r.value:[r.value];if(!(a=r.inputOptions||[]).length)throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');n=p('<div class="bootbox-checkbox-list"></div>'),v(a,function(t,o){if(o.value===u||o.text===u)throw new Error('each option needs a "value" property and a "text" property');var a=p(f.inputs[r.inputType]);a.find('input').attr('value',o.value),a.find('label').append('\n'+o.text),v(l,function(t,e){e===o.value&&a.find('input').prop('checked',!0)}),n.append(a)});break;case'radio':if(r.value!==u&&p.isArray(r.value))throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');if(!(a=r.inputOptions||[]).length)throw new Error('prompt with "inputType" set to "radio" requires at least one option');n=p('<div class="bootbox-radiobutton-list"></div>');var s=!0;v(a,function(t,e){if(e.value===u||e.text===u)throw new Error('each option needs a "value" property and a "text" property');var o=p(f.inputs[r.inputType]);o.find('input').attr('value',e.value),o.find('label').append('\n'+e.text),r.value!==u&&e.value===r.value&&(o.find('input').prop('checked',!0),s=!1),n.append(o)}),s&&n.find('input[type="radio"]').first().prop('checked',!0)}if(t.append(n),t.on('submit',function(t){t.preventDefault(),t.stopPropagation(),e.find('.bootbox-accept').trigger('click')}),''!==p.trim(r.message)){var c=p(f.promptMessage).html(r.message);t.prepend(c),r.message=t}else r.message=t;return(e=d.dialog(r)).off('shown.bs.modal',g),e.on('shown.bs.modal',function(){n.focus()}),!0===o&&e.modal('show'),e},d});
(function($){$.gritter = {};$.gritter.options = {position: '',class_name: '', // could be set to 'gritter-light' to use white notifications
fade_in_speed: 'medium', // how fast notifications fade in
fade_out_speed: 1000, // how fast the notices fade out
time: 6000 // hang on the screen for...
}
$.gritter.add = function(params){try {return Gritter.add(params || {});} catch(e) {var err = 'Gritter Error: ' + e;(typeof(console) != 'undefined' && console.error) ?console.error(err, params) :alert(err);}}
$.gritter.remove = function(id, params){Gritter.removeSpecific(id, params || {});}
$.gritter.removeAll = function(params){Gritter.stop(params || {});}
var Gritter = {position: '',fade_in_speed: '',fade_out_speed: '',time: '',_custom_timer: 0,_item_count: 0,_is_setup: 0,_tpl_close: '<div class="gritter-close"></div>',_tpl_title: '<span class="gritter-title">[[title]]</span>',_tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap: '<div id="gritter-notice-wrapper"></div>',add: function(params){if(typeof(params) == 'string'){params = {text:params};}
if(params.text === null){throw 'You must supply "text" parameter.';}
if(!this._is_setup){this._runSetup();}
var title = params.title,text = params.text,image = params.image || '',sticky = params.sticky || false,item_class = params.class_name || $.gritter.options.class_name,position = $.gritter.options.position,time_alive = params.time || '';this._verifyWrapper();this._item_count++;var number = this._item_count,tmp = this._tpl_item;$(['before_open', 'after_open', 'before_close', 'after_close']).each(function(i, val){Gritter['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){}});this._custom_timer = 0;if(time_alive){this._custom_timer = time_alive;}
var image_str = (image != '') ? '<img src="' + image + '" class="gritter-image" />' : '',class_name = (image != '') ? 'gritter-with-image' : 'gritter-without-image';if(title){title = this._str_replace('[[title]]',title,this._tpl_title);}else{title = '';}
tmp = this._str_replace(['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],[title, text, this._tpl_close, image_str, this._item_count, class_name, item_class], tmp);if(this['_before_open_' + number]() === false){return false;}
$('#gritter-notice-wrapper').addClass(position).append(tmp);var item = $('#gritter-item-' + this._item_count);item.fadeIn(this.fade_in_speed, function(){Gritter['_after_open_' + number]($(this));});if(!sticky){this._setFadeTimer(item, number);}
$(item).bind('mouseenter mouseleave', function(event){if(event.type == 'mouseenter'){if(!sticky){Gritter._restoreItemIfFading($(this), number);}}
else {if(!sticky){Gritter._setFadeTimer($(this), number);}}
Gritter._hoverState($(this), event.type);});$(item).find('.gritter-close').click(function(){Gritter.removeSpecific(number, {}, null, true);});return number;},_countRemoveWrapper: function(unique_id, e, manual_close){e.remove();this['_after_close_' + unique_id](e, manual_close);if($('.gritter-item-wrapper').length == 0){$('#gritter-notice-wrapper').remove();}},_fade: function(e, unique_id, params, unbind_events){var params = params || {},fade = (typeof(params.fade) != 'undefined') ? params.fade : true,fade_out_speed = params.speed || this.fade_out_speed,manual_close = unbind_events;this['_before_close_' + unique_id](e, manual_close);if(unbind_events){e.unbind('mouseenter mouseleave');}
if(fade){e.animate({opacity: 0}, fade_out_speed, function(){e.animate({ height: 0 }, 300, function(){Gritter._countRemoveWrapper(unique_id, e, manual_close);})})}
else {this._countRemoveWrapper(unique_id, e);}},_hoverState: function(e, type){if(type == 'mouseenter'){e.addClass('hover');e.find('.gritter-close').show();}
else {e.removeClass('hover');e.find('.gritter-close').hide();}},removeSpecific: function(unique_id, params, e, unbind_events){if(!e){var e = $('#gritter-item-' + unique_id);}
this._fade(e, unique_id, params || {}, unbind_events);},_restoreItemIfFading: function(e, unique_id){clearTimeout(this['_int_id_' + unique_id]);e.stop().css({ opacity: '', height: '' });},_runSetup: function(){for(opt in $.gritter.options){this[opt] = $.gritter.options[opt];}
this._is_setup = 1;},_setFadeTimer: function(e, unique_id){var timer_str = (this._custom_timer) ? this._custom_timer : this.time;this['_int_id_' + unique_id] = setTimeout(function(){Gritter._fade(e, unique_id);}, timer_str);},stop: function(params){var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};var wrap = $('#gritter-notice-wrapper');before_close(wrap);wrap.fadeOut(function(){$(this).remove();after_close();});},_str_replace: function(search, replace, subject, count){var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,f = [].concat(search),r = [].concat(replace),s = subject,ra = r instanceof Array, sa = s instanceof Array;s = [].concat(s);if(count){this.window[count] = 0;}
for(i = 0, sl = s.length; i < sl; i++){if(s[i] === ''){continue;}
for (j = 0, fl = f.length; j < fl; j++){temp = s[i] + '';repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];s[i] = (temp).split(f[j]).join(repl);if(count && s[i] !== temp){this.window[count] += (temp.length-s[i].length) / f[j].length;}}}
return sa ? s : s[0];},_verifyWrapper: function(){if($('#gritter-notice-wrapper').length == 0){$('body').append(this._tpl_wrap);}}}})(jQuery);
(function (global, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'module'], factory);} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {factory(exports, module);} else {var mod = {exports: {}};factory(mod.exports, mod);global.autosize = mod.exports;}})(this, function (exports, module) {'use strict';var set = typeof Set === 'function' ? new Set() : (function () {var list = [];return {has: function has(key) {return Boolean(list.indexOf(key) > -1);},add: function add(key) {list.push(key);},'delete': function _delete(key) {list.splice(list.indexOf(key), 1);} };})();function assign(ta) {var _ref = arguments[1] === undefined ? {} : arguments[1];var _ref$setOverflowX = _ref.setOverflowX;var setOverflowX = _ref$setOverflowX === undefined ? true : _ref$setOverflowX;var _ref$setOverflowY = _ref.setOverflowY;var setOverflowY = _ref$setOverflowY === undefined ? true : _ref$setOverflowY;if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || set.has(ta)) return;var heightOffset = null;var overflowY = null;var clientWidth = ta.clientWidth;function init() {var style = window.getComputedStyle(ta, null);overflowY = style.overflowY;if (style.resize === 'vertical') {ta.style.resize = 'none';} else if (style.resize === 'both') {ta.style.resize = 'horizontal';}
if (style.boxSizing === 'content-box') {heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));} else {heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);}
if (isNaN(heightOffset)) {heightOffset = 0;}
update();}
function changeOverflow(value) {{var width = ta.style.width;ta.style.width = '0px';ta.offsetWidth;ta.style.width = width;}
overflowY = value;if (setOverflowY) {ta.style.overflowY = value;}
resize();}
function resize() {var htmlTop = window.pageYOffset;var bodyTop = document.body.scrollTop;var originalHeight = ta.style.height;ta.style.height = 'auto';var endHeight = ta.scrollHeight + heightOffset;if (ta.scrollHeight === 0) {ta.style.height = originalHeight;return;}
ta.style.height = endHeight + 'px';clientWidth = ta.clientWidth;document.documentElement.scrollTop = htmlTop;document.body.scrollTop = bodyTop;}
function update() {var startHeight = ta.style.height;resize();var style = window.getComputedStyle(ta, null);if (style.height !== ta.style.height) {if (overflowY !== 'visible') {changeOverflow('visible');}} else {if (overflowY !== 'hidden') {changeOverflow('hidden');}}
if (startHeight !== ta.style.height) {var evt = document.createEvent('Event');evt.initEvent('autosize:resized', true, false);ta.dispatchEvent(evt);}}
var pageResize = function pageResize() {if (ta.clientWidth !== clientWidth) {update();}};var destroy = (function (style) {window.removeEventListener('resize', pageResize);ta.removeEventListener('input', update);ta.removeEventListener('keyup', update);ta.removeEventListener('autosize:destroy', destroy);set['delete'](ta);Object.keys(style).forEach(function (key) {ta.style[key] = style[key];});}).bind(ta, {height: ta.style.height,resize: ta.style.resize,overflowY: ta.style.overflowY,overflowX: ta.style.overflowX,wordWrap: ta.style.wordWrap });ta.addEventListener('autosize:destroy', destroy);if ('onpropertychange' in ta && 'oninput' in ta) {ta.addEventListener('keyup', update);}
window.addEventListener('resize', pageResize);ta.addEventListener('input', update);ta.addEventListener('autosize:update', update);set.add(ta);if (setOverflowX) {ta.style.overflowX = 'hidden';ta.style.wordWrap = 'break-word';}
init();}
function destroy(ta) {if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;var evt = document.createEvent('Event');evt.initEvent('autosize:destroy', true, false);ta.dispatchEvent(evt);}
function update(ta) {if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;var evt = document.createEvent('Event');evt.initEvent('autosize:update', true, false);ta.dispatchEvent(evt);}
var autosize = null;if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {autosize = function (el) {return el;};autosize.destroy = function (el) {return el;};autosize.update = function (el) {return el;};} else {autosize = function (el, options) {if (el) {Array.prototype.forEach.call(el.length ? el : [el], function (x) {return assign(x, options);});}
return el;};autosize.destroy = function (el) {if (el) {Array.prototype.forEach.call(el.length ? el : [el], destroy);}
return el;};autosize.update = function (el) {if (el) {Array.prototype.forEach.call(el.length ? el : [el], update);}
return el;};}
module.exports = autosize;});
/*!
 * Bootstrap Confirmation
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * Copyright 2014-2016 Damien "Mistic" Sorel <http://www.strangeplanet.fr>
 * Licensed under the Apache License, Version 2.0 (the "License")
 */

(function ($) {
  'use strict';

  // Confirmation extends popover.js
  if (!$.fn.popover) throw new Error('Confirmation requires popover.js');

  // CONFIRMATION PUBLIC CLASS DEFINITION
  // ===============================
  var Confirmation = function (element, options) {
    options.trigger = 'click';

    this.init('confirmation', element, options);

    // keep trace of selectors
    this.options._isDelegate = false;
    if (options.selector) { // container of buttons
      this.options._selector = this._options._selector = options._root_selector +' '+ options.selector;
    }
    else if (options._selector) { // children of container
      this.options._selector = options._selector;
      this.options._isDelegate = true;
    }
    else { // standalone
      this.options._selector = options._root_selector;
    }

    var that = this;

    if (!this.options.selector) {
      // store copied attributes
      this.options._attributes = {};
      if (this.options.copyAttributes) {
        if (typeof this.options.copyAttributes === 'string') {
          this.options.copyAttributes = this.options.copyAttributes.split(' ');
        }
      }
      else {
        this.options.copyAttributes = [];
      }

      this.options.copyAttributes.forEach(function(attr) {
        this.options._attributes[attr] = this.$element.attr(attr);
      }, this);

      // cancel original event
      this.$element.on(that.options.trigger, function(e, ack) {
        if (!ack) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      });

      // manage singleton
      this.$element.on('show.bs.confirmation', function(e) {

		//Add backdrop
		$('<div class="backdropManaul"></div>').appendTo('body');
		$('.backdropManaul').click(function() {
			$(this).remove();
		});
	
        if (that.options.singleton) {
          // close all other popover already initialized
          $(that.options._selector).not($(this)).filter(function() {
            return $(this).data('bs.confirmation') !== undefined;
          }).confirmation('hide');
        }
      });
    }

    if (!this.options._isDelegate) {
      // manage popout
      this.eventBody = false;
      this.uid = this.$element[0].id || this.getUID('group_');

      this.$element.on('shown.bs.confirmation', function(e) {
        if (that.options.popout && !that.eventBody) {
          var $this = $(this);
          that.eventBody = $('body').on('click.bs.confirmation.'+that.uid, function(e) {
            if ($(that.options._selector).is(e.target)) {
              return;
            }

            // close all popover already initialized
            $(that.options._selector).filter(function() {
              return $(this).data('bs.confirmation') !== undefined;
            }).confirmation('hide');

			$('.backdropManaul').remove();

            $('body').off('click.bs.'+that.uid);
            that.eventBody = false;
          });
        }
      });
    }
  };

  Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
    placement: 'top',
    title: 'Are you sure?',
    html: true,
    popout: false,
    singleton: false,
    copyAttributes: 'href target',
    onConfirm: $.noop,
    onCancel: $.noop,
    btnOkClass: 'btn-xs btn-primary',
    btnOkIcon: 'glyphicon glyphicon-ok',
    btnOkLabel: 'Yes',
    btnCancelClass: 'btn-xs btn-default',
    btnCancelIcon: 'glyphicon glyphicon-remove',
    btnCancelLabel: 'No',
    template:
      '<div class="popover confirmation">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content text-center">'+
          '<div class="btn-group">'+
            '<a class="btn" data-apply="confirmation"></a>'+
            '<a class="btn" data-dismiss="confirmation"></a>'+
          '</div>'+
        '</div>'+
      '</div>'
  });

  Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

  Confirmation.prototype.constructor = Confirmation;

  Confirmation.prototype.getDefaults = function () {
    return Confirmation.DEFAULTS;
  };

  Confirmation.prototype.setContent = function () {
    var that = this,
        $tip = this.tip(),
        o = this.options;

    $tip.find('.popover-title')[o.html ? 'html' : 'text'](this.getTitle());

    // configure 'ok' button
    $tip.find('[data-apply="confirmation"]')
      .addClass(o.btnOkClass)
      .html(o.btnOkLabel)
      .attr(this.options._attributes)
      .prepend($('<i></i>').addClass(o.btnOkIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnConfirm.call(that).call(that.$element);
        that.$element.trigger('confirmed.bs.confirmation');
        that.$element.trigger(that.options.trigger, [true]);
        that.$element.confirmation('hide');
      });

    // configure 'cancel' button
    $tip.find('[data-dismiss="confirmation"]')
      .addClass(o.btnCancelClass)
      .html(o.btnCancelLabel)
      .prepend($('<i></i>').addClass(o.btnCancelIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnCancel.call(that).call(that.$element);
        if (that.inState) that.inState.click = false; // Bootstrap 3.3.5
        that.$element.trigger('canceled.bs.confirmation');
        that.$element.confirmation('hide');
      });

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) {
      $tip.find('.popover-title').hide();
    }
  };

  Confirmation.prototype.getOnConfirm = function() {
  	$('.backdropManaul').remove();

    if (this.$element.attr('data-on-confirm')) {
      return getFunctionFromString(this.$element.attr('data-on-confirm'));
    }
    else {
      return this.options.onConfirm;
    }
  };

  Confirmation.prototype.getOnCancel = function() {
  	$('.backdropManaul').remove();

    if (this.$element.attr('data-on-cancel')) {
      return getFunctionFromString(this.$element.attr('data-on-cancel'));
    }
    else {
      return this.options.onCancel;
    }
  };

  /*
   * Generates an anonymous function from a function name
   * function name may contain dots (.) to navigate through objects
   * root context is window
   */
  function getFunctionFromString(functionName) {
    var context = window,
        namespaces = functionName.split('.'),
        func = namespaces.pop();

    for (var i=0, l=namespaces.length; i<l; i++) {
      context = context[namespaces[i]];
    }

    return function() {
      context[func].call(this);
    };
  }


  // CONFIRMATION PLUGIN DEFINITION
  // =========================

  var old = $.fn.confirmation;

  $.fn.confirmation = function (option) {
    var options = (typeof option == 'object' && option) || {};
    options._root_selector = this.selector;

    return this.each(function () {
      var $this = $(this),
          data  = $this.data('bs.confirmation');

      if (!data && option == 'destroy') {
        return;
      }
      if (!data) {
        $this.data('bs.confirmation', (data = new Confirmation(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();
        
        if (option == 'hide' && data.inState) { //data.inState doesn't exist in Bootstrap < 3.3.5
          data.inState.click = false;
        }
      }
    });
  };

  $.fn.confirmation.Constructor = Confirmation;


  // CONFIRMATION NO CONFLICT
  // ===================

  $.fn.confirmation.noConflict = function () {
    $.fn.confirmation = old;
    return this;
  };

}(jQuery));
/*! jQuery Validation Plugin - v1.19.2 - 5/23/2020 https://jqueryvalidation.org/ Copyright (c) 2020 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!(c.settings.submitHandler&&!c.settings.debug)||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0],k="undefined"!=typeof this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=j&&(!j.form&&k&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}});var b=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};a.extend(a.expr.pseudos||a.expr[":"],{blank:function(c){return!b(""+a(c).val())},filled:function(c){var d=a(c).val();return null!==d&&!!b(""+d)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");if(!this.form&&c&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name")),d===this.form){var e=a.data(this.form,"validator"),f="on"+b.type.replace(/^validate/,""),g=e.settings;g[f]&&!a(this).is(g.ignore)&&g[f].call(e,this,b)}}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.currentForm,e=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){e[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name"),e="undefined"!=typeof a(this).attr("contenteditable")&&"false"!==a(this).attr("contenteditable");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=a(this).closest("form")[0],this.name=d),this.form===b.currentForm&&(!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0))})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type,g="undefined"!=typeof e.attr("contenteditable")&&"false"!==e.attr("contenteditable");return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=g?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);"function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f&&(j=f.call(b,j),delete g.normalizer);for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),""===d&&(d=!0),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:void 0!==b&&null!==b&&b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)},date:function(){var a=!1;return function(b,c){return a||(a=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(c)||!/Invalid|NaN/.test(new Date(b).toString())}}(),dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var c,d={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,c){var e=a.port;"abort"===a.mode&&(d[e]&&d[e].abort(),d[e]=c)}):(c=a.ajax,a.ajax=function(b){var e=("mode"in b?b:a.ajaxSettings).mode,f=("port"in b?b:a.ajaxSettings).port;return"abort"===e?(d[f]&&d[f].abort(),d[f]=c.apply(this,arguments),d[f]):c.apply(this,arguments)}),a});
(function($, undefined){function UTCDate(){return new Date(Date.UTC.apply(Date, arguments));}
function UTCToday(){var today = new Date();return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());}
function isUTCEquals(date1, date2) {return (date1.getUTCFullYear() === date2.getUTCFullYear() &&date1.getUTCMonth() === date2.getUTCMonth() &&date1.getUTCDate() === date2.getUTCDate());}
function alias(method){return function(){return this[method].apply(this, arguments);};}
var DateArray = (function(){var extras = {get: function(i){return this.slice(i)[0];},contains: function(d){var val = d && d.valueOf();for (var i=0, l=this.length; i < l; i++)
if (this[i].valueOf() === val)
return i;return -1;},remove: function(i){this.splice(i,1);},replace: function(new_array){if (!new_array)
return;if (!$.isArray(new_array))
new_array = [new_array];this.clear();this.push.apply(this, new_array);},clear: function(){this.length = 0;},copy: function(){var a = new DateArray();a.replace(this);return a;}};return function(){var a = [];a.push.apply(a, arguments);$.extend(a, extras);return a;};})();var Datepicker = function(element, options){this._process_options(options);this.dates = new DateArray();this.viewDate = this.o.defaultViewDate;this.focusDate = null;this.element = $(element);this.isInline = false;this.isInput = this.element.is('input');this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;this.hasInput = this.component && this.element.find('input').length;if (this.component && this.component.length === 0)
this.component = false;this.picker = $(DPGlobal.template);this._buildEvents();this._attachEvents();if (this.isInline){this.picker.addClass('datepicker-inline').appendTo(this.element);}
else {this.picker.addClass('datepicker-dropdown dropdown-menu');}
if (this.o.rtl){this.picker.addClass('datepicker-rtl');}
this.viewMode = this.o.startView;if (this.o.calendarWeeks)
this.picker.find('tfoot .today, tfoot .clear')
.attr('colspan', function(i, val){return parseInt(val) + 1;});this._allow_update = false;this.setStartDate(this._o.startDate);this.setEndDate(this._o.endDate);this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);this.setDatesDisabled(this.o.datesDisabled);this.fillDow();this.fillMonths();this._allow_update = true;this.update();this.showMode();if (this.isInline){this.show();}};Datepicker.prototype = {constructor: Datepicker,_process_options: function(opts){this._o = $.extend({}, this._o, opts);var o = this.o = $.extend({}, this._o);var lang = o.language;if (!dates[lang]){lang = lang.split('-')[0];if (!dates[lang])
lang = defaults.language;}
o.language = lang;switch (o.startView){case 2:case 'decade':o.startView = 2;break;case 1:case 'year':o.startView = 1;break;default:o.startView = 0;}
switch (o.minViewMode){case 1:case 'months':o.minViewMode = 1;break;case 2:case 'years':o.minViewMode = 2;break;default:o.minViewMode = 0;}
o.startView = Math.max(o.startView, o.minViewMode);if (o.multidate !== true){o.multidate = Number(o.multidate) || false;if (o.multidate !== false)
o.multidate = Math.max(0, o.multidate);}
o.multidateSeparator = String(o.multidateSeparator);o.weekStart %= 7;o.weekEnd = ((o.weekStart + 6) % 7);var format = DPGlobal.parseFormat(o.format);if (o.startDate !== -Infinity){if (!!o.startDate){if (o.startDate instanceof Date)
o.startDate = this._local_to_utc(this._zero_time(o.startDate));else
o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);}
else {o.startDate = -Infinity;}}
if (o.endDate !== Infinity){if (!!o.endDate){if (o.endDate instanceof Date)
o.endDate = this._local_to_utc(this._zero_time(o.endDate));else
o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);}
else {o.endDate = Infinity;}}
o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];if (!$.isArray(o.daysOfWeekDisabled))
o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){return parseInt(d, 10);});o.datesDisabled = o.datesDisabled||[];if (!$.isArray(o.datesDisabled)) {var datesDisabled = [];datesDisabled.push(DPGlobal.parseDate(o.datesDisabled, format, o.language));o.datesDisabled = datesDisabled;}
o.datesDisabled = $.map(o.datesDisabled,function(d){return DPGlobal.parseDate(d, format, o.language);});var plc = String(o.orientation).toLowerCase().split(/\s+/g),_plc = o.orientation.toLowerCase();plc = $.grep(plc, function(word){return /^auto|left|right|top|bottom$/.test(word);});o.orientation = {x: 'auto', y: 'auto'};if (!_plc || _plc === 'auto')
; // no action
else if (plc.length === 1){switch (plc[0]){case 'top':case 'bottom':o.orientation.y = plc[0];break;case 'left':case 'right':o.orientation.x = plc[0];break;}}
else {_plc = $.grep(plc, function(word){return /^left|right$/.test(word);});o.orientation.x = _plc[0] || 'auto';_plc = $.grep(plc, function(word){return /^top|bottom$/.test(word);});o.orientation.y = _plc[0] || 'auto';}
if (o.defaultViewDate) {var year = o.defaultViewDate.year || new Date().getFullYear();var month = o.defaultViewDate.month || 0;var day = o.defaultViewDate.day || 1;o.defaultViewDate = UTCDate(year, month, day);} else {o.defaultViewDate = UTCToday();}
o.showOnFocus = o.showOnFocus !== undefined ? o.showOnFocus : true;},_events: [],_secondaryEvents: [],_applyEvents: function(evs){for (var i=0, el, ch, ev; i < evs.length; i++){el = evs[i][0];if (evs[i].length === 2){ch = undefined;ev = evs[i][1];}
else if (evs[i].length === 3){ch = evs[i][1];ev = evs[i][2];}
el.on(ev, ch);}},_unapplyEvents: function(evs){for (var i=0, el, ev, ch; i < evs.length; i++){el = evs[i][0];if (evs[i].length === 2){ch = undefined;ev = evs[i][1];}
else if (evs[i].length === 3){ch = evs[i][1];ev = evs[i][2];}
el.off(ev, ch);}},_buildEvents: function(){var events = {keyup: $.proxy(function(e){if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
this.update();}, this),keydown: $.proxy(this.keydown, this)};if (this.o.showOnFocus === true) {events.focus = $.proxy(this.show, this);}
if (this.isInput) { // single input
this._events = [[this.element, events]];}
else if (this.component && this.hasInput) { // component: input + button
this._events = [[this.element.find('input'), events],[this.component, {click: $.proxy(this.show, this)}]];}
else if (this.element.is('div')){  // inline datepicker
this.isInline = true;}
else {this._events = [[this.element, {click: $.proxy(this.show, this)}]];}
this._events.push([this.element, '*', {blur: $.proxy(function(e){this._focused_from = e.target;}, this)}],[this.element, {blur: $.proxy(function(e){this._focused_from = e.target;}, this)}]);this._secondaryEvents = [[this.picker, {click: $.proxy(this.click, this)}],[$(window), {resize: $.proxy(this.place, this)}],[$(document), {'mousedown touchstart': $.proxy(function(e){if (!(this.element.is(e.target) ||this.element.find(e.target).length ||this.picker.is(e.target) ||this.picker.find(e.target).length)){this.hide();}}, this)}]];},_attachEvents: function(){this._detachEvents();this._applyEvents(this._events);},_detachEvents: function(){this._unapplyEvents(this._events);},_attachSecondaryEvents: function(){this._detachSecondaryEvents();this._applyEvents(this._secondaryEvents);},_detachSecondaryEvents: function(){this._unapplyEvents(this._secondaryEvents);},_trigger: function(event, altdate){var date = altdate || this.dates.get(-1),local_date = this._utc_to_local(date);this.element.trigger({type: event,date: local_date,dates: $.map(this.dates, this._utc_to_local),format: $.proxy(function(ix, format){if (arguments.length === 0){ix = this.dates.length - 1;format = this.o.format;}
else if (typeof ix === 'string'){format = ix;ix = this.dates.length - 1;}
format = format || this.o.format;var date = this.dates.get(ix);return DPGlobal.formatDate(date, format, this.o.language);}, this)});},show: function(){if (this.element.attr('readonly') && this.o.enableOnReadonly === false)
return;if (!this.isInline)
this.picker.appendTo(this.o.container);this.place();this.picker.show();this._attachSecondaryEvents();this._trigger('show');if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {$(this.element).blur();}
return this;},hide: function(){if (this.isInline)
return this;if (!this.picker.is(':visible'))
return this;this.focusDate = null;this.picker.hide().detach();this._detachSecondaryEvents();this.viewMode = this.o.startView;this.showMode();if (this.o.forceParse &&(this.isInput && this.element.val() ||this.hasInput && this.element.find('input').val()))
this.setValue();this._trigger('hide');return this;},remove: function(){this.hide();this._detachEvents();this._detachSecondaryEvents();this.picker.remove();delete this.element.data().datepicker;if (!this.isInput){delete this.element.data().date;}
return this;},_utc_to_local: function(utc){return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));},_local_to_utc: function(local){return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));},_zero_time: function(local){return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());},_zero_utc_time: function(utc){return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));},getDates: function(){return $.map(this.dates, this._utc_to_local);},getUTCDates: function(){return $.map(this.dates, function(d){return new Date(d);});},getDate: function(){return this._utc_to_local(this.getUTCDate());},getUTCDate: function(){var selected_date = this.dates.get(-1);if (typeof selected_date !== 'undefined') {return new Date(selected_date);} else {return null;}},clearDates: function(){var element;if (this.isInput) {element = this.element;} else if (this.component) {element = this.element.find('input');}
if (element) {element.val('').change();}
this.update();this._trigger('changeDate');if (this.o.autoclose) {this.hide();}},setDates: function(){var args = $.isArray(arguments[0]) ? arguments[0] : arguments;this.update.apply(this, args);this._trigger('changeDate');this.setValue();return this;},setUTCDates: function(){var args = $.isArray(arguments[0]) ? arguments[0] : arguments;this.update.apply(this, $.map(args, this._utc_to_local));this._trigger('changeDate');this.setValue();return this;},setDate: alias('setDates'),setUTCDate: alias('setUTCDates'),setValue: function(){var formatted = this.getFormattedDate();if (!this.isInput){if (this.component){this.element.find('input').val(formatted).change();}}
else {this.element.val(formatted).change();}
return this;},getFormattedDate: function(format){if (format === undefined)
format = this.o.format;var lang = this.o.language;return $.map(this.dates, function(d){return DPGlobal.formatDate(d, format, lang);}).join(this.o.multidateSeparator);},setStartDate: function(startDate){this._process_options({startDate: startDate});this.update();this.updateNavArrows();return this;},setEndDate: function(endDate){this._process_options({endDate: endDate});this.update();this.updateNavArrows();return this;},setDaysOfWeekDisabled: function(daysOfWeekDisabled){this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});this.update();this.updateNavArrows();return this;},setDatesDisabled: function(datesDisabled){this._process_options({datesDisabled: datesDisabled});this.update();this.updateNavArrows();},place: function(){if (this.isInline)
return this;var calendarWidth = this.picker.outerWidth(),calendarHeight = this.picker.outerHeight(),visualPadding = 10,windowWidth = $(this.o.container).width(),windowHeight = $(this.o.container).height(),scrollTop = $(this.o.container).scrollTop(),appendOffset = $(this.o.container).offset();var parentsZindex = [];this.element.parents().each(function(){var itemZIndex = $(this).css('z-index');if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));});var zIndex = Math.max.apply(Math, parentsZindex) + 10;var offset = this.component ? this.component.parent().offset() : this.element.offset();var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);var left = offset.left - appendOffset.left,top = offset.top - appendOffset.top;this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom '+'datepicker-orient-right datepicker-orient-left');if (this.o.orientation.x !== 'auto'){this.picker.addClass('datepicker-orient-' + this.o.orientation.x);if (this.o.orientation.x === 'right')
left -= calendarWidth - width;}
else {if (offset.left < 0) {this.picker.addClass('datepicker-orient-left');left -= offset.left - visualPadding;} else if (left + calendarWidth > windowWidth) {this.picker.addClass('datepicker-orient-right');left = offset.left + width - calendarWidth;} else {this.picker.addClass('datepicker-orient-left');}}
var yorient = this.o.orientation.y,top_overflow, bottom_overflow;if (yorient === 'auto'){top_overflow = -scrollTop + top - calendarHeight;bottom_overflow = scrollTop + windowHeight - (top + height + calendarHeight);if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
yorient = 'top';else
yorient = 'bottom';}
this.picker.addClass('datepicker-orient-' + yorient);if (yorient === 'top')
top += height;else
top -= calendarHeight + parseInt(this.picker.css('padding-top'));if (this.o.rtl) {var right = windowWidth - (left + width);this.picker.css({top: top,right: right,zIndex: zIndex});} else {this.picker.css({top: top,left: left,zIndex: zIndex});}
return this;},_allow_update: true,update: function(){if (!this._allow_update)
return this;var oldDates = this.dates.copy(),dates = [],fromArgs = false;if (arguments.length){$.each(arguments, $.proxy(function(i, date){if (date instanceof Date)
date = this._local_to_utc(date);dates.push(date);}, this));fromArgs = true;}
else {dates = this.isInput
? this.element.val()
: this.element.data('date') || this.element.find('input').val();if (dates && this.o.multidate)
dates = dates.split(this.o.multidateSeparator);else
dates = [dates];delete this.element.data().date;}
dates = $.map(dates, $.proxy(function(date){return DPGlobal.parseDate(date, this.o.format, this.o.language);}, this));dates = $.grep(dates, $.proxy(function(date){return (date < this.o.startDate ||date > this.o.endDate ||!date);}, this), true);this.dates.replace(dates);if (this.dates.length)
this.viewDate = new Date(this.dates.get(-1));else if (this.viewDate < this.o.startDate)
this.viewDate = new Date(this.o.startDate);else if (this.viewDate > this.o.endDate)
this.viewDate = new Date(this.o.endDate);if (fromArgs){this.setValue();}
else if (dates.length){if (String(oldDates) !== String(this.dates))
this._trigger('changeDate');}
if (!this.dates.length && oldDates.length)
this._trigger('clearDate');this.fill();return this;},fillDow: function(){var dowCnt = this.o.weekStart,html = '<tr>';if (this.o.calendarWeeks){this.picker.find('.datepicker-days thead tr:first-child .datepicker-switch')
.attr('colspan', function(i, val){return parseInt(val) + 1;});var cell = '<th class="cw">&#160;</th>';html += cell;}
while (dowCnt < this.o.weekStart + 7){html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';}
html += '</tr>';this.picker.find('.datepicker-days thead').append(html);},fillMonths: function(){var html = '',i = 0;while (i < 12){html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';}
this.picker.find('.datepicker-months td').html(html);},setRange: function(range){if (!range || !range.length)
delete this.range;else
this.range = $.map(range, function(d){return d.valueOf();});this.fill();},getClassNames: function(date){var cls = [],year = this.viewDate.getUTCFullYear(),month = this.viewDate.getUTCMonth(),today = new Date();if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){cls.push('old');}
else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){cls.push('new');}
if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
cls.push('focused');if (this.o.todayHighlight &&date.getUTCFullYear() === today.getFullYear() &&date.getUTCMonth() === today.getMonth() &&date.getUTCDate() === today.getDate()){cls.push('today');}
if (this.dates.contains(date) !== -1)
cls.push('active');if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){cls.push('disabled');}
if (this.o.datesDisabled.length > 0 &&$.grep(this.o.datesDisabled, function(d){return isUTCEquals(date, d); }).length > 0) {cls.push('disabled', 'disabled-date');}
if (this.range){if (date > this.range[0] && date < this.range[this.range.length-1]){cls.push('range');}
if ($.inArray(date.valueOf(), this.range) !== -1){cls.push('selected');}}
return cls;},fill: function(){var d = new Date(this.viewDate),year = d.getUTCFullYear(),month = d.getUTCMonth(),startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,todaytxt = dates[this.o.language].today || dates['en'].today || '',cleartxt = dates[this.o.language].clear || dates['en'].clear || '',tooltip;if (isNaN(year) || isNaN(month))
return;this.picker.find('.datepicker-days thead .datepicker-switch')
.text(dates[this.o.language].months[month]+' '+year);this.picker.find('tfoot .today')
.text(todaytxt)
.toggle(this.o.todayBtn !== false);this.picker.find('tfoot .clear')
.text(cleartxt)
.toggle(this.o.clearBtn !== false);this.updateNavArrows();this.fillMonths();var prevMonth = UTCDate(year, month-1, 28),day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());prevMonth.setUTCDate(day);prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);var nextMonth = new Date(prevMonth);nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);nextMonth = nextMonth.valueOf();var html = [];var clsName;while (prevMonth.valueOf() < nextMonth){if (prevMonth.getUTCDay() === this.o.weekStart){html.push('<tr>');if (this.o.calendarWeeks){var
ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),calWeek =  (th - yth) / 864e5 / 7 + 1;html.push('<td class="cw">'+ calWeek +'</td>');}}
clsName = this.getClassNames(prevMonth);clsName.push('day');if (this.o.beforeShowDay !== $.noop){var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));if (before === undefined)
before = {};else if (typeof(before) === 'boolean')
before = {enabled: before};else if (typeof(before) === 'string')
before = {classes: before};if (before.enabled === false)
clsName.push('disabled');if (before.classes)
clsName = clsName.concat(before.classes.split(/\s+/));if (before.tooltip)
tooltip = before.tooltip;}
clsName = $.unique(clsName);html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');tooltip = null;if (prevMonth.getUTCDay() === this.o.weekEnd){html.push('</tr>');}
prevMonth.setUTCDate(prevMonth.getUTCDate()+1);}
this.picker.find('.datepicker-days tbody').empty().append(html.join(''));var months = this.picker.find('.datepicker-months')
.find('th:eq(1)')
.text(year)
.end()
.find('span').removeClass('active');$.each(this.dates, function(i, d){if (d.getUTCFullYear() === year)
months.eq(d.getUTCMonth()).addClass('active');});if (year < startYear || year > endYear){months.addClass('disabled');}
if (year === startYear){months.slice(0, startMonth).addClass('disabled');}
if (year === endYear){months.slice(endMonth+1).addClass('disabled');}
if (this.o.beforeShowMonth !== $.noop){var that = this;$.each(months, function(i, month){if (!$(month).hasClass('disabled')) {var moDate = new Date(year, i, 1);var before = that.o.beforeShowMonth(moDate);if (before === false)
$(month).addClass('disabled');}});}
html = '';year = parseInt(year/10, 10) * 10;var yearCont = this.picker.find('.datepicker-years')
.find('th:eq(1)')
.text(year + '-' + (year + 9))
.end()
.find('td');year -= 1;var years = $.map(this.dates, function(d){return d.getUTCFullYear();}),classes;for (var i = -1; i < 11; i++){classes = ['year'];if (i === -1)
classes.push('old');else if (i === 10)
classes.push('new');if ($.inArray(year, years) !== -1)
classes.push('active');if (year < startYear || year > endYear)
classes.push('disabled');html += '<span class="' + classes.join(' ') + '">' + year + '</span>';year += 1;}
yearCont.html(html);},updateNavArrows: function(){if (!this._allow_update)
return;var d = new Date(this.viewDate),year = d.getUTCFullYear(),month = d.getUTCMonth();switch (this.viewMode){case 0:if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){this.picker.find('.prev').css({visibility: 'hidden'});}
else {this.picker.find('.prev').css({visibility: 'visible'});}
if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){this.picker.find('.next').css({visibility: 'hidden'});}
else {this.picker.find('.next').css({visibility: 'visible'});}
break;case 1:case 2:if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){this.picker.find('.prev').css({visibility: 'hidden'});}
else {this.picker.find('.prev').css({visibility: 'visible'});}
if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){this.picker.find('.next').css({visibility: 'hidden'});}
else {this.picker.find('.next').css({visibility: 'visible'});}
break;}},click: function(e){e.preventDefault();var target = $(e.target).closest('span, td, th'),year, month, day;if (target.length === 1){switch (target[0].nodeName.toLowerCase()){case 'th':switch (target[0].className){case 'datepicker-switch':this.showMode(1);break;case 'prev':case 'next':var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);switch (this.viewMode){case 0:this.viewDate = this.moveMonth(this.viewDate, dir);this._trigger('changeMonth', this.viewDate);break;case 1:case 2:this.viewDate = this.moveYear(this.viewDate, dir);if (this.viewMode === 1)
this._trigger('changeYear', this.viewDate);break;}
this.fill();break;case 'today':var date = new Date();date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);this.showMode(-2);var which = this.o.todayBtn === 'linked' ? null : 'view';this._setDate(date, which);break;case 'clear':this.clearDates();break;}
break;case 'span':if (!target.hasClass('disabled')){this.viewDate.setUTCDate(1);if (target.hasClass('month')){day = 1;month = target.parent().find('span').index(target);year = this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(month);this._trigger('changeMonth', this.viewDate);if (this.o.minViewMode === 1){this._setDate(UTCDate(year, month, day));}}
else {day = 1;month = 0;year = parseInt(target.text(), 10)||0;this.viewDate.setUTCFullYear(year);this._trigger('changeYear', this.viewDate);if (this.o.minViewMode === 2){this._setDate(UTCDate(year, month, day));}}
this.showMode(-1);this.fill();}
break;case 'td':if (target.hasClass('day') && !target.hasClass('disabled')){day = parseInt(target.text(), 10)||1;year = this.viewDate.getUTCFullYear();month = this.viewDate.getUTCMonth();if (target.hasClass('old')){if (month === 0){month = 11;year -= 1;}
else {month -= 1;}}
else if (target.hasClass('new')){if (month === 11){month = 0;year += 1;}
else {month += 1;}}
this._setDate(UTCDate(year, month, day));}
break;}}
if (this.picker.is(':visible') && this._focused_from){$(this._focused_from).focus();}
delete this._focused_from;},_toggle_multidate: function(date){var ix = this.dates.contains(date);if (!date){this.dates.clear();}
if (ix !== -1){if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){this.dates.remove(ix);}} else if (this.o.multidate === false) {this.dates.clear();this.dates.push(date);}
else {this.dates.push(date);}
if (typeof this.o.multidate === 'number')
while (this.dates.length > this.o.multidate)
this.dates.remove(0);},_setDate: function(date, which){if (!which || which === 'date')
this._toggle_multidate(date && new Date(date));if (!which || which  === 'view')
this.viewDate = date && new Date(date);this.fill();this.setValue();if (!which || which  !== 'view') {this._trigger('changeDate');}
var element;if (this.isInput){element = this.element;}
else if (this.component){element = this.element.find('input');}
if (element){element.change();}
if (this.o.autoclose && (!which || which === 'date')){this.hide();}},moveMonth: function(date, dir){if (!date)
return undefined;if (!dir)
return date;var new_date = new Date(date.valueOf()),day = new_date.getUTCDate(),month = new_date.getUTCMonth(),mag = Math.abs(dir),new_month, test;dir = dir > 0 ? 1 : -1;if (mag === 1){test = dir === -1
? function(){return new_date.getUTCMonth() === month;}
: function(){return new_date.getUTCMonth() !== new_month;};new_month = month + dir;new_date.setUTCMonth(new_month);if (new_month < 0 || new_month > 11)
new_month = (new_month + 12) % 12;}
else {for (var i=0; i < mag; i++)
new_date = this.moveMonth(new_date, dir);new_month = new_date.getUTCMonth();new_date.setUTCDate(day);test = function(){return new_month !== new_date.getUTCMonth();};}
while (test()){new_date.setUTCDate(--day);new_date.setUTCMonth(new_month);}
return new_date;},moveYear: function(date, dir){return this.moveMonth(date, dir*12);},dateWithinRange: function(date){return date >= this.o.startDate && date <= this.o.endDate;},keydown: function(e){if (!this.picker.is(':visible')){if (e.keyCode === 27) // allow escape to hide and re-show picker
this.show();return;}
var dateChanged = false,dir, newDate, newViewDate,focusDate = this.focusDate || this.viewDate;switch (e.keyCode){case 27: // escape
if (this.focusDate){this.focusDate = null;this.viewDate = this.dates.get(-1) || this.viewDate;this.fill();}
else
this.hide();e.preventDefault();break;case 37: // left
case 39: // right
if (!this.o.keyboardNavigation)
break;dir = e.keyCode === 37 ? -1 : 1;if (e.ctrlKey){newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);newViewDate = this.moveYear(focusDate, dir);this._trigger('changeYear', this.viewDate);}
else if (e.shiftKey){newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);newViewDate = this.moveMonth(focusDate, dir);this._trigger('changeMonth', this.viewDate);}
else {newDate = new Date(this.dates.get(-1) || UTCToday());newDate.setUTCDate(newDate.getUTCDate() + dir);newViewDate = new Date(focusDate);newViewDate.setUTCDate(focusDate.getUTCDate() + dir);}
if (this.dateWithinRange(newViewDate)){this.focusDate = this.viewDate = newViewDate;this.setValue();this.fill();e.preventDefault();}
break;case 38: // up
case 40: // down
if (!this.o.keyboardNavigation)
break;dir = e.keyCode === 38 ? -1 : 1;if (e.ctrlKey){newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);newViewDate = this.moveYear(focusDate, dir);this._trigger('changeYear', this.viewDate);}
else if (e.shiftKey){newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);newViewDate = this.moveMonth(focusDate, dir);this._trigger('changeMonth', this.viewDate);}
else {newDate = new Date(this.dates.get(-1) || UTCToday());newDate.setUTCDate(newDate.getUTCDate() + dir * 7);newViewDate = new Date(focusDate);newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);}
if (this.dateWithinRange(newViewDate)){this.focusDate = this.viewDate = newViewDate;this.setValue();this.fill();e.preventDefault();}
break;case 32: // spacebar
break;case 13: // enter
focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;if (this.o.keyboardNavigation) {this._toggle_multidate(focusDate);dateChanged = true;}
this.focusDate = null;this.viewDate = this.dates.get(-1) || this.viewDate;this.setValue();this.fill();if (this.picker.is(':visible')){e.preventDefault();if (typeof e.stopPropagation === 'function') {e.stopPropagation(); // All modern browsers, IE9+} else {e.cancelBubble = true; // IE6,7,8 ignore "stopPropagation"
}
if (this.o.autoclose)
this.hide();}
break;case 9: // tab
this.focusDate = null;this.viewDate = this.dates.get(-1) || this.viewDate;this.fill();this.hide();break;}
if (dateChanged){if (this.dates.length)
this._trigger('changeDate');else
this._trigger('clearDate');var element;if (this.isInput){element = this.element;}
else if (this.component){element = this.element.find('input');}
if (element){element.change();}}},showMode: function(dir){if (dir){this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));}
this.picker
.children('div')
.hide()
.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
.css('display', 'block');this.updateNavArrows();}};var DateRangePicker = function(element, options){this.element = $(element);this.inputs = $.map(options.inputs, function(i){return i.jquery ? i[0] : i;});delete options.inputs;datepickerPlugin.call($(this.inputs), options)
.bind('changeDate', $.proxy(this.dateUpdated, this));this.pickers = $.map(this.inputs, function(i){return $(i).data('datepicker');});this.updateDates();};DateRangePicker.prototype = {updateDates: function(){this.dates = $.map(this.pickers, function(i){return i.getUTCDate();});this.updateRanges();},updateRanges: function(){var range = $.map(this.dates, function(d){return d.valueOf();});$.each(this.pickers, function(i, p){p.setRange(range);});},dateUpdated: function(e){if (this.updating)
return;this.updating = true;var dp = $(e.target).data('datepicker'),new_date = dp.getUTCDate(),i = $.inArray(e.target, this.inputs),j = i - 1,k = i + 1,l = this.inputs.length;if (i === -1)
return;$.each(this.pickers, function(i, p){if (!p.getUTCDate())
p.setUTCDate(new_date);});if (new_date < this.dates[j]){while (j >= 0 && new_date < this.dates[j]){this.pickers[j--].setUTCDate(new_date);}}
else if (new_date > this.dates[k]){while (k < l && new_date > this.dates[k]){this.pickers[k++].setUTCDate(new_date);}}
this.updateDates();delete this.updating;},remove: function(){$.map(this.pickers, function(p){ p.remove(); });delete this.element.data().datepicker;}};function opts_from_el(el, prefix){var data = $(el).data(),out = {}, inkey,replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');prefix = new RegExp('^' + prefix.toLowerCase());function re_lower(_,a){return a.toLowerCase();}
for (var key in data)
if (prefix.test(key)){inkey = key.replace(replace, re_lower);out[inkey] = data[key];}
return out;}
function opts_from_locale(lang){var out = {};if (!dates[lang]){lang = lang.split('-')[0];if (!dates[lang])
return;}
var d = dates[lang];$.each(locale_opts, function(i,k){if (k in d)
out[k] = d[k];});return out;}
var old = $.fn.datepicker;var datepickerPlugin = function(option){var args = Array.apply(null, arguments);args.shift();var internal_return;this.each(function(){var $this = $(this),data = $this.data('datepicker'),options = typeof option === 'object' && option;if (!data){var elopts = opts_from_el(this, 'date'),xopts = $.extend({}, defaults, elopts, options),locopts = opts_from_locale(xopts.language),opts = $.extend({}, defaults, locopts, elopts, options);if ($this.hasClass('input-daterange') || opts.inputs){var ropts = {inputs: opts.inputs || $this.find('input').toArray()};$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));}
else {$this.data('datepicker', (data = new Datepicker(this, opts)));}}
if (typeof option === 'string' && typeof data[option] === 'function'){internal_return = data[option].apply(data, args);if (internal_return !== undefined)
return false;}});if (internal_return !== undefined)
return internal_return;else
return this;};$.fn.datepicker = datepickerPlugin;var defaults = $.fn.datepicker.defaults = {autoclose: false,beforeShowDay: $.noop,beforeShowMonth: $.noop,calendarWeeks: false,clearBtn: false,toggleActive: false,daysOfWeekDisabled: [],datesDisabled: [],endDate: Infinity,forceParse: true,format: 'mm/dd/yyyy',keyboardNavigation: true,language: 'en',minViewMode: 0,multidate: false,multidateSeparator: ',',orientation: "auto",rtl: false,startDate: -Infinity,startView: 0,todayBtn: false,todayHighlight: false,weekStart: 0,disableTouchKeyboard: false,enableOnReadonly: true,container: 'body'};var locale_opts = $.fn.datepicker.locale_opts = ['format','rtl','weekStart'];$.fn.datepicker.Constructor = Datepicker;var dates = $.fn.datepicker.dates = {en: {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],today: "Today",clear: "Clear"}};var DPGlobal = {modes: [{clsName: 'days',navFnc: 'Month',navStep: 1},{clsName: 'months',navFnc: 'FullYear',navStep: 1},{clsName: 'years',navFnc: 'FullYear',navStep: 10}],isLeapYear: function(year){return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));},getDaysInMonth: function(year, month){return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];},validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat: function(format){var separators = format.replace(this.validParts, '\0').split('\0'),parts = format.match(this.validParts);if (!separators || !separators.length || !parts || parts.length === 0){throw new Error("Invalid date format.");}
return {separators: separators, parts: parts};},parseDate: function(date, format, language){if (!date)
return undefined;if (date instanceof Date)
return date;if (typeof format === 'string')
format = DPGlobal.parseFormat(format);var part_re = /([\-+]\d+)([dmwy])/,parts = date.match(/([\-+]\d+)([dmwy])/g),part, dir, i;if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){date = new Date();for (i=0; i < parts.length; i++){part = part_re.exec(parts[i]);dir = parseInt(part[1]);switch (part[2]){case 'd':date.setUTCDate(date.getUTCDate() + dir);break;case 'm':date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);break;case 'w':date.setUTCDate(date.getUTCDate() + dir * 7);break;case 'y':date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);break;}}
return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);}
parts = date && date.match(this.nonpunctuation) || [];date = new Date();var parsed = {},setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],setters_map = {yyyy: function(d,v){return d.setUTCFullYear(v);},yy: function(d,v){return d.setUTCFullYear(2000+v);},m: function(d,v){if (isNaN(d))
return d;v -= 1;while (v < 0) v += 12;v %= 12;d.setUTCMonth(v);while (d.getUTCMonth() !== v)
d.setUTCDate(d.getUTCDate()-1);return d;},d: function(d,v){return d.setUTCDate(v);}},val, filtered;setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];setters_map['dd'] = setters_map['d'];date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);var fparts = format.parts.slice();if (parts.length !== fparts.length){fparts = $(fparts).filter(function(i,p){return $.inArray(p, setters_order) !== -1;}).toArray();}
function match_part(){var m = this.slice(0, parts[i].length),p = parts[i].slice(0, m.length);return m.toLowerCase() === p.toLowerCase();}
if (parts.length === fparts.length){var cnt;for (i=0, cnt = fparts.length; i < cnt; i++){val = parseInt(parts[i], 10);part = fparts[i];if (isNaN(val)){switch (part){case 'MM':filtered = $(dates[language].months).filter(match_part);val = $.inArray(filtered[0], dates[language].months) + 1;break;case 'M':filtered = $(dates[language].monthsShort).filter(match_part);val = $.inArray(filtered[0], dates[language].monthsShort) + 1;break;}}
parsed[part] = val;}
var _date, s;for (i=0; i < setters_order.length; i++){s = setters_order[i];if (s in parsed && !isNaN(parsed[s])){_date = new Date(date);setters_map[s](_date, parsed[s]);if (!isNaN(_date))
date = _date;}}}
return date;},formatDate: function(date, format, language){if (!date)
return '';if (typeof format === 'string')
format = DPGlobal.parseFormat(format);var val = {d: date.getUTCDate(),D: dates[language].daysShort[date.getUTCDay()],DD: dates[language].days[date.getUTCDay()],m: date.getUTCMonth() + 1,M: dates[language].monthsShort[date.getUTCMonth()],MM: dates[language].months[date.getUTCMonth()],yy: date.getUTCFullYear().toString().substring(2),yyyy: date.getUTCFullYear()};val.dd = (val.d < 10 ? '0' : '') + val.d;val.mm = (val.m < 10 ? '0' : '') + val.m;date = [];var seps = $.extend([], format.separators);for (var i=0, cnt = format.parts.length; i <= cnt; i++){if (seps.length)
date.push(seps.shift());date.push(val[format.parts[i]]);}
return date.join('');},headTemplate: '<thead>'+'<tr>'+'<th class="prev">&#171;</th>'+'<th colspan="5" class="datepicker-switch"></th>'+'<th class="next">&#187;</th>'+'</tr>'+'</thead>',contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate: '<tfoot>'+'<tr>'+'<th colspan="7" class="today"></th>'+'</tr>'+'<tr>'+'<th colspan="7" class="clear"></th>'+'</tr>'+'</tfoot>'};DPGlobal.template = '<div class="datepicker">'+'<div class="datepicker-days">'+'<table class=" table-condensed">'+DPGlobal.headTemplate+'<tbody></tbody>'+DPGlobal.footTemplate+'</table>'+'</div>'+'<div class="datepicker-months">'+'<table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+'</table>'+'</div>'+'<div class="datepicker-years">'+'<table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+'</table>'+'</div>'+'</div>';$.fn.datepicker.DPGlobal = DPGlobal;$.fn.datepicker.noConflict = function(){$.fn.datepicker = old;return this;};$.fn.datepicker.version =  "1.4.1";$(document).on('focus.datepicker.data-api click.datepicker.data-api','[data-provide="datepicker"]',function(e){var $this = $(this);if ($this.data('datepicker'))
return;e.preventDefault();datepickerPlugin.call($this, 'show');});$(function(){datepickerPlugin.call($('[data-provide="datepicker-inline"]'));});}(window.jQuery));
//! moment.js
(function (global, factory) {typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :typeof define === 'function' && define.amd ? define(factory) :global.moment = factory()}(this, function () { 'use strict';var hookCallback;function utils_hooks__hooks () {return hookCallback.apply(null, arguments);}
function setHookCallback (callback) {hookCallback = callback;}
function isArray(input) {return Object.prototype.toString.call(input) === '[object Array]';}
function isDate(input) {return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';}
function map(arr, fn) {var res = [], i;for (i = 0; i < arr.length; ++i) {res.push(fn(arr[i], i));}
return res;}
function hasOwnProp(a, b) {return Object.prototype.hasOwnProperty.call(a, b);}
function extend(a, b) {for (var i in b) {if (hasOwnProp(b, i)) {a[i] = b[i];}}
if (hasOwnProp(b, 'toString')) {a.toString = b.toString;}
if (hasOwnProp(b, 'valueOf')) {a.valueOf = b.valueOf;}
return a;}
function create_utc__createUTC (input, format, locale, strict) {return createLocalOrUTC(input, format, locale, strict, true).utc();}
function defaultParsingFlags() {return {empty           : false,unusedTokens    : [],unusedInput     : [],overflow        : -2,charsLeftOver   : 0,nullInput       : false,invalidMonth    : null,invalidFormat   : false,userInvalidated : false,iso             : false};}
function getParsingFlags(m) {if (m._pf == null) {m._pf = defaultParsingFlags();}
return m._pf;}
function valid__isValid(m) {if (m._isValid == null) {var flags = getParsingFlags(m);m._isValid = !isNaN(m._d.getTime()) &&flags.overflow < 0 &&!flags.empty &&!flags.invalidMonth &&!flags.invalidWeekday &&!flags.nullInput &&!flags.invalidFormat &&!flags.userInvalidated;if (m._strict) {m._isValid = m._isValid &&flags.charsLeftOver === 0 &&flags.unusedTokens.length === 0 &&flags.bigHour === undefined;}}
return m._isValid;}
function valid__createInvalid (flags) {var m = create_utc__createUTC(NaN);if (flags != null) {extend(getParsingFlags(m), flags);}
else {getParsingFlags(m).userInvalidated = true;}
return m;}
var momentProperties = utils_hooks__hooks.momentProperties = [];function copyConfig(to, from) {var i, prop, val;if (typeof from._isAMomentObject !== 'undefined') {to._isAMomentObject = from._isAMomentObject;}
if (typeof from._i !== 'undefined') {to._i = from._i;}
if (typeof from._f !== 'undefined') {to._f = from._f;}
if (typeof from._l !== 'undefined') {to._l = from._l;}
if (typeof from._strict !== 'undefined') {to._strict = from._strict;}
if (typeof from._tzm !== 'undefined') {to._tzm = from._tzm;}
if (typeof from._isUTC !== 'undefined') {to._isUTC = from._isUTC;}
if (typeof from._offset !== 'undefined') {to._offset = from._offset;}
if (typeof from._pf !== 'undefined') {to._pf = getParsingFlags(from);}
if (typeof from._locale !== 'undefined') {to._locale = from._locale;}
if (momentProperties.length > 0) {for (i in momentProperties) {prop = momentProperties[i];val = from[prop];if (typeof val !== 'undefined') {to[prop] = val;}}}
return to;}
var updateInProgress = false;function Moment(config) {copyConfig(this, config);this._d = new Date(config._d != null ? config._d.getTime() : NaN);if (updateInProgress === false) {updateInProgress = true;utils_hooks__hooks.updateOffset(this);updateInProgress = false;}}
function isMoment (obj) {return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);}
function absFloor (number) {if (number < 0) {return Math.ceil(number);} else {return Math.floor(number);}}
function toInt(argumentForCoercion) {var coercedNumber = +argumentForCoercion,value = 0;if (coercedNumber !== 0 && isFinite(coercedNumber)) {value = absFloor(coercedNumber);}
return value;}
function compareArrays(array1, array2, dontConvert) {var len = Math.min(array1.length, array2.length),lengthDiff = Math.abs(array1.length - array2.length),diffs = 0,i;for (i = 0; i < len; i++) {if ((dontConvert && array1[i] !== array2[i]) ||(!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {diffs++;}}
return diffs + lengthDiff;}
function Locale() {}
var locales = {};var globalLocale;function normalizeLocale(key) {return key ? key.toLowerCase().replace('_', '-') : key;}
function chooseLocale(names) {var i = 0, j, next, locale, split;while (i < names.length) {split = normalizeLocale(names[i]).split('-');j = split.length;next = normalizeLocale(names[i + 1]);next = next ? next.split('-') : null;while (j > 0) {locale = loadLocale(split.slice(0, j).join('-'));if (locale) {return locale;}
if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {break;}
j--;}
i++;}
return null;}
function loadLocale(name) {var oldLocale = null;if (!locales[name] && typeof module !== 'undefined' &&module && module.exports) {try {oldLocale = globalLocale._abbr;require('./locale/' + name);locale_locales__getSetGlobalLocale(oldLocale);} catch (e) { }}
return locales[name];}
function locale_locales__getSetGlobalLocale (key, values) {var data;if (key) {if (typeof values === 'undefined') {data = locale_locales__getLocale(key);}
else {data = defineLocale(key, values);}
if (data) {globalLocale = data;}}
return globalLocale._abbr;}
function defineLocale (name, values) {if (values !== null) {values.abbr = name;locales[name] = locales[name] || new Locale();locales[name].set(values);locale_locales__getSetGlobalLocale(name);return locales[name];} else {delete locales[name];return null;}}
function locale_locales__getLocale (key) {var locale;if (key && key._locale && key._locale._abbr) {key = key._locale._abbr;}
if (!key) {return globalLocale;}
if (!isArray(key)) {locale = loadLocale(key);if (locale) {return locale;}
key = [key];}
return chooseLocale(key);}
var aliases = {};function addUnitAlias (unit, shorthand) {var lowerCase = unit.toLowerCase();aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;}
function normalizeUnits(units) {return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;}
function normalizeObjectUnits(inputObject) {var normalizedInput = {},normalizedProp,prop;for (prop in inputObject) {if (hasOwnProp(inputObject, prop)) {normalizedProp = normalizeUnits(prop);if (normalizedProp) {normalizedInput[normalizedProp] = inputObject[prop];}}}
return normalizedInput;}
function makeGetSet (unit, keepTime) {return function (value) {if (value != null) {get_set__set(this, unit, value);utils_hooks__hooks.updateOffset(this, keepTime);return this;} else {return get_set__get(this, unit);}};}
function get_set__get (mom, unit) {return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();}
function get_set__set (mom, unit, value) {return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);}
function getSet (units, value) {var unit;if (typeof units === 'object') {for (unit in units) {this.set(unit, units[unit]);}} else {units = normalizeUnits(units);if (typeof this[units] === 'function') {return this[units](value);}}
return this;}
function zeroFill(number, targetLength, forceSign) {var absNumber = '' + Math.abs(number),zerosToFill = targetLength - absNumber.length,sign = number >= 0;return (sign ? (forceSign ? '+' : '') : '-') +Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;}
var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;var formatFunctions = {};var formatTokenFunctions = {};function addFormatToken (token, padded, ordinal, callback) {var func = callback;if (typeof callback === 'string') {func = function () {return this[callback]();};}
if (token) {formatTokenFunctions[token] = func;}
if (padded) {formatTokenFunctions[padded[0]] = function () {return zeroFill(func.apply(this, arguments), padded[1], padded[2]);};}
if (ordinal) {formatTokenFunctions[ordinal] = function () {return this.localeData().ordinal(func.apply(this, arguments), token);};}}
function removeFormattingTokens(input) {if (input.match(/\[[\s\S]/)) {return input.replace(/^\[|\]$/g, '');}
return input.replace(/\\/g, '');}
function makeFormatFunction(format) {var array = format.match(formattingTokens), i, length;for (i = 0, length = array.length; i < length; i++) {if (formatTokenFunctions[array[i]]) {array[i] = formatTokenFunctions[array[i]];} else {array[i] = removeFormattingTokens(array[i]);}}
return function (mom) {var output = '';for (i = 0; i < length; i++) {output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];}
return output;};}
function formatMoment(m, format) {if (!m.isValid()) {return m.localeData().invalidDate();}
format = expandFormat(format, m.localeData());formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);return formatFunctions[format](m);}
function expandFormat(format, locale) {var i = 5;function replaceLongDateFormatTokens(input) {return locale.longDateFormat(input) || input;}
localFormattingTokens.lastIndex = 0;while (i >= 0 && localFormattingTokens.test(format)) {format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);localFormattingTokens.lastIndex = 0;i -= 1;}
return format;}
var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf
var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;var regexes = {};function isFunction (sth) {return typeof sth === 'function' &&Object.prototype.toString.call(sth) === '[object Function]';}
function addRegexToken (token, regex, strictRegex) {regexes[token] = isFunction(regex) ? regex : function (isStrict) {return (isStrict && strictRegex) ? strictRegex : regex;};}
function getParseRegexForToken (token, config) {if (!hasOwnProp(regexes, token)) {return new RegExp(unescapeFormat(token));}
return regexes[token](config._strict, config._locale);}
function unescapeFormat(s) {return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {return p1 || p2 || p3 || p4;}).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');}
var tokens = {};function addParseToken (token, callback) {var i, func = callback;if (typeof token === 'string') {token = [token];}
if (typeof callback === 'number') {func = function (input, array) {array[callback] = toInt(input);};}
for (i = 0; i < token.length; i++) {tokens[token[i]] = func;}}
function addWeekParseToken (token, callback) {addParseToken(token, function (input, array, config, token) {config._w = config._w || {};callback(input, config._w, config, token);});}
function addTimeToArrayFromToken(token, input, config) {if (input != null && hasOwnProp(tokens, token)) {tokens[token](input, config._a, config, token);}}
var YEAR = 0;var MONTH = 1;var DATE = 2;var HOUR = 3;var MINUTE = 4;var SECOND = 5;var MILLISECOND = 6;function daysInMonth(year, month) {return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();}
addFormatToken('M', ['MM', 2], 'Mo', function () {return this.month() + 1;});addFormatToken('MMM', 0, 0, function (format) {return this.localeData().monthsShort(this, format);});addFormatToken('MMMM', 0, 0, function (format) {return this.localeData().months(this, format);});addUnitAlias('month', 'M');addRegexToken('M',    match1to2);addRegexToken('MM',   match1to2, match2);addRegexToken('MMM',  matchWord);addRegexToken('MMMM', matchWord);addParseToken(['M', 'MM'], function (input, array) {array[MONTH] = toInt(input) - 1;});addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {var month = config._locale.monthsParse(input, token, config._strict);if (month != null) {array[MONTH] = month;} else {getParsingFlags(config).invalidMonth = input;}});var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');function localeMonths (m) {return this._months[m.month()];}
var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');function localeMonthsShort (m) {return this._monthsShort[m.month()];}
function localeMonthsParse (monthName, format, strict) {var i, mom, regex;if (!this._monthsParse) {this._monthsParse = [];this._longMonthsParse = [];this._shortMonthsParse = [];}
for (i = 0; i < 12; i++) {mom = create_utc__createUTC([2000, i]);if (strict && !this._longMonthsParse[i]) {this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');}
if (!strict && !this._monthsParse[i]) {regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');}
if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {return i;} else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {return i;} else if (!strict && this._monthsParse[i].test(monthName)) {return i;}}}
function setMonth (mom, value) {var dayOfMonth;if (typeof value === 'string') {value = mom.localeData().monthsParse(value);if (typeof value !== 'number') {return mom;}}
dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);return mom;}
function getSetMonth (value) {if (value != null) {setMonth(this, value);utils_hooks__hooks.updateOffset(this, true);return this;} else {return get_set__get(this, 'Month');}}
function getDaysInMonth () {return daysInMonth(this.year(), this.month());}
function checkOverflow (m) {var overflow;var a = m._a;if (a && getParsingFlags(m).overflow === -2) {overflow =
a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :-1;if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {overflow = DATE;}
getParsingFlags(m).overflow = overflow;}
return m;}
function warn(msg) {if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {console.warn('Deprecation warning: ' + msg);}}
function deprecate(msg, fn) {var firstTime = true;return extend(function () {if (firstTime) {warn(msg + '\n' + (new Error()).stack);firstTime = false;}
return fn.apply(this, arguments);}, fn);}
var deprecations = {};function deprecateSimple(name, msg) {if (!deprecations[name]) {warn(msg);deprecations[name] = true;}}
utils_hooks__hooks.suppressDeprecationWarnings = false;var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],['GGGG-[W]WW', /\d{4}-W\d{2}/],['YYYY-DDD', /\d{4}-\d{3}/]];var isoTimes = [['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],['HH:mm', /(T| )\d\d:\d\d/],['HH', /(T| )\d\d/]];var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;function configFromISO(config) {var i, l,string = config._i,match = from_string__isoRegex.exec(string);if (match) {getParsingFlags(config).iso = true;for (i = 0, l = isoDates.length; i < l; i++) {if (isoDates[i][1].exec(string)) {config._f = isoDates[i][0];break;}}
for (i = 0, l = isoTimes.length; i < l; i++) {if (isoTimes[i][1].exec(string)) {config._f += (match[6] || ' ') + isoTimes[i][0];break;}}
if (string.match(matchOffset)) {config._f += 'Z';}
configFromStringAndFormat(config);} else {config._isValid = false;}}
function configFromString(config) {var matched = aspNetJsonRegex.exec(config._i);if (matched !== null) {config._d = new Date(+matched[1]);return;}
configFromISO(config);if (config._isValid === false) {delete config._isValid;utils_hooks__hooks.createFromInputFallback(config);}}
utils_hooks__hooks.createFromInputFallback = deprecate('moment construction falls back to js Date. This is ' +'discouraged and will be removed in upcoming major ' +'release. Please refer to ' +'https://github.com/moment/moment/issues/1407 for more info.',
function (config) {config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));});function createDate (y, m, d, h, M, s, ms) {var date = new Date(y, m, d, h, M, s, ms);if (y < 1970) {date.setFullYear(y);}
return date;}
function createUTCDate (y) {var date = new Date(Date.UTC.apply(null, arguments));if (y < 1970) {date.setUTCFullYear(y);}
return date;}
addFormatToken(0, ['YY', 2], 0, function () {return this.year() % 100;});addFormatToken(0, ['YYYY',   4],       0, 'year');addFormatToken(0, ['YYYYY',  5],       0, 'year');addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');addUnitAlias('year', 'y');addRegexToken('Y',      matchSigned);addRegexToken('YY',     match1to2, match2);addRegexToken('YYYY',   match1to4, match4);addRegexToken('YYYYY',  match1to6, match6);addRegexToken('YYYYYY', match1to6, match6);addParseToken(['YYYYY', 'YYYYYY'], YEAR);addParseToken('YYYY', function (input, array) {array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);});addParseToken('YY', function (input, array) {array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);});function daysInYear(year) {return isLeapYear(year) ? 366 : 365;}
function isLeapYear(year) {return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;}
utils_hooks__hooks.parseTwoDigitYear = function (input) {return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);};var getSetYear = makeGetSet('FullYear', false);function getIsLeapYear () {return isLeapYear(this.year());}
addFormatToken('w', ['ww', 2], 'wo', 'week');addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');addUnitAlias('week', 'w');addUnitAlias('isoWeek', 'W');addRegexToken('w',  match1to2);addRegexToken('ww', match1to2, match2);addRegexToken('W',  match1to2);addRegexToken('WW', match1to2, match2);addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {week[token.substr(0, 1)] = toInt(input);});function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {var end = firstDayOfWeekOfYear - firstDayOfWeek,daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),adjustedMoment;if (daysToDayOfWeek > end) {daysToDayOfWeek -= 7;}
if (daysToDayOfWeek < end - 7) {daysToDayOfWeek += 7;}
adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');return {week: Math.ceil(adjustedMoment.dayOfYear() / 7),year: adjustedMoment.year()};}
function localeWeek (mom) {return weekOfYear(mom, this._week.dow, this._week.doy).week;}
var defaultLocaleWeek = {dow : 0, // Sunday is the first day of the week.
doy : 6  // The week that contains Jan 1st is the first week of the year.
};function localeFirstDayOfWeek () {return this._week.dow;}
function localeFirstDayOfYear () {return this._week.doy;}
function getSetWeek (input) {var week = this.localeData().week(this);return input == null ? week : this.add((input - week) * 7, 'd');}
function getSetISOWeek (input) {var week = weekOfYear(this, 1, 4).week;return input == null ? week : this.add((input - week) * 7, 'd');}
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');addUnitAlias('dayOfYear', 'DDD');addRegexToken('DDD',  match1to3);addRegexToken('DDDD', match3);addParseToken(['DDD', 'DDDD'], function (input, array, config) {config._dayOfYear = toInt(input);});function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;if (d < firstDayOfWeek) {d += 7;}
weekday = weekday != null ? 1 * weekday : firstDayOfWeek;dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;return {year: dayOfYear > 0 ? year : year - 1,dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear};}
function getSetDayOfYear (input) {var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');}
function defaults(a, b, c) {if (a != null) {return a;}
if (b != null) {return b;}
return c;}
function currentDateArray(config) {var now = new Date();if (config._useUTC) {return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];}
return [now.getFullYear(), now.getMonth(), now.getDate()];}
function configFromArray (config) {var i, date, input = [], currentDate, yearToUse;if (config._d) {return;}
currentDate = currentDateArray(config);if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {dayOfYearFromWeekInfo(config);}
if (config._dayOfYear) {yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);if (config._dayOfYear > daysInYear(yearToUse)) {getParsingFlags(config)._overflowDayOfYear = true;}
date = createUTCDate(yearToUse, 0, config._dayOfYear);config._a[MONTH] = date.getUTCMonth();config._a[DATE] = date.getUTCDate();}
for (i = 0; i < 3 && config._a[i] == null; ++i) {config._a[i] = input[i] = currentDate[i];}
for (; i < 7; i++) {config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];}
if (config._a[HOUR] === 24 &&config._a[MINUTE] === 0 &&config._a[SECOND] === 0 &&config._a[MILLISECOND] === 0) {config._nextDay = true;config._a[HOUR] = 0;}
config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);if (config._tzm != null) {config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);}
if (config._nextDay) {config._a[HOUR] = 24;}}
function dayOfYearFromWeekInfo(config) {var w, weekYear, week, weekday, dow, doy, temp;w = config._w;if (w.GG != null || w.W != null || w.E != null) {dow = 1;doy = 4;weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);week = defaults(w.W, 1);weekday = defaults(w.E, 1);} else {dow = config._locale._week.dow;doy = config._locale._week.doy;weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);week = defaults(w.w, 1);if (w.d != null) {weekday = w.d;if (weekday < dow) {++week;}} else if (w.e != null) {weekday = w.e + dow;} else {weekday = dow;}}
temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);config._a[YEAR] = temp.year;config._dayOfYear = temp.dayOfYear;}
utils_hooks__hooks.ISO_8601 = function () {};function configFromStringAndFormat(config) {if (config._f === utils_hooks__hooks.ISO_8601) {configFromISO(config);return;}
config._a = [];getParsingFlags(config).empty = true;var string = '' + config._i,i, parsedInput, tokens, token, skipped,stringLength = string.length,totalParsedInputLength = 0;tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];for (i = 0; i < tokens.length; i++) {token = tokens[i];parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];if (parsedInput) {skipped = string.substr(0, string.indexOf(parsedInput));if (skipped.length > 0) {getParsingFlags(config).unusedInput.push(skipped);}
string = string.slice(string.indexOf(parsedInput) + parsedInput.length);totalParsedInputLength += parsedInput.length;}
if (formatTokenFunctions[token]) {if (parsedInput) {getParsingFlags(config).empty = false;}
else {getParsingFlags(config).unusedTokens.push(token);}
addTimeToArrayFromToken(token, parsedInput, config);}
else if (config._strict && !parsedInput) {getParsingFlags(config).unusedTokens.push(token);}}
getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;if (string.length > 0) {getParsingFlags(config).unusedInput.push(string);}
if (getParsingFlags(config).bigHour === true &&config._a[HOUR] <= 12 &&config._a[HOUR] > 0) {getParsingFlags(config).bigHour = undefined;}
config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);configFromArray(config);checkOverflow(config);}
function meridiemFixWrap (locale, hour, meridiem) {var isPm;if (meridiem == null) {return hour;}
if (locale.meridiemHour != null) {return locale.meridiemHour(hour, meridiem);} else if (locale.isPM != null) {isPm = locale.isPM(meridiem);if (isPm && hour < 12) {hour += 12;}
if (!isPm && hour === 12) {hour = 0;}
return hour;} else {return hour;}}
function configFromStringAndArray(config) {var tempConfig,bestMoment,scoreToBeat,i,currentScore;if (config._f.length === 0) {getParsingFlags(config).invalidFormat = true;config._d = new Date(NaN);return;}
for (i = 0; i < config._f.length; i++) {currentScore = 0;tempConfig = copyConfig({}, config);if (config._useUTC != null) {tempConfig._useUTC = config._useUTC;}
tempConfig._f = config._f[i];configFromStringAndFormat(tempConfig);if (!valid__isValid(tempConfig)) {continue;}
currentScore += getParsingFlags(tempConfig).charsLeftOver;currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;getParsingFlags(tempConfig).score = currentScore;if (scoreToBeat == null || currentScore < scoreToBeat) {scoreToBeat = currentScore;bestMoment = tempConfig;}}
extend(config, bestMoment || tempConfig);}
function configFromObject(config) {if (config._d) {return;}
var i = normalizeObjectUnits(config._i);config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];configFromArray(config);}
function createFromConfig (config) {var res = new Moment(checkOverflow(prepareConfig(config)));if (res._nextDay) {res.add(1, 'd');res._nextDay = undefined;}
return res;}
function prepareConfig (config) {var input = config._i,format = config._f;config._locale = config._locale || locale_locales__getLocale(config._l);if (input === null || (format === undefined && input === '')) {return valid__createInvalid({nullInput: true});}
if (typeof input === 'string') {config._i = input = config._locale.preparse(input);}
if (isMoment(input)) {return new Moment(checkOverflow(input));} else if (isArray(format)) {configFromStringAndArray(config);} else if (format) {configFromStringAndFormat(config);} else if (isDate(input)) {config._d = input;} else {configFromInput(config);}
return config;}
function configFromInput(config) {var input = config._i;if (input === undefined) {config._d = new Date();} else if (isDate(input)) {config._d = new Date(+input);} else if (typeof input === 'string') {configFromString(config);} else if (isArray(input)) {config._a = map(input.slice(0), function (obj) {return parseInt(obj, 10);});configFromArray(config);} else if (typeof(input) === 'object') {configFromObject(config);} else if (typeof(input) === 'number') {config._d = new Date(input);} else {utils_hooks__hooks.createFromInputFallback(config);}}
function createLocalOrUTC (input, format, locale, strict, isUTC) {var c = {};if (typeof(locale) === 'boolean') {strict = locale;locale = undefined;}
c._isAMomentObject = true;c._useUTC = c._isUTC = isUTC;c._l = locale;c._i = input;c._f = format;c._strict = strict;return createFromConfig(c);}
function local__createLocal (input, format, locale, strict) {return createLocalOrUTC(input, format, locale, strict, false);}
var prototypeMin = deprecate('moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
function () {var other = local__createLocal.apply(null, arguments);return other < this ? this : other;});var prototypeMax = deprecate('moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
function () {var other = local__createLocal.apply(null, arguments);return other > this ? this : other;});function pickBy(fn, moments) {var res, i;if (moments.length === 1 && isArray(moments[0])) {moments = moments[0];}
if (!moments.length) {return local__createLocal();}
res = moments[0];for (i = 1; i < moments.length; ++i) {if (!moments[i].isValid() || moments[i][fn](res)) {res = moments[i];}}
return res;}
function min () {var args = [].slice.call(arguments, 0);return pickBy('isBefore', args);}
function max () {var args = [].slice.call(arguments, 0);return pickBy('isAfter', args);}
function Duration (duration) {var normalizedInput = normalizeObjectUnits(duration),years = normalizedInput.year || 0,quarters = normalizedInput.quarter || 0,months = normalizedInput.month || 0,weeks = normalizedInput.week || 0,days = normalizedInput.day || 0,hours = normalizedInput.hour || 0,minutes = normalizedInput.minute || 0,seconds = normalizedInput.second || 0,milliseconds = normalizedInput.millisecond || 0;this._milliseconds = +milliseconds +seconds * 1e3 + // 1000
minutes * 6e4 + // 1000 * 60
hours * 36e5; // 1000 * 60 * 60
this._days = +days +weeks * 7;this._months = +months +quarters * 3 +years * 12;this._data = {};this._locale = locale_locales__getLocale();this._bubble();}
function isDuration (obj) {return obj instanceof Duration;}
function offset (token, separator) {addFormatToken(token, 0, 0, function () {var offset = this.utcOffset();var sign = '+';if (offset < 0) {offset = -offset;sign = '-';}
return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);});}
offset('Z', ':');offset('ZZ', '');addRegexToken('Z',  matchOffset);addRegexToken('ZZ', matchOffset);addParseToken(['Z', 'ZZ'], function (input, array, config) {config._useUTC = true;config._tzm = offsetFromString(input);});var chunkOffset = /([\+\-]|\d\d)/gi;function offsetFromString(string) {var matches = ((string || '').match(matchOffset) || []);var chunk   = matches[matches.length - 1] || [];var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];var minutes = +(parts[1] * 60) + toInt(parts[2]);return parts[0] === '+' ? minutes : -minutes;}
function cloneWithOffset(input, model) {var res, diff;if (model._isUTC) {res = model.clone();diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);res._d.setTime(+res._d + diff);utils_hooks__hooks.updateOffset(res, false);return res;} else {return local__createLocal(input).local();}}
function getDateOffset (m) {return -Math.round(m._d.getTimezoneOffset() / 15) * 15;}
utils_hooks__hooks.updateOffset = function () {};function getSetOffset (input, keepLocalTime) {var offset = this._offset || 0,localAdjust;if (input != null) {if (typeof input === 'string') {input = offsetFromString(input);}
if (Math.abs(input) < 16) {input = input * 60;}
if (!this._isUTC && keepLocalTime) {localAdjust = getDateOffset(this);}
this._offset = input;this._isUTC = true;if (localAdjust != null) {this.add(localAdjust, 'm');}
if (offset !== input) {if (!keepLocalTime || this._changeInProgress) {add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);} else if (!this._changeInProgress) {this._changeInProgress = true;utils_hooks__hooks.updateOffset(this, true);this._changeInProgress = null;}}
return this;} else {return this._isUTC ? offset : getDateOffset(this);}}
function getSetZone (input, keepLocalTime) {if (input != null) {if (typeof input !== 'string') {input = -input;}
this.utcOffset(input, keepLocalTime);return this;} else {return -this.utcOffset();}}
function setOffsetToUTC (keepLocalTime) {return this.utcOffset(0, keepLocalTime);}
function setOffsetToLocal (keepLocalTime) {if (this._isUTC) {this.utcOffset(0, keepLocalTime);this._isUTC = false;if (keepLocalTime) {this.subtract(getDateOffset(this), 'm');}}
return this;}
function setOffsetToParsedOffset () {if (this._tzm) {this.utcOffset(this._tzm);} else if (typeof this._i === 'string') {this.utcOffset(offsetFromString(this._i));}
return this;}
function hasAlignedHourOffset (input) {input = input ? local__createLocal(input).utcOffset() : 0;return (this.utcOffset() - input) % 60 === 0;}
function isDaylightSavingTime () {return (this.utcOffset() > this.clone().month(0).utcOffset() ||this.utcOffset() > this.clone().month(5).utcOffset());}
function isDaylightSavingTimeShifted () {if (typeof this._isDSTShifted !== 'undefined') {return this._isDSTShifted;}
var c = {};copyConfig(c, this);c = prepareConfig(c);if (c._a) {var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);this._isDSTShifted = this.isValid() &&compareArrays(c._a, other.toArray()) > 0;} else {this._isDSTShifted = false;}
return this._isDSTShifted;}
function isLocal () {return !this._isUTC;}
function isUtcOffset () {return this._isUTC;}
function isUtc () {return this._isUTC && this._offset === 0;}
var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;function create__createDuration (input, key) {var duration = input,match = null,sign,ret,diffRes;if (isDuration(input)) {duration = {ms : input._milliseconds,d  : input._days,M  : input._months};} else if (typeof input === 'number') {duration = {};if (key) {duration[key] = input;} else {duration.milliseconds = input;}} else if (!!(match = aspNetRegex.exec(input))) {sign = (match[1] === '-') ? -1 : 1;duration = {y  : 0,d  : toInt(match[DATE])        * sign,h  : toInt(match[HOUR])        * sign,m  : toInt(match[MINUTE])      * sign,s  : toInt(match[SECOND])      * sign,ms : toInt(match[MILLISECOND]) * sign};} else if (!!(match = create__isoRegex.exec(input))) {sign = (match[1] === '-') ? -1 : 1;duration = {y : parseIso(match[2], sign),M : parseIso(match[3], sign),d : parseIso(match[4], sign),h : parseIso(match[5], sign),m : parseIso(match[6], sign),s : parseIso(match[7], sign),w : parseIso(match[8], sign)};} else if (duration == null) {// checks for null or undefined
duration = {};} else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));duration = {};duration.ms = diffRes.milliseconds;duration.M = diffRes.months;}
ret = new Duration(duration);if (isDuration(input) && hasOwnProp(input, '_locale')) {ret._locale = input._locale;}
return ret;}
create__createDuration.fn = Duration.prototype;function parseIso (inp, sign) {var res = inp && parseFloat(inp.replace(',', '.'));return (isNaN(res) ? 0 : res) * sign;}
function positiveMomentsDifference(base, other) {var res = {milliseconds: 0, months: 0};res.months = other.month() - base.month() +(other.year() - base.year()) * 12;if (base.clone().add(res.months, 'M').isAfter(other)) {--res.months;}
res.milliseconds = +other - +(base.clone().add(res.months, 'M'));return res;}
function momentsDifference(base, other) {var res;other = cloneWithOffset(other, base);if (base.isBefore(other)) {res = positiveMomentsDifference(base, other);} else {res = positiveMomentsDifference(other, base);res.milliseconds = -res.milliseconds;res.months = -res.months;}
return res;}
function createAdder(direction, name) {return function (val, period) {var dur, tmp;if (period !== null && !isNaN(+period)) {deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');tmp = val; val = period; period = tmp;}
val = typeof val === 'string' ? +val : val;dur = create__createDuration(val, period);add_subtract__addSubtract(this, dur, direction);return this;};}
function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {var milliseconds = duration._milliseconds,days = duration._days,months = duration._months;updateOffset = updateOffset == null ? true : updateOffset;if (milliseconds) {mom._d.setTime(+mom._d + milliseconds * isAdding);}
if (days) {get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);}
if (months) {setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);}
if (updateOffset) {utils_hooks__hooks.updateOffset(mom, days || months);}}
var add_subtract__add      = createAdder(1, 'add');var add_subtract__subtract = createAdder(-1, 'subtract');function moment_calendar__calendar (time, formats) {var now = time || local__createLocal(),sod = cloneWithOffset(now, this).startOf('day'),diff = this.diff(sod, 'days', true),format = diff < -6 ? 'sameElse' :diff < -1 ? 'lastWeek' :diff < 0 ? 'lastDay' :diff < 1 ? 'sameDay' :diff < 2 ? 'nextDay' :diff < 7 ? 'nextWeek' : 'sameElse';return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));}
function clone () {return new Moment(this);}
function isAfter (input, units) {var inputMs;units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');if (units === 'millisecond') {input = isMoment(input) ? input : local__createLocal(input);return +this > +input;} else {inputMs = isMoment(input) ? +input : +local__createLocal(input);return inputMs < +this.clone().startOf(units);}}
function isBefore (input, units) {var inputMs;units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');if (units === 'millisecond') {input = isMoment(input) ? input : local__createLocal(input);return +this < +input;} else {inputMs = isMoment(input) ? +input : +local__createLocal(input);return +this.clone().endOf(units) < inputMs;}}
function isBetween (from, to, units) {return this.isAfter(from, units) && this.isBefore(to, units);}
function isSame (input, units) {var inputMs;units = normalizeUnits(units || 'millisecond');if (units === 'millisecond') {input = isMoment(input) ? input : local__createLocal(input);return +this === +input;} else {inputMs = +local__createLocal(input);return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));}}
function diff (input, units, asFloat) {var that = cloneWithOffset(input, this),zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,delta, output;units = normalizeUnits(units);if (units === 'year' || units === 'month' || units === 'quarter') {output = monthDiff(this, that);if (units === 'quarter') {output = output / 3;} else if (units === 'year') {output = output / 12;}} else {delta = this - that;output = units === 'second' ? delta / 1e3 : // 1000
units === 'minute' ? delta / 6e4 : // 1000 * 60
units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
delta;}
return asFloat ? output : absFloor(output);}
function monthDiff (a, b) {var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),anchor = a.clone().add(wholeMonthDiff, 'months'),anchor2, adjust;if (b - anchor < 0) {anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');adjust = (b - anchor) / (anchor - anchor2);} else {anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');adjust = (b - anchor) / (anchor2 - anchor);}
return -(wholeMonthDiff + adjust);}
utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';function toString () {return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');}
function moment_format__toISOString () {var m = this.clone().utc();if (0 < m.year() && m.year() <= 9999) {if ('function' === typeof Date.prototype.toISOString) {return this.toDate().toISOString();} else {return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}} else {return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}
function format (inputString) {var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);return this.localeData().postformat(output);}
function from (time, withoutSuffix) {if (!this.isValid()) {return this.localeData().invalidDate();}
return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);}
function fromNow (withoutSuffix) {return this.from(local__createLocal(), withoutSuffix);}
function to (time, withoutSuffix) {if (!this.isValid()) {return this.localeData().invalidDate();}
return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);}
function toNow (withoutSuffix) {return this.to(local__createLocal(), withoutSuffix);}
function locale (key) {var newLocaleData;if (key === undefined) {return this._locale._abbr;} else {newLocaleData = locale_locales__getLocale(key);if (newLocaleData != null) {this._locale = newLocaleData;}
return this;}}
var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',function (key) {if (key === undefined) {return this.localeData();} else {return this.locale(key);}});function localeData () {return this._locale;}
function startOf (units) {units = normalizeUnits(units);switch (units) {case 'year':this.month(0);case 'quarter':case 'month':this.date(1);case 'week':case 'isoWeek':case 'day':this.hours(0);case 'hour':this.minutes(0);case 'minute':this.seconds(0);case 'second':this.milliseconds(0);}
if (units === 'week') {this.weekday(0);}
if (units === 'isoWeek') {this.isoWeekday(1);}
if (units === 'quarter') {this.month(Math.floor(this.month() / 3) * 3);}
return this;}
function endOf (units) {units = normalizeUnits(units);if (units === undefined || units === 'millisecond') {return this;}
return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');}
function to_type__valueOf () {return +this._d - ((this._offset || 0) * 60000);}
function unix () {return Math.floor(+this / 1000);}
function toDate () {return this._offset ? new Date(+this) : this._d;}
function toArray () {var m = this;return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];}
function toObject () {var m = this;return {years: m.year(),months: m.month(),date: m.date(),hours: m.hours(),minutes: m.minutes(),seconds: m.seconds(),milliseconds: m.milliseconds()};}
function moment_valid__isValid () {return valid__isValid(this);}
function parsingFlags () {return extend({}, getParsingFlags(this));}
function invalidAt () {return getParsingFlags(this).overflow;}
addFormatToken(0, ['gg', 2], 0, function () {return this.weekYear() % 100;});addFormatToken(0, ['GG', 2], 0, function () {return this.isoWeekYear() % 100;});function addWeekYearFormatToken (token, getter) {addFormatToken(0, [token, token.length], 0, getter);}
addWeekYearFormatToken('gggg',     'weekYear');addWeekYearFormatToken('ggggg',    'weekYear');addWeekYearFormatToken('GGGG',  'isoWeekYear');addWeekYearFormatToken('GGGGG', 'isoWeekYear');addUnitAlias('weekYear', 'gg');addUnitAlias('isoWeekYear', 'GG');addRegexToken('G',      matchSigned);addRegexToken('g',      matchSigned);addRegexToken('GG',     match1to2, match2);addRegexToken('gg',     match1to2, match2);addRegexToken('GGGG',   match1to4, match4);addRegexToken('gggg',   match1to4, match4);addRegexToken('GGGGG',  match1to6, match6);addRegexToken('ggggg',  match1to6, match6);addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {week[token.substr(0, 2)] = toInt(input);});addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {week[token] = utils_hooks__hooks.parseTwoDigitYear(input);});function weeksInYear(year, dow, doy) {return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;}
function getSetWeekYear (input) {var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;return input == null ? year : this.add((input - year), 'y');}
function getSetISOWeekYear (input) {var year = weekOfYear(this, 1, 4).year;return input == null ? year : this.add((input - year), 'y');}
function getISOWeeksInYear () {return weeksInYear(this.year(), 1, 4);}
function getWeeksInYear () {var weekInfo = this.localeData()._week;return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);}
addFormatToken('Q', 0, 0, 'quarter');addUnitAlias('quarter', 'Q');addRegexToken('Q', match1);addParseToken('Q', function (input, array) {array[MONTH] = (toInt(input) - 1) * 3;});function getSetQuarter (input) {return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);}
addFormatToken('D', ['DD', 2], 'Do', 'date');addUnitAlias('date', 'D');addRegexToken('D',  match1to2);addRegexToken('DD', match1to2, match2);addRegexToken('Do', function (isStrict, locale) {return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;});addParseToken(['D', 'DD'], DATE);addParseToken('Do', function (input, array) {array[DATE] = toInt(input.match(match1to2)[0], 10);});var getSetDayOfMonth = makeGetSet('Date', true);addFormatToken('d', 0, 'do', 'day');addFormatToken('dd', 0, 0, function (format) {return this.localeData().weekdaysMin(this, format);});addFormatToken('ddd', 0, 0, function (format) {return this.localeData().weekdaysShort(this, format);});addFormatToken('dddd', 0, 0, function (format) {return this.localeData().weekdays(this, format);});addFormatToken('e', 0, 0, 'weekday');addFormatToken('E', 0, 0, 'isoWeekday');addUnitAlias('day', 'd');addUnitAlias('weekday', 'e');addUnitAlias('isoWeekday', 'E');addRegexToken('d',    match1to2);addRegexToken('e',    match1to2);addRegexToken('E',    match1to2);addRegexToken('dd',   matchWord);addRegexToken('ddd',  matchWord);addRegexToken('dddd', matchWord);addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {var weekday = config._locale.weekdaysParse(input);if (weekday != null) {week.d = weekday;} else {getParsingFlags(config).invalidWeekday = input;}});addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {week[token] = toInt(input);});function parseWeekday(input, locale) {if (typeof input !== 'string') {return input;}
if (!isNaN(input)) {return parseInt(input, 10);}
input = locale.weekdaysParse(input);if (typeof input === 'number') {return input;}
return null;}
var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');function localeWeekdays (m) {return this._weekdays[m.day()];}
var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');function localeWeekdaysShort (m) {return this._weekdaysShort[m.day()];}
var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');function localeWeekdaysMin (m) {return this._weekdaysMin[m.day()];}
function localeWeekdaysParse (weekdayName) {var i, mom, regex;this._weekdaysParse = this._weekdaysParse || [];for (i = 0; i < 7; i++) {if (!this._weekdaysParse[i]) {mom = local__createLocal([2000, 1]).day(i);regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');}
if (this._weekdaysParse[i].test(weekdayName)) {return i;}}}
function getSetDayOfWeek (input) {var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();if (input != null) {input = parseWeekday(input, this.localeData());return this.add(input - day, 'd');} else {return day;}}
function getSetLocaleDayOfWeek (input) {var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;return input == null ? weekday : this.add(input - weekday, 'd');}
function getSetISODayOfWeek (input) {return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);}
addFormatToken('H', ['HH', 2], 0, 'hour');addFormatToken('h', ['hh', 2], 0, function () {return this.hours() % 12 || 12;});function meridiem (token, lowercase) {addFormatToken(token, 0, 0, function () {return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);});}
meridiem('a', true);meridiem('A', false);addUnitAlias('hour', 'h');function matchMeridiem (isStrict, locale) {return locale._meridiemParse;}
addRegexToken('a',  matchMeridiem);addRegexToken('A',  matchMeridiem);addRegexToken('H',  match1to2);addRegexToken('h',  match1to2);addRegexToken('HH', match1to2, match2);addRegexToken('hh', match1to2, match2);addParseToken(['H', 'HH'], HOUR);addParseToken(['a', 'A'], function (input, array, config) {config._isPm = config._locale.isPM(input);config._meridiem = input;});addParseToken(['h', 'hh'], function (input, array, config) {array[HOUR] = toInt(input);getParsingFlags(config).bigHour = true;});function localeIsPM (input) {return ((input + '').toLowerCase().charAt(0) === 'p');}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;function localeMeridiem (hours, minutes, isLower) {if (hours > 11) {return isLower ? 'pm' : 'PM';} else {return isLower ? 'am' : 'AM';}}
var getSetHour = makeGetSet('Hours', true);addFormatToken('m', ['mm', 2], 0, 'minute');addUnitAlias('minute', 'm');addRegexToken('m',  match1to2);addRegexToken('mm', match1to2, match2);addParseToken(['m', 'mm'], MINUTE);var getSetMinute = makeGetSet('Minutes', false);addFormatToken('s', ['ss', 2], 0, 'second');addUnitAlias('second', 's');addRegexToken('s',  match1to2);addRegexToken('ss', match1to2, match2);addParseToken(['s', 'ss'], SECOND);var getSetSecond = makeGetSet('Seconds', false);addFormatToken('S', 0, 0, function () {return ~~(this.millisecond() / 100);});addFormatToken(0, ['SS', 2], 0, function () {return ~~(this.millisecond() / 10);});addFormatToken(0, ['SSS', 3], 0, 'millisecond');addFormatToken(0, ['SSSS', 4], 0, function () {return this.millisecond() * 10;});addFormatToken(0, ['SSSSS', 5], 0, function () {return this.millisecond() * 100;});addFormatToken(0, ['SSSSSS', 6], 0, function () {return this.millisecond() * 1000;});addFormatToken(0, ['SSSSSSS', 7], 0, function () {return this.millisecond() * 10000;});addFormatToken(0, ['SSSSSSSS', 8], 0, function () {return this.millisecond() * 100000;});addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {return this.millisecond() * 1000000;});addUnitAlias('millisecond', 'ms');addRegexToken('S',    match1to3, match1);addRegexToken('SS',   match1to3, match2);addRegexToken('SSS',  match1to3, match3);var token;for (token = 'SSSS'; token.length <= 9; token += 'S') {addRegexToken(token, matchUnsigned);}
function parseMs(input, array) {array[MILLISECOND] = toInt(('0.' + input) * 1000);}
for (token = 'S'; token.length <= 9; token += 'S') {addParseToken(token, parseMs);}
var getSetMillisecond = makeGetSet('Milliseconds', false);addFormatToken('z',  0, 0, 'zoneAbbr');addFormatToken('zz', 0, 0, 'zoneName');function getZoneAbbr () {return this._isUTC ? 'UTC' : '';}
function getZoneName () {return this._isUTC ? 'Coordinated Universal Time' : '';}
var momentPrototype__proto = Moment.prototype;momentPrototype__proto.add          = add_subtract__add;momentPrototype__proto.calendar     = moment_calendar__calendar;momentPrototype__proto.clone        = clone;momentPrototype__proto.diff         = diff;momentPrototype__proto.endOf        = endOf;momentPrototype__proto.format       = format;momentPrototype__proto.from         = from;momentPrototype__proto.fromNow      = fromNow;momentPrototype__proto.to           = to;momentPrototype__proto.toNow        = toNow;momentPrototype__proto.get          = getSet;momentPrototype__proto.invalidAt    = invalidAt;momentPrototype__proto.isAfter      = isAfter;momentPrototype__proto.isBefore     = isBefore;momentPrototype__proto.isBetween    = isBetween;momentPrototype__proto.isSame       = isSame;momentPrototype__proto.isValid      = moment_valid__isValid;momentPrototype__proto.lang         = lang;momentPrototype__proto.locale       = locale;momentPrototype__proto.localeData   = localeData;momentPrototype__proto.max          = prototypeMax;momentPrototype__proto.min          = prototypeMin;momentPrototype__proto.parsingFlags = parsingFlags;momentPrototype__proto.set          = getSet;momentPrototype__proto.startOf      = startOf;momentPrototype__proto.subtract     = add_subtract__subtract;momentPrototype__proto.toArray      = toArray;momentPrototype__proto.toObject     = toObject;momentPrototype__proto.toDate       = toDate;momentPrototype__proto.toISOString  = moment_format__toISOString;momentPrototype__proto.toJSON       = moment_format__toISOString;momentPrototype__proto.toString     = toString;momentPrototype__proto.unix         = unix;momentPrototype__proto.valueOf      = to_type__valueOf;momentPrototype__proto.year       = getSetYear;momentPrototype__proto.isLeapYear = getIsLeapYear;momentPrototype__proto.weekYear    = getSetWeekYear;momentPrototype__proto.isoWeekYear = getSetISOWeekYear;momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;momentPrototype__proto.month       = getSetMonth;momentPrototype__proto.daysInMonth = getDaysInMonth;momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;momentPrototype__proto.weeksInYear    = getWeeksInYear;momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;momentPrototype__proto.date       = getSetDayOfMonth;momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;momentPrototype__proto.isoWeekday = getSetISODayOfWeek;momentPrototype__proto.dayOfYear  = getSetDayOfYear;momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;momentPrototype__proto.utcOffset            = getSetOffset;momentPrototype__proto.utc                  = setOffsetToUTC;momentPrototype__proto.local                = setOffsetToLocal;momentPrototype__proto.parseZone            = setOffsetToParsedOffset;momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;momentPrototype__proto.isDST                = isDaylightSavingTime;momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;momentPrototype__proto.isLocal              = isLocal;momentPrototype__proto.isUtcOffset          = isUtcOffset;momentPrototype__proto.isUtc                = isUtc;momentPrototype__proto.isUTC                = isUtc;momentPrototype__proto.zoneAbbr = getZoneAbbr;momentPrototype__proto.zoneName = getZoneName;momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
var momentPrototype = momentPrototype__proto;function moment__createUnix (input) {return local__createLocal(input * 1000);}
function moment__createInZone () {return local__createLocal.apply(null, arguments).parseZone();}
var defaultCalendar = {sameDay : '[Today at] LT',nextDay : '[Tomorrow at] LT',nextWeek : 'dddd [at] LT',lastDay : '[Yesterday at] LT',lastWeek : '[Last] dddd [at] LT',sameElse : 'L'};function locale_calendar__calendar (key, mom, now) {var output = this._calendar[key];return typeof output === 'function' ? output.call(mom, now) : output;}
var defaultLongDateFormat = {LTS  : 'h:mm:ss A',LT   : 'h:mm A',L    : 'MM/DD/YYYY',LL   : 'MMMM D, YYYY',LLL  : 'MMMM D, YYYY h:mm A',LLLL : 'dddd, MMMM D, YYYY h:mm A'};function longDateFormat (key) {var format = this._longDateFormat[key],formatUpper = this._longDateFormat[key.toUpperCase()];if (format || !formatUpper) {return format;}
this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {return val.slice(1);});return this._longDateFormat[key];}
var defaultInvalidDate = 'Invalid date';function invalidDate () {return this._invalidDate;}
var defaultOrdinal = '%d';var defaultOrdinalParse = /\d{1,2}/;function ordinal (number) {return this._ordinal.replace('%d', number);}
function preParsePostFormat (string) {return string;}
var defaultRelativeTime = {future : 'in %s',past   : '%s ago',s  : 'a few seconds',m  : 'a minute',mm : '%d minutes',h  : 'an hour',hh : '%d hours',d  : 'a day',dd : '%d days',M  : 'a month',MM : '%d months',y  : 'a year',yy : '%d years'};function relative__relativeTime (number, withoutSuffix, string, isFuture) {var output = this._relativeTime[string];return (typeof output === 'function') ?output(number, withoutSuffix, string, isFuture) :output.replace(/%d/i, number);}
function pastFuture (diff, output) {var format = this._relativeTime[diff > 0 ? 'future' : 'past'];return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);}
function locale_set__set (config) {var prop, i;for (i in config) {prop = config[i];if (typeof prop === 'function') {this[i] = prop;} else {this['_' + i] = prop;}}
this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);}
var prototype__proto = Locale.prototype;prototype__proto._calendar       = defaultCalendar;prototype__proto.calendar        = locale_calendar__calendar;prototype__proto._longDateFormat = defaultLongDateFormat;prototype__proto.longDateFormat  = longDateFormat;prototype__proto._invalidDate    = defaultInvalidDate;prototype__proto.invalidDate     = invalidDate;prototype__proto._ordinal        = defaultOrdinal;prototype__proto.ordinal         = ordinal;prototype__proto._ordinalParse   = defaultOrdinalParse;prototype__proto.preparse        = preParsePostFormat;prototype__proto.postformat      = preParsePostFormat;prototype__proto._relativeTime   = defaultRelativeTime;prototype__proto.relativeTime    = relative__relativeTime;prototype__proto.pastFuture      = pastFuture;prototype__proto.set             = locale_set__set;prototype__proto.months       =        localeMonths;prototype__proto._months      = defaultLocaleMonths;prototype__proto.monthsShort  =        localeMonthsShort;prototype__proto._monthsShort = defaultLocaleMonthsShort;prototype__proto.monthsParse  =        localeMonthsParse;prototype__proto.week = localeWeek;prototype__proto._week = defaultLocaleWeek;prototype__proto.firstDayOfYear = localeFirstDayOfYear;prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;prototype__proto.weekdays       =        localeWeekdays;prototype__proto._weekdays      = defaultLocaleWeekdays;prototype__proto.weekdaysMin    =        localeWeekdaysMin;prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;prototype__proto.weekdaysShort  =        localeWeekdaysShort;prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;prototype__proto.weekdaysParse  =        localeWeekdaysParse;prototype__proto.isPM = localeIsPM;prototype__proto._meridiemParse = defaultLocaleMeridiemParse;prototype__proto.meridiem = localeMeridiem;function lists__get (format, index, field, setter) {var locale = locale_locales__getLocale();var utc = create_utc__createUTC().set(setter, index);return locale[field](utc, format);}
function list (format, index, field, count, setter) {if (typeof format === 'number') {index = format;format = undefined;}
format = format || '';if (index != null) {return lists__get(format, index, field, setter);}
var i;var out = [];for (i = 0; i < count; i++) {out[i] = lists__get(format, i, field, setter);}
return out;}
function lists__listMonths (format, index) {return list(format, index, 'months', 12, 'month');}
function lists__listMonthsShort (format, index) {return list(format, index, 'monthsShort', 12, 'month');}
function lists__listWeekdays (format, index) {return list(format, index, 'weekdays', 7, 'day');}
function lists__listWeekdaysShort (format, index) {return list(format, index, 'weekdaysShort', 7, 'day');}
function lists__listWeekdaysMin (format, index) {return list(format, index, 'weekdaysMin', 7, 'day');}
locale_locales__getSetGlobalLocale('en', {ordinalParse: /\d{1,2}(th|st|nd|rd)/,ordinal : function (number) {var b = number % 10,output = (toInt(number % 100 / 10) === 1) ? 'th' :(b === 1) ? 'st' :(b === 2) ? 'nd' :(b === 3) ? 'rd' : 'th';return number + output;}});utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);var mathAbs = Math.abs;function duration_abs__abs () {var data           = this._data;this._milliseconds = mathAbs(this._milliseconds);this._days         = mathAbs(this._days);this._months       = mathAbs(this._months);data.milliseconds  = mathAbs(data.milliseconds);data.seconds       = mathAbs(data.seconds);data.minutes       = mathAbs(data.minutes);data.hours         = mathAbs(data.hours);data.months        = mathAbs(data.months);data.years         = mathAbs(data.years);return this;}
function duration_add_subtract__addSubtract (duration, input, value, direction) {var other = create__createDuration(input, value);duration._milliseconds += direction * other._milliseconds;duration._days         += direction * other._days;duration._months       += direction * other._months;return duration._bubble();}
function duration_add_subtract__add (input, value) {return duration_add_subtract__addSubtract(this, input, value, 1);}
function duration_add_subtract__subtract (input, value) {return duration_add_subtract__addSubtract(this, input, value, -1);}
function absCeil (number) {if (number < 0) {return Math.floor(number);} else {return Math.ceil(number);}}
function bubble () {var milliseconds = this._milliseconds;var days         = this._days;var months       = this._months;var data         = this._data;var seconds, minutes, hours, years, monthsFromDays;if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||(milliseconds <= 0 && days <= 0 && months <= 0))) {milliseconds += absCeil(monthsToDays(months) + days) * 864e5;days = 0;months = 0;}
data.milliseconds = milliseconds % 1000;seconds           = absFloor(milliseconds / 1000);data.seconds      = seconds % 60;minutes           = absFloor(seconds / 60);data.minutes      = minutes % 60;hours             = absFloor(minutes / 60);data.hours        = hours % 24;days += absFloor(hours / 24);monthsFromDays = absFloor(daysToMonths(days));months += monthsFromDays;days -= absCeil(monthsToDays(monthsFromDays));years = absFloor(months / 12);months %= 12;data.days   = days;data.months = months;data.years  = years;return this;}
function daysToMonths (days) {return days * 4800 / 146097;}
function monthsToDays (months) {return months * 146097 / 4800;}
function as (units) {var days;var months;var milliseconds = this._milliseconds;units = normalizeUnits(units);if (units === 'month' || units === 'year') {days   = this._days   + milliseconds / 864e5;months = this._months + daysToMonths(days);return units === 'month' ? months : months / 12;} else {days = this._days + Math.round(monthsToDays(this._months));switch (units) {case 'week'   : return days / 7     + milliseconds / 6048e5;case 'day'    : return days         + milliseconds / 864e5;case 'hour'   : return days * 24    + milliseconds / 36e5;case 'minute' : return days * 1440  + milliseconds / 6e4;case 'second' : return days * 86400 + milliseconds / 1000;case 'millisecond': return Math.floor(days * 864e5) + milliseconds;default: throw new Error('Unknown unit ' + units);}}}
function duration_as__valueOf () {return (this._milliseconds +this._days * 864e5 +(this._months % 12) * 2592e6 +toInt(this._months / 12) * 31536e6);}
function makeAs (alias) {return function () {return this.as(alias);};}
var asMilliseconds = makeAs('ms');var asSeconds      = makeAs('s');var asMinutes      = makeAs('m');var asHours        = makeAs('h');var asDays         = makeAs('d');var asWeeks        = makeAs('w');var asMonths       = makeAs('M');var asYears        = makeAs('y');function duration_get__get (units) {units = normalizeUnits(units);return this[units + 's']();}
function makeGetter(name) {return function () {return this._data[name];};}
var milliseconds = makeGetter('milliseconds');var seconds      = makeGetter('seconds');var minutes      = makeGetter('minutes');var hours        = makeGetter('hours');var days         = makeGetter('days');var months       = makeGetter('months');var years        = makeGetter('years');function weeks () {return absFloor(this.days() / 7);}
var round = Math.round;var thresholds = {s: 45,  // seconds to minute
m: 45,  // minutes to hour
h: 22,  // hours to day
d: 26,  // days to month
M: 11   // months to year
};function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);}
function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {var duration = create__createDuration(posNegDuration).abs();var seconds  = round(duration.as('s'));var minutes  = round(duration.as('m'));var hours    = round(duration.as('h'));var days     = round(duration.as('d'));var months   = round(duration.as('M'));var years    = round(duration.as('y'));var a = seconds < thresholds.s && ['s', seconds]  ||minutes === 1          && ['m']           ||minutes < thresholds.m && ['mm', minutes] ||hours   === 1          && ['h']           ||hours   < thresholds.h && ['hh', hours]   ||days    === 1          && ['d']           ||days    < thresholds.d && ['dd', days]    ||months  === 1          && ['M']           ||months  < thresholds.M && ['MM', months]  ||years   === 1          && ['y']           || ['yy', years];a[2] = withoutSuffix;a[3] = +posNegDuration > 0;a[4] = locale;return substituteTimeAgo.apply(null, a);}
function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {if (thresholds[threshold] === undefined) {return false;}
if (limit === undefined) {return thresholds[threshold];}
thresholds[threshold] = limit;return true;}
function humanize (withSuffix) {var locale = this.localeData();var output = duration_humanize__relativeTime(this, !withSuffix, locale);if (withSuffix) {output = locale.pastFuture(+this, output);}
return locale.postformat(output);}
var iso_string__abs = Math.abs;function iso_string__toISOString() {var seconds = iso_string__abs(this._milliseconds) / 1000;var days         = iso_string__abs(this._days);var months       = iso_string__abs(this._months);var minutes, hours, years;minutes           = absFloor(seconds / 60);hours             = absFloor(minutes / 60);seconds %= 60;minutes %= 60;years  = absFloor(months / 12);months %= 12;var Y = years;var M = months;var D = days;var h = hours;var m = minutes;var s = seconds;var total = this.asSeconds();if (!total) {return 'P0D';}
return (total < 0 ? '-' : '') +'P' +(Y ? Y + 'Y' : '') +(M ? M + 'M' : '') +(D ? D + 'D' : '') +((h || m || s) ? 'T' : '') +(h ? h + 'H' : '') +(m ? m + 'M' : '') +(s ? s + 'S' : '');}
var duration_prototype__proto = Duration.prototype;duration_prototype__proto.abs            = duration_abs__abs;duration_prototype__proto.add            = duration_add_subtract__add;duration_prototype__proto.subtract       = duration_add_subtract__subtract;duration_prototype__proto.as             = as;duration_prototype__proto.asMilliseconds = asMilliseconds;duration_prototype__proto.asSeconds      = asSeconds;duration_prototype__proto.asMinutes      = asMinutes;duration_prototype__proto.asHours        = asHours;duration_prototype__proto.asDays         = asDays;duration_prototype__proto.asWeeks        = asWeeks;duration_prototype__proto.asMonths       = asMonths;duration_prototype__proto.asYears        = asYears;duration_prototype__proto.valueOf        = duration_as__valueOf;duration_prototype__proto._bubble        = bubble;duration_prototype__proto.get            = duration_get__get;duration_prototype__proto.milliseconds   = milliseconds;duration_prototype__proto.seconds        = seconds;duration_prototype__proto.minutes        = minutes;duration_prototype__proto.hours          = hours;duration_prototype__proto.days           = days;duration_prototype__proto.weeks          = weeks;duration_prototype__proto.months         = months;duration_prototype__proto.years          = years;duration_prototype__proto.humanize       = humanize;duration_prototype__proto.toISOString    = iso_string__toISOString;duration_prototype__proto.toString       = iso_string__toISOString;duration_prototype__proto.toJSON         = iso_string__toISOString;duration_prototype__proto.locale         = locale;duration_prototype__proto.localeData     = localeData;duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);duration_prototype__proto.lang = lang;addFormatToken('X', 0, 0, 'unix');addFormatToken('x', 0, 0, 'valueOf');addRegexToken('x', matchSigned);addRegexToken('X', matchTimestamp);addParseToken('X', function (input, array, config) {config._d = new Date(parseFloat(input, 10) * 1000);});addParseToken('x', function (input, array, config) {config._d = new Date(toInt(input));});utils_hooks__hooks.version = '2.10.6';setHookCallback(local__createLocal);utils_hooks__hooks.fn                    = momentPrototype;utils_hooks__hooks.min                   = min;utils_hooks__hooks.max                   = max;utils_hooks__hooks.utc                   = create_utc__createUTC;utils_hooks__hooks.unix                  = moment__createUnix;utils_hooks__hooks.months                = lists__listMonths;utils_hooks__hooks.isDate                = isDate;utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;utils_hooks__hooks.invalid               = valid__createInvalid;utils_hooks__hooks.duration              = create__createDuration;utils_hooks__hooks.isMoment              = isMoment;utils_hooks__hooks.weekdays              = lists__listWeekdays;utils_hooks__hooks.parseZone             = moment__createInZone;utils_hooks__hooks.localeData            = locale_locales__getLocale;utils_hooks__hooks.isDuration            = isDuration;utils_hooks__hooks.monthsShort           = lists__listMonthsShort;utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;utils_hooks__hooks.defineLocale          = defineLocale;utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;utils_hooks__hooks.normalizeUnits        = normalizeUnits;utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;var _moment = utils_hooks__hooks;return _moment;}));
/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/daterangepicker@3.1.0/daterangepicker.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){if("function"==typeof define&&define.amd)define(["moment","jquery"],function(t,a){return a.fn||(a.fn={}),"function"!=typeof t&&t.hasOwnProperty("default")&&(t=t.default),e(t,a)});else if("object"==typeof module&&module.exports){var a="undefined"!=typeof window?window.jQuery:void 0;a||(a=require("jquery")).fn||(a.fn={});var i="undefined"!=typeof window&&void 0!==window.moment?window.moment:require("moment");module.exports=e(i,a)}else t.daterangepicker=e(t.moment,t.jQuery)}(this,function(t,e){var a=function(a,i,s){if(this.parentEl="body",this.element=e(a),this.startDate=t().startOf("day"),this.endDate=t().endOf("day"),this.minDate=!1,this.maxDate=!1,this.maxSpan=!1,this.autoApply=!1,this.singleDatePicker=!1,this.showDropdowns=!1,this.minYear=t().subtract(100,"year").format("YYYY"),this.maxYear=t().add(100,"year").format("YYYY"),this.showWeekNumbers=!1,this.showISOWeekNumbers=!1,this.showCustomRangeLabel=!0,this.timePicker=!1,this.timePicker24Hour=!1,this.timePickerIncrement=1,this.timePickerSeconds=!1,this.linkedCalendars=!0,this.autoUpdateInput=!0,this.alwaysShowCalendars=!1,this.ranges={},this.opens="right",this.element.hasClass("pull-right")&&(this.opens="left"),this.drops="down",this.element.hasClass("dropup")&&(this.drops="up"),this.buttonClasses="btn btn-sm",this.applyButtonClasses="btn-primary",this.cancelButtonClasses="btn-default",this.locale={direction:"ltr",format:t.localeData().longDateFormat("L"),separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:t.weekdaysMin(),monthNames:t.monthsShort(),firstDay:t.localeData().firstDayOfWeek()},this.callback=function(){},this.isShowing=!1,this.leftCalendar={},this.rightCalendar={},"object"==typeof i&&null!==i||(i={}),"string"==typeof(i=e.extend(this.element.data(),i)).template||i.template instanceof e||(i.template='<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),this.parentEl=i.parentEl&&e(i.parentEl).length?e(i.parentEl):e(this.parentEl),this.container=e(i.template).appendTo(this.parentEl),"object"==typeof i.locale&&("string"==typeof i.locale.direction&&(this.locale.direction=i.locale.direction),"string"==typeof i.locale.format&&(this.locale.format=i.locale.format),"string"==typeof i.locale.separator&&(this.locale.separator=i.locale.separator),"object"==typeof i.locale.daysOfWeek&&(this.locale.daysOfWeek=i.locale.daysOfWeek.slice()),"object"==typeof i.locale.monthNames&&(this.locale.monthNames=i.locale.monthNames.slice()),"number"==typeof i.locale.firstDay&&(this.locale.firstDay=i.locale.firstDay),"string"==typeof i.locale.applyLabel&&(this.locale.applyLabel=i.locale.applyLabel),"string"==typeof i.locale.cancelLabel&&(this.locale.cancelLabel=i.locale.cancelLabel),"string"==typeof i.locale.weekLabel&&(this.locale.weekLabel=i.locale.weekLabel),"string"==typeof i.locale.customRangeLabel)){(p=document.createElement("textarea")).innerHTML=i.locale.customRangeLabel;var n=p.value;this.locale.customRangeLabel=n}if(this.container.addClass(this.locale.direction),"string"==typeof i.startDate&&(this.startDate=t(i.startDate,this.locale.format)),"string"==typeof i.endDate&&(this.endDate=t(i.endDate,this.locale.format)),"string"==typeof i.minDate&&(this.minDate=t(i.minDate,this.locale.format)),"string"==typeof i.maxDate&&(this.maxDate=t(i.maxDate,this.locale.format)),"object"==typeof i.startDate&&(this.startDate=t(i.startDate)),"object"==typeof i.endDate&&(this.endDate=t(i.endDate)),"object"==typeof i.minDate&&(this.minDate=t(i.minDate)),"object"==typeof i.maxDate&&(this.maxDate=t(i.maxDate)),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),"string"==typeof i.applyButtonClasses&&(this.applyButtonClasses=i.applyButtonClasses),"string"==typeof i.applyClass&&(this.applyButtonClasses=i.applyClass),"string"==typeof i.cancelButtonClasses&&(this.cancelButtonClasses=i.cancelButtonClasses),"string"==typeof i.cancelClass&&(this.cancelButtonClasses=i.cancelClass),"object"==typeof i.maxSpan&&(this.maxSpan=i.maxSpan),"object"==typeof i.dateLimit&&(this.maxSpan=i.dateLimit),"string"==typeof i.opens&&(this.opens=i.opens),"string"==typeof i.drops&&(this.drops=i.drops),"boolean"==typeof i.showWeekNumbers&&(this.showWeekNumbers=i.showWeekNumbers),"boolean"==typeof i.showISOWeekNumbers&&(this.showISOWeekNumbers=i.showISOWeekNumbers),"string"==typeof i.buttonClasses&&(this.buttonClasses=i.buttonClasses),"object"==typeof i.buttonClasses&&(this.buttonClasses=i.buttonClasses.join(" ")),"boolean"==typeof i.showDropdowns&&(this.showDropdowns=i.showDropdowns),"number"==typeof i.minYear&&(this.minYear=i.minYear),"number"==typeof i.maxYear&&(this.maxYear=i.maxYear),"boolean"==typeof i.showCustomRangeLabel&&(this.showCustomRangeLabel=i.showCustomRangeLabel),"boolean"==typeof i.singleDatePicker&&(this.singleDatePicker=i.singleDatePicker,this.singleDatePicker&&(this.endDate=this.startDate.clone())),"boolean"==typeof i.timePicker&&(this.timePicker=i.timePicker),"boolean"==typeof i.timePickerSeconds&&(this.timePickerSeconds=i.timePickerSeconds),"number"==typeof i.timePickerIncrement&&(this.timePickerIncrement=i.timePickerIncrement),"boolean"==typeof i.timePicker24Hour&&(this.timePicker24Hour=i.timePicker24Hour),"boolean"==typeof i.autoApply&&(this.autoApply=i.autoApply),"boolean"==typeof i.autoUpdateInput&&(this.autoUpdateInput=i.autoUpdateInput),"boolean"==typeof i.linkedCalendars&&(this.linkedCalendars=i.linkedCalendars),"function"==typeof i.isInvalidDate&&(this.isInvalidDate=i.isInvalidDate),"function"==typeof i.isCustomDate&&(this.isCustomDate=i.isCustomDate),"boolean"==typeof i.alwaysShowCalendars&&(this.alwaysShowCalendars=i.alwaysShowCalendars),0!=this.locale.firstDay)for(var r=this.locale.firstDay;r>0;)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),r--;var o,h,l;if(void 0===i.startDate&&void 0===i.endDate&&e(this.element).is(":text")){var c=e(this.element).val(),d=c.split(this.locale.separator);o=h=null,2==d.length?(o=t(d[0],this.locale.format),h=t(d[1],this.locale.format)):this.singleDatePicker&&""!==c&&(o=t(c,this.locale.format),h=t(c,this.locale.format)),null!==o&&null!==h&&(this.setStartDate(o),this.setEndDate(h))}if("object"==typeof i.ranges){for(l in i.ranges){o="string"==typeof i.ranges[l][0]?t(i.ranges[l][0],this.locale.format):t(i.ranges[l][0]),h="string"==typeof i.ranges[l][1]?t(i.ranges[l][1],this.locale.format):t(i.ranges[l][1]),this.minDate&&o.isBefore(this.minDate)&&(o=this.minDate.clone());var m=this.maxDate;if(this.maxSpan&&m&&o.clone().add(this.maxSpan).isAfter(m)&&(m=o.clone().add(this.maxSpan)),m&&h.isAfter(m)&&(h=m.clone()),!(this.minDate&&h.isBefore(this.minDate,this.timepicker?"minute":"day")||m&&o.isAfter(m,this.timepicker?"minute":"day"))){var p;(p=document.createElement("textarea")).innerHTML=l;n=p.value;this.ranges[n]=[o,h]}}var f="<ul>";for(l in this.ranges)f+='<li data-range-key="'+l+'">'+l+"</li>";this.showCustomRangeLabel&&(f+='<li data-range-key="'+this.locale.customRangeLabel+'">'+this.locale.customRangeLabel+"</li>"),f+="</ul>",this.container.find(".ranges").prepend(f)}"function"==typeof s&&(this.callback=s),this.timePicker||(this.startDate=this.startDate.startOf("day"),this.endDate=this.endDate.endOf("day"),this.container.find(".calendar-time").hide()),this.timePicker&&this.autoApply&&(this.autoApply=!1),this.autoApply&&this.container.addClass("auto-apply"),"object"==typeof i.ranges&&this.container.addClass("show-ranges"),this.singleDatePicker&&(this.container.addClass("single"),this.container.find(".drp-calendar.left").addClass("single"),this.container.find(".drp-calendar.left").show(),this.container.find(".drp-calendar.right").hide(),!this.timePicker&&this.autoApply&&this.container.addClass("auto-apply")),(void 0===i.ranges&&!this.singleDatePicker||this.alwaysShowCalendars)&&this.container.addClass("show-calendar"),this.container.addClass("opens"+this.opens),this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),this.applyButtonClasses.length&&this.container.find(".applyBtn").addClass(this.applyButtonClasses),this.cancelButtonClasses.length&&this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),this.container.find(".applyBtn").html(this.locale.applyLabel),this.container.find(".cancelBtn").html(this.locale.cancelLabel),this.container.find(".drp-calendar").on("click.daterangepicker",".prev",e.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",e.proxy(this.clickNext,this)).on("mousedown.daterangepicker","td.available",e.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",e.proxy(this.hoverDate,this)).on("change.daterangepicker","select.yearselect",e.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",e.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",e.proxy(this.timeChanged,this)),this.container.find(".ranges").on("click.daterangepicker","li",e.proxy(this.clickRange,this)),this.container.find(".drp-buttons").on("click.daterangepicker","button.applyBtn",e.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",e.proxy(this.clickCancel,this)),this.element.is("input")||this.element.is("button")?this.element.on({"click.daterangepicker":e.proxy(this.show,this),"focus.daterangepicker":e.proxy(this.show,this),"keyup.daterangepicker":e.proxy(this.elementChanged,this),"keydown.daterangepicker":e.proxy(this.keydown,this)}):(this.element.on("click.daterangepicker",e.proxy(this.toggle,this)),this.element.on("keydown.daterangepicker",e.proxy(this.toggle,this))),this.updateElement()};return a.prototype={constructor:a,setStartDate:function(e){"string"==typeof e&&(this.startDate=t(e,this.locale.format)),"object"==typeof e&&(this.startDate=t(e)),this.timePicker||(this.startDate=this.startDate.startOf("day")),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.maxDate&&this.startDate.isAfter(this.maxDate)&&(this.startDate=this.maxDate.clone(),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.floor(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement)),this.isShowing||this.updateElement(),this.updateMonthsInView()},setEndDate:function(e){"string"==typeof e&&(this.endDate=t(e,this.locale.format)),"object"==typeof e&&(this.endDate=t(e)),this.timePicker||(this.endDate=this.endDate.endOf("day")),this.timePicker&&this.timePickerIncrement&&this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.endDate.isBefore(this.startDate)&&(this.endDate=this.startDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),this.maxSpan&&this.startDate.clone().add(this.maxSpan).isBefore(this.endDate)&&(this.endDate=this.startDate.clone().add(this.maxSpan)),this.previousRightTime=this.endDate.clone(),this.container.find(".drp-selected").html(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.isShowing||this.updateElement(),this.updateMonthsInView()},isInvalidDate:function(){return!1},isCustomDate:function(){return!1},updateView:function(){this.timePicker&&(this.renderTimePicker("left"),this.renderTimePicker("right"),this.endDate?this.container.find(".right .calendar-time select").prop("disabled",!1).removeClass("disabled"):this.container.find(".right .calendar-time select").prop("disabled",!0).addClass("disabled")),this.endDate&&this.container.find(".drp-selected").html(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.updateMonthsInView(),this.updateCalendars(),this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM")))return;this.leftCalendar.month=this.startDate.clone().date(2),this.linkedCalendars||this.endDate.month()==this.startDate.month()&&this.endDate.year()==this.startDate.year()?this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"):this.rightCalendar.month=this.endDate.clone().date(2)}else this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&(this.leftCalendar.month=this.startDate.clone().date(2),this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"));this.maxDate&&this.linkedCalendars&&!this.singleDatePicker&&this.rightCalendar.month>this.maxDate&&(this.rightCalendar.month=this.maxDate.clone().date(2),this.leftCalendar.month=this.maxDate.clone().date(2).subtract(1,"month"))},updateCalendars:function(){if(this.timePicker){var t,e,a,i;if(this.endDate){if(t=parseInt(this.container.find(".left .hourselect").val(),10),e=parseInt(this.container.find(".left .minuteselect").val(),10),isNaN(e)&&(e=parseInt(this.container.find(".left .minuteselect option:last").val(),10)),a=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(i=this.container.find(".left .ampmselect").val())&&t<12&&(t+=12),"AM"===i&&12===t&&(t=0)}else if(t=parseInt(this.container.find(".right .hourselect").val(),10),e=parseInt(this.container.find(".right .minuteselect").val(),10),isNaN(e)&&(e=parseInt(this.container.find(".right .minuteselect option:last").val(),10)),a=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0,!this.timePicker24Hour)"PM"===(i=this.container.find(".right .ampmselect").val())&&t<12&&(t+=12),"AM"===i&&12===t&&(t=0);this.leftCalendar.month.hour(t).minute(e).second(a),this.rightCalendar.month.hour(t).minute(e).second(a)}this.renderCalendar("left"),this.renderCalendar("right"),this.container.find(".ranges li").removeClass("active"),null!=this.endDate&&this.calculateChosenLabel()},renderCalendar:function(a){var i,s=(i="left"==a?this.leftCalendar:this.rightCalendar).month.month(),n=i.month.year(),r=i.month.hour(),o=i.month.minute(),h=i.month.second(),l=t([n,s]).daysInMonth(),c=t([n,s,1]),d=t([n,s,l]),m=t(c).subtract(1,"month").month(),p=t(c).subtract(1,"month").year(),f=t([p,m]).daysInMonth(),u=c.day();(i=[]).firstDay=c,i.lastDay=d;for(var D=0;D<6;D++)i[D]=[];var g=f-u+this.locale.firstDay+1;g>f&&(g-=7),u==this.locale.firstDay&&(g=f-6);for(var y=t([p,m,g,12,o,h]),k=(D=0,0),b=0;D<42;D++,k++,y=t(y).add(24,"hour"))D>0&&k%7==0&&(k=0,b++),i[b][k]=y.clone().hour(r).minute(o).second(h),y.hour(12),this.minDate&&i[b][k].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&i[b][k].isBefore(this.minDate)&&"left"==a&&(i[b][k]=this.minDate.clone()),this.maxDate&&i[b][k].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&i[b][k].isAfter(this.maxDate)&&"right"==a&&(i[b][k]=this.maxDate.clone());"left"==a?this.leftCalendar.calendar=i:this.rightCalendar.calendar=i;var v="left"==a?this.minDate:this.startDate,C=this.maxDate,Y=("left"==a?this.startDate:this.endDate,this.locale.direction,'<table class="table-condensed">');Y+="<thead>",Y+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(Y+="<th></th>"),v&&!v.isBefore(i.firstDay)||this.linkedCalendars&&"left"!=a?Y+="<th></th>":Y+='<th class="prev available"><span></span></th>';var w=this.locale.monthNames[i[1][1].month()]+i[1][1].format(" YYYY");if(this.showDropdowns){for(var P=i[1][1].month(),x=i[1][1].year(),M=C&&C.year()||this.maxYear,I=v&&v.year()||this.minYear,S=x==I,B=x==M,A='<select class="monthselect">',L=0;L<12;L++)(!S||v&&L>=v.month())&&(!B||C&&L<=C.month())?A+="<option value='"+L+"'"+(L===P?" selected='selected'":"")+">"+this.locale.monthNames[L]+"</option>":A+="<option value='"+L+"'"+(L===P?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[L]+"</option>";A+="</select>";for(var N='<select class="yearselect">',E=I;E<=M;E++)N+='<option value="'+E+'"'+(E===x?' selected="selected"':"")+">"+E+"</option>";w=A+(N+="</select>")}if(Y+='<th colspan="5" class="month">'+w+"</th>",C&&!C.isAfter(i.lastDay)||this.linkedCalendars&&"right"!=a&&!this.singleDatePicker?Y+="<th></th>":Y+='<th class="next available"><span></span></th>',Y+="</tr>",Y+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(Y+='<th class="week">'+this.locale.weekLabel+"</th>"),e.each(this.locale.daysOfWeek,function(t,e){Y+="<th>"+e+"</th>"}),Y+="</tr>",Y+="</thead>",Y+="<tbody>",null==this.endDate&&this.maxSpan){var O=this.startDate.clone().add(this.maxSpan).endOf("day");C&&!O.isBefore(C)||(C=O)}for(b=0;b<6;b++){Y+="<tr>",this.showWeekNumbers?Y+='<td class="week">'+i[b][0].week()+"</td>":this.showISOWeekNumbers&&(Y+='<td class="week">'+i[b][0].isoWeek()+"</td>");for(k=0;k<7;k++){var W=[];i[b][k].isSame(new Date,"day")&&W.push("today"),i[b][k].isoWeekday()>5&&W.push("weekend"),i[b][k].month()!=i[1][1].month()&&W.push("off","ends"),this.minDate&&i[b][k].isBefore(this.minDate,"day")&&W.push("off","disabled"),C&&i[b][k].isAfter(C,"day")&&W.push("off","disabled"),this.isInvalidDate(i[b][k])&&W.push("off","disabled"),i[b][k].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")&&W.push("active","start-date"),null!=this.endDate&&i[b][k].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")&&W.push("active","end-date"),null!=this.endDate&&i[b][k]>this.startDate&&i[b][k]<this.endDate&&W.push("in-range");var H=this.isCustomDate(i[b][k]);!1!==H&&("string"==typeof H?W.push(H):Array.prototype.push.apply(W,H));var j="",R=!1;for(D=0;D<W.length;D++)j+=W[D]+" ","disabled"==W[D]&&(R=!0);R||(j+="available"),Y+='<td class="'+j.replace(/^\s+|\s+$/g,"")+'" data-title="r'+b+"c"+k+'">'+i[b][k].date()+"</td>"}Y+="</tr>"}Y+="</tbody>",Y+="</table>",this.container.find(".drp-calendar."+a+" .calendar-table").html(Y)},renderTimePicker:function(t){if("right"!=t||this.endDate){var e,a,i,s=this.maxDate;if(!this.maxSpan||this.maxDate&&!this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)||(s=this.startDate.clone().add(this.maxSpan)),"left"==t)a=this.startDate.clone(),i=this.minDate;else if("right"==t){a=this.endDate.clone(),i=this.startDate;var n=this.container.find(".drp-calendar.right .calendar-time");if(""!=n.html()&&(a.hour(isNaN(a.hour())?n.find(".hourselect option:selected").val():a.hour()),a.minute(isNaN(a.minute())?n.find(".minuteselect option:selected").val():a.minute()),a.second(isNaN(a.second())?n.find(".secondselect option:selected").val():a.second()),!this.timePicker24Hour)){var r=n.find(".ampmselect option:selected").val();"PM"===r&&a.hour()<12&&a.hour(a.hour()+12),"AM"===r&&12===a.hour()&&a.hour(0)}a.isBefore(this.startDate)&&(a=this.startDate.clone()),s&&a.isAfter(s)&&(a=s.clone())}e='<select class="hourselect">';for(var o=this.timePicker24Hour?0:1,h=this.timePicker24Hour?23:12,l=o;l<=h;l++){var c=l;this.timePicker24Hour||(c=a.hour()>=12?12==l?12:l+12:12==l?0:l);var d=a.clone().hour(c),m=!1;i&&d.minute(59).isBefore(i)&&(m=!0),s&&d.minute(0).isAfter(s)&&(m=!0),c!=a.hour()||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+l+"</option>":'<option value="'+l+'">'+l+"</option>":e+='<option value="'+l+'" selected="selected">'+l+"</option>"}e+="</select> ",e+=': <select class="minuteselect">';for(l=0;l<60;l+=this.timePickerIncrement){var p=l<10?"0"+l:l;d=a.clone().minute(l),m=!1;i&&d.second(59).isBefore(i)&&(m=!0),s&&d.second(0).isAfter(s)&&(m=!0),a.minute()!=l||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+p+"</option>":'<option value="'+l+'">'+p+"</option>":e+='<option value="'+l+'" selected="selected">'+p+"</option>"}if(e+="</select> ",this.timePickerSeconds){e+=': <select class="secondselect">';for(l=0;l<60;l++){p=l<10?"0"+l:l,d=a.clone().second(l),m=!1;i&&d.isBefore(i)&&(m=!0),s&&d.isAfter(s)&&(m=!0),a.second()!=l||m?e+=m?'<option value="'+l+'" disabled="disabled" class="disabled">'+p+"</option>":'<option value="'+l+'">'+p+"</option>":e+='<option value="'+l+'" selected="selected">'+p+"</option>"}e+="</select> "}if(!this.timePicker24Hour){e+='<select class="ampmselect">';var f="",u="";i&&a.clone().hour(12).minute(0).second(0).isBefore(i)&&(f=' disabled="disabled" class="disabled"'),s&&a.clone().hour(0).minute(0).second(0).isAfter(s)&&(u=' disabled="disabled" class="disabled"'),a.hour()>=12?e+='<option value="AM"'+f+'>AM</option><option value="PM" selected="selected"'+u+">PM</option>":e+='<option value="AM" selected="selected"'+f+'>AM</option><option value="PM"'+u+">PM</option>",e+="</select>"}this.container.find(".drp-calendar."+t+" .calendar-time").html(e)}},updateFormInputs:function(){this.singleDatePicker||this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate))?this.container.find("button.applyBtn").prop("disabled",!1):this.container.find("button.applyBtn").prop("disabled",!0)},move:function(){var t,a={top:0,left:0},i=this.drops,s=e(window).width();switch(this.parentEl.is("body")||(a={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()},s=this.parentEl[0].clientWidth+this.parentEl.offset().left),i){case"auto":(t=this.element.offset().top+this.element.outerHeight()-a.top)+this.container.outerHeight()>=this.parentEl[0].scrollHeight&&(t=this.element.offset().top-this.container.outerHeight()-a.top,i="up");break;case"up":t=this.element.offset().top-this.container.outerHeight()-a.top;break;default:t=this.element.offset().top+this.element.outerHeight()-a.top}this.container.css({top:0,left:0,right:"auto"});var n=this.container.outerWidth();if(this.container.toggleClass("drop-up","up"==i),"left"==this.opens){var r=s-this.element.offset().left-this.element.outerWidth();n+r>e(window).width()?this.container.css({top:t,right:"auto",left:9}):this.container.css({top:t,right:r,left:"auto"})}else if("center"==this.opens){(o=this.element.offset().left-a.left+this.element.outerWidth()/2-n/2)<0?this.container.css({top:t,right:"auto",left:9}):o+n>e(window).width()?this.container.css({top:t,left:"auto",right:0}):this.container.css({top:t,left:o,right:"auto"})}else{var o;(o=this.element.offset().left-a.left)+n>e(window).width()?this.container.css({top:t,left:"auto",right:0}):this.container.css({top:t,left:o,right:"auto"})}},show:function(t){this.isShowing||(this._outsideClickProxy=e.proxy(function(t){this.outsideClick(t)},this),e(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy),e(window).on("resize.daterangepicker",e.proxy(function(t){this.move(t)},this)),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.previousRightTime=this.endDate.clone(),this.updateView(),this.container.show(),this.move(),this.element.trigger("show.daterangepicker",this),this.isShowing=!0)},hide:function(t){this.isShowing&&(this.endDate||(this.startDate=this.oldStartDate.clone(),this.endDate=this.oldEndDate.clone()),this.startDate.isSame(this.oldStartDate)&&this.endDate.isSame(this.oldEndDate)||this.callback(this.startDate.clone(),this.endDate.clone(),this.chosenLabel),this.updateElement(),e(document).off(".daterangepicker"),e(window).off(".daterangepicker"),this.container.hide(),this.element.trigger("hide.daterangepicker",this),this.isShowing=!1)},toggle:function(t){this.isShowing?this.hide():this.show()},outsideClick:function(t){var a=e(t.target);"focusin"==t.type||a.closest(this.element).length||a.closest(this.container).length||a.closest(".calendar-table").length||(this.hide(),this.element.trigger("outsideClick.daterangepicker",this))},showCalendars:function(){this.container.addClass("show-calendar"),this.move(),this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar"),this.element.trigger("hideCalendar.daterangepicker",this)},clickRange:function(t){var e=t.target.getAttribute("data-range-key");if(this.chosenLabel=e,e==this.locale.customRangeLabel){this.startDate=moment().subtract(1, 'days').startOf('day');this.endDate=moment().endOf('day');this.leftCalendar.month=moment().startOf('month');this.rightCalendar.month=moment().startOf('month').add(1, 'month');this.container.find(".drp-selected").html(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format));this.showCalendars();this.updateCalendars()}else{var a=this.ranges[e];this.startDate=a[0],this.endDate=a[1],this.timePicker||(this.startDate.startOf('day'),this.endDate.endOf('day')),this.alwaysShowCalendars||this.hideCalendars(),this.clickApply()}},clickPrev:function(t){e(t.target).parents(".drp-calendar").hasClass("left")?(this.leftCalendar.month.subtract(1,"month"),this.linkedCalendars&&this.rightCalendar.month.subtract(1,"month")):this.rightCalendar.month.subtract(1,"month"),this.updateCalendars()},clickNext:function(t){e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.month.add(1,"month"):(this.rightCalendar.month.add(1,"month"),this.linkedCalendars&&this.leftCalendar.month.add(1,"month")),this.updateCalendars()},hoverDate:function(t){if(e(t.target).hasClass("available")){var a=e(t.target).attr("data-title"),i=a.substr(1,1),s=a.substr(3,1),n=e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.calendar[i][s]:this.rightCalendar.calendar[i][s],r=this.leftCalendar,o=this.rightCalendar,h=this.startDate;this.endDate||this.container.find(".drp-calendar tbody td").each(function(t,a){if(!e(a).hasClass("week")){var i=e(a).attr("data-title"),s=i.substr(1,1),l=i.substr(3,1),c=e(a).parents(".drp-calendar").hasClass("left")?r.calendar[s][l]:o.calendar[s][l];c.isAfter(h)&&c.isBefore(n)||c.isSame(n,"day")?e(a).addClass("in-range"):e(a).removeClass("in-range")}})}},clickDate:function(t){if(e(t.target).hasClass("available")){var a=e(t.target).attr("data-title"),i=a.substr(1,1),s=a.substr(3,1),n=e(t.target).parents(".drp-calendar").hasClass("left")?this.leftCalendar.calendar[i][s]:this.rightCalendar.calendar[i][s];if(this.endDate||n.isBefore(this.startDate,"day")){if(this.timePicker){var r=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".left .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);var o=parseInt(this.container.find(".left .minuteselect").val(),10);isNaN(o)&&(o=parseInt(this.container.find(".left .minuteselect option:last").val(),10));var h=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;n=n.clone().hour(r).minute(o).second(h)}this.endDate=null,this.setStartDate(n.clone())}else if(!this.endDate&&n.isBefore(this.startDate))this.setEndDate(this.startDate.clone());else{if(this.timePicker){var l;r=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour)"PM"===(l=this.container.find(".right .ampmselect").val())&&r<12&&(r+=12),"AM"===l&&12===r&&(r=0);o=parseInt(this.container.find(".right .minuteselect").val(),10);isNaN(o)&&(o=parseInt(this.container.find(".right .minuteselect option:last").val(),10));h=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;n=n.clone().hour(r).minute(o).second(h)}this.setEndDate(n.clone()),this.autoApply&&(this.calculateChosenLabel(),this.clickApply())}this.singleDatePicker&&(this.setEndDate(this.startDate),!this.timePicker&&this.autoApply&&this.clickApply()),this.updateView(),t.stopPropagation()}},calculateChosenLabel:function(){var t=!0,e=0;for(var a in this.ranges){if(this.timePicker){var i=this.timePickerSeconds?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD HH:mm";if(this.startDate.format(i)==this.ranges[a][0].format(i)&&this.endDate.format(i)==this.ranges[a][1].format(i)){t=!1,this.chosenLabel=this.container.find(".ranges li:eq("+e+")").addClass("active").attr("data-range-key");break}}else if(this.startDate.format("YYYY-MM-DD")==this.ranges[a][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[a][1].format("YYYY-MM-DD")){t=!1,this.chosenLabel=this.container.find(".ranges li:eq("+e+")").addClass("active").attr("data-range-key");break}e++}t&&(this.showCustomRangeLabel?this.chosenLabel=this.container.find(".ranges li:last").addClass("active").attr("data-range-key"):this.chosenLabel=null,this.showCalendars())},clickApply:function(t){this.hide(),this.element.trigger("apply.daterangepicker",this)},clickCancel:function(t){this.startDate=this.oldStartDate,this.endDate=this.oldEndDate,this.hide(),this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(t){var a=e(t.target).closest(".drp-calendar").hasClass("left"),i=a?"left":"right",s=this.container.find(".drp-calendar."+i),n=parseInt(s.find(".monthselect").val(),10),r=s.find(".yearselect").val();a||(r<this.startDate.year()||r==this.startDate.year()&&n<this.startDate.month())&&(n=this.startDate.month(),r=this.startDate.year()),this.minDate&&(r<this.minDate.year()||r==this.minDate.year()&&n<this.minDate.month())&&(n=this.minDate.month(),r=this.minDate.year()),this.maxDate&&(r>this.maxDate.year()||r==this.maxDate.year()&&n>this.maxDate.month())&&(n=this.maxDate.month(),r=this.maxDate.year()),a?(this.leftCalendar.month.month(n).year(r),this.linkedCalendars&&(this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month"))):(this.rightCalendar.month.month(n).year(r),this.linkedCalendars&&(this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month"))),this.updateCalendars()},timeChanged:function(t){var a = e(t.target).closest(".drp-calendar"),
    /**
     * SITE123 Custom Overwrite for DateRangePicker - We had an issue that when the user clicks 
     * on the Custom Ranges and the "All" dates option is the selected option he got and error 
     * of Invalid Date. We added this override to fix that issue, now we select the "Yesterday - 
     * Today" dates range by default.
     */
    i = a.hasClass("left"),
    s = parseInt(a.find(".hourselect").val(), 10),
    n = parseInt(a.find(".minuteselect").val(), 10);

    isNaN(n) && (n = parseInt(a.find(".minuteselect option:last").val(), 10));
    
    var r = this.timePickerSeconds ? parseInt(a.find(".secondselect").val(), 10) : 0;
    
    if (!this.timePicker24Hour) {
        var o = a.find(".ampmselect").val();
        if ("PM" === o && s < 12) s += 12;
        if ("AM" === o && 12 === s) s = 0;
    }
    
    if (i) {
        var h = this.startDate.clone();
        h.hour(s).minute(n).second(r);
        this.setStartDate(h);
        if (this.singleDatePicker) {
            this.endDate = this.startDate.clone();
        } else if (this.endDate && this.endDate.format("YYYY-MM-DD") == h.format("YYYY-MM-DD") && this.endDate.isBefore(h)) {
            this.setEndDate(h.clone());
        }
    } else if (this.endDate) {
        var l = this.endDate.clone();
        l.hour(s).minute(n).second(r);
        this.setEndDate(l);
    }
    
    this.updateCalendars();
    this.updateFormInputs();
    this.renderTimePicker("left");
    this.renderTimePicker("right");
},elementChanged:function(){if(this.element.is("input")&&this.element.val().length){var e=this.element.val().split(this.locale.separator),a=null,i=null;2===e.length&&(a=t(e[0],this.locale.format),i=t(e[1],this.locale.format)),(this.singleDatePicker||null===a||null===i)&&(i=a=t(this.element.val(),this.locale.format)),a.isValid()&&i.isValid()&&(this.setStartDate(a),this.setEndDate(i),this.updateView())}},keydown:function(t){9!==t.keyCode&&13!==t.keyCode||this.hide(),27===t.keyCode&&(t.preventDefault(),t.stopPropagation(),this.hide())},updateElement:function(){if(this.element.is("input")&&this.autoUpdateInput){var t=this.startDate.format(this.locale.format);this.singleDatePicker||(t+=this.locale.separator+this.endDate.format(this.locale.format)),t!==this.element.val()&&this.element.val(t).trigger("change")}},remove:function(){this.container.remove(),this.element.off(".daterangepicker"),this.element.removeData()}},e.fn.daterangepicker=function(t,i){var s=e.extend(!0,{},e.fn.daterangepicker.defaultOptions,t);return this.each(function(){var t=e(this);t.data("daterangepicker")&&t.data("daterangepicker").remove(),t.data("daterangepicker",new a(t,s,i))}),this},a});
//# sourceMappingURL=/sm/f07d8d7b2652873f485707eab4f3d300bf1f6f3b42912e189c8933b1b9b3dfde.map
var LanguageModalWidget = function() {var _ = {$bootbox: '',languages: {'en': 'English','fr': 'Français','es': 'Español','pt': 'Português (Brazil)','de': 'Deutsch','it': 'Italiano','nl': 'Dutch','ru': 'Русский','ja': '日本語','ko': '한국어','pl': 'Polski','tr': 'Türkçe','ar': 'العربية','he': 'עברית','hu': 'Magyar','se': 'Svenska','no': 'Norsk','ro': 'Română','gr': 'Ελληνικά','zh-cn': '中文','zh-tw': '中國傳統的','hi': 'हिंदी','cs': 'Čeština','da': 'dansk','hr': 'Hrvatski','ua': 'Українська','af': 'Afrikaans','sq': 'Albanian','hy': 'Armenian','az': 'Azerbaijani','be': 'Belarusian','bg': 'Bulgarian','ca': 'Catalan','et': 'Estonian','fi': 'Finnish','gl': 'Galician','ka': 'Georgian','is': 'Icelandic','ga': 'Irish','kk': 'Kazakh','lo': 'Lao','lv': 'Latvian','lt': 'Lithuanian','lb': 'Luxembourgish','mk': 'Macedonian','ms': 'Malay','mt': 'Maltese','mn': 'Mongolian','sk': 'Slovak','sl': 'Slovenian','th': 'Thai','tk': 'Turkmen','cy': 'Welsh'}};_.init = function( settings ) {_.translations = settings.translations;_.domain = settings.domain;_.language = settings.language;_.tool = settings.tool;_.refresh();$(document).on('LanguageModalWidget.refresh',function(){_.refresh();});};_.createContent = function( data, $input ) {let html = '';html+= '<ul class="languages-modal-list fancy-scrollbar">';for (const [key, text] of Object.entries(_.languages)) {html+= '<li class="languages-modal-item '+(_.language == key ? 'active' : '')+'" data-id="'+key+'">';html+= '<a class="languages-modal-link">'+text+'</a>';html+='</li>';}
html+= '</ul>';let $html = $(html);$html.find('.languages-modal-item').on('click', function() {let lan = $(this).data('id');_.clickEvent(lan);_.$bootbox.modal('hide');});return $html;}
_.clickEvent = function( lan ) {const pageRelativePath = window.location.pathname + window.location.search;var full_domain;if (lan=='en') {full_domain = 'www.'+_.domain+'.com';} else {full_domain = lan+'.'+_.domain+'.com';}
if ( _.tool == 'website' ) {if (pageRelativePath.includes("support/")) {location.href = 'https://'+full_domain+''+pageRelativePath;} else {location.href = 'https://'+full_domain+'/manager/websites/include/changeUserCountry.php?changeLan=1';}} else if ( _.tool == 'login' ) {location.href = location.href.split('&').length > 1 ?location.href.replace(/(l=).*?(&)/,'$1' + lan + '$2')
: location.href.replace(/(l=).*/,'$1' + lan);;}}
_.showModal = function( content ) {_.$bootbox = bootbox.dialog({message: content,backdrop: true,closeButton: true,onEscape: true,show: false,className: 'languagesModalWidget',})
.on('show.bs.modal', function() {})
.modal('show');}
_.chineseDialects = () => {if ( _.language.substr(0,3) === 'zh-' ) {_.language = _.language === 'zh-cht' ? 'zh-tw' : 'zh-cn';}}
_.refresh = function( settings ) {$('.languageModalElement').each(function(index, ele) {var $this = $(this);_.chineseDialects();if ( $this.data('show-lan-text') && (_.language in _.languages) ) {$this.append('<span>'+_.languages[_.language]+'</span>');}
$this.on('click',function() {_.showModal(_.createContent());});});};return _;}();
var InvalidEmailHandler = function() {var _ = {$email: null,$emailSuggestion: null,translations: null,};_.ieh_init = function( settings ) {_.$email = settings.$email;_.$emailSuggestion = settings.$emailSuggestion;_.translations = settings.translations;_.$email.on('input',function( event ) {var $input = $(this);reset();clearTimeout($input.typingDelay);$input.typingDelay = setTimeout(function() {var email = $input.val();email = email.replace(/\s/g,'');if ( !emailValidator(email) ) return;var fixedEmail = tryFixUserEmailMistake(email);if ( email != fixedEmail ) {_.$emailSuggestion.html(`<b>${_.translations.emailSuggestion}</b> <a href="#" class="suggested-email" style="direction: ltr;">${fixedEmail}</a> ?`);}},300);});_.$emailSuggestion.on('click','.suggested-email', function( event ) {event.preventDefault();_.$email.val($(this).text());reset();});};function emailValidator( email ) {return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);}
function reset() {_.$emailSuggestion.empty();}
function tryFixUserEmailMistake( email ) {var providers = {'@gmail.com': ['@gmal.com','@gmail.co','@gmali.com','@gimal.com','@gmaill.com','@gemail.com','@gmail.om','@gmeil.com','@gmail.cim','@gmail.c','@gmaii.com','@gmail.ru','@gmail.com.com','@gmail.come','@gmaail.com','@gmaul.com','@gimel.com','@gmail.comcom','@gmail.ocm','@gemil.com','@gmail.c0m','@gmail.cmo','@gmaik.com','@giml.com','@gmile.com','@gmail.co.uk','@gmail.ccom','@g.mail.com','@gmail.coma','@gmail.com.br','@gmail.com.mx','@gmmail.com','@gmail.comn','@gimil.com','@gmail.org','@gomail.com','@g-mail.com','@gmail.xom','@gmqil.com','@gmail.col','@gmail.cok','@gmail.coml','@gmila.com','@ggmail.com','@gamile.com','@gmail.net','@gmall.com','@gmaile.com','@gmail.clm','@gmale.com','@gmail.cam','@gnail.con','@gamil.con','@gmail.conm','@gmil.com','@gmai.com','@gami.com','@gmal.com','@gemil.com','@gmail.con','@gmaul.com','@gamil.com','@gmailo.com','@gnail.com','@gmile.com','@gmail.co','@gmial.com','@gmail.om','@gmaail.com','@gimail.com','@gmaol.com','@gmaill.com','@gmail.cm','@gmeil.com','@gmsil.com','@gmaiil.com','@gimal.com','@gamil.cpm','@gail.com','@gamile.com','@gmail.c','@gmail.vom','@gmail.c0m','@gmaik.com','@gmali.com','@ggmail.com'],'@outlook.com': ['@outloo.com','@outlok.com','@outluk.co','@outook.com','@outloook.com','@outllok.com','@outlool.com','@outloock.com','@outllook.com'],'@hotmail.com': ['@hotmai.com','@hotmil.com','@hotmial.com','@hotmal.com','@hotmali.com','@hotmeil.com','@hotmaill.com','@hotamil.com','@hotnail.com','@hotmill.com','@hotmaii.com','@hotmail.cmo'],'@icloud.com': ['@icloud.con','@iclod.com','@iclou.com','@icloud.cim','@iclould.com','@icloub.com','@icloud.moc','@icloyd.cim','@icloud.co','@icloud.cm','@iclond.com','@iclouf.com','@icload.com','@icloud.come','@icloiud.com','@icloud.coom','@icloud.comm'],'@yahoo.com': ['@yaho.com','@yaoo.com','@yahooo.com','@yahoo.kong','@yahho.com','@yahoo.vom','@yahoo.cpm']};for ( var provider in providers ) {var invalidPatterns = providers[provider];for ( var invalidPatternsKey in invalidPatterns ) {if ( invalidPatterns[invalidPatternsKey].indexOf('@') == -1 ) continue;if ( email.toLowerCase().indexOf(invalidPatterns[invalidPatternsKey]) != -1 ) {email = email.replace(new RegExp(invalidPatterns[invalidPatternsKey] + '$','i'),provider);}}}
return email;}
return _;}();
var TogglePassword = function() {return {init: function() {$('input[data-show-password="true"]').each(function(index, value) {var $inputOBJ = $(this);TogglePassword.preventBrowserAutofill($inputOBJ);TogglePassword.create($inputOBJ);});},create: function( $inputOBJ ) {const $html = $('<div class="show-password-toggle"><i class="s-p-icon fa fa-eye-slash"></i></div>');TogglePassword.addClickEvent($html,$inputOBJ);$html.css("display", "none");$html.insertAfter($inputOBJ);let eyeInteracting = false;$inputOBJ.on('focus', function() {$html.show();});$inputOBJ.on('blur', function() {setTimeout(function() {if (!eyeInteracting) {$html.hide();}}, 100);});$html.on('mousedown', function(e) {eyeInteracting = true;e.preventDefault();});$(document).on('mouseup', function() {setTimeout(function() {eyeInteracting = false;if (!$inputOBJ.is(':focus')) {$html.hide();}}, 100);});},addClickEvent: function( $html, $inputOBJ ) {$html.on('click', function(e) {const icon = $(this).find('.s-p-icon');if (icon.hasClass('fa-eye-slash')) {icon.removeClass('fa-eye-slash').addClass('fa-eye');$inputOBJ.attr('type', 'text');} else {icon.removeClass('fa-eye').addClass('fa-eye-slash');$inputOBJ.attr('type', 'password');}
$inputOBJ.focus();e.stopPropagation();});},preventBrowserAutofill: function( $inputOBJ ) {if ( $inputOBJ.val().length === 0 ) {$inputOBJ.attr('readonly',true);}
setTimeout(function() {$inputOBJ.removeAttr('readonly');},1000);}};}();jQuery(function($) {TogglePassword.init();});
!function ($) {"use strict";// jshint ;_;
if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {ko.bindingHandlers.multiselect = {after: ['options', 'value', 'selectedOptions', 'enable', 'disable'],init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {var $element = $(element);var config = ko.toJS(valueAccessor());$element.multiselect(config);if (allBindings.has('options')) {var options = allBindings.get('options');if (ko.isObservable(options)) {ko.computed({read: function() {options();setTimeout(function() {var ms = $element.data('multiselect');if (ms)
ms.updateOriginalOptions();//Not sure how beneficial this is.
$element.multiselect('rebuild');}, 1);},disposeWhenNodeIsRemoved: element});}}
if (allBindings.has('value')) {var value = allBindings.get('value');if (ko.isObservable(value)) {ko.computed({read: function() {value();setTimeout(function() {$element.multiselect('refresh');}, 1);},disposeWhenNodeIsRemoved: element}).extend({ rateLimit: 100, notifyWhenChangesStop: true });}}
if (allBindings.has('selectedOptions')) {var selectedOptions = allBindings.get('selectedOptions');if (ko.isObservable(selectedOptions)) {ko.computed({read: function() {selectedOptions();setTimeout(function() {$element.multiselect('refresh');}, 1);},disposeWhenNodeIsRemoved: element}).extend({ rateLimit: 100, notifyWhenChangesStop: true });}}
var setEnabled = function (enable) {setTimeout(function () {if (enable)
$element.multiselect('enable');else
$element.multiselect('disable');});};if (allBindings.has('enable')) {var enable = allBindings.get('enable');if (ko.isObservable(enable)) {ko.computed({read: function () {setEnabled(enable());},disposeWhenNodeIsRemoved: element}).extend({ rateLimit: 100, notifyWhenChangesStop: true });} else {setEnabled(enable);}}
if (allBindings.has('disable')) {var disable = allBindings.get('disable');if (ko.isObservable(disable)) {ko.computed({read: function () {setEnabled(!disable());},disposeWhenNodeIsRemoved: element}).extend({ rateLimit: 100, notifyWhenChangesStop: true });} else {setEnabled(!disable);}}
ko.utils.domNodeDisposal.addDisposeCallback(element, function() {$element.multiselect('destroy');});},update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {var $element = $(element);var config = ko.toJS(valueAccessor());$element.multiselect('setOptions', config);$element.multiselect('rebuild');}};}
function forEach(array, callback) {for (var index = 0; index < array.length; ++index) {callback(array[index], index);}}
function Multiselect(select, options) {this.$select = $(select);this.options = this.mergeOptions($.extend({}, options, this.$select.data()));if (this.$select.attr("data-placeholder")) {this.options.nonSelectedText = this.$select.data("placeholder");}
this.originalOptions = this.$select.clone()[0].options;this.query = '';this.searchTimeout = null;this.lastToggledInput = null;this.options.multiple = this.$select.attr('multiple') === "multiple";this.options.onChange = $.proxy(this.options.onChange, this);this.options.onSelectAll = $.proxy(this.options.onSelectAll, this);this.options.onDeselectAll = $.proxy(this.options.onDeselectAll, this);this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);this.options.onDropdownShown = $.proxy(this.options.onDropdownShown, this);this.options.onDropdownHidden = $.proxy(this.options.onDropdownHidden, this);this.options.onInitialized = $.proxy(this.options.onInitialized, this);this.options.onFiltering = $.proxy(this.options.onFiltering, this);this.buildContainer();this.buildButton();this.buildDropdown();this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll(true);if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}
this.options.wasDisabled = this.$select.prop('disabled');if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {this.disable();}
this.$select.wrap('<span class="multiselect-native-select" />').after(this.$container);this.options.onInitialized(this.$select, this.$container);}
Multiselect.prototype = {defaults: {buttonText: function(options, select) {if (this.disabledText.length > 0
&& (select.prop('disabled') || (options.length == 0 && this.disableIfEmpty)))  {return this.disabledText;}
else if (options.length === 0) {return this.nonSelectedText;}
else if (this.allSelectedText
&& options.length === $('option', $(select)).length
&& $('option', $(select)).length !== 1
&& this.multiple) {if (this.selectAllNumber) {return this.allSelectedText + ' (' + options.length + ')';}
else {return this.allSelectedText;}}
else if (options.length > this.numberDisplayed) {return options.length + ' ' + this.nSelectedText;}
else {var selected = '';var delimiter = this.delimiterText;options.each(function() {var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();selected += label + delimiter;});return selected.substr(0, selected.length - this.delimiterText.length);}},buttonTitle: function(options, select) {if (options.length === 0) {return this.nonSelectedText;}
else {var selected = '';var delimiter = this.delimiterText;options.each(function () {var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();selected += label + delimiter;});return selected.substr(0, selected.length - this.delimiterText.length);}},checkboxName: function(option) {return false; // no checkbox name
},optionLabel: function(element){return $(element).attr('label') || $(element).text();},optionClass: function(element) {return $(element).attr('class') || '';},onChange : function(option, checked) {},onDropdownShow: function(event) {},onDropdownHide: function(event) {},onDropdownShown: function(event) {},onDropdownHidden: function(event) {},onSelectAll: function() {},onDeselectAll: function() {},onInitialized: function($select, $container) {},onFiltering: function($filter) {},enableHTML: false,buttonClass: 'form-control',inheritClass: false,buttonWidth: 'auto',buttonContainer: '<div class="btn-group" />',dropRight: false,dropUp: false,selectedClass: 'active',maxHeight: false,includeSelectAllOption: false,includeSelectAllIfMoreThan: 0,selectAllText: ' Select all',selectAllValue: 'multiselect-all',selectAllName: false,selectAllNumber: true,selectAllJustVisible: true,enableFiltering: false,enableCaseInsensitiveFiltering: false,enableFullValueFiltering: false,enableClickableOptGroups: false,enableCollapsibleOptGroups: false,filterPlaceholder: 'Search',filterBehavior: 'text',includeFilterClearBtn: true,preventInputChangeEvent: false,nonSelectedText: 'None selected',nSelectedText: 'selected',allSelectedText: 'All selected',numberDisplayed: 3,disableIfEmpty: false,disabledText: '',delimiterText: ', ',templates: {button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',ul: '<ul class="multiselect-container dropdown-menu"></ul>',filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',li: '<li><a tabindex="0"><label></label></a></li>',divider: '<li class="multiselect-item divider"></li>',liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'}},constructor: Multiselect,buildContainer: function() {this.$container = $(this.options.buttonContainer);this.$container.on('show.bs.dropdown', this.options.onDropdownShow);this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);},buildButton: function() {this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);if (this.$select.attr('class') && this.options.inheritClass) {this.$button.addClass(this.$select.attr('class'));}
if (this.$select.prop('disabled')) {this.disable();}
else {this.enable();}
if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {this.$button.css({'width' : '100%', //this.options.buttonWidth,
'overflow' : 'hidden','text-overflow' : 'ellipsis'});this.$container.css({'width': this.options.buttonWidth});}
var tabindex = this.$select.attr('tabindex');if (tabindex) {this.$button.attr('tabindex', tabindex);}
this.$container.prepend(this.$button);},buildDropdown: function() {this.$ul = $(this.options.templates.ul);if (this.options.dropRight) {this.$ul.addClass('pull-right');}
if (this.options.maxHeight) {this.$ul.css({'max-height': this.options.maxHeight + 'px','overflow-y': 'auto','overflow-x': 'hidden'});}
if (this.options.dropUp) {var height = Math.min(this.options.maxHeight, $('option[data-role!="divider"]', this.$select).length*26 + $('option[data-role="divider"]', this.$select).length*19 + (this.options.includeSelectAllOption ? 26 : 0) + (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering ? 44 : 0));var moveCalc = height + 34;this.$ul.css({'max-height': height + 'px','overflow-y': 'auto','overflow-x': 'hidden','margin-top': "-" + moveCalc + 'px'});}
this.$container.append(this.$ul);},buildDropdownOptions: function() {this.$select.children().each($.proxy(function(index, element) {var $element = $(element);var tag = $element.prop('tagName')
.toLowerCase();if ($element.prop('value') === this.options.selectAllValue) {return;}
if (tag === 'optgroup') {this.createOptgroup(element);}
else if (tag === 'option') {if ($element.data('role') === 'divider') {this.createDivider();}
else {this.createOptionValue(element);}}}, this));$('li:not(.multiselect-group) input', this.$ul).on('change', $.proxy(function(event) {var $target = $(event.target);var checked = $target.prop('checked') || false;var isSelectAllOption = $target.val() === this.options.selectAllValue;if (this.options.selectedClass) {if (checked) {$target.closest('li')
.addClass(this.options.selectedClass);}
else {$target.closest('li')
.removeClass(this.options.selectedClass);}}
var value = $target.val();var $option = this.getOptionByValue(value);var $optionsNotThis = $('option', this.$select).not($option);var $checkboxesNotThis = $('input', this.$container).not($target);if (isSelectAllOption) {if (checked) {this.selectAll(this.options.selectAllJustVisible, true);}
else {this.deselectAll(this.options.selectAllJustVisible, true);}}
else {if (checked) {$option.prop('selected', true);if (this.options.multiple) {$option.prop('selected', true);}
else {if (this.options.selectedClass) {$($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass);}
$($checkboxesNotThis).prop('checked', false);$optionsNotThis.prop('selected', false);this.$button.click();}
if (this.options.selectedClass === "active") {$optionsNotThis.closest("a").css("outline", "");}}
else {$option.prop('selected', false);}
this.options.onChange($option, checked);this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}}
this.$select.change();this.updateButtonText();if(this.options.preventInputChangeEvent) {return false;}}, this));$('li a', this.$ul).on('mousedown', function(e) {if (e.shiftKey) {return false;}});$('li a', this.$ul).on('touchstart click', $.proxy(function(event) {event.stopPropagation();var $target = $(event.target);if (event.shiftKey && this.options.multiple) {if($target.is("label")){ // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
event.preventDefault();$target = $target.find("input");$target.prop("checked", !$target.prop("checked"));}
var checked = $target.prop('checked') || false;if (this.lastToggledInput !== null && this.lastToggledInput !== $target) { // Make sure we actually have a range
var from = $target.closest("li").index();var to = this.lastToggledInput.closest("li").index();if (from > to) { // Swap the indices
var tmp = to;to = from;from = tmp;}
++to;var range = this.$ul.find("li").slice(from, to).find("input");range.prop('checked', checked);if (this.options.selectedClass) {range.closest('li')
.toggleClass(this.options.selectedClass, checked);}
for (var i = 0, j = range.length; i < j; i++) {var $checkbox = $(range[i]);var $option = this.getOptionByValue($checkbox.val());$option.prop('selected', checked);}}
$target.trigger("change");}
if($target.is("input") && !$target.closest("li").is(".multiselect-item")){this.lastToggledInput = $target;}
$target.blur();}, this));this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function(event) {if ($('input[type="text"]', this.$container).is(':focus')) {return;}
if (event.keyCode === 9 && this.$container.hasClass('open')) {this.$button.click();}
else {var $items = $(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");if (!$items.length) {return;}
var index = $items.index($items.filter(':focus'));if (event.keyCode === 38 && index > 0) {index--;}
else if (event.keyCode === 40 && index < $items.length - 1) {index++;}
else if (!~index) {index = 0;}
var $current = $items.eq(index);$current.focus();if (event.keyCode === 32 || event.keyCode === 13) {var $checkbox = $current.find('input');$checkbox.prop("checked", !$checkbox.prop("checked"));$checkbox.change();}
event.stopPropagation();event.preventDefault();}}, this));if (this.options.enableClickableOptGroups && this.options.multiple) {$("li.multiselect-group input", this.$ul).on("change", $.proxy(function(event) {event.stopPropagation();var $target = $(event.target);var checked = $target.prop('checked') || false;var $li = $(event.target).closest('li');var $group = $li.nextUntil("li.multiselect-group")
.not('.multiselect-filter-hidden')
.not('.disabled');var $inputs = $group.find("input");var values = [];var $options = [];if (this.options.selectedClass) {if (checked) {$li.addClass(this.options.selectedClass);}
else {$li.removeClass(this.options.selectedClass);}}
$.each($inputs, $.proxy(function(index, input) {var value = $(input).val();var $option = this.getOptionByValue(value);if (checked) {$(input).prop('checked', true);$(input).closest('li')
.addClass(this.options.selectedClass);$option.prop('selected', true);}
else {$(input).prop('checked', false);$(input).closest('li')
.removeClass(this.options.selectedClass);$option.prop('selected', false);}
$options.push(this.getOptionByValue(value));}, this))
this.options.onChange($options, checked);this.updateButtonText();this.updateSelectAll();}, this));}
if (this.options.enableCollapsibleOptGroups && this.options.multiple) {$("li.multiselect-group .caret-container", this.$ul).on("click", $.proxy(function(event) {var $li = $(event.target).closest('li');var $inputs = $li.nextUntil("li.multiselect-group")
.not('.multiselect-filter-hidden');var visible = true;$inputs.each(function() {visible = visible && $(this).is(':visible');});if (visible) {$inputs.hide()
.addClass('multiselect-collapsible-hidden');}
else {$inputs.show()
.removeClass('multiselect-collapsible-hidden');}}, this));$("li.multiselect-all", this.$ul).css('background', '#f3f3f3').css('border-bottom', '1px solid #eaeaea');$("li.multiselect-all > a > label.checkbox", this.$ul).css('padding', '3px 20px 3px 35px');$("li.multiselect-group > a > input", this.$ul).css('margin', '4px 0px 5px -20px');}},createOptionValue: function(element) {var $element = $(element);if ($element.is(':selected')) {$element.prop('selected', true);}
var label = this.options.optionLabel(element);var classes = this.options.optionClass(element);var value = $element.val();var inputType = this.options.multiple ? "checkbox" : "radio";var $li = $(this.options.templates.li);var $label = $('label', $li);$label.addClass(inputType);$li.addClass(classes);var $checkbox = $('<input/>').attr('type', inputType);$checkbox.addClass('ace input-lg');var name = this.options.checkboxName($element);if (name) {$checkbox.attr('name', name);}
$label.prepend($checkbox);var $labelSpan = $('<span class="lbl fullColor"><span class="lbl-text"></span></span>');if (this.options.enableHTML) {$labelSpan.find('.lbl-text').html(" " + label);} else {$labelSpan.find('.lbl-text').text(" " + label);}
$label.append($labelSpan);var selected = $element.prop('selected') || false;$checkbox.val(value);if (value === this.options.selectAllValue) {$li.addClass("multiselect-item multiselect-all");$checkbox.parent().parent()
.addClass('multiselect-all');}
$label.attr('title', $element.attr('title'));this.$ul.append($li);if ($element.is(':disabled')) {$checkbox.attr('disabled', 'disabled')
.prop('disabled', true)
.closest('a')
.attr("tabindex", "-1")
.closest('li')
.addClass('disabled');}
$checkbox.prop('checked', selected);if (selected && this.options.selectedClass) {$checkbox.closest('li')
.addClass(this.options.selectedClass);}},createDivider: function(element) {var $divider = $(this.options.templates.divider);this.$ul.append($divider);},createOptgroup: function(group) {var label = $(group).attr("label");var value = $(group).attr("value");var $li = $('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label><b></b></label></a></li>');var classes = this.options.optionClass(group);$li.addClass(classes);if (this.options.enableHTML) {$('label b', $li).html(" " + label);}
else {$('label b', $li).text(" " + label);}
if (this.options.enableCollapsibleOptGroups && this.options.multiple) {$('a', $li).append('<span class="caret-container"><b class="caret"></b></span>');}
if (this.options.enableClickableOptGroups && this.options.multiple) {$('a label', $li).prepend('<input type="checkbox" value="' + value + '"/>');}
if ($(group).is(':disabled')) {$li.addClass('disabled');}
this.$ul.append($li);$("option", group).each($.proxy(function($, group) {this.createOptionValue(group);}, this))},buildSelectAll: function() {if (typeof this.options.selectAllValue === 'number') {this.options.selectAllValue = this.options.selectAllValue.toString();}
var alreadyHasSelectAll = this.hasSelectAll();if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple
&& $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {if (this.options.includeSelectAllDivider) {this.$ul.prepend($(this.options.templates.divider));}
var $li = $(this.options.templates.li);$('label', $li).addClass("checkbox");if (this.options.enableHTML) {$('label', $li).html(" " + this.options.selectAllText);}
else {$('label', $li).text(" " + this.options.selectAllText);}
if (this.options.selectAllName) {$('label', $li).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />');}
else {$('label', $li).prepend('<input type="checkbox" />');}
var $checkbox = $('input', $li);$checkbox.val(this.options.selectAllValue);$li.addClass("multiselect-item multiselect-all");$checkbox.parent().parent()
.addClass('multiselect-all');this.$ul.prepend($li);$checkbox.prop('checked', false);}},buildFilter: function() {if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);if (this.$select.find('option').length >= enableFilterLength) {this.$filter = $(this.options.templates.filter);$('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);if(this.options.includeFilterClearBtn) {var clearBtn = $(this.options.templates.filterClearBtn);clearBtn.on('click', $.proxy(function(event){clearTimeout(this.searchTimeout);this.$filter.find('.multiselect-search').val('');$('li', this.$ul).show().removeClass('multiselect-filter-hidden');this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}}, this));this.$filter.find('.input-group').append(clearBtn);}
this.$ul.prepend(this.$filter);this.$filter.val(this.query).on('click', function(event) {event.stopPropagation();}).on('input keydown', $.proxy(function(event) {if (event.which === 13) {event.preventDefault();}
clearTimeout(this.searchTimeout);this.searchTimeout = this.asyncFunction($.proxy(function() {if (this.query !== event.target.value) {this.query = event.target.value;var currentGroup, currentGroupVisible;$.each($('li', this.$ul), $.proxy(function(index, element) {var value = $('input', element).length > 0 ? $('input', element).val() : "";var text = $('label', element).text();var filterCandidate = '';if ((this.options.filterBehavior === 'text')) {filterCandidate = text;}
else if ((this.options.filterBehavior === 'value')) {filterCandidate = value;}
else if (this.options.filterBehavior === 'both') {filterCandidate = text + '\n' + value;}
if (value !== this.options.selectAllValue && text) {var showElement = false;if (this.options.enableCaseInsensitiveFiltering) {filterCandidate = filterCandidate.toLowerCase();this.query = this.query.toLowerCase();}
if (this.options.enableFullValueFiltering && this.options.filterBehavior !== 'both') {var valueToMatch = filterCandidate.trim().substring(0, this.query.length);if (this.query.indexOf(valueToMatch) > -1) {showElement = true;}}
else if (filterCandidate.indexOf(this.query) > -1) {showElement = true;}
$(element).toggle(showElement)
.toggleClass('multiselect-filter-hidden', !showElement);if ($(element).hasClass('multiselect-group')) {currentGroup = element;currentGroupVisible = showElement;}
else {if (showElement) {$(currentGroup).show()
.removeClass('multiselect-filter-hidden');}
if (!showElement && currentGroupVisible) {$(element).show()
.removeClass('multiselect-filter-hidden');}}}}, this));}
this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}
this.options.onFiltering(event.target);}, this), 300, this);}, this));}}},destroy: function() {this.$container.remove();this.$select.show();this.$select.prop('disabled', this.options.wasDisabled);this.$select.data('multiselect', null);},refresh: function () {var inputs = $.map($('li input', this.$ul), $);$('option', this.$select).each($.proxy(function (index, element) {var $elem = $(element);var value = $elem.val();var $input;for (var i = inputs.length; 0 < i--; ) {if (value !== ($input = inputs[i]).val())
continue; // wrong li
if ($elem.is(':selected')) {$input.prop('checked', true);if (this.options.selectedClass) {$input.closest('li')
.addClass(this.options.selectedClass);}}
else {$input.prop('checked', false);if (this.options.selectedClass) {$input.closest('li')
.removeClass(this.options.selectedClass);}}
if ($elem.is(":disabled")) {$input.attr('disabled', 'disabled')
.prop('disabled', true)
.closest('li')
.addClass('disabled');}
else {$input.prop('disabled', false)
.closest('li')
.removeClass('disabled');}
break; // assumes unique values
}}, this));this.updateButtonText();this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}},select: function(selectValues, triggerOnChange) {if(!$.isArray(selectValues)) {selectValues = [selectValues];}
for (var i = 0; i < selectValues.length; i++) {var value = selectValues[i];if (value === null || value === undefined) {continue;}
var $option = this.getOptionByValue(value);var $checkbox = this.getInputByValue(value);if($option === undefined || $checkbox === undefined) {continue;}
if (!this.options.multiple) {this.deselectAll(false);}
if (this.options.selectedClass) {$checkbox.closest('li')
.addClass(this.options.selectedClass);}
$checkbox.prop('checked', true);$option.prop('selected', true);if (triggerOnChange) {this.options.onChange($option, true);}}
this.updateButtonText();this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}},clearSelection: function () {this.deselectAll(false);this.updateButtonText();this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}},deselect: function(deselectValues, triggerOnChange) {if(!$.isArray(deselectValues)) {deselectValues = [deselectValues];}
for (var i = 0; i < deselectValues.length; i++) {var value = deselectValues[i];if (value === null || value === undefined) {continue;}
var $option = this.getOptionByValue(value);var $checkbox = this.getInputByValue(value);if($option === undefined || $checkbox === undefined) {continue;}
if (this.options.selectedClass) {$checkbox.closest('li')
.removeClass(this.options.selectedClass);}
$checkbox.prop('checked', false);$option.prop('selected', false);if (triggerOnChange) {this.options.onChange($option, false);}}
this.updateButtonText();this.updateSelectAll();if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}},selectAll: function (justVisible, triggerOnSelectAll) {var justVisible = typeof justVisible === 'undefined' ? true : justVisible;var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');if(justVisible) {$('input:enabled' , visibleLis).prop('checked', true);visibleLis.addClass(this.options.selectedClass);$('input:enabled' , visibleLis).each($.proxy(function(index, element) {var value = $(element).val();var option = this.getOptionByValue(value);$(option).prop('selected', true);}, this));}
else {$('input:enabled' , allLis).prop('checked', true);allLis.addClass(this.options.selectedClass);$('input:enabled' , allLis).each($.proxy(function(index, element) {var value = $(element).val();var option = this.getOptionByValue(value);$(option).prop('selected', true);}, this));}
$('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', true);if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}
if (triggerOnSelectAll) {this.options.onSelectAll();}},deselectAll: function (justVisible, triggerOnDeselectAll) {var justVisible = typeof justVisible === 'undefined' ? true : justVisible;var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(':visible');if(justVisible) {$('input[type="checkbox"]:enabled' , visibleLis).prop('checked', false);visibleLis.removeClass(this.options.selectedClass);$('input[type="checkbox"]:enabled' , visibleLis).each($.proxy(function(index, element) {var value = $(element).val();var option = this.getOptionByValue(value);$(option).prop('selected', false);}, this));}
else {$('input[type="checkbox"]:enabled' , allLis).prop('checked', false);allLis.removeClass(this.options.selectedClass);$('input[type="checkbox"]:enabled' , allLis).each($.proxy(function(index, element) {var value = $(element).val();var option = this.getOptionByValue(value);$(option).prop('selected', false);}, this));}
$('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', false);if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}
if (triggerOnDeselectAll) {this.options.onDeselectAll();}},rebuild: function() {this.$ul.html('');this.options.multiple = this.$select.attr('multiple') === "multiple";this.buildSelectAll();this.buildDropdownOptions();this.buildFilter();this.updateButtonText();this.updateSelectAll(true);if (this.options.enableClickableOptGroups && this.options.multiple) {this.updateOptGroups();}
if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {this.disable();}
else {this.enable();}
if (this.options.dropRight) {this.$ul.addClass('pull-right');}},dataprovider: function(dataprovider) {var groupCounter = 0;var $select = this.$select.empty();$.each(dataprovider, function (index, option) {var $tag;if ($.isArray(option.children)) { // create optiongroup tag
groupCounter++;$tag = $('<optgroup/>').attr({label: option.label || 'Group ' + groupCounter,disabled: !!option.disabled});forEach(option.children, function(subOption) { // add children option tags
var attributes = {value: subOption.value,label: subOption.label || subOption.value,title: subOption.title,selected: !!subOption.selected,disabled: !!subOption.disabled};for (var key in subOption.attributes) {attributes['data-' + key] = subOption.attributes[key];}
$tag.append($('<option/>').attr(attributes));});}
else {var attributes = {'value': option.value,'label': option.label || option.value,'title': option.title,'class': option.class,'selected': !!option.selected,'disabled': !!option.disabled};for (var key in option.attributes) {attributes['data-' + key] = option.attributes[key];}
$tag = $('<option/>').attr(attributes);$tag.text(option.label || option.value);}
$select.append($tag);});this.rebuild();},enable: function() {this.$select.prop('disabled', false);this.$button.prop('disabled', false)
.removeClass('disabled');},disable: function() {this.$select.prop('disabled', true);this.$button.prop('disabled', true)
.addClass('disabled');},setOptions: function(options) {this.options = this.mergeOptions(options);},mergeOptions: function(options) {return $.extend(true, {}, this.defaults, this.options, options);},hasSelectAll: function() {return $('li.multiselect-all', this.$ul).length > 0;},updateOptGroups: function() {var $groups = $('li.multiselect-group', this.$ul)
var selectedClass = this.options.selectedClass;$groups.each(function() {var $options = $(this).nextUntil('li.multiselect-group')
.not('.multiselect-filter-hidden')
.not('.disabled');var checked = true;$options.each(function() {var $input = $('input', this);if (!$input.prop('checked')) {checked = false;}});if (selectedClass) {if (checked) {$(this).addClass(selectedClass);}
else {$(this).removeClass(selectedClass);}}
$('input', this).prop('checked', checked);});},updateSelectAll: function(notTriggerOnSelectAll) {if (this.hasSelectAll()) {var allBoxes = $("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled", this.$ul);var allBoxesLength = allBoxes.length;var checkedBoxesLength = allBoxes.filter(":checked").length;var selectAllLi  = $("li.multiselect-all", this.$ul);var selectAllInput = selectAllLi.find("input");if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {selectAllInput.prop("checked", true);selectAllLi.addClass(this.options.selectedClass);}
else {selectAllInput.prop("checked", false);selectAllLi.removeClass(this.options.selectedClass);}}},updateButtonText: function() {var options = this.getSelected();if (this.options.enableHTML) {$('.multiselect .multiselect-selected-text', this.$container).html(this.options.buttonText(options, this.$select));}
else {$('.multiselect .multiselect-selected-text', this.$container).text(this.options.buttonText(options, this.$select));}
$('.multiselect', this.$container).attr('title', this.options.buttonTitle(options, this.$select));},getSelected: function() {return $('option', this.$select).filter(":selected");},getOptionByValue: function (value) {var options = $('option', this.$select);var valueToCompare = value.toString();for (var i = 0; i < options.length; i = i + 1) {var option = options[i];if (option.value === valueToCompare) {return $(option);}}},getInputByValue: function (value) {var checkboxes = $('li input:not(.multiselect-search)', this.$ul);var valueToCompare = value.toString();for (var i = 0; i < checkboxes.length; i = i + 1) {var checkbox = checkboxes[i];if (checkbox.value === valueToCompare) {return $(checkbox);}}},updateOriginalOptions: function() {this.originalOptions = this.$select.clone()[0].options;},asyncFunction: function(callback, timeout, self) {var args = Array.prototype.slice.call(arguments, 3);return setTimeout(function() {callback.apply(self || window, args);}, timeout);},setAllSelectedText: function(allSelectedText) {this.options.allSelectedText = allSelectedText;this.updateButtonText();}};$.fn.multiselect = function(option, parameter, extraOptions) {return this.each(function() {var data = $(this).data('multiselect');var options = typeof option === 'object' && option;if (!data) {data = new Multiselect(this, options);$(this).data('multiselect', data);}
if (typeof option === 'string') {data[option](parameter, extraOptions);if (option === 'destroy') {$(this).data('multiselect', false);}}});};$.fn.multiselect.Constructor = Multiselect;$(function() {$("select[data-role=multiselect]").multiselect();});}(window.jQuery);
