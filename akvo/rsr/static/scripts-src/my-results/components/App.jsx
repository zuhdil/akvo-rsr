/*
 Akvo RSR is covered by the GNU Affero General Public License.
 See more details in the license.txt file located at the root folder of the
 Akvo RSR module. For additional details on the GNU license please see
 < http://www.gnu.org/licenses/agpl.html >.
 */


import React from "react";
import {connect} from "react-redux";

// TODO: look at refactoring the actions, moving the dispatch calls out of them. Not entirely trivial...
import {
    fetchModel,
    fetchUser,
    lockSelectedPeriods,
    testFetchModel,
    unlockSelectedPeriods,
} from "../actions/model-actions";

import {setPageData} from "../actions/page-actions";

import {
    activateFilterCSS,
    activateToggleAll,
    filterActive,
    noHide,
    selectablePeriods,
    selectPeriodByDates,
    selectPeriodsThatNeedReporting,
    showUpdates, updateFormToggle,
} from "../actions/ui-actions";

import * as c from "../const"

import {
    getApprovedPeriods,
    getPendingUpdates,
    getMEManagerDefaultKeys,
    getNeedReportingPeriods,
    getUpdatesForApprovedPeriods,
} from "../selectors";

import {
    _, collapseId,
    fieldValueOrSpinner,
    identicalArrays,
    setHash, toggleTree, userIsMEManager,
} from "../utils"

import FilterBar from "./FilterBar";
import Results from "./Results";
import { collapseChange } from "../actions/collapse-actions";
import UpdateForm from "./updates/UpdateForm";


// The collapseID for the top collapse is always the same
const resultsCollapseID = 'results-results';


const dataFromElement = (elementName) => {
    return JSON.parse(document.getElementById(elementName).innerHTML);
};


const modifyUser = (isMEManager) => {
    return (data) => {
        // maintain compatibility with existing updates JSON
        data.approved_organisations = [data.organisation];
        data.isMEManager = isMEManager;
        // transform to common JSON data shape so normalize works in modelsReducer
        return {results: data};
    };
};

@connect((store) => {
    return {
        keys: store.keys,
        page: store.page,
        models: store.models,
        ui: store.ui,
        user: store.models.user,
        draftUpdates: getPendingUpdates(store),
        approvedPeriods: getApprovedPeriods(store),
        approvedUpdates: getUpdatesForApprovedPeriods(store),
        needReportingPeriods: getNeedReportingPeriods(store),
        MEManagerDefaultKeys: getMEManagerDefaultKeys(store),
    }
})
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.showDraft = this.showDraft.bind(this);
        this.showApproved = this.showApproved.bind(this);
        this.needReporting = this.needReporting.bind(this);
        this.state = {
            selectedOption: undefined,
            hash: window.location.hash && window.location.hash.substring(1),
            initialViewSet: false,
        }
    }

    componentDidMount() {
        const project = dataFromElement('project-ids');
        const settings = dataFromElement('settings');
        const strings = dataFromElement('translation-texts');
        this.props.dispatch(setPageData({project, settings, strings}));

        const userId = dataFromElement('endpoint-data').userID;
        const isMEManager = dataFromElement('endpoint-data').isMEManager;
        fetchModel('user', userId, activateToggleAll, modifyUser(isMEManager));

        const projectId = project.project_id;
        fetchModel('results', projectId, activateToggleAll);
        fetchModel('indicators', projectId, activateToggleAll);
        // fetchModel('periods', projectId, [activateToggleAll, selectablePeriods]);
        fetchModel('periods', projectId, activateToggleAll);
        fetchModel('updates', projectId, activateToggleAll);
        fetchModel('comments', projectId, activateToggleAll);
    }

    componentWillReceiveProps(nextProps) {
        // Check if a filter should be applied from the based on URL fragment
        if (this.state.hash && nextProps.ui.allFetched) {
            const hash = this.state.hash;
            switch(hash) {
                case c.FILTER_NEED_REPORTING: {
                    this.needReporting();
                    break;
                }
                case c.FILTER_SHOW_DRAFT: {
                    this.showDraft();
                    break;
                }
                case c.FILTER_SHOW_APPROVED: {
                    this.showApproved();
                    break;
                }
            }
            if (hash.startsWith(c.SELECTED_PERIODS)) {
                const [_, periodStart, periodEnd] = hash.split(':');
                selectPeriodByDates(periodStart, periodEnd);
            }
            this.setState({hash: undefined});
        }
        // set the initial state of the Results panels to open if the user is an M&E manager
        if (userIsMEManager(this.props.user) && nextProps.ui.allFetched && !this.state.initialViewSet) {
            collapseChange(resultsCollapseID, this.props.MEManagerDefaultKeys);
            this.setState({initialViewSet: true});
        }

        const redraw = () =>
            this.props.ui.activeFilter !== nextProps.ui.activeFilter ||
            !identicalArrays(this.props.needReportingPeriods, nextProps.needReportingPeriods) ||
            !identicalArrays(this.props.draftUpdates, nextProps.draftUpdates) ||
            !identicalArrays(this.props.approvedUpdates, nextProps.approvedUpdates);

        if (redraw()) {
            switch(nextProps.ui.activeFilter) {
                case c.FILTER_NEED_REPORTING: {
                    selectPeriodsThatNeedReporting(nextProps.needReportingPeriods);
                    break;
                }
                case c.FILTER_SHOW_DRAFT: {
                    showUpdates(nextProps.draftUpdates, true);
                    break;
                }
                case c.FILTER_SHOW_APPROVED: {
                    showUpdates(nextProps.approvedUpdates, false, true);
                    break;
                }
            }
        }
    }

    manageButtonsAndHash(element) {
    /*
        Set state for the button to highlight, set the URL # value, set selectedOption to undefined
        so it doesn't show a date period
     */
        activateFilterCSS(element);
        setHash(element);
        this.setState({selectedOption: undefined});
    }

    showDraft() {
        this.manageButtonsAndHash(c.FILTER_SHOW_DRAFT);
    }

    showApproved(set=true) {
        this.manageButtonsAndHash(c.FILTER_SHOW_APPROVED);
    }

    needReporting() {
        this.manageButtonsAndHash(c.FILTER_NEED_REPORTING);
    }

    render() {
        const callbacks = {
            needReporting: this.needReporting,
            showDraft: this.showDraft,
            showApproved: this.showApproved,
        };

        const results = this.props.ui.allFetched ?
            <Results parentId="results"/>
        :
            <p className="loading">Loading <i className="fa fa-spin fa-spinner" /></p>;

        // TODO: refactor so we check if _the_ update form is open or not
        const updateObjects = this.props.models.updates.objects;
        const updateFormDisplay = this.props.ui[c.UPDATE_FORM_DISPLAY];
        const updateForm = updateFormDisplay ?
            <UpdateForm update={updateObjects[updateFormDisplay]}
                        collapseId={collapseId(
                            c.OBJECTS_UPDATES,
                            updateObjects[updateFormDisplay]
                        )}/>
        :
            "Nothing here yet...";

        return (
            <section className="results">
                <FilterBar callbacks={callbacks}/>
                <main role="main">
                    <article>
                        {results}
                    </article>
                    <aside>
                        {updateForm}
                    </aside>
                </main>
            </section>
        );
    }
}