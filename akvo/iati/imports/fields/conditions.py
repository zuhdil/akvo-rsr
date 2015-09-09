# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.

from ..utils import get_text

from django.db.models import get_model


def conditions(activity, project, activities_globals):
    """
    Retrieve and store the conditions.
    The conditions will be extracted from the 'conditions' elements in the 'conditions' element.

    :param activity: ElementTree; contains all data of the activity
    :param project: Project instance
    :param activities_globals: Dictionary; contains all global activities information
    :return: List; contains fields that have changed
    """
    imported_conditions = []
    changes = []

    conditions_element = activity.find('conditions')

    if not conditions_element is None and 'attached' in conditions_element.attrib.keys() and \
            conditions_element.attrib['attached'] == '1':
        for condition in conditions_element.findall('condition'):
            condition_type = ''

            if 'type' in condition.attrib.keys():
                condition_type = condition.attrib['type']

            condition_text = get_text(condition, activities_globals['version'])

            cond, created = get_model('rsr', 'projectcondition').objects.get_or_create(
                project=project,
                type=condition_type,
                text=condition_text
            )

            if created:
                changes.append(u'added condition (id: %s): %s' % (str(cond.pk), cond))

            imported_conditions.append(cond)

    for condition in project.conditions.all():
        if not condition in imported_conditions:
            changes.append(u'deleted condition (id: %s): %s' %
                           (str(condition.pk),
                            condition.__unicode__()))
            condition.delete()

    return changes
