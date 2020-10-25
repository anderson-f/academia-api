"use strict";
const Training = use("App/Models/Training");
class TrainingController {
  async index() {
    return await Training.all();
  }

  async show({ params }) {
    const training = await Training.findOrFail(params.id);
    return training;
  }

  async store({ request }) {
    const { exercises, ...data } = request.only([
      "client_id",
      "name",
      "observation",
      "exercises",
    ]);

    const training = await Training.create(data);

    if (exercises) {
      // pela relação de exercicios com treino consigo inserir dessa forma
      await training.exercises().attach(exercises);
    }

    await training.load("exercises");

    return training;
  }

  async update({ params, request }) {
    const { exercises, ...data } = request.only([
      "client_id",
      "name",
      "observation",
      "exercises",
    ]);

    const training = await Training.findOrFail(params.id);
    training.merge(data);
    await training.save();

    if (exercises) {
      // o sync delete o que já tinha e cria com os novos
      await training.exercises().sync(exercises);
    }

    await training.load("exercises");
    return training;
  }

  async destroy({ params }) {
    const training = await Training.findOrFail(params.id);
    await training.delete();

    return {
      status: true,
    };
  }
}

module.exports = TrainingController;
