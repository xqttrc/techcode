package org.example.demo.user;

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
		manager.add(createComponent()
				.setInterface(Object.class.getName(), null)
				.setImplementation(OtherComponent.class)
				.add(createServiceDependency()
						//.setService(Greeter.class, "(greetingType=friendly)")));
		.setService(Greeter.class)
		.setCallbacks("serviceAdded", "serviceRemoved")));
	}

}
