#!/usr/bin/env python
# -*- coding: utf-8 -*-

#to be run in the akvo rsr root folder. setting up all projects as published, if they have no status
# and setting all orgs to free account if they have none

import os
import subprocess

from django.core.management import setup_environ
import settings
setup_environ(settings)

from django.db import connection
from django.db.models import get_model


datadir = os.path.join(os.path.dirname(__file__), 'datadir')
db_cursor = connection.cursor()


def set_null():
    print 'Setting time_last_updated field to NULL...'
    db_cursor.execute('ALTER TABLE `rsr_projectupdate` '
                      'MODIFY COLUMN `time_last_updated` datetime NULL')

def db_dump_load():
    print 'Loading data into database...'
    subprocess.call(['python', 'db_dump.py', 'load'])

def populate_project_update_time_last_updated():
    updates = get_model('rsr', 'projectupdate').objects.all()
    for update in updates:
        update.time_last_updated = update.time
        update.save()
        print 'Project Update %d last updated timestamp set...' % update.id

def set_not_null():
    print 'Resetting time_last_updated field to NOT NULL...'
    db_cursor.execute('ALTER TABLE `rsr_projectupdate` '
                      'MODIFY COLUMN `time_last_updated` datetime NOT NULL')


def main():
    if not os.path.exists(datadir) or not os.path.isdir(datadir):
        print 'Could not find "datadir" directory. Cannot proceed.'
        return
    set_null()
    db_dump_load()
    populate_project_update_time_last_updated()
    set_not_null()
    print 'All done!'


if __name__ == '__main__':
    main()
