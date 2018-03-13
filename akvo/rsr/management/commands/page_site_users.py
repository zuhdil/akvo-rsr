# -*- coding: utf-8 -*-

# Akvo Reporting is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.

import sys
import tablib

from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db.models import Q

from akvo.rsr.models import PartnerSite, User, Project
from akvo.rsr.permissions import (ADMIN_GROUP_NAME, ME_MANAGER_GROUP_NAME, PROJECT_EDITOR_GROUP_NAME,
                                  USER_MANAGER_GROUP_NAME, USER_GROUP_NAME)


def get_page(arg):
    try:
        pk = int(arg)
        q = Q(pk=pk)
    except ValueError:
        hostname = arg
        q = Q(hostname=hostname)
    try:
        return PartnerSite.objects.get(q)
    except:
        return None


def get_group(arg):
    if arg == "admin":
        return Group.objects.get(name=ADMIN_GROUP_NAME)
    elif arg == "me_manager":
        return Group.objects.get(name=ME_MANAGER_GROUP_NAME)
    elif arg == "project_editor":
        return Group.objects.get(name=PROJECT_EDITOR_GROUP_NAME)
    elif arg == "user_manager":
        return Group.objects.get(name=USER_MANAGER_GROUP_NAME)
    elif arg == "user":
        return Group.objects.get(name=USER_GROUP_NAME)
    return None


class Command(BaseCommand):
    args = '<page_site_id|page_site_hostname> <admin|me_manager|project_editor|user_manager|user>'
    help = ('Script returning all users associated with a Page and the projects they have access '
            'to as the selected permission group')

    def handle(self, *args, **options):
        if len(args) == 2:
            page = get_page(args[0])
            group = get_group(args[1])

            if page and group:
                projects = page.all_projects().prefetch_related('partners__organisation')
                users = User.objects.filter(
                    organisations__projects__in=projects
                ).filter(employers__group=group).distinct().prefetch_related(
                    'organisations__projects', 'employers', 'employers__group'
                )
                data = tablib.Dataset(headers=['User ID', 'User email', 'Project IDs'])
                for user in users:
                    user_projects = Project.objects.filter(
                        partners__employees__user=user
                    ).filter(pk__in=projects).order_by('pk').distinct()
                    data.append([
                        user.id,
                        user.email,
                        ", ".join([str(id) for id in user_projects.values_list('id', flat=True)])
                    ])

                print data.export('csv')
                sys.exit(1)

        print self.help
        print 'Usage: {} {}'.format(sys.argv[0], self.args)
        sys.exit(1)

