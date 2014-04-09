package org.example.demo.grumpy;

import org.example.demo.Greeter;

public class GrumpyGreeter implements Greeter {

	public String sayHello() {
		String msg = "Leave me alone!";
		System.out.println(msg);
		return msg;
	}

}
