/*
   Akvo RSR is covered by the GNU Affero General Public License.
   See more details in the license.txt file located at the root folder of the
   Akvo RSR module. For additional details on the GNU license please see
   < http://www.gnu.org/licenses/agpl.html >.
 */

import React from "react";
import { connect } from "react-redux";
import { _, dataFromElement } from "../utils";

import * as c from "../const";

const IsRestricted = ({ _, isRestricted, mayUnrestrict, toggleIsRestricted }) => {
    return (
        <span className={mayUnrestrict ? "" : "disableUnrestrict"}>
            <label>
                <input
                    id="isRestricted"
                    type="checkbox"
                    checked={isRestricted}
                    onChange={toggleIsRestricted}
                    disabled={!mayUnrestrict}
                />
                {/* The strings include <strong> tags which requires the use of
                    dangerouslySetInnerHTML */}
                <span
                    dangerouslySetInnerHTML={{
                        __html: isRestricted
                            ? _("user_access_restricted")
                            : _("user_access_unrestricted")
                    }}
                />
                {mayUnrestrict ? null : (
                    <span className="unrestrictNote">
                        NOTE: This user cannot be unrestricted because of other restricted projects
                        than those listed here
                    </span>
                )}
            </label>
            {isRestricted ? (
                <div
                    className="restrictedInfo"
                    dangerouslySetInnerHTML={{ __html: _("restricted_info") }}
                />
            ) : (
                <div />
            )}
        </span>
    );
};

const Project = ({
    _,
    project,
    isRestricted,
    onChangeProjectSelected,
    firstProjectOfOrgGroup,
    rowSpan,
    orgs
}) => {
    const uiSettings = (project, isRestricted, firstProjectOfOrgGroup) => {
        const checked = project.access,
            disabled = isRestricted ? "" : "disabled",
            projectSelected = checked ? " projectSelected" : "",
            trClassName =
                disabled + projectSelected + (firstProjectOfOrgGroup ? " border-top" : ""),
            idClassName = disabled + " id";
        return { checked, trClassName, idClassName };
    };

    const cancelClick = e => {
        // Cancel the tr onClick for the org group cell
        e.stopPropagation();
    };

    const { checked, trClassName, idClassName } = uiSettings(
        project,
        isRestricted,
        firstProjectOfOrgGroup
    );

    return (
        <tr
            key={project.id}
            id={project.id}
            onClick={onChangeProjectSelected}
            className={trClassName}
        >
            <td className="border-left">
                <input
                    id={project.id}
                    type="checkbox"
                    checked={checked}
                    disabled={!isRestricted}
                    readOnly={true}
                />
            </td>
            <td className={idClassName}>{project.id}</td>
            <td>{project.title || _("no_title")}</td>
            <td>{project.subtitle}</td>
            {firstProjectOfOrgGroup ? (
                <td className="border" rowSpan={rowSpan} onClick={cancelClick}>
                    {orgs}
                </td>
            ) : null}
        </tr>
    );
};

const SelectAll = ({ _, selectAll, toggleProjectSelectAll, isRestricted }) => {
    const uiSettings = isRestricted => {
        const buttonClass = "selectAllProjects" + (isRestricted ? "" : " disabled"),
            disabled = !isRestricted,
            divClass = isRestricted ? "" : "disabled";
        return { buttonClass, disabled, divClass };
    };
    const { divClass, disabled, buttonClass } = uiSettings(isRestricted);
    return (
        <div className={divClass}>
            <button onClick={toggleProjectSelectAll} disabled={disabled} className={buttonClass}>
                {selectAll ? _("check_all_projects") : _("uncheck_all_projects")}
            </button>
        </div>
    );
};

const Error = ({ _, error }) => {
    return error ? <div className="error">{_("an_error_occured") + error.message}</div> : null;
};

const Projects = ({ groupedProjects, toggleProjectSelected, ...props }) => {
    const { _, isRestricted } = props;
    const className = isRestricted ? "" : "disabled";
    return (
        <span>
            <Error {...props} />
            <IsRestricted {...props} />
            <SelectAll {...props} />
            <table>
                <thead>
                    <tr>
                        <th className={className}>{_("access")}</th>
                        <th className={className}>{_("project_id")}</th>
                        <th className={className}>{_("project_title")}</th>
                        <th className={className}>Project subtitle</th>
                        <th className={className}>Managing organisations</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedProjects.map(group => {
                        const rowSpan = group.projects.length;
                        let first = true;
                        return group.projects.map(project => {
                            const firstProjectOfOrgGroup = first;
                            first = false;
                            return (
                                <Project
                                    _={_}
                                    key={project.id}
                                    project={project}
                                    isRestricted={isRestricted}
                                    onChangeProjectSelected={toggleProjectSelected}
                                    firstProjectOfOrgGroup={firstProjectOfOrgGroup}
                                    rowSpan={rowSpan}
                                    orgs={group.organisations}
                                />
                            );
                        });
                    })}
                </tbody>
            </table>
        </span>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleProjectSelected = this.toggleProjectSelected.bind(this);
        this.toggleIsRestricted = this.toggleIsRestricted.bind(this);
        this.toggleProjectSelectAll = this.toggleProjectSelectAll.bind(this);
        this._ = this._.bind(this);
    }

    // Translation handling
    _(s) {
        return this.props.strings && this.props.strings[s];
    }

    toggleIsRestricted(e) {
        e.stopPropagation();
        this.props.onUpdateIsRestricted(e.target.checked);
    }

    toggleProjectSelectAll(e) {
        e.stopPropagation();
        this.props.onUpdateSelectAll();
    }

    toggleProjectSelected(e) {
        e.stopPropagation();
        const target = e.currentTarget;
        if (!target.classList.contains("disabled")) {
            const id = parseInt(target.getAttribute("id"));
            this.props.onUpdateProjectSelection(id);
        }
    }

    componentDidMount() {
        const userId = dataFromElement("user-to-restrict").id;
        this.props.setStore({ userId });

        const strings = dataFromElement("user-projects-text");
        this.props.setStore({ strings });

        this.props.onFetchUserProjects(userId);
    }

    render() {
        const {
            props,
            _,
            toggleIsRestricted,
            toggleProjectSelectAll,
            toggleProjectSelected
        } = this;
        const newProps = {
            ...props,
            _,
            toggleIsRestricted,
            toggleProjectSelectAll,
            toggleProjectSelected
        };
        const { projectsLoaded } = props;
        return projectsLoaded ? (
            <Projects {...newProps} />
        ) : (
            <div className="loading">
                {_("loading")} <i className="fa fa-spin fa-spinner" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserProjects: userId =>
            dispatch({
                type: c.API_GET_INIT,
                data: { userId }
            }),
        setStore: data =>
            dispatch({
                type: c.SET_STORE,
                data
            }),
        onUpdateProjectSelection: projectId =>
            dispatch({
                type: c.UPDATE_PROJECT_SELECTION,
                data: { projectId }
            }),
        onUpdateIsRestricted: isRestricted =>
            dispatch({
                type: c.UPDATE_IS_RESTRICTED,
                data: { isRestricted }
            }),
        onUpdateSelectAll: () => dispatch({ type: c.UPDATE_SELECT_ALL_PROJECTS })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
