app.component('saList',{
	bindings:{
  },
	controller: ListController,
	templateUrl: '../partials/inventory.html'
})
app.component('saCart', {
	bindings:{

	},
	controller: ListController,
	templateUrl: '../partials/cart.html'
})
app.component('saItem',{
	bindings:{
		item: '<'
	},
	controller: ItemController,
	templateUrl: "../partials/item.html"
})
app.component('saSearchFilters', {
	bindings:{},
	controller: SearchController,
	templateUrl: "../partials/searchfilters.html"
})
app.component('saCartItem', {
	bindings:{
		item: '<'
	},
	controller: ItemController,
	templateUrl: "../partials/cartItem.html"
})