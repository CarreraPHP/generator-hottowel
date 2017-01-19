(function() {
    'use strict';

    angular
        .module('<%= moduleName %>.component')
        .controller('<%= ctrlName %>Controller', <%= ctrlName %>Controller);

    <%= ctrlName %>Controller.$inject = []

    function <%= ctrlName %>Controller {
        ctrl = this;

        ctrl.$onInit = function () {
            conole.log("<%= ctrlName %>Controller has been initialised.");
        }
    }

})();
