# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.

from rest_framework import serializers

from akvo.rsr.models import Project

from ..fields import Base64ImageField

from .budget_item import BudgetItemSerializer
from .legacy_data import LegacyDataSerializer
from .link import LinkSerializer
from .partnership import PartnershipSerializer
from .planned_disbursement import PlannedDisbursementSerializer
from .policy_marker import PolicyMarkerSerializer
from .project_comment import ProjectCommentSerializer
from .project_document import ProjectDocumentSerializer
from .project_location import ProjectLocationExtraSerializer, ProjectLocationSerializer
from .project_condition import ProjectConditionSerializer
from .project_contact import ProjectContactSerializer
from .project_update import ProjectUpdateSerializer
from .recipient_country import RecipientCountrySerializer
from .region import RecipientRegionSerializer
from .related_project import RelatedProjectSerializer
from .result import ResultSerializer
from .sector import SectorSerializer
from .transaction import TransactionSerializer
from .rsr_serializer import BaseRSRSerializer


class ProjectSerializer(BaseRSRSerializer):

    publishing_status = serializers.ReadOnlyField(source='publishingstatus.status')
    current_image = Base64ImageField(required=False, allow_empty_file=True)

    class Meta:
        model = Project


class ProjectExtraSerializer(ProjectSerializer):

    publishing_status = serializers.ReadOnlyField(source='publishingstatus.status')
    budget_items = BudgetItemSerializer(many=True, required=False)
    legacy_data = LegacyDataSerializer(many=True, required=False)
    links = LinkSerializer(many=True, required=False)
    locations = ProjectLocationExtraSerializer(many=True, required=False)
    planned_disbursements = PlannedDisbursementSerializer(many=True, required=False)
    policy_markers = PolicyMarkerSerializer(many=True, required=False)
    documents = ProjectDocumentSerializer(many=True, required=False)
    comments = ProjectCommentSerializer(many=True, required=False)
    conditions = ProjectConditionSerializer(many=True, required=False)
    contacts = ProjectContactSerializer(many=True, required=False)
    project_updates = ProjectUpdateSerializer(many=True, required=False)
    recipient_countries = RecipientCountrySerializer(many=True, required=False)
    recipient_regions = RecipientRegionSerializer(many=True, required=False)
    related_projects = RelatedProjectSerializer(many=True, required=False)
    results = ResultSerializer(many=True, required=False)
    sectors = SectorSerializer(many=True, required=False)
    transactions = TransactionSerializer(many=True, required=False)
    partnerships = PartnershipSerializer(many=True)

    class Meta(ProjectSerializer.Meta):
        pass


class ProjectUpSerializer(ProjectSerializer):
    """ Custom endpoint for RSR Up
    """
    primary_location = ProjectLocationSerializer(many=False, required=False)

    class Meta(ProjectSerializer.Meta):
        pass
