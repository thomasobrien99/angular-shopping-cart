app.component('saList',{
	controller: ListController,
	templateUrl: '../partials/inventory.html'
})

app.component('saCart', {
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