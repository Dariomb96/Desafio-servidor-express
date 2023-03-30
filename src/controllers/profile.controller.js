async function getProfilePage(req, res) {
    res.render("products", { title: "Login", styles: "css/profile.css" });
};

export default getProfilePage;