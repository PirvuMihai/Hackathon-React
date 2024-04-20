const { Sequelize, Op } = require("sequelize");

const RezervareDb = require(`../models`).RezervareDb;
//  const JonctiuneDb= require(`../models`).;
const LocDb = require(`../models`).LocDb

const RezervareController = {
    addRezervare: async (req, res) => {
        try {
            const payload = {
                data: new Date(req.body.data),
                durata: req.body.durata,
                userId: req.body.user,
                locuri: req.body.locuri
            }
            if (!payload.data || !payload.durata || !payload.userId || !payload.locuri) {
                res.status(400).send("Trebuie completate campurile!");
                return;
            }
            var final = new Date(payload.data);
            console.log(final);
            final.setHours(final.getHours() + payload.durata);
            console.log(final);
            console.log("cox");
            let rezervare = await RezervareDb.create({
                inceput: payload.data,
                final: final
            });

            const locuri = await LocDb.findAll({
                where: {
                    id: {
                        [Op.in]: payload.locuri
                    }
                }
            })
            await rezervare.addLocs(locuri);

            res.status(200).send("A mers");
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    getRezervareByUserID: async (req, res) => {
        try {
            const id = req.params.id;
            const rezervari = await RezervareDb.findAll({
                where: {
                    UserId: id
                }
            });
            if (rezervari == {})
                res.status(400).send("Nu exista rezervari!");
            else
                res.status(200).send(rezervari);
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    checkAvailability: async (req, res) => {
        const incercare = {
            dataInceput: new Date(req.body.dataInceput),
            durata: req.body.durata
        };
        console.log(incercare.dataInceput);
        var final = new Date(incercare.dataInceput);
        console.log(final);
        final.setHours(final.getHours() + incercare.durata);
        const rezervari = await RezervareDb.findAll({
            where: {
                [Op.or]: [{
                    inceput: {
                        [Op.between]: [incercare.dataInceput, final]
                    }
                },
                {
                    final: {
                        [Op.between]: [incercare.dataInceput, final]
                    }
                }, {
                    [Op.and]: [{
                        inceput: {
                            [Op.lte]: incercare.dataInceput
                        }
                    },
                        {
                        final: {
                            [Op.gte]: final
                        }
                    },
                    ]
            },
                
            ]
            }
        });
        const saizeci = 60;
        let corecte = new Array(saizeci).fill(0).map((_,index)=> index)
        let locuri = await LocDb.findAll({
            include: [RezervareDb]
        });
        let chiar_corecte = locuri.filter(item=> {
            var ok = 0;
            for(let i in item.rezervares) {
                if (corecte.includes(i)) ok = 1;
            }
            return ok;
        })
        res.status(200).send(chiar_corecte);
    }
}

module.exports = RezervareController;