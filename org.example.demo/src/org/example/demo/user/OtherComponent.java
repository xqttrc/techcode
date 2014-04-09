package org.example.demo.user;

import org.example.demo.Greeter;

public class OtherComponent {
	private volatile Greeter greeter;

	public void start() {
		greeter.sayHello();
	}

	public void serviceAdded(Greeter greeter) {
		System.out.println("Greeter added!");
	}

	public void serviceRemoved() {
		System.out.println("Goodbye greeter!");
	}
}
