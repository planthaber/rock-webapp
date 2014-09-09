require 'common'
require 'syskit/event_loop'
require 'syskit/shell_client'


# The toplevel namespace for webapp
#
# You should describe the basic idea about webapp here
require 'utilrb/logger'
module Rock
    module WebApp
        module Syskit
            UI_DIR = File.join(Rock::WebApp::LIB_DIR, 'syskit', 'ui')
    
            extend Logger::Root('Rock::WebApp::Syskit', Logger::WARN)
    
            # Root for a REST API that allows to access a running Rock system
            class Root < Grape::API
                version 'v1'
    
                mount Shell
            end
        end
    end
end

