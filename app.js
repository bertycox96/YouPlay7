AOS.init({
  // Global settings:
  disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});


$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 5000);
  }
  
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  advance();
});

(function($) {
  $(".content").not(":first").hide();
  $(".switch:first div").show();
  $(".switch").click(function() {

  $(".switch").removeClass("active").eq($(this).index()).addClass("active");
      $(".content").hide().eq($(this).index()).fadeIn(); 

      $('.switch div').each(function( index ) {
          var sld = $(this); 
          sld.slideUp(); 
      });

      if ($(this).hasClass('active')) { 
          var sld = $(this).find('div'); 
          sld.slideDown(); 
      } 
  }).eq(0).addClass("active");
})( jQuery );

$(document).ready(function() { 

	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
			
			g.preventDefault();
		} );
	})(jQuery);
});

class Sortable {
	constructor(element) {
	  this.container = element;
  
	  this.items = element.querySelectorAll('[data-sortable-draggable]');
	  this.droppable = element.querySelectorAll('[data-sortable-droppable]');
  
	  this.placeholder = () => document.querySelector('#item-placeholder');
  
	  this.trackingTouch = false;
	  this.before = false;
	  this.after = false;
	  this.mouse = {
		x: event => event.clientX || event.touches[0].clientX,
		y: event => event.clientY || event.touches[0].clientY,
		x0: 0,
		y0: 0,
		x1: 0,
		y1: 0
	  };
	  this.dragged = {
		el: null,
		clone: null,
		posRel: {},
		rect: () => this.dragged.el.getBoundingClientRect(),
		size: {}
	  };
	  this.siblings = {
		prev: null,
		next: null
	  };
	  this._onStart = this._onStart.bind(this);
	  this._onMove = this._onMove.bind(this);
	  this._onEnd = this._onEnd.bind(this);
	  this._update = this._update.bind(this);
  
	  this._addEventListeners();
	}
  
	_onStart(event) {
	  if (!event.target.hasAttribute('data-sortable-draggable')) {
		return;
	  }
  
	  this.trackingTouch = true;
	  this.dragged.el = event.target;
	  this.dragged.clone = this.dragged.el.cloneNode(true);
	  this.dragged.posRel.top = this.dragged.el.offsetTop;
	  this.dragged.posRel.left = this.dragged.el.offsetLeft;
	  this.dragged.size.width = this.dragged.el.offsetWidth;
	  this.dragged.size.height = this.dragged.el.offsetHeight;
	  this.container.classList.add('is-dragged');
	  this.dragged.el.classList.add('is-dragged');
	  this.dragged.el.style.top = `${this.dragged.posRel.top}px`;
	  this.dragged.el.style.left = `${this.dragged.posRel.left}px`;
	  this.dragged.el.style.width = `${this.dragged.size.width}px`;
	  this.dragged.el.style.height = `${this.dragged.size.height}px`;
  
	  this._addPlaceholder(this.dragged.el);
  
	  this._onOver(event);
  
	  this.mouse.x0 = this.mouse.x(event);
	  this.mouse.y0 = this.mouse.y(event);
	  event.preventDefault();
	}
  
	_onMove(event) {
	  if (!this.trackingTouch) {
		return;
	  }
  
	  this.mouse.x1 = this.mouse.x(event) - this.mouse.x0;
	  this.mouse.y1 = this.mouse.y(event) - this.mouse.y0;
	  window.requestAnimationFrame(this._update);
  
	  this._onOver(event);
	}
  
	_onEnd(event) {
	  this.trackingTouch = false;
	  this.container.classList.remove('is-dragged');
	  this.dragged.el.classList.remove('is-dragged');
	  this.dragged.el.style.top = '';
	  this.dragged.el.style.left = '';
	  this.dragged.el.style.width = '';
	  this.dragged.el.style.height = '';
	  this.dragged.el.style.transform = '';
	  const placeholder = this.placeholder();
	  const rect = placeholder.getBoundingClientRect();
  
	  if (rect.left <= this.mouse.x(event) <= rect.right) {
		this._onDrop();
	  }
  
	  this._removePlaceholder();
	}
  
	_onEnter() {}
  
	_onOver(event) {
	  this.before = false;
	  this.after = false;
  
	  this._getReference();
  
	  if (this.siblings.next && this.siblings.next.hasAttribute('data-sortable-droppable')) {
		const next = this.siblings.next.getBoundingClientRect();
  
		if (this.dragged.rect().right > next.left + next.width / 2) {
		  this.after = true;
  
		  this._addPlaceholder(this.siblings.next);
		}
	  }
  
	  if (this.siblings.prev && this.siblings.prev.hasAttribute('data-sortable-droppable')) {
		const prev = this.siblings.prev.getBoundingClientRect();
  
		if (this.dragged.rect().left < prev.right - prev.width / 2) {
		  this.before = true;
  
		  this._addPlaceholder(this.siblings.prev);
		}
	  }
	}
  
	_onLeave() {}
  
	_onDrop() {
	  const placeholder = this.placeholder();
  
	  this._addEventListenerToItem(this.dragged.clone);
  
	  this.container.insertBefore(this.dragged.clone, placeholder);
	  this.dragged.el.parentNode.removeChild(this.dragged.el);
	}
  
	_update() {
	  this.dragged.el.style.transform = `translate3d(${this.mouse.x1}px, ${this.mouse.y1}px, 0)`;
	}
  
	_addPlaceholder(item) {
	  this._removePlaceholder();
  
	  const placeholder = document.createElement('div');
	  placeholder.classList.add('sitem', 'item-placeholder');
	  placeholder.setAttribute('id', 'item-placeholder');
  
	  if (this.after) {
		this.container.insertBefore(placeholder, item.nextElementSibling);
	  } else if (this.before) {
		this.container.insertBefore(placeholder, item);
	  } else {
		this.container.insertBefore(placeholder, item);
	  }
	}
  
	_removePlaceholder() {
	  const placeholder = this.placeholder();
	  if (placeholder) placeholder.parentNode.removeChild(placeholder);
	}
  
	_getReference() {
	  const placeholder = this.placeholder();
	  this.siblings.prev = placeholder.previousElementSibling === this.dragged.el ? this.dragged.el.previousElementSibling : placeholder.previousElementSibling;
	  this.siblings.next = placeholder.nextElementSibling === this.dragged.el ? this.dragged.el.nextElementSibling : placeholder.nextElementSibling;
	}
  
	_addEventListenerToItem(item) {
	  // touch events
	  item.addEventListener('touchstart', this._onStart); // mouse events
  
	  item.addEventListener('mousedown', this._onStart);
	}
  
	_addEventListeners() {
	  for (let i = 0; i < this.items.length; i += 1) {
		this._addEventListenerToItem(this.items[i]);
	  } // touch events
  
  
	  document.addEventListener('touchmove', this._onMove);
	  document.addEventListener('touchend', this._onEnd); // mouse events
  
	  document.addEventListener('mousemove', this._onMove);
	  document.addEventListener('mouseup', this._onEnd);
	}
  
  }
  
  const sortables = document.querySelectorAll('[data-sortable="true"]');
  
  for (let i = 0; i < sortables.length; i += 1) {
	const sortable = new Sortable(sortables[i]);
  }