function confpass(e){
    e.preventDefault()
        let confirmation = document.querySelector("#submit-btn")
        let pass1 = (document.querySelector("#password-input").value)
        let pass2 = (document.querySelector("#confirm-input").value)
        console.log(pass1, pass2)
        
        confirmation.addEventListener("click", () => {
            if (pass1 != pass2){
                window.alert("The passwords entered do not match!!")
            }
        })
    }