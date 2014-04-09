package org.example.demo.test;

import junit.framework.TestCase;

import org.example.demo.Greeter;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

public class GreeterTest extends TestCase {
	private final BundleContext context = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
	
	public void testGreeter() throws Exception {
		ServiceReference serviceReference = context.getServiceReference(Greeter.class.getName());
		Greeter greeter = (Greeter)context.getService(serviceReference);
		String greeting = greeter.sayHello();
		assertEquals("Good morning!!", greeting);
	}
}
