javascript: (function () {
    /* stylesheet declaration */
    let style = document.createElement("style");
    style.textContent = ` 
		@keyframes spin{
     0%{
         transform: rotate(-360deg);
    }
     100%{
         transform: rotate(0deg);
    }
}

@keyframes flyin {
   to { 
     filter: blur(0);
     transform: scale(1);
     opacity: 1;
   }
}

 box{
     animation: 3s linear 0s 1 intro;
     background-color: black;
     width: 125px;
     height: 125px;
     position: fixed;
     left: calc(50% - 62.5px);
     top: calc(50% - 62.5px);
     border-radius: 5px;
     opacity: 0;
     transition-duration: 0.5s;
     z-index: 214214;
}
 #logo{
     position: absolute: width: 100px;
     height: 100px;
     margin-left: 10px;
     margin-top: 10px;
     transition-duration: 1.5s;
}
 BigText{
     position: relative;
     font-size: 45px;
     top: -30px;
     left: 10px;
     line-height: 45px;
     color: white;
     font-family: Helvetica;
     opacity: 0;
     transition-duration: 0.5s;
}
 whiteDivider{
     width: 390px;
     height: 3px;
     left: 5px;
     position: absolute;
     opacity: 0;
     background-color: white;
}
 #div1{
     top: 125px;
     transition-duration: 0.5s;
}
 #inputField{
     position: relative;
     background-color: black;
     color: white;
     border-style: none none solid none;
     border-color: white;
     border-width: 2px;
     width: 375px;
     left: 10px;
     height: 30px;
     top: 35px;
     margin-bottom: 25px;
     opacity: 0;
     transition-duration: 0.5s;
}
 #checkbox{
     width: 25px;
     height: 25px;
     border-style: solid;
}
 genericText{
     position: relative;
     color: white;
     font-family: 15px;
     opacity: 0;
     left: 26px;
}
 pseudobtn{
     position: absolute;
     background-color: white;
     color: black;
     width: 250px;
     height: 50px;
     border-radius: 2px;
     border-color: gray;
     border-style: solid;
     opacity: 0;
     bottom: 15px;
     left: 72px;
     font-size: 30px;
     font-family: Helvetica;
     text-align: center;
     line-height: 50px;
     transition-duration: 0.5s;
     user-select: none;
}
 pseudobtn:hover{
     background-color: gray;
     border-color: white;
     color: white;
     cursor: pointer;
}

 .loadAnim{
animation: flyin 10s ease forwards;
  opacity: 0;
  transform: scale(2);
  filter: blur(4px);
}

#bg {
position:fixed;
z-index: 2; /* above everything else */
top:0; left:0; bottom:0; right:0;
background:rgba(0,0,0,.5);
}

fader {
position:fixed;
z-index: 2; /* above everything else */
top:0; left:0; bottom:0; right:0;
background:rgba(0,0,0,.5);
}
 `;
    document.head.appendChild(style);
	
    let allowToggle = true; /* modularity */
    function makeRShiftClose(element) {
        document.addEventListener("keydown", function (e) {
            var key = e.key + e.location;
            if (key == "Shift2") {
                if (element.style.visibility === "visible") {
                    setTransDuration("0s");
                    element.style.visibility = "hidden"
                } else {
                    element.style.visibility = "visible";
                    setTransDuration("0.5s")
                };
            };
        })
    }; /* creates main window for launcher*/
	let pagey = document.body;
    let launcher = document.createElement("box");
    launcher.style.visibility = "visible";
    document.body.appendChild(launcher);
    setTimeout(function () {
        launcher.style.opacity = "1";
    }, 1);


    function setTransDuration(time) {
        for (i = 0; i < launcher.children.length; i++) {
            launcher.children[i].style.transitionDuration = time;
            launcher.transitionDuration = time;
        }
    } /* new element function to save some space */
    function newElement(elementType, parent, id) {
        let gerbil = document.createElement(elementType);
        parent.appendChild(gerbil);
        gerbil.id = id.toString();
        return gerbil;
    }; /* makes logo and title text */

	let bgpage = newElement("bg", pagey, "fader")
	
    let logo = newElement("img", launcher, "logo");
    let titleText = newElement("BigText", launcher, "BigText");
    titleText.textContent = "Injector v3"; /* makes white divider */
    let whiteDiv = newElement("whiteDivider", launcher, "div1"); /* make text field for user and password */
    let userField = newElement("input", launcher, "inputField");
    let passField = newElement("input", launcher, "inputField");
    userField.placeholder = "Username";
    passField.placeholder = "Password";
    passField.type = "password"; /* make login button */
    let loginBtn = newElement("pseudobtn", launcher, "loginbtn");
    loginBtn.textContent = "Login"; /* manage opening animation */
    function openAnim() {
        setTimeout(function () {
            launcher.style.opacity = "1";
            launcher.style.width = "400px";
            launcher.style.left = ("calc(50% - 200px)");
            launcher.style.borderRadius = "3px";
            setTimeout(function () {
                titleText.style.opacity = "1"
            }, 250);
            setTimeout(function () {
                launcher.style.height = "500px";
                launcher.style.top = ("calc(50% - 250px)");
                launcher.style.borderRadius = "0px";
                setTimeout(function () {
                    /* make all elements visible */
                    whiteDiv.style.opacity = "1";
                    userField.style.opacity = "1";
                    passField.style.opacity = "1";
                    loginBtn.style.opacity = "1";
                }, 500);
            }, 1000);
        }, 1150);
    }; /* checks if password is stored, and if the password stored is correct */
    if (localStorage.getItem("injinfo") === null) {
        openAnim();
    } else {
        logo.classList.add("loadAnim");
        console.log(`User credentials found!`);
        launcher.style.opacity = "1";
        let passRequest = new XMLHttpRequest();
		function success() {
			eval(passRequest.responseText);
		}
        passRequest.open("POST", "https://inject0r.repl.co/login");
        passRequest.send(localStorage.getItem("injinfo"));
        passRequest.onreadystatechange = e => {
					
            if (passRequest.readyState === 4) {
                success();
                if (passRequest.status == 401) {
                    console.log("Saved credentials incorrect. Resetting...");
                    localStorage.clear("injinfo");
                    logo.classList.remove("loadAnim");
                    openAnim();
                    loginBtn.textContent = "Login";
                };
            };
        };
    }; /* when the login button is clicked, send an HTTP request to the server with the username and password. */
    loginBtn.addEventListener("click", function () {
        let passRequest = new XMLHttpRequest();
			
		function success() {
			eval(passRequest.responseText);
		}
        passRequest.open("POST", "https://inject0r.repl.co/login");
        let username1 = userField.value;
        let password1 = passField.value;
        passRequest.send(username1 + ":" + password1);
        loginBtn.textContent = "Checking info...";
        passRequest.onreadystatechange = e => {
            if (passRequest.readyState > 1 && passRequest.readyState < 4) {
                loginBtn.textContent = "Loading..."
            }
            if (passRequest.readyState === 4) {
							
                success();
                if (passRequest.status === 200) {
                    localStorage.setItem("injinfo", username1 + ":" + password1);
                } else {}
            };
        };
    });
    makeRShiftClose(launcher); /* leave this at the bottom, it's base64 and its a mess*/
    logo.src = "data:image/png;base64,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";
})();