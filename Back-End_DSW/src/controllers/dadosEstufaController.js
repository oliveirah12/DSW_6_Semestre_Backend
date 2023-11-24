
const DadosEstufa = require("../../orm/models/dadosEstufaModel");

module.exports = {
  async all(request, response) {
    try {
      const dadosEstufa = await DadosEstufa.findAll();
      response.status(200).json(dadosEstufa);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async create(request, response) {
    try {
      await DadosEstufa.create(request.body);
      response.status(200).json("Data inserted!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { data, hora, umidade, temperatura } = request.body;
      const id = request.params.id;
      const dadosEstufa = await DadosEstufa.findOne({ where: { id } });

      if (!dadosEstufa) {
        return response.status(400).json("Data not found");
      }
      dadosEstufa.data = data;
      dadosEstufa.hora = hora;
      dadosEstufa.umidade = umidade;
      dadosEstufa.temperatura = temperatura;

      await dadosEstufa.save();
      response.status(200).json("Data uptated!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async delete(request,response){
    try {
      const id = request.params.id;
      const dadosEstufa = await DadosEstufa.destroy({ where: { id } });
      if (!dadosEstufa) {
        return response.status(400).json("Data not found");
      }
      response.status(200).json("Data removed!!");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }
};


