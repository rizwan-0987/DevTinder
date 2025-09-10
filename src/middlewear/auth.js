export const authAdmin = (req, res, next) => {
    console.log("    checking admin auth")
    const token = "abc";
    let isAuth = token === "ac"
    if (isAuth) {
        next()
    } else {
        res.status(401).send("unauth access")
    }
}

export const authuser = (req, res, next) => {
    console.log("checking auth of user")
    const token = "hello"
   const isAuth = token === "hell"
    if (isAuth) {
        next();
    } else {
        res.status(401).send("un auth access")
        
    }
}