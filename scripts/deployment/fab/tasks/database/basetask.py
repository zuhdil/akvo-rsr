# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


import fab.config.rsr.database
import fab.host.controller
import fab.host.database
import fab.tasks.base


class RSRDatabaseTask(fab.tasks.base.BaseDeploymentTask):
    """Base task for RSR database actions"""

    def __init__(self, database_credentials_module_path):
        super(RSRDatabaseTask, self).__init__()

        import imp
        imp.load_source('database_credentials', database_credentials_module_path)
        import database_credentials

        self.database_credentials = database_credentials.DatabaseCredentials()

    def run(self, host_controller_mode, config_type, host_alias=None, repository_branch=None, database_name=None, custom_config_module_path=None):
        host_config = self.config_loader.host_config_for(config_type, host_alias, repository_branch, database_name, custom_config_module_path)
        self.database_host = self._configure_database_host_with(host_controller_mode, host_config)

    def _configure_database_host_with(self, host_controller_mode, host_config):
        database_config = fab.config.rsr.database.RSRDatabaseConfig(self.database_credentials, host_config.rsr_database_name)
        host_controller = fab.host.controller.HostController.create_from(host_controller_mode)

        return fab.host.database.DatabaseHost.create_with(database_config, host_config, host_controller)
