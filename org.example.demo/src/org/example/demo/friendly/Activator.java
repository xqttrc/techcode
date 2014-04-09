package org.example.demo.friendly;

import java.util.Properties;

import org.apache.felix.dm.DependencyActivatorBase;
import org.apache.felix.dm.DependencyManager;
import org.example.demo.Greeter;
import org.osgi.framework.BundleContext;

public class Activator extends DependencyActivatorBase {

	public void destroy(BundleContext arg0, DependencyManager arg1)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	public void init(BundleContext arg0, DependencyManager manager)
			throws Exception {
		Properties props = new Properties();
		props.put("greetingType", "friendly");
		
		manager.add(createComponent()
				.setInterface(Greeter.class.getName(), props)
				.setImplementation(FriendlyGreeter.class));
	}

}
