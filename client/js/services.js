app.service('InventoryService', function($http){
	return {
		//THIS COULD BE CLEANED UP TO EXIST IN ONE OBJECT
		searchTerm : '',
		searchType : '',
		orderPref: 'true',
		getInventory: function(){
		   return $http.get('/api/teas');
		},
		editItemQuantity: function(newQuantity)
		{
            var body = {};
            if(newQuantity !== undefined)
            {
                body.quantity = newQuantity;
            }
            else
            {
                body.quantity = ++this.quantity;
            }
            
            $http.put('/api/teas/'+this.name, body).then(function(res)
            {
                
            });

			// this.subtotal = this.quantity * this.price;
			// this.inCart = this.quantity > 0;
		},
		changeSearchTerm: function(term, type){
			this.searchType = type;
			this.searchTerm = term;
		},
		changeOrderPref: function(orderPref){
			this.orderPref = orderPref;
		} 
	}
})
