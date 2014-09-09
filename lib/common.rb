require 'orocos'
require 'orocos/async'

require 'grape'
require 'multi_json'
require 'faye/websocket'

# The toplevel namespace for webapp
#
# You should describe the basic idea about webapp here
require 'utilrb/logger'
module Rock
    module WebApp
 
        LIB_DIR = File.expand_path(File.dirname(__FILE__))        
        COMMON_UI_DIR  = File.join(LIB_DIR, 'common', 'ui')

    end
end

