const Controle = require("../../orm/models/controleIrrigacaoModel.js")

class controlesController {
    async ligarControle(request, response) {
        try {
            const id = request.params.id;
    
            const controle = await Controle.findOne({ where: { id } })
    
            if (!controle) {
                return response.status(400).json("Data not found");
            }
    
            controle.comando_bomba = true;
            controle.comando_valvula = true;

            await controle.save();
            response.status(200).json("Ligados");
        } catch (error) {
            console.error(error);
            response.status(500).send(error);
        }
    }

    async desligarControle(request, response){

        try {
            const id = request.params.id;
    
            const controle = await Controle.findOne({ where: { id } });
    
            if (!controle) {
                return response.status(400).json("Data not found");
            }
    
            controle.comando_bomba = false;
            controle.comando_valvula = false;
    
            await controle.save();

            response.status(200).json("Desligados");
        } catch (error) {
            console.error(error);
            response.status(500).send(error);
        }
    }

    async listarControles(request, response) {
        /*database
            .select("*")
            .table("ControleIrrigacao") 
            .then((controles) => {
                response.json(controles);
            })
            .catch((error) => {
                console.log(error);
            });*/

        try {
            const controle = await Controle.findAll();
            response.status(200).json(controle);
        } catch (error) {
            console.log(error);
            response.status(400).send(error);
        }
    }

    async create(request, response) {
        try {
          await DadosEstufa.create(request.body);
          response.status(200).json("Data inserted!!");
        } catch (error) {
          console.log(error);
          response.status(400).send(error);
        }
      }

    

    
}

module.exports = new controlesController();
