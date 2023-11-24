const Estufa = require("../../orm/models/estufaModel");
const DadosEstufa = require('../../orm/models/dadosEstufaModel');
const ControleIrrigacao = require('../../orm/models/controleIrrigacaoModel');
const sequelize = require("../../orm/config/db");


module.exports = {
  async all(request, response) {
    try {
      const estufaComDadosEstufas = await Estufa.findAll({
        include: [
          {
            model: DadosEstufa,
            attributes: ['temperatura', 'umidade', 'consumo_agua', 'timestamp'], // Selecione os atributos que você deseja da tabela 'DadosEstufa'
          }
        ]
      });
      
      response.status(200).json(estufaComDadosEstufas);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  
  async create(request, response) {
    const t = await sequelize.transaction();
    try {
      const novaEstufa = await Estufa.create(request.body, { transaction: t });
  
      // Crie dados associados na tabela DadosEstufa
      const dadosEstufa = await DadosEstufa.create({
        estufa_id: novaEstufa.id,
        temperatura: 0,
        umidade: 0,
        consumo_agua: 0,
        timestamp: new Date().toLocaleString(),
      }, { transaction: t });
  
      // Crie dados associados na tabela ControleIrrigacao
      const controleIrrigacao = await ControleIrrigacao.create({
        estufa_id: novaEstufa.id,
        comando_bomba: false,
        comando_valvula: false,
        timestamp: new Date().toLocaleString(),
      }, { transaction: t });
  
      // Confirme a transação se todas as operações foram bem-sucedidas
      await t.commit();
  
      // Responda com os dados criados
      response.status(201).json({
        estufa: novaEstufa,
        dadosEstufa,
        controleIrrigacao,
      });
    } catch (error) {
      // Desfaça a transação em caso de erro
      await t.rollback();
  
      console.error(error);
      response.status(400).send(error);
    }
  },
  async delete(request,response){
    const estufaId = request.params.id;

    try {
      // Verifique se a estufa existe
      const estufa = await Estufa.findByPk(estufaId);

      if (!estufa) {
        return response.status(404).json({ mensagem: 'Estufa não encontrada' });
      }

      // Deleta os dados associados na tabela DadosEstufa
      await DadosEstufa.destroy({ where: { estufa_id: estufaId } });
      await ControleIrrigacao.destroy({ where: { estufa_id: estufaId } });

      // Deleta a estufa
      await Estufa.destroy({ where: { id: estufaId } });

      // Responda com uma mensagem de sucesso
      response.status(200).json({ mensagem: 'Estufa e dados associados deletados com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar estufa:', error);
      response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  },
}
