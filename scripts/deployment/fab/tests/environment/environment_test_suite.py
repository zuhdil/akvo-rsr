#!/usr/bin/env python

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


from testing.helpers.execution import TestSuiteLoader, TestRunner

from fab.tests.environment.linux.linux_environment_test_suite import linux_environment_suite
from fab.tests.environment.python.python_environment_test_suite import python_environment_suite


def environment_suite():
    return TestSuiteLoader().create_suite_from_list([linux_environment_suite(), python_environment_suite()])

if __name__ == "__main__":
    from fab.tests.test_settings import TEST_MODE
    TestRunner(TEST_MODE).run_test_suite(environment_suite())