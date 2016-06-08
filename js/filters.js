app.filter('inCart', function() {
  return function(el) {
  	debugger
    return el.quantity > 0;
  }
});

function inCart(){
	return function(el){
		return el.quantity > 0;
	}
}