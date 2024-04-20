const UserDb = require(`../models`).UserDb;
const bcrypt = require(`bcryptjs`);
const RezervareDb = require(`../models`).RezervareDb;

const UserController = {
    register: async (req, res) => {
        try {
            const user = {
                nume: req.body.nume,
                prenume: req.body.prenume,
                parola: req.body.parola,
                telefon: req.body.telefon,
                email: req.body.email
            };
            let errMsg = [];
            let errCounter = 0;
            if (user === undefined) {
                errMsg[errCounter++] = "Toate campurile trebuie sa fie completate!";
            }
            if (!user.nume || !user.prenume || !user.parola || !user.telefon || !user.email) {
                errMsg[errCounter++] = "Unul sau mai multe campuri sunt goale";
            }
            if (errMsg > 0) {
                res.status(400).send(errMsg);
                return;
            }
            if (user.nume.length <= 2) {
                errMsg[errCounter++] = "Numele trebuie sa contina minim 2 litere.";
            }
            if (user.prenume.length <= 2) {
                errMsg[errCounter++] = "Numele trebuie sa contina minim 2 litere.";
            }
            if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                errMsg[errCounter++] = "Email-ul nu are formatul bun.";
            }
            if (user.parola.length < 8) {
                errMsg[errCounter++] = "Parola trebuie sa contina minim 8 caractere.";
            }
            if (user.telefon.length != 10) {
                errMsg[errCounter++] = "Numarul de telefon a fost introdus gresit!";
            }
            if (errCounter > 0) {
                res.status(400).send(errMsg);
                return;
            }
            user.parola = await bcrypt.hash(user.parola, 10);
            await UserDb.create(user);
            res.status(200).send("User created succesfully!");
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            let users = await UserDb.findAll();
            if (users == {}) {
                res.status(404).send("Nu au fost gasiti utilizatori!");
                return;
            }
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = req.params.id;
            let users = await UserDb.findByPk(id);
            if (!users) {
                res.status(404).send("User-ul nu a fost gasit!");
                return;
            }
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            const payload = {
                email: req.body.email,
                parola: req.body.parola,
            }
            const user = await UserDb.findOne({
                where: {
                    email: payload.email,
                }
            });
            if (!user) {
                res.status(403).send("Email sau parola gresita!");
                return;
            }
            const match = await bcrypt.compare(payload.parola, user.parola);
            if (match) {
                res.status(200).send("E de bine");
            }else{
                res.status(404).send("Mars ca esti hacker");
            }
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    updateUser: async(req, res) => {
        try{
            const id = req.params.id;
            let users = await UserDb.findByPk(id);
            if(!users){
                res.status(404).send("User-ul nu a fost gasit!");
                return;
            }
            let user = {
                nume: req.body.nume,
                email: req.body.email,
                parola: req.body.parola,
                prenume: req.body.prenume,
                telefon: req.body.telefon,
            };
            let errMsg = [];
            let errCounter = 0;
            if (user === undefined) {
                errMsg[errCounter++] = "Toate campurile trebuie sa fie completate!";
            }
            if (!user.nume || !user.prenume || !user.parola || !user.telefon || !user.email) {
                errMsg[errCounter++] = "Unul sau mai multe campuri sunt goale";
            }
            if (errMsg > 0) {
                res.status(400).send(errMsg);
                return;
            }
            if (user.nume.length <= 2) {
                errMsg[errCounter++] = "Numele trebuie sa contina minim 2 litere.";
            }
            if (user.prenume.length <= 2) {
                errMsg[errCounter++] = "Numele trebuie sa contina minim 2 litere.";
            }
            if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                errMsg[errCounter++] = "Email-ul nu are formatul bun.";
            }
            if (user.parola.length < 8) {
                errMsg[errCounter++] = "Parola trebuie sa contina minim 8 caractere.";
            }
            if (user.telefon.length != 10) {
                errMsg[errCounter++] = "Numarul de telefon a fost introdus gresit!";
            }
            if (errCounter > 0) {
                res.status(400).send(errMsg);
                return;
            }
            user.parola = await bcrypt.hash(user.parola, 10);
            await users.update(user);
            res.status(200).send("User modificat cu succes!");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    deleteUser: async(req, res) => {
        try{
            const id = req.params.id;
            let users = await UserDb.findByPk(id);
            if(!users){
                res.status(404).send("User-ul nu a fost gasit!");
                return;
            }
            await UserDb.destroy({
                where:{
                    id: id,
                }
            })
            res.status(200).send("User-ul a fost sters din baza de date");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    }
}


module.exports = UserController;