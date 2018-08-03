# -*- coding: utf-8 -*-

"""Akvo RSR is covered by the GNU Affero General Public License.
See more details in the license.txt file located at the root folder of the
Akvo RSR module. For additional details on the GNU license please
see < http://www.gnu.org/licenses/agpl.html >.
"""

from copy import deepcopy

from django.db.models import Q
from .models import (Organisation, OrganisationLocation,
                     Project, ProjectLocation, ProjectUpdate, ProjectUpdateLocation,
                     RecipientCountry)
from .m49 import M49_CODES, M49_HIERARCHY


def remove_empty_querydict_items(request_get):
    # querydicts are immutable
    getvars = request_get.copy()
    for k, v in getvars.items():
        if not v:
            getvars.pop(k, None)
    return getvars


def walk(node):
    """Walks the m49 tree and return countries"""

    if isinstance(node, basestring):
        return [node, ]
    elif isinstance(node, int):
        return walk(deepcopy(M49_HIERARCHY)[node])
    else:
        return (walk(node.pop()) + walk(node)) if node else []


def get_m49_filter(value, use_recipient_country=True):
    """Returns the location filter object based on value."""
    countries = walk(deepcopy(M49_HIERARCHY)[int(value)])
    countries_lower = [c.lower() for c in countries]
    filter_ = Q(locations__country__iso_code__in=countries_lower)
    if use_recipient_country:
        filter_ = (Q(recipient_countries__country__in=countries) | filter_)
    return filter_


def get_id_for_iso(i):
    """From an iso_code e.g. 'SE' get the identifier.

    NOTE: If i is already an id, the parent id of the given id is returned!

    """
    i = [k for k, v in M49_HIERARCHY.iteritems() if i in v]
    return None if not i else i.pop()


def get_location_hierarchy(location, locations=None):
    """Return the location > parent > ... > continent hierarchy for a location."""
    if locations is None:
        locations = [location]
    # FIXME: Actually returns parent id, when location is already an id!
    l = get_id_for_iso(location)
    if isinstance(l, basestring) or l is 1 or l is None:
        return locations
    else:
        locations.append(l)
        return get_location_hierarchy(l, locations)


def location_choices(qs):
    """Return a filterd list of locations from M49_CODES based on queryset."""

    country_ids = get_country_ids(qs)

    location_ids = {
        unicode(location)
        for country_id in country_ids
        for location in get_location_hierarchy(country_id)
    }

    # Add World to locations
    location_ids.add("")

    return filter(lambda (id_, name): id_ in location_ids, M49_CODES)


def get_country_ids(qs):
    """Return country ids for locations associated with the queryset items."""

    country_ids = get_location_country_ids(qs)
    if qs.model is Project:
        country_ids = get_recipient_country_ids(qs) + country_ids

    return set(country_ids)


def get_recipient_country_ids(projects):
    """Return countries based on recipient country of projects."""
    countries = RecipientCountry.objects.filter(project__in=projects).values('country')
    return [get_id_for_iso(country['country'].upper()) for country in countries]


def get_location_country_ids(qs):
    """Return countries for locations associated with objects in the queryset."""

    if qs.model is Project:
        location_model = ProjectLocation

    elif qs.model is ProjectUpdate:
        location_model = ProjectUpdateLocation

    elif qs.model is Organisation:
        location_model = OrganisationLocation

    locations_qs = location_model.objects.filter(
        location_target__in=qs
    ).values(
        'country__iso_code',
    ).order_by('country__iso_code').distinct()

    return [
        get_id_for_iso(location['country__iso_code'].upper())
        for location in locations_qs if location['country__iso_code']
    ]
