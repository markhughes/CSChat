/**
 * CokeStudios Chat
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Mark Hughes <mark@markeh.me>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Chat = {
	assets: "assets/chat/",
	doPush: function() {
		var elements = document.getElementsByTagName("x-chat-msg");
		var i = 0;
		while(i < elements.length) {
			var top = parseInt(elements[i].style.top.replace("px", ""))-30;
			
			if(top < -100) {
				elements[i].parentElement.removeChild(elements[i]);

			} else { 
				elements[i].style.top = top;
			}
			i++;
		}
	}, 
	timeInitiated: false,
	create: function(name, message, left) {
		this.doPush();
		var chatElement = document.createElement("x-chat-msg");
		chatElement.id = "chat-msg-"+Math.random();
		
		chatElement.style.fontFamily = "Verdana";
		chatElement.style.fontSize = "10px";
		chatElement.style.position = "absolute";
		chatElement.style.left = left;
		chatElement.style.top = 200;
		chatElement.style.transitionProperty = "top";
		chatElement.style.transitionDuration = "1s, 1s";
		chatElement.style.transitionDelay = "0s, 1s";

		var chatLeft = document.createElement("chat-name");
		var chatRight = document.createElement("chat-msg");
		
		chatLeft.style.float = "left";
		chatLeft.style.height = "23px";
		chatLeft.style.lineHeight = "23px";
		chatLeft.style.paddingLeft ="10px";
		chatLeft.style.paddingRight ="5px";
		chatLeft.style.backgroundImage = "url('"+this.assets+"name-container.png')";
		chatLeft.innerHTML = "<b>"+name+"</b>";
		
		chatRight.style.float = "left";
		chatRight.style.height = "23px";
		chatRight.style.lineHeight = "23px";
		chatRight.style.paddingLeft ="10px";
		chatRight.style.paddingRight ="15px";
		chatRight.style.backgroundImage = "url('"+this.assets+"msg-container.png')";
		chatRight.style.backgroundPosition  = "right bottom";
		chatRight.innerHTML = message;
		
		chatElement.appendChild(chatLeft);
		chatElement.appendChild(chatRight);
		
		if(!this.timeInitiated) {
			this.timeInitiated = true;
			setInterval(function() { Chat.doPush(); }, 2000);
		}
		
		return chatElement;
	}
	
};

document.registerElement("x-chat-msg");