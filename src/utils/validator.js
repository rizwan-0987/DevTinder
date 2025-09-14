import validator from "validator";

export const signupValidate = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    
    if (firstName == "" || lastName == "") {
        throw new Error("Please enter both First and Last name");      
    }
    else if(!validator.isEmail(emailId)){
throw new Error("Enter valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
        
    }
}
export const loginValidate = (req) => {
    const { emailId, password } = req.body;
     if (emailId == "" || password == "") {
          throw new Error("please enter email and password correctly");
        }
        if (!validator.isEmail(emailId)) {
          throw new Error("Enter a valid email");
          
        }
}