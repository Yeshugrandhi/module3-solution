(function() {
    angular.module('NarrowItDownApp', [])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];

        ctrl.narrowItDown = function() {
            if (ctrl.searchTerm) {
                MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                    .then(function(foundItems) {
                        ctrl.found = foundItems;
                    });
            } else {
                ctrl.found = [];
            }
        };

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        this.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: 'YOUR_API_ENDPOINT/menu_items.json' // Replace with actual endpoint
            }).then(function(result) {
                var foundItems = result.data.menu_items.filter(function(item) {
                    return item.description.toLowerCase().includes(searchTerm.toLowerCase());
                });
                return foundItems;
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

})();
