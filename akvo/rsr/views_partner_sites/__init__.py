# -*- coding: utf-8 -*-
"""
    Akvo RSR is covered by the GNU Affero General Public License.
    See more details in the license.txt file located at the root folder of the
    Akvo RSR module. For additional details on the GNU license please
    see < http://www.gnu.org/licenses/agpl.html >.
"""
from __future__ import absolute_import
from django.views.generic import TemplateView, ListView
from django.shortcuts import get_object_or_404
from ..models import Organisation, Project, ProjectUpdate


class BaseView(TemplateView):
    """Base view that adds current organisation to the template context or
    throws a 404."""

    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)
        context['organisation'] = \
            get_object_or_404(Organisation, pk=self.request.organisation_id)
        return context


class BaseProjectView(BaseView):
    """View that extends BaseView with current project or throws a 404."""

    def get_context_data(self, **kwargs):
        context = super(BaseProjectView, self).get_context_data(**kwargs)
        context['project'] = \
            get_object_or_404(Project, pk=self.kwargs['project_id'])
        return context


class BaseListView(ListView):
    """List view that are extended with the current organisation and the
    proejcts connected to the organisation available in the template context
    variable project_list"""
    context_object_name = 'project_list'

    def get_context_data(self, **kwargs):
        context = super(BaseListView, self).get_context_data(**kwargs)
        context['organisation'] = \
            get_object_or_404(Organisation, pk=self.request.organisation_id)
        return context

    def get_queryset(self):
        return get_object_or_404(Organisation,
                                 pk=self.request.organisation_id) \
                                    .published_projects().funding() \
                                    .order_by('id')


class HomeView(BaseListView):
    """View that adds latest updates to the partner sites home pages. The
    updates are available as "latest_updates" in the template"""
    template_name = "partner_sites/home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        latest_updates = ProjectUpdate.objects.exclude(photo__exact='') \
            .order_by('-time')[:2]
        context['latest_updates'] = latest_updates
        return context


class UpdateDirectoryView(ListView):
    """View that adds latest updates to the partner sites home pages. The
    updates are available as "latest_updates" in the template"""
    template_name = "partner_sites/project/update_directory.html"
    context_object_name = 'update_list'

    def get_context_data(self, **kwargs):
        context = super(UpdateDirectoryView, self).get_context_data(**kwargs)
        context['organisation'] = \
            get_object_or_404(Organisation, pk=self.request.organisation_id)
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        context['project'] = project
        context['can_add_update'] = \
            project.connected_to_user(self.request.user)
        return context

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        updates = project.project_updates.all().order_by('-time')
        return updates


class UpdateView(BaseProjectView):
    """Extend the project view with the current update"""
    template_name = "partner_sites/project/update_main.html"

    def get_context_data(self, **kwargs):
        context = super(UpdateView, self).get_context_data(**kwargs)
        context['update'] = get_object_or_404(ProjectUpdate,
                                              id=self.kwargs['update_id'])
        return context