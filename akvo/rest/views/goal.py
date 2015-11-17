# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


from akvo.rsr.models import Goal

from ..serializers import GoalSerializer
from ..viewsets import PublicRSRViewSet


class GoalViewSet(PublicRSRViewSet):
    """
    """
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    filter_fields = ('project', )
