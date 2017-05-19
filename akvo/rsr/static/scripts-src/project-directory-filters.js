/** @jsx React.DOM */

// Akvo RSR is covered by the GNU Affero General Public License.
// See more details in the license.txt file located at the root folder of the
// Akvo RSR module. For additional details on the GNU license please see
// < http://www.gnu.org/licenses/agpl.html >.

var filtersWrapper = document.getElementById('wrapper');

var Filter = React.createClass({displayName: "Filter",
    render: function(){
        var Typeahead = ReactBootstrapTypeahead.Typeahead;
        return (
            React.createElement("div", null, 
                React.createElement("label", null, this.props.title), 
                React.createElement(Typeahead, {
                    selected: this.props.selected, 
                    options: this.props.options, 
                    onChange: this.onChange, 
                    filterBy: ['filterBy'], 
                    label: "label"}
                )
            )
        );
    },
    onChange: function(values){
        this.props.onChange(this.props.title, values);
    }
});

var FilterForm = React.createClass({displayName: "FilterForm",
    getInitialState: function(){
        var options = {
            "keyword": [],
            "location": [],
            "status": [],
            "organisation": [],
            "sector": [],
        };
        return {"options": options};
    },
    componentDidMount: function(){
        this.fetchFilterOptions();
    },
    fetchFilterOptions: function(){
        var options = {};
        var self = this;
        fetch(this.props.options_url, options)
            .then(
                function(response){
                    if (response.status >=200 && response.status < 300) {
                        return response.json();
                    }
                }
            )
            .then(function(options){
                if (!options) {return;}
                self.setState({"options": self.processOptions(options)});
            });
    },
    processOptions: function(options){
        // Add a filterBy attribute to all items
        var make_typeahead_item = function(item){
            // Check various fields depending on type of options
            // NOTE: name always appears after long_name, since we
            // prefer long_name for organisations
            var label = item.label || item.long_name || item.name || '';
            item.filterBy = (label + ' ' + item.id).trim();
            item.label = label;
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var value = options[key];
                value.forEach(make_typeahead_item);
            }
        }
        return options;
    },
    onChange: function(field_name, values){
        var update = {};
        update[field_name] = values[0].id;
        console.log(update);
    },
    render: function(){
        var self = this;
        return (
            React.createElement("aside", {id: "sidebar-wrapper"}, 
                React.createElement("div", {id: "filter"}, 
                    this.props.filters.map(function(filter_name){
                         return (
                             React.createElement(Filter, {
                                 key: filter_name, 
                                 options: self.state.options[filter_name], 
                                 title: filter_name, 
                                 selected: [], 
                                 onChange: self.onChange}
                             )
                         );
                     }), 
                    React.createElement("div", null, 
                        React.createElement("nav", null, 
                            React.createElement("ul", {className: "nav nav-pills nav-stacked"}, 
                                /* FIXME: Use translation strings for 'apply filter' and 'close this' */
                                React.createElement("li", null, 
                                    /* FIXME: Button doesn't work */
                                    React.createElement("a", {className: "showFilters text-center", id: "apply-filter"}, "Apply filter")
                                ), 
                                React.createElement("li", null, 
                                    /* FIXME: Button doesn't work */
                                    React.createElement("a", {className: "showFilters menu-toggle text-center"}, 
                                        React.createElement("i", {className: "fa fa-toggle-off"}), "Close this"
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});


var filters = ['keyword', 'location', 'status', 'organisation', 'sector'];
var url = 'http://rsr.localdev.akvo.org/rest/v1/typeaheads/project_filters?format=json';

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        React.createElement(FilterForm, {filters: filters, options_url: url}),
        filtersWrapper);
});
