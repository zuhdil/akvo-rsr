#!/usr/bin/env python

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


import os, subprocess, unittest2

from testing.helpers.execution import TestSuiteLoader, TestRunner


class FabFileTest(unittest2.TestCase):

    def test_can_list_available_fabric_tasks(self):
        """fab.tests.fabfile_test  Can list available Fabric tasks"""

        fab_scripts_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), '..'))
        expected_task_modules = ['fab.tasks.app.deployment', 'fab.tasks.data.retrieval', 'fab.tasks.database.backup',
                                 'fab.tasks.database.convert', 'fab.tasks.database.migrate', 'fab.tasks.database.rebuild',
                                 'fab.tasks.environment.linux.systempackages', 'fab.tasks.environment.python.installer',
                                 'fab.tasks.environment.python.systempackages', 'fab.tasks.environment.python.virtualenv.rsr']

        os.chdir(fab_scripts_dir)
        fabfile_listing = subprocess.check_output(['fab', '--list'])

        for task_module in expected_task_modules:
            self.assertIn(task_module, fabfile_listing)

        fabfile_task_lines = filter(lambda line: 'fab.tasks' in line, fabfile_listing.split('\n'))
        self.assertEqual(len(expected_task_modules), len(fabfile_task_lines))


def suite():
    return TestSuiteLoader().load_tests_from(FabFileTest)

if __name__ == "__main__":
    from fab.tests.test_settings import TEST_MODE
    TestRunner(TEST_MODE).run_test_suite(suite())
