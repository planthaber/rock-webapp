require 'common'
require 'rock/event_loop'
require 'rock/tasks'

# The toplevel namespace for webapp
#
# You should describe the basic idea about webapp here
require 'utilrb/logger'
module Rock
    module WebApp
        module Tasks
 
            UI_DIR  = File.join(Rock::WebApp::LIB_DIR, 'rock', 'ui')
            
            if ENV['ROCK_WEBAPP_CUSTOM_PATH']
                UI_CUSTOM_DIR = File.expand_path(ENV['ROCK_WEBAPP_CUSTOM_PATH'])    
            end
            
            extend Logger::Root('Rock::WebApp::Tasks', Logger::WARN)
    
            # Root for a REST API that allows to access a running Rock system
            class Root < Grape::API
                version 'v1'
    
                mount Tasks
            end
        end
    end
end

