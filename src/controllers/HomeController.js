let getHomePage = (req, res) => {
    return res.render('homepage.ejs');
}

let receive = (req, res) => {
    return res.render('homepage.ejs');
}

let verify = (req, res) => {
    return res.render('homepage.ejs');
}

module.exports = {
    getHomePage: getHomePage,
    receive: receive, 
    verify: verify,
}