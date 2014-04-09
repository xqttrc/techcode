package org.example.demo.friendly;

import org.example.demo.Greeter;

public class FriendlyGreeter implements Greeter {

	public String sayHello() {
		String msg = "Good morning!";
		System.out.println(msg);
		return msg;
	}

}
