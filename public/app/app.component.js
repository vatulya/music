"use strict";

(function(app) {

    app.AppComponent =
        ng.core.Component({
                selector: 'all-bands',
                template: `
                    <h1>All bands</h1>
                    <ul>
                      <li *ngFor="#band of bands">
                        {{ band }}
                      </li>
                    </ul>
                `
            })
            .Class({
                constructor: function() {
                    this.bands = [];
                },

                ngOnInit: function () {

                }
            });
})(window.app || (window.app = {}));

