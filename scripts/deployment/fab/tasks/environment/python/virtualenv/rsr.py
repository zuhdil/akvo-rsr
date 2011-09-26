# -*- coding: utf-8 -*-

# Akvo RSR is covered by the GNU Affero General Public License.
# See more details in the license.txt file located at the root folder of the Akvo RSR module.
# For additional details on the GNU license please see < http://www.gnu.org/licenses/agpl.html >.


import fabric.tasks

import fab.config.rsr.virtualenv
import fab.host.virtualenv


class RebuildRSREnv(fabric.tasks.Task):
    """Rebuilds an RSR virtualenv with the specified pip requirements"""

    name = "rebuild_rsr_env"

    def __init__(self, rsr_virtualenv_config):
        self.virtualenv_config = rsr_virtualenv_config

    @staticmethod
    def create_task_instance():
        return RebuildRSREnv(fab.config.rsr.virtualenv.RSRVirtualEnvInstallerConfig.create_instance())

    def run(self, host_controller_mode):
        self._configure_host_using(host_controller_mode)

        self.virtualenv_host.ensure_virtualenv_exists()
        self.virtualenv_host.install_virtualenv_packages(self.virtualenv_config.rsr_requirements_path)

    def _configure_host_using(self, host_controller_mode):
        host_controller = fab.host.controller.HostController.create_from(host_controller_mode)
        self.virtualenv_host = fab.host.virtualenv.VirtualEnvHost.create_instance(self.virtualenv_config, host_controller)


instance = RebuildRSREnv.create_task_instance()
