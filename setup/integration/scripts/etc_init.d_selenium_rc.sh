#!/bin/bash
#
# Headless mode Selenium RC auto-start script
# 
# description: Starts Selenium RC in headless mode with Xvfb automatically on server startup
# processname: selenium_rc
# pidfiles: /var/tmp/log/selenium/rc_server.pid and /var/tmp/log/xvfb/xvfb.pid

INTEGRATION_SCRIPTS_PATH=/usr/local/ci/scripts
RC_SERVER_LOG_PATH=/var/tmp/log/selenium
XVFB_LOG_PATH=/var/tmp/log/xvfb

UTC_LOG_TIMESTAMP=`date -u +%Y%m%d_%H%M%S`
PROCESS_OUTPUT_FILE=$RC_SERVER_LOG_PATH/rc_process_$UTC_LOG_TIMESTAMP.out


function start_rc_server_with_xvfb
{
    su -p -s /bin/bash tomcat $INTEGRATION_SCRIPTS_PATH/ensure_selenium_rc_server_has_started $RC_SERVER_LOG_PATH $XVFB_LOG_PATH > $PROCESS_OUTPUT_FILE 2>&1
}

function stop_rc_server_and_xvfb
{
    su -p -s /bin/bash tomcat $INTEGRATION_SCRIPTS_PATH/stop_selenium_rc_server.py $RC_SERVER_LOG_PATH >> $PROCESS_OUTPUT_FILE 2>&1
    su -p -s /bin/bash tomcat $INTEGRATION_SCRIPTS_PATH/stop_xvfb.py $XVFB_LOG_PATH >> $PROCESS_OUTPUT_FILE 2>&1
}

case $1 in
start)
        start_rc_server_with_xvfb
        ;;
stop)
        stop_rc_server_and_xvfb
        ;;
restart)
        stop_rc_server_and_xvfb
        start_rc_server_with_xvfb
        ;;
esac
exit 0
