/**
 * 
 * Find more about the MTD Touch Library function at
 * http://api.mutado.com/mobile
 *
 * Copyright (c) 2010 Mutado Mobile, http://mutado.com/mobile
 * Released under MIT license
 * http://api.mutado.com/mobile/shared/license
 * 
 * Version 1.0.0 - Last updated: 2010.11.03
 * 
 */
 
 
/**
 * MTDTouchScroll Component
 * -----------------------------------------------------------
 */

$MTD.TouchHScroll = $.klass( $MTD.UIComponent, {
	
	WRAPPER_CLASS: 'mtdtouch-scroll-wrapper',
	PAGER_WRAPPER_CLASS: 'mtdtouch-scroll-pager-wrapper',
	PAGER_CLASS: 'mtdtouch-scroll-pager',
	
	items: 0,
	horizontal: true,
	paging: false,
	friction: 0.33,
	duration: 200,
	offset: 0,
	limit: 0.1,
	position: 0,
	width: 0,
	height: 0,
	pointer: 0,
	movePointer: 0,
	point: { x: 0, y: 0 },
	timer: 0,
		
	build: function( params ) {
		
		if ( params ) {
			if ( params.offset ) {
				this.offset = params.offset;
			}
			if ( params.duration ) {
				this.duration = params.duration;
			}
		}
		
		this.paging = this.hasPaging();	
		this.horizontal = this.directionHorizontal();	
		
		$( this.element ).append( '<div class="' + this.WRAPPER_CLASS + '"></div>' );
		
		var original = this.ownerString() + ' > ul';
		var div = this.wrapper();
		var ul = this.ul();
		var li = this.li();
		var w = $( this.element ).outerWidth();
		var h = $( this.element ).outerHeight();
		var offset = this.offset;
		
		$( div ).css( 'float', 'left' );
		$( div ).width( w + 'px' );
		$( div ).height( h + 'px' );
		$( div ).append( $( original ) );
		
		var pos = this.position;
		var c = this.items;		
		var hor = this.horizontal;
		$( li ).each( function( index ) {
			
			$( this ).css( 'float', 'left' );
			$( this ).css( 'width', 32 + 'px' );
			$( this ).css( 'height', 32 + 'px' );			
			$( this ).css( 'text-align', 'center' );
			$( this ).css( 'padding', '0' );
			$( this ).css( 'margin', '0' );
			$( this ).css( 'margin-right', offset + 'px' );			
			$( this ).css( 'margin-bottom', offset + 'px' );
			pos += ( hor ? w : h ) + offset;
			c++;
		});
				
		this.items = c;
		this.width = w;
		this.height = h;
		this.position = pos;
		
		$( ul ).css( 'list-style', 'none' );
		$( ul ).css( 'position', 'relative' );
		$( ul ).css( 'padding', '0' );
		$( ul ).css( 'margin', '0' );
		
		if ( this.horizontal ) {
			$( ul ).css( 'width', this.position + 'px' );
			$( ul ).css( 'height', h + 'px' );
		} else {
			$( ul ).css( 'width', w + 'px' );
			$( ul ).css( 'height', this.position + 'px' );
		}
		
		$( div ).css( 'overflow-x', 'hidden' );
		$( div ).css( 'overflow-y', 'hidden' );
		
		if ( this.paging ) {
			this.createPager();
		}
		
		window.setTimeout( $MTD.delegate( this, this.scrollTo, 0 ), 100 );
	},
	
	wrapper: function() {
		return this.ownerString() + ' > .' + this.WRAPPER_CLASS;
	},
	
	ul: function() {
		return this.wrapper() + ' > ul';
	},
	
	li: function() {
		return this.ul() + ' > li';
	},
		
	hasPaging: function() {
		return true;
	},
	
	directionHorizontal: function() {
		return true;
	},
	
	createPager: function() {
		$( this.element ).append( '<div class="' + this.PAGER_WRAPPER_CLASS + '"><div class="' + this.PAGER_CLASS +'"></div></div>' );
		var pagerWrapper = this.ownerString() + ' > .' + this.PAGER_WRAPPER_CLASS;
		var pager = pagerWrapper + ' .' + this.PAGER_CLASS;
		// wrapper
		$( pagerWrapper ).css( 'position', 'relative' );
		if ( this.horizontal ) {
			$( pagerWrapper ).css( 'top', '100%' );
		}		
		$( pagerWrapper ).css( 'width', this.width );
		
		// content;
		$( pager ).css( 'position', 'absolute' );
		
		if ( this.horizontal ) {
			$( pager ).css( 'bottom', '0' );
			$( pager ).css( 'width', this.width );
		} else {
			$( pager ).css( 'left', '0' );
			$( pager ).css( 'height', this.height );
		}
		
		$( pager ).append( '<ul></ul>' );
		$( pager ).css( 'text-align', 'center' );
		
		var ul = $( pager + ' > ul' );
		$( ul ).css( 'list-style', 'none' );
		$( ul ).css( 'float', 'left' );
		
		for ( var i = 0; i < this.items; i++ ) {
			$( ul ).append( '<li></li>' );	
		}
		
		var li = $( pager + ' > ul > li' );
		var ref = this;
		$( li ).each( function( index ) {
			if ( ref.horizontal ) {
				$( this ).css( 'float', 'left' );
			}
			$( this ).click( $MTD.delegate( ref, ref.scrollTo, index ) );
		});
		
		if ( this.horizontal ) {
			$( ul ).css( 'margin-left', ( this.width * 0.5 - $( ul ).innerWidth() * 0.5 ) + 'px' );
		} else {
			$( ul ).css( 'margin-top', ( this.height * 0.5 - $( ul ).innerHeight() * 0.5 ) + 'px' );
		}

	},	
	
	updatePager: function() {
		var pager = this.ownerString() + ' > .' + this.PAGER_WRAPPER_CLASS + ' > .' + this.PAGER_CLASS;
		var li = $( pager + ' > ul > li' );
		$( li ).each( function( index ) {
			$( this ).removeClass( 'selected' );
		});
		$( li ).eq( this.pointer ).addClass( 'selected' );
	},
	
	scrollTo: function( index ) {
		var ul = this.ul();
		$( ul ).css( '-webkit-transition-duration', this.duration + 'ms' );
		
		if ( this.horizontal ) {
			$( ul ).css( '-webkit-transform', 'translate3d(-' + ( this.width + this.offset ) * index + 'px, 0px, 0px)' );
		} else {
			$( ul ).css( '-webkit-transform', 'translate3d(0px, -' + ( this.height + this.offset ) * index + 'px, 0px)' );
		}
		
		window.setTimeout( $MTD.delegate( this, this.scrollToCompleted, ( this.pointer != index ) ), this.duration );
		this.pointer = this.movePointer = index;
		if ( this.paging ) {
			this.updatePager();
		}
	},
		
	scrollToCompleted: function( changed ) {
		var ul = this.ul();
		$( ul ).css( '-webkit-transition-duration', '0ms' );
		if ( changed ) {
			this.notify( 'changed', this.pointer );
		}
	},
	
	touchesBegan: function( e ) {
		this.point = this.parseTouchesEvent( e );
		var d = new Date();
		this.timer = d.getTime();
	},
	
	touchesMoved: function( e ) {
		var p = this.parseTouchesEvent( e );
		if ( this.dragVertical && this.horizontal ) {
			return;
		}
		if ( this.dragHorizontal && !this.horizontal ) {
			return;
		}
		if ( this.dragHorizontal && this.horizontal ) {
			e.preventDefault();
		}
		if ( this.dragVertical && !this.horizontal ) {
			e.preventDefault();
		}
		
		var dx = this.point.x - p.x;
		var dy = this.point.y - p.y;
		
		var tpx = - ( ( this.width + this.offset ) * this.pointer ) - dx;
		var tpy = - ( ( this.height + this.offset ) * this.pointer ) - dy;
		
		if ( tpx > 0 || tpx < - ( ( this.width + this.offset ) * ( this.items - 1 ) ) ) {
			dx *= this.friction;
		}
		if ( tpy > 0 || tpy < - ( ( this.height + this.offset ) * ( this.items - 1 ) ) ) {
			dy *= this.friction;
		}
		
		var nx = - ( ( this.width + this.offset ) * this.pointer ) - dx;
		var ny = - ( ( this.height + this.offset ) * this.pointer ) - dy;
		
		var i;
		var can = false;
		
		if ( this.horizontal ) {
			can = Math.abs( dx ) / this.width > this.limit;
			i = this.pointer + ( can ? ( dx > 0 ? 1 : -1 ) : 0 );
		} else {
			can = Math.abs( dy ) / this.height > this.limit;
			i = this.pointer + ( can ? ( dy > 0 ? 1 : -1 ) : 0 );
		}
		 
		this.movePointer = Math.min( Math.max( 0, i ), this.items - 1 );
		
		var ul = this.ul();
		if ( this.horizontal ) {
			$( ul ).css( '-webkit-transform', 'translate3d(' + nx + 'px, 0px, 0px)' );
		} else {
			$( ul ).css( '-webkit-transform', 'translate3d(0px, ' + ny + 'px, 0px)' );
		}
		
	},
	
	touchesEnded: function( e ) {
		var d = new Date();
		var speed = d.getTime() - this.timer;
		this.scrollTo( this.movePointer );
	},
	
	next: function() {
		this.scrollTo( Math.min( this.pointer + 1, this.items - 1 ) );
	},
	
	prev: function() {
		this.scrollTo( Math.max( this.pointer - 1, 0 ) );
	},
	
	first: function() {
		this.scrollTo( 0 );
	},
	
	last: function() {
		this.scrollTo( this.items - 1 );
	},
	
	count: function() {
		return this.items;
	}
		
});

$MTD.TouchVScroll = $.klass( $MTD.TouchHScroll, {
		
	directionHorizontal: function() {
		return false;
	}
			
});

$MTD.TouchHScrollNoPaging = $.klass( $MTD.TouchHScroll, {
		
	hasPaging: function() {
		return false;
	}
				
});

$MTD.TouchVScrollNoPaging = $.klass( $MTD.TouchHScroll, {
		
	hasPaging: function() {
		return false;
	},
	
	directionHorizontal: function() {
		return false;
	}
			
});

jQuery.fn.extend( {

	MTDTouchHScroll: function( params ) {
		$( this ).attach( $MTD.TouchHScroll, params );
	},
	
	MTDTouchVScroll: function( params ) {
		$( this ).attach( $MTD.TouchVScroll, params );
	},
	
	MTDTouchHScrollNoPaging: function( params ) {
		$( this ).attach( $MTD.TouchHScrollNoPaging, params );
	},
	
	MTDTouchVScrollNoPaging: function( params ) {
		$( this ).attach( $MTD.TouchVScrollNoPaging, params );
	}
	
});
