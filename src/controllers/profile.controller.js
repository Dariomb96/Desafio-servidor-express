export async function getProfilePage(req, res) {
    res.render('products', { title: "Login", styles: "css/profile.css" });
};
// actualmente te muestra la pagina sin productos