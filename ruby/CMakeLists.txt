configure_file(webapp.rb.in webapp.rb)
install(FILES ${PROJECT_BINARY_DIR}/ruby/webapp.rb 
	DESTINATION ${CMAKE_INSTALL_PREFIX}/share/rest_api/plugins)
